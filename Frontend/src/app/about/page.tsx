import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
          City Map
        </h1>
        <p className="text-lg md:text-xl text-gray-400">
          WeGo City is built for learners to connect through district communities, ask doubts, and grow reputation through collaboration.
        </p>
        <p className="text-base text-gray-500">
          Enter the city, explore districts, and participate in town-hall style discussions to level up together.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex px-6 py-3 rounded-full border border-gray-700 hover:bg-white/5 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
