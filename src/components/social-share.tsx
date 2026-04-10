"use client";

import { useState } from "react";

interface SocialShareProps {
  title: string;
  url: string;
  description: string;
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-text-secondary">
        Partilhar:
      </span>
      <div className="flex items-center gap-2">
        {/* LinkedIn Share */}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-accent-light hover:border-accent hover:text-accent transition-all duration-200"
          aria-label="Partilhar no LinkedIn"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>

        {/* X (Twitter) Share */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-accent-light hover:border-accent hover:text-accent transition-all duration-200"
          aria-label="Partilhar no X"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4l11.733 16h4.267l-11.733-16z" />
            <path d="M6.267 4.611l11.733 16" />
          </svg>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-accent-light hover:border-accent hover:text-accent transition-all duration-200"
          aria-label={copied ? "Link copiado!" : "Copiar link"}
        >
          {copied ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
        </button>
      </div>

      {copied && (
        <span className="text-xs text-accent font-medium">
          Link copiado!
        </span>
      )}
    </div>
  );
}