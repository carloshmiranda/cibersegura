import Link from "next/link";
import { posts, CATEGORIES } from "@/lib/posts";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import { BlogContent } from "@/components/blog-content";

export const metadata: Metadata = {
  title: "Blog — CiberPME",
  description:
    "Artigos sobre cibersegurança para pequenas e médias empresas portuguesas. Ameaças, boas práticas, ferramentas e legislação RGPD.",
  alternates: {
    canonical: "https://ciberpme.vercel.app/blog",
  },
  openGraph: {
    title: "Blog — CiberPME",
    description:
      "Artigos sobre cibersegurança para pequenas e médias empresas portuguesas. Ameaças, boas práticas, ferramentas e legislação RGPD.",
    type: "website",
    url: "https://ciberpme.vercel.app/blog",
    images: [
      {
        url: "/api/og?title=Blog%20de%20Cibersegurança",
        width: 1200,
        height: 630,
        alt: "Blog de Cibersegurança - CiberPME",
      },
    ],
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const filtered = categoria
    ? posts.filter((p) => p.category === categoria)
    : posts;

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <header>
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-brand">
            CiberPME
          </Link>
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <Link href="/recursos" className="hover:text-brand transition">
              Recursos
            </Link>
            <Link href="/blog" className="text-brand font-bold" aria-current="page">
              Blog
            </Link>
            <Link href="/ferramentas" className="hover:text-brand transition">
              Ferramentas
            </Link>
            <Link href="/faq" className="hover:text-brand transition">
              FAQ
            </Link>
            <Link href="/#sobre" className="hover:text-brand transition">
              Sobre
            </Link>
          </div>
        </nav>
      </header>

      <main id="main-content" className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 text-balance font-display tracking-tight">Blog</h1>
        <p className="text-text-secondary mb-8 text-pretty">
          Artigos práticos sobre cibersegurança para proteger o seu negócio.
        </p>

        <BlogContent
          allPosts={posts}
          initialPosts={filtered}
          categories={CATEGORIES}
          selectedCategory={categoria}
        />
      </main>

      <Footer />
    </div>
  );
}
