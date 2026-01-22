"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { LayoutGrid, Users, MapPin } from "lucide-react";

interface District {
    _id: string;
    name: string;
    description: string;
    icon: string;
}

import ProfileButton from "@/components/ProfileButton";

export default function Dashboard() {
    const [districts, setDistricts] = useState<District[]>([]);

    useEffect(() => {
        api.get("/districts").then((res) => setDistricts(res.data)).catch(console.error);
    }, []);

    return (
        <div className="min-h-screen p-8 max-w-7xl mx-auto">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        City Center
                    </h1>
                    <p className="text-gray-400">Select a district to visit</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/doubts">
                        <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
                            Doubt Board
                        </button>
                    </Link>
                    <Link href="/dashboard/groups">
                        <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
                            Study Groups
                        </button>
                    </Link>
                    <ProfileButton />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {districts.map((d, i) => (
                    <motion.div
                        key={d._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link href={`/dashboard/district/${d._id}`}>
                            <div className="group h-full bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all rounded-2xl p-6 cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <MapPin />
                                </div>
                                <div className="text-4xl mb-4">{d.icon || "🏙️"}</div>
                                <h3 className="text-2xl font-bold mb-2">{d.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{d.description}</p>
                                <div className="flex items-center gap-2 text-xs text-primary font-medium uppercase tracking-wider">
                                    <Users size={14} />
                                    <span>Enter District</span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
