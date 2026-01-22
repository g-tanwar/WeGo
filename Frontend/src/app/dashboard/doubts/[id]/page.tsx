"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, MessageCircle, ArrowBigUp, Tag, Send, User } from "lucide-react";
import { motion } from "framer-motion";

interface Answer {
    _id: string;
    content: string;
    author: {
        username: string;
    };
    upvotes: string[];
    createdAt: string;
}

interface Doubt {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    upvotes: string[];
    answers: Answer[];
    createdAt: string;
    author: {
        username: string;
    };
}

export default function DoubtDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [doubt, setDoubt] = useState<Doubt | null>(null);
    const [loading, setLoading] = useState(true);
    const [answerInput, setAnswerInput] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        // Load user from local storage
        const userStr = localStorage.getItem("user");
        if (userStr) setCurrentUser(JSON.parse(userStr));

        if (id) fetchDoubt();
    }, [id]);

    const fetchDoubt = async () => {
        try {
            const res = await api.get(`/doubts/${id}`);
            // Ensure answers have upvotes array even if missing from older records
            const data = res.data;
            if (data.answers) {
                data.answers = data.answers.map((a: any) => ({ ...a, upvotes: a.upvotes || [] }));
            }
            setDoubt(data);
        } catch (error) {
            console.error("Failed to fetch doubt", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpvote = async () => {
        if (!doubt) return;
        try {
            // Optimistic update
            const isUpvoted = doubt.upvotes.includes(currentUser?.id);
            const newUpvotes = isUpvoted
                ? doubt.upvotes.filter(uid => uid !== currentUser?.id)
                : [...doubt.upvotes, currentUser?.id];

            setDoubt({ ...doubt, upvotes: newUpvotes });

            await api.post(`/doubts/${id}/upvote`);
        } catch (error) {
            console.error("Failed to upvote", error);
        }
    };

    const handleAnswerUpvote = async (answerId: string) => {
        if (!doubt || !currentUser) return;
        try {
            // Optimistic update
            const updatedAnswers = doubt.answers.map(ans => {
                if (ans._id === answerId) {
                    const isUpvoted = ans.upvotes.includes(currentUser.id);
                    const newUpvotes = isUpvoted
                        ? ans.upvotes.filter(uid => uid !== currentUser.id)
                        : [...ans.upvotes, currentUser.id];
                    return { ...ans, upvotes: newUpvotes };
                }
                return ans;
            });

            setDoubt({ ...doubt, answers: updatedAnswers });

            await api.post(`/doubts/${id}/answers/${answerId}/upvote`);
        } catch (error) {
            console.error("Failed to upvote answer", error);
        }
    };

    const handlePostAnswer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!answerInput.trim()) return;

        setSubmitting(true);
        try {
            const res = await api.post(`/doubts/${id}/answer`, {
                content: answerInput
            });
            // Ensure compatibility with optimistic updates structure
            const data = res.data;
            if (data.answers) {
                data.answers = data.answers.map((a: any) => ({ ...a, upvotes: a.upvotes || [] }));
            }
            setDoubt(data);
            setAnswerInput("");
        } catch (error) {
            console.error("Failed to post answer", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );

    if (!doubt) return (
        <div className="min-h-screen flex items-center justify-center text-gray-400">
            Doubt not found.
        </div>
    );

    const isUpvoted = currentUser && doubt.upvotes.includes(currentUser.id);

    return (
        <div className="min-h-screen p-8 max-w-5xl mx-auto">
            <Link href="/dashboard/doubts" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft size={20} />
                Back to Board
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Doubt + Answers) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Perspective Decoration */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <MessageCircle size={100} />
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <Link href={`/dashboard/profile/${doubt.author.username}`}>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold hover:scale-105 transition-transform">
                                    {doubt.author.username[0].toUpperCase()}
                                </div>
                            </Link>
                            <div>
                                <Link href={`/dashboard/profile/${doubt.author.username}`} className="hover:underline hover:text-purple-300 transition-colors">
                                    <div className="font-semibold text-gray-200">{doubt.author.username}</div>
                                </Link>
                                <div className="text-xs text-gray-500">{new Date(doubt.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold mb-4 leading-tight">{doubt.title}</h1>
                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-6 text-lg">
                            {doubt.description}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {doubt.tags.map((tag, i) => (
                                <span key={i} className="flex items-center gap-1 text-xs text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
                                    <Tag size={12} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Answers Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span>{doubt.answers.length} Answers</span>
                            <span className="h-px flex-1 bg-white/10"></span>
                        </h3>

                        <div className="space-y-4">
                            {[...doubt.answers].sort((a, b) => {
                                const upvotesA = a.upvotes?.length || 0;
                                const upvotesB = b.upvotes?.length || 0;
                                if (upvotesA !== upvotesB) return upvotesB - upvotesA;
                                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                            }).map((answer, i) => {
                                const isAnsUpvoted = currentUser && answer.upvotes.includes(currentUser.id);
                                return (
                                    <motion.div
                                        key={answer._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-black/40 border border-white/5 rounded-2xl p-6"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex flex-col items-center gap-1">
                                                <button
                                                    onClick={() => handleAnswerUpvote(answer._id)}
                                                    className={`p-1.5 rounded-full transition-all ${isAnsUpvoted ? 'bg-primary/20 text-primary' : 'text-gray-500 hover:bg-white/10 hover:text-gray-300'}`}
                                                >
                                                    <ArrowBigUp size={24} className={isAnsUpvoted ? 'fill-current' : ''} />
                                                </button>
                                                <span className={`text-sm font-bold ${isAnsUpvoted ? 'text-primary' : 'text-gray-500'}`}>{answer.upvotes.length || 0}</span>
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-start gap-3">
                                                    <Link href={`/dashboard/profile/${answer.author.username}`}>
                                                        <div className="mt-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs shrink-0 hover:bg-purple-600 transition-colors">
                                                            {answer.author.username[0].toUpperCase()}
                                                        </div>
                                                    </Link>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <Link href={`/dashboard/profile/${answer.author.username}`} className="hover:underline">
                                                                <span className="font-semibold text-sm text-gray-300 hover:text-purple-300 transition-colors">
                                                                    @{answer.author.username}
                                                                </span>
                                                            </Link>
                                                            <span className="text-xs text-gray-600">
                                                                {new Date(answer.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-400 leading-relaxed">
                                                            {answer.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}

                            {doubt.answers.length === 0 && (
                                <div className="text-center py-10 text-gray-500 border border-dashed border-white/10 rounded-2xl">
                                    No answers yet. Be the first to help!
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar (Actions) */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Upvote Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
                        <span className="text-gray-400 mb-4 text-sm">Was this doubt clear/helpful?</span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleUpvote}
                                className={`flex flex-col items-center gap-1 group transition-all transform active:scale-95`}
                            >
                                <div className={`p-4 rounded-full transition-all ${isUpvoted ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}>
                                    <ArrowBigUp size={32} className={isUpvoted ? 'fill-current' : ''} />
                                </div>
                            </button>
                        </div>
                        <div className="mt-4 text-2xl font-black">{doubt.upvotes.length}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Upvotes</div>
                    </div>

                    {/* Answer Form */}
                    <div className="bg-gradient-to-b from-purple-900/20 to-black border border-purple-500/20 rounded-2xl p-6 sticky top-8">
                        <h3 className="font-bold mb-4">Know the answer?</h3>
                        <form onSubmit={handlePostAnswer} className="space-y-4">
                            <textarea
                                value={answerInput}
                                onChange={(e) => setAnswerInput(e.target.value)}
                                placeholder="Type your solution here..."
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 min-h-[150px] focus:outline-none focus:border-purple-500/50 transition-colors text-sm resize-none"
                            />
                            <button
                                type="submit"
                                disabled={submitting || !answerInput.trim()}
                                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                                Post Answer
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
