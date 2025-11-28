'use client';

import { useState } from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaLink, FaCheck } from 'react-icons/fa';

export default function ShareButtons({ title, slug }) {
    const [copied, setCopied] = useState(false);

    // Construct full URL (assuming site URL is known or using window.location in effect, 
    // but for SSR safety we might want to pass the base URL or just use relative if we handle it carefully.
    // Ideally, we should have the full URL. For now, I'll use window.location.origin if available, or a placeholder)
    // Actually, better to just use the slug and let the click handler construct it or use a prop.
    // Let's assume we want to share the current page.

    const getShareUrl = () => {
        if (typeof window !== 'undefined') {
            return `${window.location.origin}/posts/${slug}`;
        }
        return '';
    };

    const shareLinks = [
        {
            name: 'Twitter',
            icon: FaTwitter,
            color: 'hover:text-[#1DA1F2]',
            action: () => {
                const url = getShareUrl();
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
            }
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            color: 'hover:text-[#0A66C2]',
            action: () => {
                const url = getShareUrl();
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
            }
        },
        {
            name: 'Facebook',
            icon: FaFacebook,
            color: 'hover:text-[#1877F2]',
            action: () => {
                const url = getShareUrl();
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            }
        }
    ];

    const handleCopy = async () => {
        const url = getShareUrl();
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex items-center gap-4 py-6 border-t border-white/10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <span className="text-text-muted font-medium text-sm uppercase tracking-wider">Share</span>
            <div className="flex gap-3">
                {shareLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={link.action}
                        className={`p-2 rounded-full bg-surface/50 border border-white/10 text-text-muted transition-all duration-300 hover:scale-110 hover:bg-white/10 ${link.color}`}
                        aria-label={`Share on ${link.name}`}
                    >
                        <link.icon size={18} />
                    </button>
                ))}

                <button
                    onClick={handleCopy}
                    className="p-2 rounded-full bg-surface/50 border border-white/10 text-text-muted transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:text-primary relative"
                    aria-label="Copy Link"
                >
                    {copied ? <FaCheck size={18} className="text-green-500" /> : <FaLink size={18} />}

                    {copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black/80 text-white px-2 py-1 rounded shadow-lg whitespace-nowrap animate-fade-in">
                            Copied!
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
