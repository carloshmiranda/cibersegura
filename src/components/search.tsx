"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  highlightedTitle: string;
  highlightedExcerpt: string;
}

interface SearchProps {
  className?: string;
  placeholder?: string;
  showDropdown?: boolean;
  fullWidth?: boolean;
}

export function Search({
  className = "",
  placeholder = "Procurar artigos...",
  showDropdown = true,
  fullWidth = false
}: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.ok) {
          setResults(data.data.results);
          setShowResults(showDropdown && data.data.results.length > 0);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, showDropdown]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!showResults || results.length === 0) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          event.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            router.push(`/blog/${results[selectedIndex].slug}`);
            setShowResults(false);
            setQuery("");
            inputRef.current?.blur();
          } else if (query.length >= 2) {
            // Go to search results page
            router.push(`/pesquisa?q=${encodeURIComponent(query)}`);
            setShowResults(false);
          }
          break;
        case "Escape":
          setShowResults(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showResults, results, selectedIndex, query, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length >= 2) {
      router.push(`/pesquisa?q=${encodeURIComponent(query)}`);
      setShowResults(false);
      setQuery("");
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={searchRef} className={`relative ${fullWidth ? "w-full" : "w-80"} ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (results.length > 0 && showDropdown) {
                setShowResults(true);
              }
            }}
            placeholder={placeholder}
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-bg text-text placeholder-text-secondary"
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
            </div>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && showDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-bg border border-border rounded-lg shadow-md max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-text-secondary mb-2">
              {results.length} resultado{results.length !== 1 ? 's' : ''} para "{query}"
            </div>
            {results.map((result, index) => (
              <Link
                key={result.slug}
                href={`/blog/${result.slug}`}
                onClick={() => {
                  setShowResults(false);
                  setQuery("");
                }}
                className={`block p-3 rounded-lg transition-colors ${
                  selectedIndex === index
                    ? "bg-accent-light"
                    : "hover:bg-bg-subtle"
                }`}
              >
                <div
                  className="font-medium text-sm text-brand mb-1 line-clamp-1"
                  dangerouslySetInnerHTML={{ __html: result.highlightedTitle }}
                />
                <div
                  className="text-xs text-text-secondary line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: result.highlightedExcerpt }}
                />
                <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
                  <span className="px-2 py-1 bg-bg-subtle rounded-full">
                    {result.category}
                  </span>
                  <span>{result.readingTime} min leitura</span>
                </div>
              </Link>
            ))}
          </div>
          {results.length >= 20 && (
            <div className="p-2 border-t border-border bg-bg-subtle">
              <button
                onClick={handleSubmit}
                className="text-xs text-accent hover:underline"
              >
                Ver todos os resultados para "{query}"
              </button>
            </div>
          )}
        </div>
      )}

      {/* No results */}
      {showResults && results.length === 0 && query.length >= 2 && !isLoading && showDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-bg border border-border rounded-lg shadow-md">
          <div className="p-4 text-center text-text-secondary">
            <svg
              className="w-8 h-8 mx-auto mb-2 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <p className="text-sm">Nenhum artigo encontrado para "{query}"</p>
            <p className="text-xs text-text-muted mt-1">
              Tente usar termos diferentes ou mais gerais
            </p>
          </div>
        </div>
      )}

      {/* Mobile search hint */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        mark {
          background-color: var(--color-accent-light);
          color: var(--color-brand);
          padding: 0;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}