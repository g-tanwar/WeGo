"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Tag, Loader2, Sparkles } from "lucide-react";

export default function CreateGroup() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        tags: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!formData.name.trim() || !formData.description.trim()) {
            setError("Name and description are required.");
            return;
        }

        setLoading(true);

        try {
            // Parse tags
            const tagsArray = formData.tags
                .split(",")
                .map(t => t.trim())
                .filter(t => t.length > 0);

            const res = await api.post("/groups", {
                name: formData.name,
                description: formData.description,
                tags: tagsArray
            });

            // Redirect to the new group page (will implement next)
            router.push(`/dashboard/groups/${res.data._id}`);
        } catch (err: any) {
            console.error("Failed to create group", err);
            setError(err.response?.data?.error || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8 max-w-2xl mx-auto flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </Link>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl shadow-2xl">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Users size={200} />
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

                    <div className="relative">
                        <div className="mb-8">
                            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                                    Create Group
                                </span>
                                <Sparkles className="text-yellow-400" size={24} />
                            </h1>
                            <p className="text-gray-400">Start a new study circle, project team, or interest group.</p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Group Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. React Learners, Night Owls..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-white placeholder-gray-600"
                                    autoFocus
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="What is this group about? Who should join?"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 h-32 resize-none focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-white placeholder-gray-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1 flex items-center gap-2">
                                    <Tag size={14} />
                                    Tags (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="e.g. javascript, beginners, project"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-white placeholder-gray-600"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Creating Group...
                                    </>
                                ) : (
                                    <>
                                        <Users size={20} />
                                        Create Group
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
