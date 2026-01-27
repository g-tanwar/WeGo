"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CldImage } from 'next-cloudinary';


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center space-y-8"
      >
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
          WEGO CITY
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
          The virtual metropolis for learners. Join district communities, attend town halls, and build your reputation.
        </p>

        <div className="flex gap-4 justify-center pt-8">
          <Link href="/auth/login" className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
            Enter City
          </Link>
          <Link href="/about" className="px-8 py-3 rounded-full border border-gray-700 hover:bg-white/5 transition-all">
            City Map
          </Link>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>
    </div>
  );
}
