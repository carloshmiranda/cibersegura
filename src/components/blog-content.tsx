"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogSearch } from "./blog-search";
import type { Post } from "@/lib/posts";

interface BlogContentProps {
  allPosts: Post[];
  initialPosts: Post[];
  categories: Record<string, string>;
  selectedCategory?: string;
}

export function BlogContent({ allPosts, initialPosts, categories, selectedCategory }: BlogContentProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);

  return (
    <>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/blog"
          aria-current={!selectedCategory ? "page" : undefined}
          className={`px-3 py-2.5 text-sm rounded-full border transition ${
            !selectedCategory
              ? "bg-accent text-white border-accent"
              : "border-border text-text-secondary hover:border-accent"
          }`}
        >
          Todos
        </Link>
        {Object.entries(categories).map(([key, label]) => (
          <Link
            key={key}
            href={`/blog/categoria/${key}`}
            aria-current={selectedCategory === key ? "page" : undefined}
            className={`px-3 py-2.5 text-sm rounded-full border transition ${
              selectedCategory === key
                ? "bg-accent text-white border-accent"
                : "border-border text-text-secondary hover:border-accent"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Search */}
      <div className="mb-10">
        <BlogSearch
          posts={allPosts}
          onFilteredPosts={setFilteredPosts}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Article list */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <svg
            aria-hidden="true"
            className="w-12 h-12 mx-auto mb-4 text-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c0 .621-.504 1.125-1.125 1.125H11.25a9 9 0 0 1-9-9V3.375c0-.621.504-1.125 1.125-1.125H3.75a9 9 0 0 1 9 9.375v.375"
            />
          </svg>
          <p className="text-text-secondary mb-2">
            Nenhum artigo encontrado
          </p>
          <p className="text-sm text-text-secondary">
            Tente alterar os termos de pesquisa ou remover filtros
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-6 rounded-xl border border-border hover:border-accent hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-accent bg-accent-light rounded-full">
                  {post.categoryLabel}
                </span>
                <span className="text-xs text-text-secondary">
                  {post.readingTime} min de leitura
                </span>
              </div>
              <h2 className="text-lg font-bold text-brand mb-2 group-hover:text-accent transition text-balance font-display">
                {post.title}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed text-pretty">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}