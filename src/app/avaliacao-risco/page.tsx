import type { Metadata } from "next";
import Footer from "@/components/footer";
import { RiskAssessmentTool } from "@/components/risk-assessment-tool";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Avaliação de Risco de Cibersegurança — CiberPME",
  description:
    "Avalie o nível de risco de cibersegurança da sua PME com a nossa ferramenta interativa gratuita. Obtenha recomendações personalizadas para melhorar a segurança da sua empresa.",
  alternates: {
    canonical: "https://ciberpme.vercel.app/avaliacao-risco",
  },
  openGraph: {
    title: "Avaliação de Risco de Cibersegurança — CiberPME",
    description:
      "Avalie o nível de risco de cibersegurança da sua PME com a nossa ferramenta interativa gratuita. Obtenha recomendações personalizadas para melhorar a segurança da sua empresa.",
    type: "website",
    url: "https://ciberpme.vercel.app/avaliacao-risco",
    images: [
      {
        url: "/api/og?title=Avaliação%20de%20Risco%20de%20Cibersegurança",
        width: 1200,
        height: 630,
        alt: "Avaliação de Risco de Cibersegurança - CiberPME",
      },
    ],
  },
};

export default function RiskAssessmentPage() {
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
            <Link href="/ferramentas" className="hover:text-brand transition">
              Ferramentas
            </Link>
            <Link href="/avaliacao-risco" className="text-brand font-bold" aria-current="page">
              Avaliação
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-brand transition">
            Início
          </Link>
          <span>/</span>
          <span className="text-text-secondary">Avaliação de Risco</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand mb-6 text-balance font-display tracking-tight">
            Avaliação de Risco de Cibersegurança
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto text-pretty">
            Descubra o nível de risco de cibersegurança da sua PME e receba
            recomendações personalizadas para fortalecer a segurança da sua empresa.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 p-6 rounded-xl bg-accent-light border border-accent/20">
          <p className="text-sm text-text-secondary">
            <strong>Aviso:</strong> Esta ferramenta fornece uma avaliação indicativa
            baseada nas suas respostas. Para necessidades específicas de segurança,
            recomendamos a consulta de especialistas em cibersegurança.
          </p>
        </div>

        {/* Risk Assessment Tool */}
        <RiskAssessmentTool />

        {/* Additional Resources */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-brand mb-8 text-center font-display">
            Recursos Relacionados
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/ferramentas"
              className="p-6 rounded-xl border border-border hover:border-accent transition group"
            >
              <h3 className="font-bold text-brand mb-2 group-hover:text-accent transition">
                Ferramentas Práticas
              </h3>
              <p className="text-sm text-text-secondary">
                Listas de verificação e templates para implementar medidas
                de segurança na sua empresa.
              </p>
            </Link>
            <Link
              href="/recursos"
              className="p-6 rounded-xl border border-border hover:border-accent transition group"
            >
              <h3 className="font-bold text-brand mb-2 group-hover:text-accent transition">
                Catálogo de Recursos
              </h3>
              <p className="text-sm text-text-secondary">
                Ferramentas e serviços recomendados para proteger
                a sua empresa.
              </p>
            </Link>
            <Link
              href="/blog"
              className="p-6 rounded-xl border border-border hover:border-accent transition group"
            >
              <h3 className="font-bold text-brand mb-2 group-hover:text-accent transition">
                Blog de Cibersegurança
              </h3>
              <p className="text-sm text-text-secondary">
                Artigos detalhados sobre implementação de medidas de segurança
                e análise de ameaças atuais.
              </p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}