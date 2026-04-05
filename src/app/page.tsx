import Link from "next/link";
import { posts, CATEGORIES } from "@/lib/posts";
import { NewsletterForm } from "./newsletter-form";
import { NIS2Banner } from "@/components/nis2-banner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CiberPME — Cibersegurança para PMEs Portuguesas",
  description: "Blog de cibersegurança e recursos para pequenas e médias empresas portuguesas. Artigos sobre ameaças, boas práticas, ferramentas e legislação RGPD.",
  alternates: {
    canonical: "https://ciberpme.vercel.app",
  },
  openGraph: {
    title: "CiberPME — Cibersegurança para PMEs Portuguesas",
    description: "Blog de cibersegurança e recursos para pequenas e médias empresas portuguesas. Artigos sobre ameaças, boas práticas, ferramentas e legislação RGPD.",
    type: "website",
    url: "https://ciberpme.vercel.app",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "CiberPME — Cibersegurança para PMEs Portuguesas",
      },
    ],
  },
};

const COMPANY_NAME = "CiberPME";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-brand">
          {COMPANY_NAME}
        </Link>
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <Link href="/blog" className="hover:text-brand transition">
            Blog
          </Link>
          <Link href="/recursos" className="hover:text-brand transition">
            Recursos
          </Link>
          <Link href="/faq" className="hover:text-brand transition">
            FAQ
          </Link>
          <Link href="#sobre" className="hover:text-brand transition">
            Sobre
          </Link>
        </div>
      </nav>

      {/* NIS2 Urgency Banner */}
      <NIS2Banner />

      <main>
        {/* Hero */}
        <header className="max-w-3xl mx-auto px-6 pt-16 pb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand mb-6 leading-tight">
            Ciberseguranca para PMEs Portuguesas
          </h1>
          <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
            Artigos praticos, guias e ferramentas para proteger o seu negocio
            contra ameacas digitais. Conteudo em portugues, pensado para
            pequenas e medias empresas.
          </p>
          <div id="newsletter" className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </header>

        {/* Featured Articles */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-brand">Artigos Recentes</h2>
            <Link
              href="/blog"
              className="text-sm text-accent hover:underline transition"
            >
              Ver todos
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-6 rounded-xl border border-border hover:border-accent hover:shadow-sm transition"
              >
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-accent bg-accent-light rounded-full mb-3">
                  {post.categoryLabel}
                </span>
                <h3 className="font-bold text-brand mb-2 group-hover:text-accent transition">
                  {post.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <span className="text-xs text-text-muted">
                  {post.readingTime} min de leitura
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="bg-bg-subtle py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl font-bold text-brand mb-8 text-center">
              Categorias
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(CATEGORIES).map(([key, label]) => (
                <Link
                  key={key}
                  href={`/blog?categoria=${key}`}
                  className="p-6 rounded-xl border border-border bg-bg text-center hover:border-accent hover:shadow-sm transition"
                >
                  <div className="mb-2">
                    {key === "ameacas" && (
                      <svg
                        className="w-6 h-6 mx-auto text-accent"
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
                    )}
                    {key === "boas-praticas" && (
                      <svg
                        className="w-6 h-6 mx-auto text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                        />
                      </svg>
                    )}
                    {key === "ferramentas" && (
                      <svg
                        className="w-6 h-6 mx-auto text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.194-.14 1.743"
                        />
                      </svg>
                    )}
                    {key === "legislacao" && (
                      <svg
                        className="w-6 h-6 mx-auto text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-bold text-brand">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="sobre" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-xl font-bold text-brand mb-4 text-center">
            Sobre o CiberPME
          </h2>
          <p className="text-text-secondary text-center leading-relaxed max-w-xl mx-auto mb-6">
            O CiberPME e um recurso gratuito dedicado a ajudar pequenas e
            medias empresas portuguesas a protegerem-se contra ameacas digitais.
            Publicamos artigos praticos, guias passo-a-passo e analises de
            ferramentas, tudo em portugues e adaptado a realidade do mercado
            nacional.
          </p>
          <p className="text-text-secondary text-center leading-relaxed max-w-xl mx-auto">
            Acreditamos que a ciberseguranca nao deve ser um luxo reservado a
            grandes empresas. Com as praticas certas, qualquer PME pode proteger
            os seus dados, os seus clientes e o seu negocio.
          </p>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-bg-subtle py-20">
          <div className="max-w-md mx-auto px-6 text-center">
            <h2 className="text-xl font-bold text-brand mb-4">
              Receba as nossas dicas de seguranca
            </h2>
            <p className="text-text-secondary mb-8">
              Subscreva a newsletter e receba artigos, alertas de seguranca e
              guias praticos directamente no seu email.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-brand">{COMPANY_NAME}</span>
          <div className="flex gap-6 text-sm text-text-secondary">
            <Link href="/blog" className="hover:text-brand transition">
              Blog
            </Link>
            <Link href="/recursos" className="hover:text-brand transition">
              Recursos
            </Link>
            <Link href="/faq" className="hover:text-brand transition">
              FAQ
            </Link>
            <Link href="#sobre" className="hover:text-brand transition">
              Sobre
            </Link>
            <Link href="#newsletter" className="hover:text-brand transition">
              Newsletter
            </Link>
          </div>
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}
          </p>
        </div>
      </footer>
    </div>
  );
}
