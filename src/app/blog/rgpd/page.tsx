import Link from "next/link";
import { posts } from "@/lib/posts";
import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "RGPD para PMEs Portuguesas: Guia Completo — CiberPME",
  description:
    "Tudo sobre RGPD (Regulamento Geral sobre Proteção de Dados) para PMEs portuguesas. Guias práticos, obrigações legais e como garantir conformidade total.",
  alternates: {
    canonical: "https://ciberpme.vercel.app/blog/rgpd",
  },
  openGraph: {
    title: "RGPD para PMEs Portuguesas: Guia Completo",
    description:
      "Tudo sobre RGPD (Regulamento Geral sobre Proteção de Dados) para PMEs portuguesas. Guias práticos, obrigações legais e como garantir conformidade total.",
    type: "website",
    url: "https://ciberpme.vercel.app/blog/rgpd",
    images: [
      {
        url: "/api/og?title=RGPD%20para%20PMEs",
        width: 1200,
        height: 630,
        alt: "RGPD para PMEs Portuguesas",
      },
    ],
  },
};

// Filter RGPD articles (category "legislacao" and containing RGPD content)
const rgpdPosts = posts
  .filter((post) =>
    post.category === "legislacao" &&
    (post.slug.includes("rgpd") || post.title.includes("RGPD") || post.content.includes("RGPD"))
  )
  .sort((a, b) => {
    // Order from beginner to advanced based on slug/title
    const order = [
      "guia-rgpd-pequenas-empresas-portugal", // Basic RGPD guide
      "nis2-vs-rgpd-diferencas", // Comparison with NIS2
    ];
    const indexA = order.indexOf(a.slug);
    const indexB = order.indexOf(b.slug);

    // If both are in the order array, sort by order
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    // If only one is in the order array, prioritize it
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    // Otherwise sort by publication date (newest first)
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

// Calculate years since RGPD came into effect (May 25, 2018)
const getTimeSinceRGPD = () => {
  const rgpdStart = new Date("2018-05-25");
  const now = new Date();
  const diffTime = now.getTime() - rgpdStart.getTime();
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));

  return {
    years: diffYears,
    months: Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)),
  };
};

export default function RGPDSiloPage() {
  const timeSince = getTimeSinceRGPD();

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <header>
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-brand">
            CiberPME
          </Link>
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <Link href="/recursos" className="hover:text-brand transition">
              Recursos
            </Link>
            <Link href="/recursos/nis2" className="hover:text-brand transition">
              Recursos NIS2
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

      <main>
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand mb-6 font-display text-balance">
              RGPD para PMEs Portuguesas
            </h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed text-pretty">
              O Regulamento Geral sobre a Proteção de Dados (RGPD) aplica-se a todas as empresas portuguesas
              que tratam dados pessoais. Desde maio de 2018, a conformidade é obrigatória e as multas podem
              atingir 4% do volume de negócios anual.
            </p>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2 font-display">Aplicação Universal</h3>
              <p className="text-sm text-text-secondary text-pretty">
                Qualquer PME que trate dados pessoais de cidadãos da UE está obrigada ao RGPD,
                independentemente da dimensão.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2 font-display">Multas até 4%</h3>
              <p className="text-sm text-text-secondary text-pretty">
                As penalizações podem chegar a 4% do volume de negócios anual global ou €20 milhões
                (o que for superior).
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2 font-display">Direitos dos Cidadãos</h3>
              <p className="text-sm text-text-secondary text-pretty">
                Direito de acesso, retificação, eliminação, portabilidade e oposição ao tratamento
                dos seus dados pessoais.
              </p>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-brand mb-4 font-display text-balance">
                RGPD em Vigor
              </h2>
              <p className="text-text-secondary mb-8">
                Tempo decorrido desde a entrada em vigor do RGPD:
              </p>

              <div className="p-8 rounded-xl border border-border bg-bg-subtle">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-accent mb-2">
                      {timeSince.years}
                    </div>
                    <div className="text-text-secondary">
                      {timeSince.years === 1 ? "ano" : "anos"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">desde</div>
                    <div className="text-xl font-bold text-brand">25 de Maio 2018</div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mt-4">
                  Se a sua empresa ainda não está em conformidade total, é urgente implementar as medidas necessárias.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Requirements Section */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <h2 className="text-3xl font-bold text-brand mb-8 text-center font-display text-balance">
              Principais Obrigações RGPD
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 rounded-xl border border-border">
                <h3 className="text-lg font-bold text-brand mb-3 font-display">Base Legal</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Toda recolha e tratamento de dados pessoais deve ter uma base legal válida (consentimento,
                  interesse legítimo, cumprimento de contrato, etc.).
                </p>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Consentimento explícito e inequívoco</li>
                  <li>• Documentação das bases legais</li>
                  <li>• Possibilidade de retirar consentimento</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border border-border">
                <h3 className="text-lg font-bold text-brand mb-3 font-display">Direitos dos Titulares</h3>
                <p className="text-sm text-text-secondary mb-3">
                  As PMEs devem implementar procedimentos para responder aos direitos dos cidadãos
                  sobre os seus dados pessoais.
                </p>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Direito de acesso (cópia dos dados)</li>
                  <li>• Direito de retificação e eliminação</li>
                  <li>• Portabilidade e oposição</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border border-border">
                <h3 className="text-lg font-bold text-brand mb-3 font-display">Segurança e Privacidade</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Medidas técnicas e organizativas adequadas para proteger dados pessoais contra
                  acessos não autorizados, alteração ou destruição.
                </p>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Encriptação de dados sensíveis</li>
                  <li>• Controlo de acessos e backups</li>
                  <li>• Privacy by design</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border border-border">
                <h3 className="text-lg font-bold text-brand mb-3 font-display">Notificação de Violações</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Violações de dados pessoais que representem risco devem ser notificadas à CNPD
                  no prazo de 72 horas.
                </p>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Deteção e documentação rápida</li>
                  <li>• Avaliação do risco para titulares</li>
                  <li>• Comunicação aos afetados se necessário</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <h2 className="text-3xl font-bold text-brand mb-4 text-center font-display text-balance">
              Guias RGPD para PMEs Portuguesas
            </h2>
            <p className="text-text-secondary text-center mb-12 text-pretty">
              Artigos práticos para implementar conformidade RGPD na sua pequena ou média empresa,
              do básico ao avançado.
            </p>

            {rgpdPosts.length === 0 ? (
              <p className="text-text-muted text-center">
                Artigos RGPD em preparação. Consulte a nossa secção FAQ para dúvidas básicas.
              </p>
            ) : (
              <div className="space-y-6">
                {rgpdPosts.map((post, index) => {
                  const isBasicGuide = post.slug.includes("guia-rgpd-pequenas-empresas");
                  const isComparison = post.slug.includes("nis2-vs-rgpd");

                  let levelLabel = "Guia Geral";
                  let levelColor = "bg-bg-subtle text-text-secondary border-border";

                  if (isBasicGuide) {
                    levelLabel = "Essencial";
                    levelColor = "bg-accent-light text-accent border-accent/20";
                  } else if (isComparison) {
                    levelLabel = "Comparação";
                    levelColor = "bg-accent-light text-accent border-accent/20";
                  }

                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block p-6 rounded-xl border border-border hover:border-accent hover:shadow-sm transition"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border ${levelColor}`}>
                          {levelLabel}
                        </span>
                        <span className="inline-block px-2 py-0.5 text-xs font-medium text-accent bg-accent-light rounded-full">
                          {post.categoryLabel}
                        </span>
                        <span className="text-xs text-text-muted">
                          {post.readingTime} min de leitura
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-brand mb-3 group-hover:text-accent transition font-display">
                        {post.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed text-pretty">
                        {post.excerpt}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Internal Links for Topical Authority */}
            <div className="mt-12 p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-4 font-display">Recursos Relacionados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <Link
                  href="/blog?categoria=legislacao"
                  className="text-accent hover:underline transition"
                >
                  → Todos os artigos sobre Legislação
                </Link>
                <Link
                  href="/blog/nis2"
                  className="text-accent hover:underline transition"
                >
                  → Guias NIS2 para PMEs
                </Link>
                <Link
                  href="/blog?categoria=boas-praticas"
                  className="text-accent hover:underline transition"
                >
                  → Boas Práticas de Segurança de Dados
                </Link>
                <Link
                  href="/faq"
                  className="text-accent hover:underline transition"
                >
                  → FAQ sobre RGPD e Cibersegurança
                </Link>
                <Link
                  href="/recursos"
                  className="text-accent hover:underline transition"
                >
                  → Ferramentas de Conformidade
                </Link>
                <Link
                  href="/blog"
                  className="text-accent hover:underline transition"
                >
                  → Ver todos os artigos do blog
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CNPD Resources Section */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <h2 className="text-3xl font-bold text-brand mb-8 text-center font-display text-balance">
              Recursos Oficiais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-border">
                <div className="flex items-start gap-4">
                  <svg aria-hidden="true" className="w-8 h-8 text-accent flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-brand mb-2 font-display">CNPD — Portal Oficial</h3>
                    <p className="text-sm text-text-secondary mb-3">
                      Comissão Nacional de Proteção de Dados. Orientações oficiais,
                      modelos e templates gratuitos.
                    </p>
                    <a
                      href="https://cnpd.pt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline"
                    >
                      cnpd.pt →
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border">
                <div className="flex items-start gap-4">
                  <svg aria-hidden="true" className="w-8 h-8 text-accent flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3-7.036A11.95 11.95 0 0 1 3.736 4.5c-1.53 0-2.77 1.24-2.77 2.77 0 6.018 4.428 10.015 9 11.622 4.572-1.607 9-5.604 9-11.622 0-1.53-1.24-2.77-2.77-2.77A11.95 11.95 0 0 1 12 10.964Z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-brand mb-2 font-display">Linha RGPD PME</h3>
                    <p className="text-sm text-text-secondary mb-3">
                      Apoio especializado para esclarecimentos sobre implementação
                      RGPD em pequenas empresas.
                    </p>
                    <a
                      href="https://cnpd.pt/cidadaos/contactos/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline"
                    >
                      Contactos CNPD →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-bg-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
            <h2 className="text-3xl font-bold text-brand mb-6 font-display text-balance">
              Precisa de apoio na implementação?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto text-pretty">
              Explore os nossos guias práticos ou subscreva a newsletter para receber
              dicas específicas sobre conformidade RGPD para PMEs portuguesas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog?categoria=legislacao"
                className="px-8 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition"
              >
                Ver Guias de Legislação
              </Link>
              <Link
                href="/#newsletter"
                className="px-8 py-3 border border-border text-brand rounded-lg font-medium hover:border-accent transition"
              >
                Newsletter Gratuita
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}