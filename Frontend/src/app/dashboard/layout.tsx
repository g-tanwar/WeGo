"use client";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen text-white">
            <Navbar />
            <main className="pt-16 min-h-screen">
                {children}
            </main>
        </div>
    );
}
