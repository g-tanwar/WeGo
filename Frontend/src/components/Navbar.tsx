"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Users, BookOpen } from "lucide-react";
import ProfileButton from "./ProfileButton";
import NotificationBell from "./NotificationBell";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { href: "/dashboard", label: "City Center", icon: Home },
        { href: "/dashboard/doubts", label: "Doubt Board", icon: MessageCircle },
        { href: "/dashboard/groups", label: "Study Groups", icon: Users },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-xl border-b border-white/10 z-40">
            <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        WEGO
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                                    ? "bg-white/10 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon size={16} />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <NotificationBell />
                    <div className="hidden md:flex items-center gap-4">
                        <div className="w-px h-6 bg-white/10 mx-2" />
                        <ProfileButton />
                    </div>
                    <button
                        className="md:hidden p-2 text-gray-400"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="p-4 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-all ${pathname === item.href
                                        ? "bg-white/10 text-white"
                                        : "text-gray-400"
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-4 mt-4 border-t border-white/10">
                                <ProfileButton />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
