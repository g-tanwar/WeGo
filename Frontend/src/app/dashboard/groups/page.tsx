"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Plus,
  Tag,
  Search,
  ArrowRight,
} from "lucide-react";
import ProfileButton from "@/components/ProfileButton";

interface Group {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  members: { username: string }[];
}

export default function GroupsList() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ FIX

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await api.get("/groups");
        setGroups(res.data || []);
      } catch (err) {
        console.error("Failed to load groups", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const filteredGroups = groups.filter(
    (g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Study Groups
          </h1>
          <p className="text-gray-400 mt-2">
            Find your tribe. Learn together.
          </p>
        </div>

        <div className="flex gap-4 w-full md:w-auto items-center flex-wrap">
          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Find groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 w-full text-sm focus:outline-none focus:border-purple-500/50"
            />
          </div>

          <Link href="/dashboard/groups/new">
            <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-xl font-medium hover:scale-105 transition">
              <Plus size={18} />
              Create Group
            </button>
          </Link>

          <ProfileButton />
        </div>
      </header>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500" />
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
                <div className="h-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition cursor-pointer">
                  <div className="flex justify-between mb-4">
                    <Users className="text-purple-400" />
                    <span className="text-xs text-gray-400">
                      {group.members.length} members
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {group.name}
                  </h3>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {group.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {group.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/10"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-end text-purple-400">
                    <ArrowRight />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {filteredGroups.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
              No groups found. Create one 🚀
            </div>
          )}
        </div>
      )}
    </div>
  );
}
