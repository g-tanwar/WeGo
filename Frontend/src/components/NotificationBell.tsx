"use client";
import { useState, useEffect, useRef } from "react";
import { Bell, Check, ExternalLink } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
    _id: string;
    sender: { _id: string; username: string };
    type: 'answer' | 'upvote' | 'join';
    content: string;
    link: string;
    read: boolean;
    createdAt: string;
}

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        fetchNotifications();
        // Set up polling (every 30 seconds) or use sockets if available
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await api.get("/notifications");
            setNotifications(res.data);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await api.post(`/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error(err);
        }
    };

    const markAllRead = async () => {
        try {
            await api.post("/notifications/read-all");
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error(err);
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'answer': return '📝';
            case 'upvote': return '👍';
            case 'join': return '👥';
            case 'mention': return '@';
            default: return '🔔';
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
                <Bell size={20} className={unreadCount > 0 ? "text-purple-400" : "text-gray-400"} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <h3 className="font-bold">Notifications</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllRead}
                                    className="text-xs text-purple-400 hover:text-purple-300 font-medium"
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {notifications.map((n) => (
                                        <div
                                            key={n._id}
                                            className={`p-4 hover:bg-white/5 transition-colors relative group ${!n.read ? 'bg-purple-500/5' : ''}`}
                                        >
                                            <Link
                                                href={n.link}
                                                onClick={() => {
                                                    markAsRead(n._id);
                                                    setShowDropdown(false);
                                                }}
                                                className="flex gap-3"
                                            >
                                                <div className="text-xl shrink-0 mt-1">
                                                    {getTypeIcon(n.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-gray-200">
                                                        <span className="font-bold text-white">{n.sender?.username}</span> {n.content}
                                                    </p>
                                                    <span className="text-[10px] text-gray-500 mt-1 block">
                                                        {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </Link>
                                            {!n.read && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        markAsRead(n._id);
                                                    }}
                                                    className="absolute top-4 right-4 p-1 rounded-full opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-white/20 transition-all"
                                                >
                                                    <Check size={12} className="text-green-400" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center text-gray-500">
                                    <Bell size={32} className="mx-auto mb-2 opacity-20" />
                                    <p className="text-sm">No notifications yet</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
