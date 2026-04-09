import Link from "next/link";
import { posts, CATEGORIES } from "@/lib/posts";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ categoria: string }>;
}

// Generate static params for all valid categories
export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((categoria) => ({
    categoria,
  }));
}

// Generate metadata for each category
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;

  if (!CATEGORIES[categoria]) {
    return {};
  }

  const categoryLabel = CATEGORIES[categoria];
  const categoryPosts = posts.filter((p) => p.category === categoria);
  const postCount = categoryPosts.length;

  const title = `${categoryLabel} — Blog CiberPME`;
  const description = getCategoryDescription(categoria, postCount);

  return {
    title,
    description,
    alternates: {
      canonical: `https://ciberpme.vercel.app/blog/categoria/${categoria}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://ciberpme.vercel.app/blog/categoria/${categoria}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(categoryLabel)}`,
          width: 1200,
          height: 630,
          alt: `${categoryLabel} - CiberPME`,
        },
      ],
    },
  };
}

function getCategoryDescription(categoria: string, postCount: number): string {
  const descriptions = {
    ameacas: `Artigos sobre ameaças de cibersegurança que afetam as PMEs portuguesas. ${postCount} artigos sobre malware, ransomware, phishing e outras ameaças digitais.`,
    legislacao: `Guias sobre legislação de cibersegurança e proteção de dados. ${postCount} artigos sobre RGPD, NIS2 e compliance para empresas portuguesas.`,
    "boas-praticas": `Boas práticas de cibersegurança para implementar na sua PME. ${postCount} artigos com conselhos práticos para proteger o seu negócio.`,
    ferramentas: `Ferramentas de cibersegurança recomendadas para pequenas e médias empresas. ${postCount} artigos sobre software e soluções de segurança.`,
  };

  return descriptions[categoria as keyof typeof descriptions] ||
    `Artigos de cibersegurança sobre ${categoria}. ${postCount} artigos para proteger a sua PME.`;
}

function getCategoryIcon(categoria: string) {
  const icons = {
    ameacas: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    legislacao: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0-1.125.504 1.125 1.125V5.625c0-.621-.504-1.125-1.125-1.125H16.5a1.125 1.125 0 0 0-1.125 1.125v1.5h2.25a1.125 1.125 0 0 1 1.125 1.125V8.25M10.5 2.25H8.625C7.504 2.25 6.625 3.129 6.625 4.25v1.5h2.25c.621 0 1.125.504 1.125 1.125V8.25M10.5 2.25c.621 0 1.125.504 1.125 1.125v1.5H8.625" />
      </svg>
    ),
    "boas-praticas": (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    ferramentas: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  };

  return icons[categoria as keyof typeof icons] || icons.ferramentas;
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params;

  if (!CATEGORIES[categoria]) {
    notFound();
  }

  const categoryLabel = CATEGORIES[categoria];
  const categoryPosts = posts.filter((p) => p.category === categoria);

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
            <Link href="/blog" className="hover:text-brand transition">
              Blog
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
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            {getCategoryIcon(categoria)}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 text-balance font-display tracking-tight">
            {categoryLabel}
          </h1>
          <p className="text-text-secondary text-pretty max-w-2xl mx-auto">
            {getCategoryDescription(categoria, categoryPosts.length).split('.')[0]}.
          </p>
        </div>

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-text-secondary">
            <li><Link href="/" className="hover:text-brand transition">Início</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blog" className="hover:text-brand transition">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-brand font-medium">{categoryLabel}</li>
          </ol>
        </nav>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/blog"
            className="px-3 py-2.5 text-sm rounded-full border border-border text-text-secondary hover:border-accent transition"
          >
            Todos
          </Link>
          {Object.entries(CATEGORIES).map(([key, label]) => (
            <Link
              key={key}
              href={`/blog/categoria/${key}`}
              aria-current={categoria === key ? "page" : undefined}
              className={`px-3 py-2.5 text-sm rounded-full border transition ${
                categoria === key
                  ? "bg-accent text-white border-accent"
                  : "border-border text-text-secondary hover:border-accent"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Articles */}
        {categoryPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted mb-4">
              Ainda não há artigos nesta categoria.
            </p>
            <Link
              href="/blog"
              className="text-accent hover:underline transition"
            >
              Ver todos os artigos
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-text-secondary">
                {categoryPosts.length} artigo{categoryPosts.length !== 1 ? 's' : ''} em {categoryLabel}
              </p>
            </div>

            <div className="space-y-6">
              {categoryPosts.map((post) => (
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
                  <h2 className="text-lg font-bold text-brand mb-2 group-hover:text-accent transition text-balance font-display">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed text-pretty">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}