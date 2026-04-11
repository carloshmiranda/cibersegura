"use client";

import { useState, useEffect, useMemo } from "react";
import type { Post } from "@/lib/posts";

interface BlogSearchProps {
  posts: Post[];
  onFilteredPosts: (posts: Post[]) => void;
  selectedCategory?: string;
}

export function BlogSearch({ posts, onFilteredPosts, selectedCategory }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize the filtering logic to avoid duplication
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesSearch = !searchTerm ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchTerm]);

  useEffect(() => {
    onFilteredPosts(filteredPosts);
  }, [filteredPosts, onFilteredPosts]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Pesquisar artigos de cibersegurança..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-12 bg-bg border border-border rounded-lg focus:outline-none focus:border-accent transition"
          aria-label="Pesquisar artigos"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
      {searchTerm && (
        <p className="mt-2 text-sm text-text-secondary">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
        </p>
      )}
    </div>
  );
}