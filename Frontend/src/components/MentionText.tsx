import Link from 'next/link';

interface MentionTextProps {
    text: string;
    className?: string;
}

export default function MentionText({ text, className = "" }: MentionTextProps) {
    if (!text) return null;

    // Split text by @username (keeping the @username in the split result)
    // Regex: /(@\w+)/g
    const parts = text.split(/(@\w+)/g);

    return (
        <span className={className}>
            {parts.map((part, index) => {
                if (part.startsWith('@') && part.length > 1) {
                    const username = part.substring(1);
                    return (
                        <Link
                            key={index}
                            href={`/dashboard/profile/${username}`}
                            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                        >
                            {part}
                        </Link>
                    );
                }
                return <span key={index}>{part}</span>;
            })}
        </span>
    );
}
