"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "@/components/search";

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

export function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data.ok) {
        setResults(data.data.results);
        setHasSearched(true);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Search on initial load if query exists
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  // Handle search submission
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    performSearch(searchQuery);

    // Update URL without page reload
    const url = new URL(window.location.href);
    if (searchQuery) {
      url.searchParams.set("q", searchQuery);
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState({}, "", url.toString());
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-PT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const searchQuery = formData.get("q") as string;
            handleSearch(searchQuery);
          }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
              name="q"
              type="text"
              defaultValue={query}
              placeholder="Procurar artigos sobre cibersegurança..."
              className="block w-full pl-12 pr-4 py-3 text-lg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-bg text-text placeholder-text-secondary"
              autoFocus
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-accent transition"
            >
              <span className="sr-only">Pesquisar</span>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-text-secondary">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
            <span>A pesquisar...</span>
          </div>
        </div>
      )}

      {/* Results */}
      {!isLoading && hasSearched && (
        <div>
          <div className="mb-6">
            <h2 className="text-lg font-bold text-brand mb-2">
              {results.length > 0
                ? `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`
                : "Nenhum resultado encontrado"
              }
            </h2>
            {query && (
              <p className="text-text-secondary">
                {results.length > 0
                  ? `Resultados para "${query}"`
                  : `Nenhum artigo encontrado para "${query}"`
                }
              </p>
            )}
          </div>

          {results.length > 0 ? (
            <div className="space-y-6">
              {results.map((result) => (
                <article
                  key={result.slug}
                  className="p-6 border border-border rounded-lg hover:border-accent hover:shadow-sm transition bg-bg"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-brand mb-2 hover:text-accent transition">
                          <Link
                            href={`/blog/${result.slug}`}
                            dangerouslySetInnerHTML={{ __html: result.highlightedTitle }}
                          />
                        </h3>
                        <div
                          className="text-text-secondary leading-relaxed mb-4"
                          dangerouslySetInnerHTML={{ __html: result.highlightedExcerpt }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                      <span className="px-3 py-1 bg-bg-subtle text-brand rounded-full font-medium">
                        {result.category}
                      </span>
                      <span>{result.readingTime} min leitura</span>
                      <span>{formatDate(result.publishedAt)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : hasSearched && query && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-text-muted"
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
              <h3 className="text-lg font-bold text-brand mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-text-secondary mb-6">
                Não encontrámos artigos que correspondam aos termos "{query}".
              </p>
              <div className="bg-bg-subtle rounded-lg p-6 text-left max-w-md mx-auto">
                <h4 className="font-bold text-brand mb-3">Sugestões:</h4>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li>• Verifique a ortografia dos termos de pesquisa</li>
                  <li>• Tente usar termos mais gerais ou sinónimos</li>
                  <li>• Use menos palavras-chave</li>
                  <li>• Explore as nossas categorias principais:</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Link
                    href="/blog?categoria=ameacas"
                    className="px-3 py-1 bg-accent-light text-accent text-sm rounded-full hover:bg-accent hover:text-white transition"
                  >
                    Ameaças
                  </Link>
                  <Link
                    href="/blog?categoria=boas-praticas"
                    className="px-3 py-1 bg-accent-light text-accent text-sm rounded-full hover:bg-accent hover:text-white transition"
                  >
                    Boas Práticas
                  </Link>
                  <Link
                    href="/blog?categoria=ferramentas"
                    className="px-3 py-1 bg-accent-light text-accent text-sm rounded-full hover:bg-accent hover:text-white transition"
                  >
                    Ferramentas
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Initial State - No search performed yet */}
      {!hasSearched && !isLoading && (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-text-muted"
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
          <h3 className="text-lg font-bold text-brand mb-2">
            Pesquise nos nossos artigos
          </h3>
          <p className="text-text-secondary mb-6">
            Temos mais de 120 artigos sobre cibersegurança para PMEs. <br />
            Use a caixa de pesquisa para encontrar o que procura.
          </p>
          <div className="bg-bg-subtle rounded-lg p-6 max-w-md mx-auto">
            <h4 className="font-bold text-brand mb-3">Pesquisas populares:</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "phishing",
                "ransomware",
                "passwords",
                "RGPD",
                "backup",
                "firewall",
                "Microsoft 365",
                "NIS2"
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-3 py-1 bg-accent-light text-accent text-sm rounded-full hover:bg-accent hover:text-white transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        mark {
          background-color: var(--color-accent-light);
          color: var(--color-brand);
          padding: 0 2px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}