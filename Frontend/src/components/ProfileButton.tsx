"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function ProfileButton() {
    const [user, setUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            setUser(JSON.parse(userStr));
        }
    }, []);

    if (!user) return null;

    return (
        <Link href={`/dashboard/profile/${user.username}`}>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10 group cursor-pointer">
                <div className="text-right hidden md:block">
                    <div className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                        {user.username}
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold border-2 border-transparent group-hover:border-purple-400 transition-all shadow-lg shadow-purple-500/20">
                    {user.username[0].toUpperCase()}
                </div>
            </div>
        </Link>
    );
}
