import Link from "next/link";
import { posts, CATEGORIES } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — CiberPME",
  description:
    "Artigos sobre ciberseguranca para pequenas e medias empresas portuguesas. Ameacas, boas praticas, ferramentas e legislacao RGPD.",
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
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-brand">
          CiberPME
        </Link>
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <Link href="/blog" className="text-brand font-bold">
            Blog
          </Link>
          <Link href="/faq" className="hover:text-brand transition">
            FAQ
          </Link>
          <Link href="/recursos" className="hover:text-brand transition">
            Recursos
          </Link>
          <Link href="/#sobre" className="hover:text-brand transition">
            Sobre
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-brand mb-4">Blog</h1>
        <p className="text-text-secondary mb-8">
          Artigos praticos sobre ciberseguranca para proteger o seu negocio.
        </p>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/blog"
            className={`px-3 py-1.5 text-sm rounded-full border transition ${
              !categoria
                ? "bg-accent text-white border-accent"
                : "border-border text-text-secondary hover:border-accent"
            }`}
          >
            Todos
          </Link>
          {Object.entries(CATEGORIES).map(([key, label]) => (
            <Link
              key={key}
              href={`/blog?categoria=${key}`}
              className={`px-3 py-1.5 text-sm rounded-full border transition ${
                categoria === key
                  ? "bg-accent text-white border-accent"
                  : "border-border text-text-secondary hover:border-accent"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Article list */}
        {filtered.length === 0 ? (
          <p className="text-text-muted">
            Nenhum artigo encontrado nesta categoria.
          </p>
        ) : (
          <div className="space-y-6">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-6 rounded-xl border border-border hover:border-accent hover:shadow-sm transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-block px-2 py-0.5 text-xs font-medium text-accent bg-accent-light rounded-full">
                    {post.categoryLabel}
                  </span>
                  <span className="text-xs text-text-muted">
                    {post.readingTime} min de leitura
                  </span>
                </div>
                <h2 className="text-lg font-bold text-brand mb-2 group-hover:text-accent transition">
                  {post.title}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-brand">CiberPME</span>
          <div className="flex gap-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-brand transition">
              Inicio
            </Link>
            <Link href="/blog" className="hover:text-brand transition">
              Blog
            </Link>
            <Link href="/faq" className="hover:text-brand transition">
              FAQ
            </Link>
            <Link href="/recursos" className="hover:text-brand transition">
              Recursos
            </Link>
          </div>
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} CiberPME
          </p>
        </div>
      </footer>
    </div>
  );
}
