"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import api from "@/lib/api";
import { Send, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Message {
    _id?: string;
    username: string;
    content: string;
    userId: string;
}

export default function DistrictChat() {
    const { id } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [currentUser, setCurrentUser] = useState<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load user
        const userStr = localStorage.getItem("user");
        if (userStr) setCurrentUser(JSON.parse(userStr));

        // Load History
        api.get(`/districts/${id}/messages`)
            .then(res => {
                // Map backend response if needed, but backend sends { content, user: { username } } or populated.
                // My backend sends: { content, user: { ... }, ... } because I used .populate('user')
                // Wait, in Server.js I did: .populate('user', 'username')
                // So the message object has msg.user.username
                // But the interface and socket event expects flat structure: { username, content, userId }
                // I need to transform the history data to match the state usage, OR update the rendering.

                // Let's transform:
                const history = res.data.map((m: any) => ({
                    _id: m._id,
                    content: m.content,
                    userId: m.user?._id || m.user, // handle populated or not
                    username: m.user?.username || 'Unknown'
                }));
                setMessages(history);
                scrollToBottom();
            })
            .catch(console.error);

        // Connect socket
        socket.connect();
        socket.emit("join_district", id);

        socket.on("receive_message", (data: Message) => {
            setMessages((prev) => [...prev, data]);
            scrollToBottom();
        });

        return () => {
            socket.off("receive_message");
            socket.disconnect();
        };
    }, [id]);

    const scrollToBottom = () => {
        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    };

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !currentUser) return;

        const data = {
            districtId: id,
            userId: currentUser.id,
            username: currentUser.username,
            content: input
        };

        socket.emit("send_message", data);
        // Optimistic update? Socket will echo it back in this simple implementation, so wait for echo 
        // actually our server implementation broadcasts to room. sender is in room. so we will receive it.
        // However, usually sender wants instant feedback.
        // For now rely on echo.
        setInput("");
    };

    return (
        <div className="flex flex-col h-screen max-w-5xl mx-auto bg-black border-x border-white/5">
            <header className="p-4 border-b border-white/10 flex items-center gap-4 bg-black/50 backdrop-blur sticky top-0 z-10">
                <Link href="/dashboard" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="font-bold text-lg">District Channel #{id}</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-500 uppercase tracking-wider">Live Signal</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => {
                    const isMe = msg.userId === currentUser?.id;
                    return (
                        <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${isMe ? "bg-primary text-white" : "bg-white/10 text-gray-200"
                                }`}>
                                {!isMe && <div className="text-xs opacity-50 mb-1">{msg.username}</div>}
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={scrollRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-black">
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Broadcast message..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                        type="submit"
                        className="w-12 h-12 flex items-center justify-center bg-primary rounded-full hover:bg-primary/90 transition-all"
                        disabled={!input.trim()}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
}
