"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { motion } from "framer-motion";
import {
    User, MapPin, Calendar, Award, BookOpen,
    MessageCircle, Users, Edit2
} from "lucide-react";
import Link from "next/link";

interface UserProfile {
    _id: string;
    username: string;
    email: string;
    role: string;
    bio: string;
    skills: string[];
    createdAt: string;
    stats: {
        doubts: number;
        answers: number;
        groups: number;
        followers: number;
        following: number;
    };
    groups: {
        _id: string;
        name: string;
        description: string;
    }[];
    doubtsAsked: {
        _id: string;
        title: string;
        createdAt: string;
    }[];
    doubtsAnswered: {
        _id: string;
        title: string;
        createdAt: string;
    }[];
    followers: string[];
}

export default function UserProfile() {
    const { username } = useParams();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ bio: "", skills: "" });
    const [activeTab, setActiveTab] = useState<"groups" | "asked" | "answered">("groups");
    const [isFollowLoading, setIsFollowLoading] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) setCurrentUser(JSON.parse(userStr));

        if (username) fetchProfile();
    }, [username]);

    useEffect(() => {
        if (profile) {
            setEditForm({
                bio: profile.bio || "",
                skills: profile.skills ? profile.skills.join(", ") : ""
            });
        }
    }, [profile]);

    const fetchProfile = async () => {
        try {
            const res = await api.get(`/users/${username}`);
            setProfile(res.data);
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const skillsArray = editForm.skills.split(",").map(s => s.trim()).filter(s => s);
            const res = await api.put("/users/profile", {
                bio: editForm.bio,
                skills: skillsArray
            });
            // Update local state
            setProfile({ ...profile!, bio: res.data.bio, skills: res.data.skills });
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to update profile");
        }
    };

    const handleFollowToggle = async () => {
        if (!currentUser) return alert("Please login to follow");
        setIsFollowLoading(true);
        try {
            const isFollowing = profile?.followers.includes(currentUser.id);
            if (isFollowing) {
                await api.post(`/users/${profile?._id}/unfollow`);
                setProfile(prev => prev ? ({
                    ...prev,
                    followers: prev.followers.filter(id => id !== currentUser.id),
                    stats: { ...prev.stats, followers: prev.stats.followers - 1 }
                }) : null);
            } else {
                await api.post(`/users/${profile?._id}/follow`);
                setProfile(prev => prev ? ({
                    ...prev,
                    followers: [...prev.followers, currentUser.id],
                    stats: { ...prev.stats, followers: prev.stats.followers + 1 }
                }) : null);
            }
        } catch (error) {
            console.error("Follow action failed", error);
        } finally {
            setIsFollowLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );

    if (!profile) return (
        <div className="text-center py-20 text-gray-400">User not found</div>
    );

    const isOwnProfile = currentUser && currentUser.username === profile.username;

    return (
        <div className="min-h-screen p-8 max-w-6xl mx-auto">
            {/* Header / Cover */}
            <div className="relative mb-24">
                <div className="h-64 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Profile Card Overlay */}
                <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                    <div className="w-32 h-32 rounded-3xl bg-black border-4 border-black p-1">
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                            {profile.username[0].toUpperCase()}
                        </div>
                    </div>
                    <div className="mb-4">
                        <h1 className="text-3xl font-black text-white drop-shadow-lg flex items-center gap-3">
                            {profile.username}
                            <span className="text-sm font-medium px-3 py-1 bg-white/20 backdrop-blur rounded-full border border-white/10 uppercase tracking-widest">
                                {profile.role}
                            </span>
                        </h1>
                        <p className="text-gray-300 drop-shadow-md flex items-center gap-2 mt-1">
                            <Calendar size={14} />
                            Joined {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {isOwnProfile ? (
                    <div className="absolute bottom-4 right-8 flex gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-xl backdrop-blur transition-all border border-white/10"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all"
                                >
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur transition-all border border-white/10"
                            >
                                <Edit2 size={16} />
                                <span>Edit Profile</span>
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="absolute bottom-4 right-8">
                        <button
                            onClick={handleFollowToggle}
                            disabled={isFollowLoading}
                            className={`px-8 py-2 rounded-xl font-bold transition-all shadow-lg ${profile.followers.includes(currentUser?.id)
                                ? "bg-white/10 text-white border border-white/20 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
                                : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
                                }`}
                        >
                            {isFollowLoading ? "..." : profile.followers.includes(currentUser?.id) ? "Unfollow" : "Follow"}
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Info & Stats */}
                <div className="space-y-6">
                    {/* Bio */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <User size={18} className="text-purple-400" />
                            About
                        </h3>
                        {isEditing ? (
                            <textarea
                                value={editForm.bio}
                                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 h-32 text-gray-300 focus:outline-none focus:border-purple-500/50 resize-none"
                                placeholder="Tell us about yourself..."
                            />
                        ) : (
                            <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                                {profile.bio || "No bio added yet."}
                            </p>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <div className="text-2xl font-black text-white mb-1">{profile.stats.followers}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Followers</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <div className="text-2xl font-black text-white mb-1">{profile.stats.following}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Following</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <div className="text-2xl font-black text-white mb-1">{profile.stats.doubts}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Doubts Asked</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                            <div className="text-2xl font-black text-white mb-1">{profile.stats.answers}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Answers Given</div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Award size={18} className="text-pink-400" />
                            Skills
                        </h3>
                        {isEditing ? (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={editForm.skills}
                                    onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-gray-300 focus:outline-none focus:border-purple-500/50"
                                    placeholder="e.g. React, Node.js, Design"
                                />
                                <p className="text-xs text-gray-500">Comma separated</p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {profile.skills && profile.skills.length > 0 ? (
                                    profile.skills.map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-lg text-sm">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 text-sm">No skills listed.</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Content Tabs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit">
                        {[
                            { id: "groups", label: "Groups", icon: Users, color: "text-green-400" },
                            { id: "asked", label: "Asked", icon: MessageCircle, color: "text-purple-400" },
                            { id: "answered", label: "Answered", icon: BookOpen, color: "text-blue-400" }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? "bg-white/10 text-white shadow-lg"
                                    : "text-gray-500 hover:text-gray-300"
                                    }`}
                            >
                                <tab.icon size={16} className={activeTab === tab.id ? tab.color : ""} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 min-h-[400px]">
                        {activeTab === "groups" && (
                            <div className="space-y-4">
                                {profile.groups.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {profile.groups.map(group => (
                                            <Link key={group._id} href={`/dashboard/groups/${group._id}`}>
                                                <div className="bg-black/40 hover:bg-white/5 border border-white/5 rounded-2xl p-5 transition-all group h-full">
                                                    <h4 className="font-bold group-hover:text-purple-400 transition-colors mb-2">{group.name}</h4>
                                                    <p className="text-sm text-gray-400 line-clamp-2">{group.description}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                                        <Users size={48} className="opacity-20 mb-4" />
                                        <p>Not part of any groups yet.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "asked" && (
                            <div className="space-y-4">
                                {profile.doubtsAsked.length > 0 ? (
                                    profile.doubtsAsked.map(doubt => (
                                        <Link key={doubt._id} href={`/dashboard/doubts/${doubt._id}`}>
                                            <div className="bg-black/40 hover:bg-white/5 border border-white/5 rounded-2xl p-5 transition-all group flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-bold group-hover:text-purple-400 transition-colors mb-1">{doubt.title}</h4>
                                                    <p className="text-xs text-gray-500">{new Date(doubt.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <MessageCircle size={16} className="text-gray-600" />
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                                        <MessageCircle size={48} className="opacity-20 mb-4" />
                                        <p>Hasn't asked any doubts yet.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "answered" && (
                            <div className="space-y-4">
                                {profile.doubtsAnswered.length > 0 ? (
                                    profile.doubtsAnswered.map(doubt => (
                                        <Link key={doubt._id} href={`/dashboard/doubts/${doubt._id}`}>
                                            <div className="bg-black/40 hover:bg-white/5 border border-white/5 rounded-2xl p-5 transition-all group flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-bold group-hover:text-purple-400 transition-colors mb-1">{doubt.title}</h4>
                                                    <p className="text-xs text-gray-500">Answered on {new Date(doubt.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <BookOpen size={16} className="text-gray-600" />
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                                        <BookOpen size={48} className="opacity-20 mb-4" />
                                        <p>Hasn't answered any doubts yet.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
