"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import api from "@/lib/api";
import { Send, ArrowLeft, Paperclip, Loader2 } from "lucide-react";
import { uploadMedia } from "@/lib/media";
import Link from "next/link";

interface Message {
    _id?: string;
    username: string;
    content: string;
    userId: string;
    createdAt?: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
}

export default function DistrictChat() {
    const { id } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [district, setDistrict] = useState<any>(null);
    const [input, setInput] = useState("");
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load user
        const userStr = localStorage.getItem("user");
        if (userStr) setCurrentUser(JSON.parse(userStr));

        // Load District Details
        api.get(`/districts/${id}`).then(res => setDistrict(res.data)).catch(console.error);

        // Load History
        api.get(`/districts/${id}/messages`)
            .then(res => {
                const history = res.data.map((m: any) => ({
                    _id: m._id,
                    content: m.content,
                    userId: m.user?._id || m.user,
                    username: m.user?.username || 'Unknown',
                    createdAt: m.createdAt,
                    mediaUrl: m.mediaUrl,
                    mediaType: m.mediaType
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
        setInput("");
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !currentUser) return;

        setUploading(true);
        try {
            const { url, resource_type } = await uploadMedia(file);

            const data = {
                districtId: id,
                userId: currentUser.id,
                username: currentUser.username,
                content: `Sent a ${resource_type}`,
                mediaUrl: url,
                mediaType: resource_type === 'video' ? 'video' : 'image'
            };

            socket.emit("send_message", data);
        } catch (err) {
            console.error("Upload failed", err);
            alert("Failed to upload media. Please try again.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-5xl mx-auto bg-black border-x border-white/5">
            <header className="p-4 border-b border-white/10 flex items-center gap-4 bg-black/50 backdrop-blur sticky top-0 z-10">
                <Link href="/dashboard" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="font-bold text-lg flex items-center gap-2">
                        {district ? district.name : `District #${id}`}
                        {district && <span className="text-xl">{district.icon}</span>}
                    </h1>
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
                                <div className="flex items-baseline gap-2 mb-1">
                                    {!isMe && <span className="text-xs font-bold opacity-75">{msg.username}</span>}
                                    <span className="text-[10px] opacity-50">
                                        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </span>
                                </div>
                                <p className="text-sm">{msg.content}</p>
                                {msg.mediaUrl && (
                                    <div className="mt-2 rounded-lg overflow-hidden border border-white/5 bg-black/20">
                                        {msg.mediaType === 'video' ? (
                                            <video src={msg.mediaUrl} controls className="max-w-full max-h-[300px]" />
                                        ) : (
                                            <img
                                                src={msg.mediaUrl}
                                                alt="Media"
                                                className="max-w-full max-h-[300px] object-contain hover:scale-105 transition-transform cursor-pointer"
                                                onClick={() => window.open(msg.mediaUrl, '_blank')}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={scrollRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-black">
                <div className="flex gap-2 items-center">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*,video/mp4"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                        {uploading ? <Loader2 size={18} className="animate-spin text-primary" /> : <Paperclip size={18} className="text-gray-400" />}
                    </button>
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
