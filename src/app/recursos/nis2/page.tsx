import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import { posts, CATEGORIES, type Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Recursos NIS2 — Guias e Artigos sobre a Diretiva de Cibersegurança",
  description:
    "Centro de recursos especializado em NIS2 para PMEs portuguesas. Artigos sobre legislação, ferramentas de conformidade, boas práticas e prazos da diretiva de cibersegurança europeia.",
  alternates: {
    canonical: "https://ciberpme.vercel.app/recursos/nis2",
  },
  openGraph: {
    title: "Recursos NIS2 — Guias e Artigos sobre a Diretiva de Cibersegurança",
    description:
      "Centro de recursos especializado em NIS2 para PMEs portuguesas. Artigos sobre legislação, ferramentas de conformidade, boas práticas e prazos da diretiva de cibersegurança europeia.",
    type: "website",
    url: "https://ciberpme.vercel.app/recursos/nis2",
    images: [
      {
        url: "/api/og?title=Recursos%20NIS2",
        width: 1200,
        height: 630,
        alt: "Recursos NIS2 para PMEs Portuguesas",
      },
    ],
  },
};

interface CategoryGroup {
  category: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  posts: Post[];
}

// Filter NIS2-related posts
const nis2Posts = posts.filter((post) =>
  post.slug.includes("nis2") ||
  post.title.toLowerCase().includes("nis2") ||
  post.content.toLowerCase().includes("nis2")
);

// Group posts by category
const groupedPosts = nis2Posts.reduce((acc, post) => {
  if (!acc[post.category]) {
    acc[post.category] = [];
  }
  acc[post.category].push(post);
  return acc;
}, {} as Record<string, Post[]>);

// Sort posts within each category by date (newest first)
Object.keys(groupedPosts).forEach((category) => {
  groupedPosts[category].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
});

const categoryData: CategoryGroup[] = [
  {
    category: "legislacao",
    label: "Legislação",
    description: "Guias sobre a diretiva NIS2, regulamentação portuguesa e obrigações legais",
    icon: (
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    ),
    posts: groupedPosts["legislacao"] || [],
  },
  {
    category: "ferramentas",
    label: "Ferramentas",
    description: "Checklists, documentos e ferramentas práticas para implementar conformidade NIS2",
    icon: (
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 0 1-.1-3.528l.893-.893a2.548 2.548 0 0 1 3.528-.1l5.653 4.655M8.25 18.75a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3Z"
        />
      </svg>
    ),
    posts: groupedPosts["ferramentas"] || [],
  },
  {
    category: "boas-praticas",
    label: "Boas Práticas",
    description: "Estratégias e metodologias para implementação eficaz de cibersegurança",
    icon: (
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    ),
    posts: groupedPosts["boas-praticas"] || [],
  },
  {
    category: "ameacas",
    label: "Ameaças",
    description: "Análise de riscos e ameaças no contexto da diretiva NIS2",
    icon: (
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    ),
    posts: groupedPosts["ameacas"] || [],
  },
].filter(category => category.posts.length > 0); // Only show categories with posts

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-PT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// JSON-LD BreadcrumbList structured data
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Início",
      "item": "https://ciberpme.vercel.app/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Recursos",
      "item": "https://ciberpme.vercel.app/recursos"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "NIS2",
      "item": "https://ciberpme.vercel.app/recursos/nis2"
    }
  ]
};

export default function RecursosNis2Page() {
  return (
    <div className="min-h-screen bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Navigation */}
      <header>
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-brand">
            CiberPME
          </Link>
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <Link href="/avaliacao-seguranca" className="hover:text-brand transition">
              Avaliação
            </Link>
            <Link href="/recursos" className="hover:text-brand transition">
              Recursos
            </Link>
            <Link href="/blog" className="hover:text-brand transition">
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

      <main id="main-content" className="max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand transition">
            Início
          </Link>
          <span>/</span>
          <Link href="/recursos" className="hover:text-brand transition">
            Recursos
          </Link>
          <span>/</span>
          <span className="text-text-secondary">NIS2</span>
        </nav>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand mb-6 text-balance font-display tracking-tight">
            Centro de Recursos NIS2
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto text-pretty">
            Recursos especializados sobre a Diretiva NIS2 para PMEs portuguesas.
            Encontre guias completos sobre legislação, ferramentas práticas de
            conformidade e estratégias de implementação adaptadas à realidade
            nacional.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6 rounded-xl bg-bg-subtle">
            <div className="text-3xl font-bold text-accent mb-2">
              {nis2Posts.length}
            </div>
            <div className="text-sm text-text-secondary">Artigos Especializados</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-bg-subtle">
            <div className="text-3xl font-bold text-accent mb-2">
              {categoryData.length}
            </div>
            <div className="text-sm text-text-secondary">Categorias</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-bg-subtle">
            <div className="text-3xl font-bold text-accent mb-2">
              {Math.round(nis2Posts.reduce((acc, post) => acc + post.readingTime, 0) / nis2Posts.length)}min
            </div>
            <div className="text-sm text-text-secondary">Tempo Médio de Leitura</div>
          </div>
        </div>

        {/* Alert about deadline */}
        <div className="mb-16 p-6 rounded-xl border-l-4 border-accent bg-accent-light">
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div>
              <h3 className="text-lg font-bold text-accent mb-2">
                Prazo de Registo CNCS: 4 de Maio 2026
              </h3>
              <p className="text-text-secondary text-sm">
                Empresas abrangidas pela NIS2 têm até <strong>4 de maio de 2026</strong> para
                se registarem no Centro Nacional de Cibersegurança. O incumprimento pode
                resultar em coimas até €10 milhões ou 2% da faturação anual.
              </p>
              <Link href="/blog/registo-cncs-nis2-prazo-4-maio-2026" className="text-accent hover:underline text-sm font-medium mt-2 inline-block">
                Consulte o guia de registo →
              </Link>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-20">
          {categoryData.map((category) => (
            <section key={category.category} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                {category.icon}
                <div>
                  <h2 className="text-3xl font-bold text-brand text-balance font-display">
                    {category.label}
                  </h2>
                  <p className="text-text-secondary text-pretty">{category.description}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {category.posts.map((post) => (
                  <article
                    key={post.slug}
                    className="p-6 rounded-xl border border-border hover:border-accent hover:shadow-sm transition cursor-pointer group"
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="flex justify-between items-start mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent-light rounded-full">
                          {category.label}
                        </span>
                        <div className="text-xs text-text-muted">
                          {post.readingTime} min
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-brand mb-3 line-clamp-2 group-hover:text-accent transition">
                        {post.title}
                      </h3>

                      <p className="text-text-secondary text-sm mb-4 leading-relaxed text-pretty line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                        <span className="text-accent font-medium group-hover:underline">
                          Ler artigo →
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Related Resources */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-brand mb-8 text-center text-balance font-display">
            Recursos Relacionados
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border hover:border-accent transition">
              <h3 className="font-bold text-brand mb-3">Centro Nacional de Cibersegurança</h3>
              <p className="text-sm text-text-secondary mb-4">
                Portal oficial para registo e orientações sobre a implementação da NIS2 em Portugal.
              </p>
              <a
                href="https://cncs.gov.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                cncs.gov.pt →
              </a>
            </div>

            <div className="p-6 rounded-xl border border-border hover:border-accent transition">
              <h3 className="font-bold text-brand mb-3">Decreto-Lei 125/2025</h3>
              <p className="text-sm text-text-secondary mb-4">
                Texto oficial da transposição da Diretiva NIS2 para o ordenamento jurídico português.
              </p>
              <a
                href="https://diariodarepublica.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                Consultar legislação →
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 p-8 rounded-xl bg-bg-subtle text-center">
          <h2 className="text-2xl font-bold text-brand mb-4 text-balance font-display">
            Mantém-te atualizado sobre NIS2
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto text-pretty">
            Receba análises semanais sobre a implementação da NIS2, alertas sobre
            prazos críticos e guias práticos de conformidade diretamente no seu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#newsletter"
              className="px-8 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition"
            >
              Newsletter NIS2
            </Link>
            <Link
              href="/ferramentas"
              className="px-8 py-3 border border-border text-brand rounded-lg font-medium hover:border-accent transition"
            >
              Ferramentas de Conformidade
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}