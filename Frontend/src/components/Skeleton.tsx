"use client";

interface SkeletonProps {
    className?: string;
    variant?: "rect" | "circle" | "text";
}

export function Skeleton({ className = "", variant = "rect" }: SkeletonProps) {
    const baseClasses = "animate-pulse bg-white/5";
    const variantClasses = {
        rect: "rounded-lg",
        circle: "rounded-full",
        text: "rounded h-4 w-full",
    };

    return (
        <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between">
                <Skeleton variant="circle" className="w-10 h-10" />
                <Skeleton className="w-20 h-4" />
            </div>
            <Skeleton className="w-3/4 h-6" />
            <div className="space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-5/6 h-4" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="w-16 h-6 rounded-full" />
                <Skeleton className="w-16 h-6 rounded-full" />
            </div>
        </div>
    );
}

export function DoubtSkeleton() {
    return (
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
                <Skeleton variant="rect" className="w-16 h-6 rounded-md" />
                <Skeleton variant="text" className="w-24" />
            </div>
            <Skeleton variant="text" className="h-8 w-3/4" />
            <div className="flex gap-2 mt-3">
                <Skeleton className="w-14 h-5 rounded-full" />
                <Skeleton className="w-14 h-5 rounded-full" />
            </div>
        </div>
    );
}
