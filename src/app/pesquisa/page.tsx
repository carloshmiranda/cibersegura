import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "./search-results";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Pesquisa — CiberPME",
  description: "Pesquise artigos e recursos sobre cibersegurança para PMEs portuguesas. Encontre guias práticos, ameaças atuais e ferramentas de proteção.",
  robots: {
    index: false, // Don't index search pages
    follow: true,
  },
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Header currentPath="/pesquisa" />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand mb-4 font-display">
            Pesquisar Artigos
          </h1>
          <p className="text-text-secondary">
            Encontre recursos específicos sobre cibersegurança para a sua PME.
          </p>
        </div>

        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search box skeleton */}
      <div className="h-12 bg-bg-subtle animate-pulse rounded-lg"></div>

      {/* Results skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 border border-border rounded-lg bg-bg">
            <div className="h-6 bg-bg-subtle animate-pulse rounded mb-3"></div>
            <div className="h-4 bg-bg-subtle animate-pulse rounded mb-2"></div>
            <div className="h-4 bg-bg-subtle animate-pulse rounded w-2/3 mb-3"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-bg-subtle animate-pulse rounded w-20"></div>
              <div className="h-6 bg-bg-subtle animate-pulse rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}