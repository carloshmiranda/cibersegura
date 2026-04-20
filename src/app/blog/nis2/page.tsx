import Link from "next/link";
import { posts } from "@/lib/posts";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "NIS2 Portugal: Hub Completo para PMEs — Conformidade, Prazos e Guias | CiberPME",
  description:
    "Centro de recursos NIS2 para PMEs portuguesas. 15+ guias sobre conformidade, registo CNCS, notificação de incidentes, análise de riscos e implementação prática da Diretiva NIS2 em Portugal.",
  keywords: "NIS2 Portugal, PME, cibersegurança, conformidade, CNCS, registo obrigatório, análise riscos",
  alternates: {
    canonical: "https://ciberpme.vercel.app/blog/nis2",
  },
  openGraph: {
    title: "NIS2 Portugal: Hub Completo para PMEs — Conformidade e Guias",
    description:
      "Centro de recursos NIS2 para PMEs portuguesas. 15+ guias sobre conformidade, registo CNCS, notificação de incidentes, análise de riscos e implementação prática.",
    type: "website",
    url: "https://ciberpme.vercel.app/blog/nis2",
    images: [
      {
        url: "/api/og?title=NIS2%20Portugal%20Hub%20PME",
        width: 1200,
        height: 630,
        alt: "NIS2 Portugal: Hub Completo para PMEs",
      },
    ],
  },
};

// Filter ALL NIS2 articles (any category, slug containing "nis2")
const nis2Posts = posts
  .filter((post) => post.slug.toLowerCase().includes("nis2"))
  .sort((a, b) => {
    // Order from foundational to advanced implementation
    const order = [
      "nis2-portugal-o-que-pmes-precisam-saber", // 1. Overview
      "nis2-decreto-lei-125-2025-obrigacoes-pme", // 2. Legal framework
      "nis2-entrou-em-vigor", // 3. Enforcement start
      "registo-cncs-nis2-prazo-4-maio-2026", // 4. CNCS registration
      "registo-cncs-nis2-guia-completo", // 5. Registration guide
      "nis2-prazo-urgente-maio-2026-o-que-fazer-agora", // 6. Urgent deadline
      "nis2-pos-registo-proximos-passos-pme", // 7. Post-registration
      "checklist-nis2-conformidade", // 8. Basic checklist
      "checklist-nis2-10-passos-conformidade", // 9. Advanced checklist
      "nis2-portugal-guia-pme", // 10. Complete implementation
      "nis2-notificacao-incidentes-pme-24-72-horas", // 11. Incident notification
      "nis2-cadeia-fornecimento-pme", // 12. Supply chain
      "nis2-vs-rgpd-diferencas", // 13. GDPR comparison
      "multas-coimas-nis2-pme", // 14. Penalties
      "nis2-o-que-muda-3-abril-2026", // 15. Changes summary
    ];
    const aIndex = order.indexOf(a.slug);
    const bIndex = order.indexOf(b.slug);
    // If not in order list, sort alphabetically at the end
    if (aIndex === -1 && bIndex === -1) return a.slug.localeCompare(b.slug);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

// Calculate days remaining until April 3, 2026
const getCountdownData = () => {
  const deadline = new Date("2026-04-03");
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    days: diffDays > 0 ? diffDays : 0,
    isExpired: diffDays <= 0,
  };
};

export default function NIS2HubPage() {
  const countdown = getCountdownData();

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://ciberpme.vercel.app/blog/nis2#collection",
        "url": "https://ciberpme.vercel.app/blog/nis2",
        "name": "NIS2 Portugal: Hub Completo para PMEs",
        "description": "Centro de recursos NIS2 para PMEs portuguesas com 15+ guias sobre conformidade, registo CNCS, notificação de incidentes e implementação prática.",
        "inLanguage": "pt-PT",
        "about": {
          "@type": "Thing",
          "name": "Diretiva NIS2 em Portugal"
        },
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": nis2Posts.length,
          "itemListElement": nis2Posts.map((post, index) => ({
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
        "@id": "https://ciberpme.vercel.app/blog/nis2#breadcrumb",
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
              "@id": "https://ciberpme.vercel.app/blog",
              "name": "Blog"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@id": "https://ciberpme.vercel.app/blog/nis2",
              "name": "NIS2 Portugal"
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
      <Header currentPath="/blog/nis2" />

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
            <li>
              <Link href="/blog" className="hover:text-accent transition">
                Blog
              </Link>
            </li>
            <li className="text-border">›</li>
            <li className="text-text font-medium">NIS2 Portugal</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand mb-6 font-display text-balance">
              NIS2 Portugal: Hub Completo para PMEs
            </h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed text-balance">
              Centro de recursos com {nis2Posts.length} guias práticos sobre a Diretiva NIS2 em Portugal.
              Tudo o que precisa para implementar conformidade na sua PME: registo CNCS, análise de riscos,
              notificação de incidentes e medidas técnicas obrigatórias.
            </p>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2 font-display">Prazo CNCS: 4 Maio 2026</h3>
              <p className="text-sm text-text-secondary">
                Registo obrigatório no portal CNCS para empresas abrangidas pela NIS2 em Portugal.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2 font-display">{nis2Posts.length} Guias Práticos</h3>
              <p className="text-sm text-text-secondary">
                Do básico à implementação avançada: conformidade, incidentes, fornecedores e análise de riscos.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2 font-display">PMEs Portuguesas</h3>
              <p className="text-sm text-text-secondary">
                Conteúdo específico para o mercado português, com referências ao Decreto-Lei 125/2025.
              </p>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-brand mb-4 font-display text-balance">
                Prazo de Conformidade
              </h2>
              <p className="text-text-secondary mb-8">
                Tempo restante para implementar as medidas de conformidade NIS2:
              </p>

              {countdown.isExpired ? (
                <div className="p-8 rounded-xl border border-border bg-bg-subtle">
                  <p className="text-2xl font-bold text-error mb-2">Prazo Expirado</p>
                  <p className="text-text-secondary">
                    A data limite de 3 de abril de 2026 passou. Contacte um consultor especializado.
                  </p>
                </div>
              ) : (
                <div className="p-8 rounded-xl border border-border bg-bg-subtle">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-accent mb-2">
                        {countdown.days}
                      </div>
                      <div className="text-text-secondary">
                        {countdown.days === 1 ? "dia restante" : "dias restantes"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-text-secondary">até</div>
                      <div className="text-xl font-bold text-brand">3 de Abril 2026</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <h2 className="text-3xl font-bold text-brand mb-4 text-center font-display text-balance">
              {nis2Posts.length} Guias NIS2 para PMEs Portuguesas
            </h2>
            <p className="text-text-secondary text-center mb-12 text-balance">
              Artigos ordenados do básico à implementação avançada para ajudar a sua empresa
              a implementar conformidade com a Diretiva NIS2 em Portugal.
            </p>

            {nis2Posts.length === 0 ? (
              <p className="text-text-muted text-center">
                Nenhum artigo NIS2 encontrado.
              </p>
            ) : (
              <div className="space-y-6">
                {nis2Posts.map((post, index) => {
                  // Dynamic level assignment based on content type
                  let level = "Implementação";
                  let levelColor = "bg-bg-subtle text-text-secondary border-border";

                  if (index < 3 || post.slug.includes("o-que") || post.slug.includes("entrou-em-vigor")) {
                    level = "Introdução";
                    levelColor = "bg-accent-light text-accent border-accent/20";
                  } else if (post.slug.includes("checklist") || post.slug.includes("conformidade") || post.slug.includes("guia")) {
                    level = "Conformidade";
                    levelColor = "bg-accent-light text-accent border-accent/20";
                  } else if (post.slug.includes("prazo") || post.slug.includes("registo") || post.slug.includes("urgente")) {
                    level = "Urgente";
                    levelColor = "bg-warning-bg text-warning-text border-warning/20";
                  }

                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block p-6 rounded-xl border border-border hover:border-accent hover:shadow-sm transition"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border ${levelColor}`}>
                          {level}
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

            {/* Internal Links for Topical Authority - 10+ NIS2 links */}
            <div className="mt-12 p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-4">Tópicos NIS2 Essenciais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                <Link
                  href="/blog/nis2-portugal-o-que-pmes-precisam-saber"
                  className="text-accent hover:underline transition"
                >
                  → Introdução à NIS2 em Portugal
                </Link>
                <Link
                  href="/blog/registo-cncs-nis2-prazo-4-maio-2026"
                  className="text-accent hover:underline transition"
                >
                  → Registo CNCS obrigatório
                </Link>
                <Link
                  href="/blog/checklist-nis2-conformidade"
                  className="text-accent hover:underline transition"
                >
                  → Checklist de conformidade
                </Link>
                <Link
                  href="/blog/nis2-notificacao-incidentes-pme-24-72-horas"
                  className="text-accent hover:underline transition"
                >
                  → Notificação de incidentes
                </Link>
                <Link
                  href="/blog/nis2-cadeia-fornecimento-pme"
                  className="text-accent hover:underline transition"
                >
                  → Gestão da cadeia de fornecimento
                </Link>
                <Link
                  href="/blog/multas-coimas-nis2-pme"
                  className="text-accent hover:underline transition"
                >
                  → Multas e coimas NIS2
                </Link>
                <Link
                  href="/blog/nis2-decreto-lei-125-2025-obrigacoes-pme"
                  className="text-accent hover:underline transition"
                >
                  → Decreto-Lei 125/2025
                </Link>
                <Link
                  href="/blog/nis2-vs-rgpd-diferencas"
                  className="text-accent hover:underline transition"
                >
                  → NIS2 vs RGPD: diferenças
                </Link>
                <Link
                  href="/blog/nis2-portugal-guia-pme"
                  className="text-accent hover:underline transition"
                >
                  → Guia completo de implementação
                </Link>
                <Link
                  href="/blog/checklist-nis2-10-passos-conformidade"
                  className="text-accent hover:underline transition"
                >
                  → 10 passos para conformidade
                </Link>
                <Link
                  href="/blog/nis2-pos-registo-proximos-passos-pme"
                  className="text-accent hover:underline transition"
                >
                  → Passos pós-registo
                </Link>
                <Link
                  href="/blog/nis2-entrou-em-vigor"
                  className="text-accent hover:underline transition"
                >
                  → NIS2 entrou em vigor
                </Link>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-8 p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-4">Recursos Relacionados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <Link
                  href="/blog?categoria=legislacao"
                  className="text-accent hover:underline transition"
                >
                  → Todos os artigos sobre Legislação
                </Link>
                <Link
                  href="/blog?categoria=boas-praticas"
                  className="text-accent hover:underline transition"
                >
                  → Boas Práticas de Cibersegurança
                </Link>
                <Link
                  href="/blog?categoria=ferramentas"
                  className="text-accent hover:underline transition"
                >
                  → Ferramentas de Segurança para PMEs
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
      </main>

      <Footer />
    </div>
  );
}