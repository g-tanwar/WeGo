"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Plus, Tag, Search, ArrowRight } from "lucide-react";

interface Group {
    _id: string;
    name: string;
    description: string;
    tags: string[];
    members: any[];
    creator: {
        username: string;
    };
}

export default function GroupsList() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const res = await api.get("/groups");
            setGroups(res.data);
        } catch (error) {
            console.error("Failed to fetch groups", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredGroups = groups.filter(g =>
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen p-8 max-w-7xl mx-auto">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Study Groups
                    </h1>
                    <p className="text-gray-400 mt-2">Find your tribe. Learn together.</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto flex-wrap md:flex-nowrap">
                    {/* Search Bar */}
                    <div className="relative group flex-1 md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Find groups..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 w-full focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
                        />
                    </div>

                    <Link href="/dashboard/groups/new">
                        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25 whitespace-nowrap">
                            <Plus size={18} />
                            <span>Create Group</span>
                        </button>
                    </Link>
                </div>
            </header>

            {/* List */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGroups.map((group, i) => (
                        <motion.div
                            key={group._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link href={`/dashboard/groups/${group._id}`}>
                                <div className="group h-full bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all rounded-2xl p-6 flex flex-col relative overflow-hidden">
                                    {/* Hover Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />

                                    <div className="relative flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center text-purple-400">
                                                <Users size={20} />
                                            </div>
                                            <span className="text-xs font-medium bg-black/50 border border-white/10 px-2 py-1 rounded-md text-gray-400">
                                                {group.members.length} members
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                                            {group.name}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                                            {group.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {group.tags.slice(0, 3).map((tag, idx) => (
                                                <span key={idx} className="flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                                                    <Tag size={10} />
                                                    {tag}
                                                </span>
                                            ))}
                                            {group.tags.length > 3 && (
                                                <span className="text-[10px] text-gray-500 px-1 py-1">+{group.tags.length - 3}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {group.members.slice(0, 3).map((m, idx) => (
                                                <div key={idx} className="w-6 h-6 rounded-full bg-gray-800 border border-black flex items-center justify-center text-[8px] font-bold text-gray-400" title={m.username}>
                                                    {m.username[0].toUpperCase()}
                                                </div>
                                            ))}
                                            {group.members.length > 3 && (
                                                <div className="w-6 h-6 rounded-full bg-gray-800 border border-black flex items-center justify-center text-[8px] font-bold text-gray-400">
                                                    +{group.members.length - 3}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-purple-400 group-hover:translate-x-1 transition-transform">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {filteredGroups.length === 0 && !loading && (
                        <div className="col-span-full text-center py-20 text-gray-500 border border-dashed border-white/10 rounded-2xl">
                            <Users size={48} className="mx-auto mb-4 opacity-50" />
                            <p className="text-lg">No groups found.</p>
                            <p className="text-sm">Create one to get started!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
