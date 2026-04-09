import Link from "next/link";
import { posts } from "@/lib/posts";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import CountdownTimer from "@/components/countdown-timer";

export const metadata: Metadata = {
  title: "Centro NIS2 — CiberPME",
  description:
    "Centro de recursos sobre a diretiva NIS2 em Portugal. Guias, checklists, prazos e notícias para PMEs portuguesas se prepararem para a conformidade.",
  alternates: {
    canonical: "https://ciberpme.vercel.app/nis2",
  },
  openGraph: {
    title: "Centro NIS2 — CiberPME",
    description:
      "Centro de recursos sobre a diretiva NIS2 em Portugal. Guias, checklists, prazos e notícias para PMEs portuguesas se prepararem para a conformidade.",
    type: "website",
    url: "https://ciberpme.vercel.app/nis2",
    images: [
      {
        url: "/api/og?title=Centro%20NIS2",
        width: 1200,
        height: 630,
        alt: "Centro NIS2 - CiberPME",
      },
    ],
  },
};

// Filter and group NIS2 posts
const nis2Posts = posts.filter(post =>
  post.slug.includes('nis2') ||
  post.title.toLowerCase().includes('nis2') ||
  post.content.toLowerCase().includes('nis2')
);

const groupedPosts = {
  "Introdução e Guias": nis2Posts.filter(post =>
    post.slug.includes('portugal-guia') ||
    post.slug.includes('nis2-portugal-o-que') ||
    post.slug.includes('vs-rgpd')
  ),
  "Implementação e Conformidade": nis2Posts.filter(post =>
    post.slug.includes('checklist') ||
    post.slug.includes('cadeia-fornecimento') ||
    post.slug.includes('registo-cncs')
  ),
  "Notícias e Prazos": nis2Posts.filter(post =>
    post.slug.includes('entrou-em-vigor') ||
    post.slug.includes('o-que-muda-3-abril')
  )
};

const nis2JsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Centro NIS2 Portugal",
  description: "Centro de recursos sobre a diretiva NIS2 em Portugal para PMEs portuguesas",
  url: "https://ciberpme.vercel.app/nis2",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: nis2Posts.map((post, index) => ({
      "@type": "Article",
      position: index + 1,
      headline: post.title,
      description: post.excerpt,
      url: `https://ciberpme.vercel.app/blog/${post.slug}`,
      author: {
        "@type": "Organization",
        name: "CiberPME"
      },
      publisher: {
        "@type": "Organization",
        name: "CiberPME"
      },
      datePublished: post.publishedAt,
      dateModified: post.publishedAt
    }))
  }
};

export default function NIS2Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nis2JsonLd) }}
      />
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
            <Link href="/nis2" className="text-brand font-bold" aria-current="page">
              NIS2
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-brand mb-6 text-balance font-display tracking-tight">
            Centro NIS2 Portugal
          </h1>
          <p className="text-lg text-text-secondary mb-8 max-w-3xl mx-auto text-pretty">
            Tudo o que as PMEs portuguesas precisam de saber sobre a diretiva NIS2.
            Guias práticos, checklists e recursos para garantir conformidade.
          </p>

          {/* Countdown to CNCS Deadline */}
          <div className="bg-warning-bg border border-warning-text/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-bold text-warning-text mb-2">
              Prazo CNCS: 4 de Maio de 2026
            </h2>
            <p className="text-warning-text/90 text-sm mb-4">
              Prazo limite para registo e conformidade com as autoridades nacionais
            </p>
            <CountdownTimer targetDate="2026-05-04T23:59:59.000Z" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Link
            href="/blog/nis2-portugal-guia-pme"
            className="group p-6 bg-bg-subtle rounded-xl border border-border hover:border-accent hover:shadow-sm transition"
          >
            <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-bold text-brand mb-2 group-hover:text-accent transition">
              Guia Completo NIS2
            </h3>
            <p className="text-sm text-text-secondary">
              Tudo sobre a nova diretiva e como se preparar
            </p>
          </Link>

          <Link
            href="/blog/checklist-nis2-conformidade"
            className="group p-6 bg-bg-subtle rounded-xl border border-border hover:border-accent hover:shadow-sm transition"
          >
            <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-brand mb-2 group-hover:text-accent transition">
              Checklist de Conformidade
            </h3>
            <p className="text-sm text-text-secondary">
              10 passos essenciais para estar em conformidade
            </p>
          </Link>

          <Link
            href="/blog/registo-cncs-nis2-guia-completo"
            className="group p-6 bg-bg-subtle rounded-xl border border-border hover:border-accent hover:shadow-sm transition"
          >
            <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-bold text-brand mb-2 group-hover:text-accent transition">
              Registo no CNCS
            </h3>
            <p className="text-sm text-text-secondary">
              Como registar a sua empresa nas autoridades
            </p>
          </Link>
        </div>

        {/* Grouped Articles */}
        {Object.entries(groupedPosts).map(([categoryName, categoryPosts]) => (
          categoryPosts.length > 0 && (
            <section key={categoryName} className="mb-12">
              <h2 className="text-2xl font-bold text-brand mb-6 font-display">
                {categoryName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block p-6 rounded-xl border border-border hover:border-accent hover:shadow-sm transition"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-2 py-0.5 text-xs font-medium text-accent bg-accent-light rounded-full">
                        NIS2
                      </span>
                      <span className="text-xs text-text-muted">
                        {post.readingTime} min de leitura
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-brand mb-2 group-hover:text-accent transition text-balance font-display">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed text-pretty">
                      {post.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )
        ))}

        {/* Call to Action */}
        <div className="bg-brand-light rounded-xl p-8 text-center mt-16">
          <h2 className="text-2xl font-bold text-brand mb-4 font-display">
            Precisa de Ajuda com a NIS2?
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Subscreva a nossa newsletter para receber atualizações sobre a NIS2,
            novos guias e alertas de prazo importantes.
          </p>
          <Link
            href="/#newsletter"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition"
          >
            Subscrever Newsletter
          </Link>
        </div>
      </main>

      <Footer />
      </div>
    </>
  );
}