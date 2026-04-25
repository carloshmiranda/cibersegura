import Link from "next/link";
import { posts } from "@/lib/posts";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NewsletterCapture } from "@/components/blog/newsletter-capture";

export const metadata: Metadata = {
  title: "Após CNCS: NIS2 Continua — Obrigações e Próximos Passos para PMEs | CiberPME",
  description:
    "As obrigações NIS2 continuam após o prazo CNCS de 4 maio 2026. Guia completo sobre conformidade contínua, notificação de incidentes, análise de riscos e implementação para PMEs portuguesas.",
  keywords: "NIS2 após CNCS, pós-registo, obrigações contínuas, PME, cibersegurança, Portugal, conformidade",
  alternates: {
    canonical: "https://ciberpme.vercel.app/apos-nis2",
  },
  openGraph: {
    title: "Após CNCS: NIS2 Continua — Obrigações e Próximos Passos para PMEs",
    description:
      "As obrigações NIS2 continuam após o prazo CNCS de 4 maio 2026. Guia completo sobre conformidade contínua, notificação de incidentes e implementação.",
    type: "website",
    url: "https://ciberpme.vercel.app/apos-nis2",
    images: [
      {
        url: "/api/og?title=Ap%C3%B3s%20CNCS%20NIS2%20Continua",
        width: 1200,
        height: 630,
        alt: "Após CNCS: NIS2 Continua — Obrigações PMEs",
      },
    ],
  },
};

// Filter evergreen NIS2 articles relevant for post-CNCS period
const relevantNIS2Posts = posts
  .filter((post) =>
    post.slug.toLowerCase().includes("nis2") &&
    // Focus on implementation, compliance, and ongoing obligations
    (post.slug.includes("pos-registo") ||
     post.slug.includes("notificacao-incidentes") ||
     post.slug.includes("conformidade") ||
     post.slug.includes("checklist") ||
     post.slug.includes("cadeia-fornecimento") ||
     post.slug.includes("vs-rgpd") ||
     post.slug.includes("multas-coimas") ||
     post.slug.includes("guia-pme"))
  )
  .sort((a, b) => {
    // Priority order: implementation → compliance → consequences
    const order = [
      "nis2-pos-registo-proximos-passos-pme",     // 1. Post-registration steps
      "checklist-nis2-conformidade",              // 2. Basic compliance
      "checklist-nis2-10-passos-conformidade",    // 3. Advanced compliance
      "nis2-portugal-guia-pme",                   // 4. Complete guide
      "nis2-notificacao-incidentes-pme-24-72-horas", // 5. Incident notification
      "nis2-cadeia-fornecimento-pme",             // 6. Supply chain
      "nis2-vs-rgpd-diferencas",                  // 7. GDPR comparison
      "multas-coimas-nis2-pme",                   // 8. Penalties
    ];
    const aIndex = order.indexOf(a.slug);
    const bIndex = order.indexOf(b.slug);
    if (aIndex === -1 && bIndex === -1) return a.slug.localeCompare(b.slug);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

// Calculate days since the CNCS deadline
const getCNCSStatus = () => {
  const deadline = new Date("2026-05-04");
  const now = new Date();
  const diffTime = now.getTime() - deadline.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    daysPassed: diffDays > 0 ? diffDays : 0,
    isPast: diffDays > 0,
  };
};

export default function AposNIS2Page() {
  const cncsStatus = getCNCSStatus();

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://ciberpme.vercel.app/apos-nis2#collection",
        "url": "https://ciberpme.vercel.app/apos-nis2",
        "name": "Após CNCS: NIS2 Continua — Obrigações e Próximos Passos para PMEs",
        "description": "As obrigações NIS2 continuam após o prazo CNCS de 4 maio 2026. Guia completo sobre conformidade contínua, notificação de incidentes, análise de riscos e implementação.",
        "inLanguage": "pt-PT",
        "about": {
          "@type": "Thing",
          "name": "Obrigações NIS2 pós-registo CNCS"
        },
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": relevantNIS2Posts.length,
          "itemListElement": relevantNIS2Posts.map((post, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Article",
              "url": `https://ciberpme.vercel.app/blog/${post.slug}`,
              "name": post.title,
              "description": post.excerpt,
              "datePublished": post.publishedAt,
              "author": {
                "@type": "Person",
                "name": post.author?.name || "CiberPME"
              }
            }
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://ciberpme.vercel.app/apos-nis2#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "https://ciberpme.vercel.app/",
              "name": "CiberPME"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "https://ciberpme.vercel.app/apos-nis2",
              "name": "Após CNCS: NIS2 Continua"
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Navigation */}
      <Header currentPath="/apos-nis2" />

      <main>
        {/* Breadcrumb */}
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <ol className="flex items-center gap-2 text-sm text-text-secondary">
            <li>
              <Link href="/" className="hover:text-accent transition">
                Início
              </Link>
            </li>
            <li className="text-border">›</li>
            <li className="text-text font-medium">Após CNCS: NIS2 Continua</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand mb-6 font-display text-balance">
              Após CNCS: NIS2 Continua
            </h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed text-balance">
              O prazo de registo CNCS de 4 maio 2026 passou, mas as obrigações NIS2 são para sempre.
              Se a sua PME está abrangida, saiba o que deve fazer agora para manter conformidade
              e evitar multas até €7 milhões.
            </p>
          </div>

          {/* Alert Section */}
          <div className="mb-12">
            {cncsStatus.isPast ? (
              <div className="p-6 rounded-xl border border-warning bg-warning-bg">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-warning-text mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-warning-text mb-2">
                      Prazo CNCS Expirado: {cncsStatus.daysPassed} dias
                    </h3>
                    <p className="text-warning-text">
                      Se a sua empresa está abrangida pela NIS2 e não fez o registo CNCS até 4 maio 2026,
                      está em incumprimento. Contacte um consultor especializado imediatamente —
                      as multas podem chegar aos €7 milhões.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-accent bg-accent-light">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-accent mb-2">
                      Ainda Não Passou o Prazo CNCS
                    </h3>
                    <p className="text-accent">
                      O prazo de registo CNCS ainda não expirou. Se a sua empresa está abrangida pela NIS2,
                      deve fazer o registo até 4 maio 2026. Mas mesmo após o registo, as obrigações continuam.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2 font-display">Obrigações Contínuas</h3>
              <p className="text-sm text-text-secondary">
                O registo CNCS é apenas o início. Análise de riscos, notificação de incidentes e medidas técnicas são obrigatórias sempre.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2 font-display">Multas Até €7M</h3>
              <p className="text-sm text-text-secondary">
                Incumprimento das obrigações NIS2 pode resultar em multas até €7 milhões ou 1,4% do volume de negócios anual.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2 font-display">{relevantNIS2Posts.length} Guias Práticos</h3>
              <p className="text-sm text-text-secondary">
                Recursos práticos para implementar conformidade NIS2 na sua PME: da análise de riscos à gestão de fornecedores.
              </p>
            </div>
          </div>
        </section>

        {/* What Continues Section */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <h2 className="text-3xl font-bold text-brand mb-8 text-center font-display text-balance">
              O Que Continua Depois do CNCS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border">
                  <h3 className="font-bold text-brand mb-3">📊 Análise de Riscos Anual</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Deve realizar e documentar uma análise de riscos de cibersegurança pelo menos uma vez por ano,
                    cobrindo todos os sistemas e serviços críticos da sua empresa.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border">
                  <h3 className="font-bold text-brand mb-3">🚨 Notificação de Incidentes</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Qualquer incidente de cibersegurança significativo deve ser notificado ao CNCS em 24h (alerta inicial),
                    72h (relatório preliminar) e 1 mês (relatório final).
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border">
                  <h3 className="font-bold text-brand mb-3">🔒 Medidas Técnicas</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Implementação contínua de controlos de segurança: backup, autenticação multi-fator,
                    encriptação, gestão de vulnerabilidades e formação de colaboradores.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border">
                  <h3 className="font-bold text-brand mb-3">🤝 Gestão de Fornecedores</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Avaliação e monitorização contínua dos riscos dos fornecedores e prestadores de serviços
                    que têm acesso aos seus sistemas críticos.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/blog/nis2-pos-registo-proximos-passos-pme"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition"
              >
                Ler Guia Pós-Registo Completo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <h2 className="text-3xl font-bold text-brand mb-4 text-center font-display text-balance">
              {relevantNIS2Posts.length} Guias Para Manter Conformidade
            </h2>
            <p className="text-text-secondary text-center mb-12 text-balance">
              Artigos essenciais para implementar e manter conformidade NIS2 na sua PME após o registo CNCS.
            </p>

            {relevantNIS2Posts.length === 0 ? (
              <p className="text-text-muted text-center">
                Nenhum artigo encontrado.
              </p>
            ) : (
              <div className="space-y-6">
                {relevantNIS2Posts.map((post, index) => {
                  // Determine article type and priority
                  let priority = "Implementação";
                  let priorityColor = "bg-bg-subtle text-text-secondary border-border";

                  if (post.slug.includes("pos-registo")) {
                    priority = "Essencial";
                    priorityColor = "bg-accent-light text-accent border-accent/20";
                  } else if (post.slug.includes("notificacao-incidentes")) {
                    priority = "Crítico";
                    priorityColor = "bg-warning-bg text-warning-text border-warning/20";
                  } else if (post.slug.includes("checklist") || post.slug.includes("conformidade")) {
                    priority = "Conformidade";
                    priorityColor = "bg-accent-light text-accent border-accent/20";
                  } else if (post.slug.includes("multas-coimas")) {
                    priority = "Consequências";
                    priorityColor = "bg-error/5 text-error border-error/20";
                  }

                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block p-6 rounded-xl border border-border hover:border-accent hover:shadow-sm transition"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border ${priorityColor}`}>
                          {priority}
                        </span>
                        <span className="inline-block px-2 py-0.5 text-xs font-medium text-accent bg-accent-light rounded-full">
                          {post.categoryLabel}
                        </span>
                        <span className="text-xs text-text-muted">
                          {post.readingTime} min de leitura
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-brand mb-3 group-hover:text-accent transition">
                        {post.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {post.excerpt}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Quick Links for Related Topics */}
            <div className="mt-12 p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-4">Tópicos NIS2 Essenciais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                <Link
                  href="/blog/nis2-pos-registo-proximos-passos-pme"
                  className="text-accent hover:underline transition"
                >
                  → Próximos passos pós-registo
                </Link>
                <Link
                  href="/blog/nis2-notificacao-incidentes-pme-24-72-horas"
                  className="text-accent hover:underline transition"
                >
                  → Notificação de incidentes 24-72h
                </Link>
                <Link
                  href="/blog/checklist-nis2-10-passos-conformidade"
                  className="text-accent hover:underline transition"
                >
                  → Checklist 10 passos conformidade
                </Link>
                <Link
                  href="/blog/nis2-cadeia-fornecimento-pme"
                  className="text-accent hover:underline transition"
                >
                  → Gestão cadeia de fornecimento
                </Link>
                <Link
                  href="/blog/multas-coimas-nis2-pme"
                  className="text-accent hover:underline transition"
                >
                  → Multas e coimas NIS2
                </Link>
                <Link
                  href="/blog/nis2-vs-rgpd-diferencas"
                  className="text-accent hover:underline transition"
                >
                  → NIS2 vs RGPD: diferenças
                </Link>
                <Link
                  href="/blog/nis2"
                  className="text-accent hover:underline transition"
                >
                  → Hub completo NIS2 Portugal
                </Link>
                <Link
                  href="/blog?categoria=legislacao"
                  className="text-accent hover:underline transition"
                >
                  → Todos os artigos de legislação
                </Link>
                <Link
                  href="/blog?categoria=boas-praticas"
                  className="text-accent hover:underline transition"
                >
                  → Boas práticas cibersegurança
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <NewsletterCapture
              placement="footer"
              articleTitle="Após CNCS: NIS2 Continua"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}