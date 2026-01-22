"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import api from "@/lib/api";
import { Send, ArrowLeft, Users, Hash } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Message {
    _id?: string;
    username: string;
    content: string;
    userId: string;
    createdAt?: string;
}

interface Group {
    _id: string;
    name: string;
    description: string;
    members: { _id: string; username: string }[];
    creator: { _id: string; username: string };
}

export default function GroupDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [group, setGroup] = useState<Group | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) setCurrentUser(JSON.parse(userStr));

        if (id) {
            fetchGroupDetails();
            fetchChatHistory();
            connectSocket();
        }

        return () => {
            socket.off("receive_message");
            socket.emit("leave_district", id); // We reuse district logic for rooms
            // socket.disconnect(); // Keep connection alive for other pages
        };
    }, [id]);

    const fetchGroupDetails = async () => {
        try {
            const res = await api.get(`/groups/${id}`);
            setGroup(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchChatHistory = async () => {
        try {
            const res = await api.get(`/groups/${id}/messages`);
            const history = res.data.map((m: any) => ({
                _id: m._id,
                content: m.content,
                userId: m.user?._id || m.user,
                username: m.user?.username || 'Unknown',
                createdAt: m.createdAt
            }));
            setMessages(history);
            scrollToBottom();
        } catch (err) {
            console.error(err);
        }
    };

    const connectSocket = () => {
        socket.connect();
        socket.emit("join_district", id); // Reuse district room logic
        socket.on("receive_message", (data: Message) => {
            setMessages((prev) => [...prev, data]);
            scrollToBottom();
        });
    };

    const scrollToBottom = () => {
        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    };

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !currentUser) return;

        const data = {
            districtId: id, // Reuse districtId for groupId
            userId: currentUser.id,
            username: currentUser.username,
            content: input
        };

        socket.emit("send_message", data);
        setInput("");
    };

    const handleJoin = async () => {
        try {
            await api.post(`/groups/${id}/join`);
            fetchGroupDetails(); // Refresh members list
        } catch (err) {
            console.error("Failed to join", err);
        }
    };

    const handleLeave = async () => {
        if (!confirm("Are you sure you want to leave this group?")) return;
        try {
            await api.post(`/groups/${id}/leave`);
            fetchGroupDetails();
            router.push('/dashboard'); // Optional: Redirect or stay and show "Join" button
        } catch (err) {
            console.error("Failed to leave", err);
        }
    };

    if (!group) return <div className="p-8 text-center text-gray-500">Loading group...</div>;

    const isMember = currentUser && group.members.some(m => m._id === currentUser.id);

    return (
        <div className="flex h-screen bg-black overflow-hidden relative">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative z-10">
                {/* Header */}
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/50 backdrop-blur">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="font-bold flex items-center gap-2">
                                <Hash size={18} className="text-purple-500" />
                                {group.name}
                            </h1>
                            <span className="text-xs text-green-500 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                {group.members.length} members
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="lg:hidden p-2 text-gray-400"
                    >
                        <Users size={20} />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg, idx) => {
                        const isMe = msg.userId === currentUser?.id;
                        return (
                            <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[75%] rounded-2xl px-5 py-3 ${isMe ? "bg-purple-600 text-white" : "bg-white/10 text-gray-200"
                                    }`}>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        {!isMe && <span className="text-xs font-bold opacity-75">{msg.username}</span>}
                                        <span className="text-[10px] opacity-50">
                                            {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </span>
                                    </div>
                                    <p className="leading-relaxed text-sm">{msg.content}</p>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={scrollRef} />
                </div>

                {/* Input Area */}
                {isMember ? (
                    <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-black/50 backdrop-blur">
                        <div className="flex gap-3 max-w-4xl mx-auto">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`Message #${group.name}`}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-purple-500/50 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="w-12 h-12 flex items-center justify-center bg-purple-600 rounded-xl hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="p-6 border-t border-white/10 text-center bg-black/50 backdrop-blur">
                        <button
                            onClick={handleJoin}
                            className="bg-white text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
                        >
                            Join Group to Chat
                        </button>
                    </div>
                )}
            </div>

            {/* Sidebar (Members & Info) */}
            <motion.div
                className={`w-80 border-l border-white/10 bg-black/95 backdrop-blur absolute inset-y-0 right-0 z-20 transform lg:relative lg:translate-x-0 transition-transform duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-6">
                    <h2 className="font-bold text-lg mb-4">About Group</h2>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        {group.description}
                    </p>

                    <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-4">Members</h3>
                    <div className="space-y-3 mb-8">
                        {group.members.map(member => (
                            <div key={member._id} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                                    {member.username[0].toUpperCase()}
                                </div>
                                <span className="text-sm text-gray-300">
                                    {member.username} {member._id === group.creator._id && <span className="text-xs text-purple-400 ml-1">(Owner)</span>}
                                </span>
                            </div>
                        ))}
                    </div>

                    {isMember && group.creator._id !== currentUser?.id && (
                        <button
                            onClick={handleLeave}
                            className="w-full py-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                        >
                            Leave Group
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Overlay for mobile sidebar */}
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 lg:hidden"
                    onClick={() => setShowSidebar(false)}
                />
            )}
        </div>
    );
}
