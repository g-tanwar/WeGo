"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function CreateDoubt() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Split tags by comma and trim whitespace
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

            await api.post("/doubts", {
                title: formData.title,
                description: formData.description,
                tags: tagsArray
            });

            router.push("/dashboard/doubts");
        } catch (error) {
            console.error("Failed to create doubt", error);
            // Ideally show a toast notification here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8 max-w-3xl mx-auto flex flex-col justify-center">
            <Link href="/dashboard/doubts" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft size={20} />
                Back to Board
            </Link>

            <div className="bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                        Ask the Community
                    </h1>
                    <p className="text-gray-400">Describe your doubt clearly to get the best answers.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. How do I center a div in CSS?"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-lg placeholder:text-gray-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Description</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Provide details, code snippets, or context..."
                            rows={6}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none placeholder:text-gray-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Tags</label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            placeholder="e.g. css, html, flexbox (comma separated)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm placeholder:text-gray-600"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Publishing...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Post Doubt
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
