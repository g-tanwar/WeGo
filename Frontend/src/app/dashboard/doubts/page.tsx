"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, Tag, Plus, Search } from "lucide-react";

interface Doubt {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    upvotes: string[];
    answers: any[];
    createdAt: string;
    author: {
        username: string;
    };
}

export default function DoubtBoard() {
    const [doubts, setDoubts] = useState<Doubt[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoubts();
    }, []);

    const fetchDoubts = async () => {
        try {
            const res = await api.get("/doubts");
            setDoubts(res.data);
        } catch (error) {
            console.error("Failed to fetch doubts", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8 max-w-7xl mx-auto">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Doubt Board
                    </h1>
                    <p className="text-gray-400 mt-2">Solve problems together, grow faster.</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    {/* Search Bar - Visual only for now */}
                    <div className="relative group flex-1 md:flex-initial">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
                        />
                    </div>

                    <Link href="/dashboard/doubts/new">
                        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25">
                            <Plus size={18} />
                            <span>Ask Doubt</span>
                        </button>
                    </Link>
                </div>
            </header>

            {/* Content */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {doubts.map((doubt, i) => (
                        <motion.div
                            key={doubt._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link href={`/dashboard/doubts/${doubt._id}`}>
                                <div className="group bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all rounded-2xl p-6 cursor-pointer relative overflow-hidden">
                                    {/* Hover Gradient Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />

                                    <div className="relative flex flex-col md:flex-row gap-4 justify-between md:items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md border border-purple-500/20">
                                                    @{doubt.author?.username || 'Anonymous'}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(doubt.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-100 group-hover:text-purple-300 transition-colors mb-2 line-clamp-1">
                                                {doubt.title}
                                            </h3>

                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {doubt.tags.map((tag, idx) => (
                                                    <span key={idx} className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                                                        <Tag size={10} />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 text-gray-400 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0 min-w-fit">
                                            <div className="flex flex-col items-center gap-1 group/stats">
                                                <div className={`p-2 rounded-full ${doubt.upvotes.length > 0 ? 'bg-green-500/20 text-green-400' : 'bg-white/5 group-hover/stats:bg-white/10'}`}>
                                                    <ThumbsUp size={20} className={doubt.upvotes.length > 0 ? 'fill-current' : ''} />
                                                </div>
                                                <span className="text-sm font-medium">{doubt.upvotes.length || 0}</span>
                                            </div>

                                            <div className="flex flex-col items-center gap-1 group/stats">
                                                <div className="p-2 rounded-full bg-white/5 group-hover/stats:bg-white/10 transition-colors">
                                                    <MessageCircle size={20} />
                                                </div>
                                                <span className="text-sm font-medium">{doubt.answers.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {doubts.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <p className="text-lg">No doubts found.</p>
                            <p className="text-sm">Be the first to ask!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
