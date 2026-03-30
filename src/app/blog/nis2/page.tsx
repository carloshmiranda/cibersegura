import Link from "next/link";
import { posts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NIS2 em Portugal: Guia Completo para PMEs — CiberPME",
  description:
    "Tudo sobre a Diretiva NIS2 em Portugal. Saiba se a sua PME está abrangida, requisitos obrigatórios e como garantir conformidade até 3 de abril de 2026.",
  openGraph: {
    title: "NIS2 em Portugal: Guia Completo para PMEs",
    description:
      "Tudo sobre a Diretiva NIS2 em Portugal. Saiba se a sua PME está abrangida, requisitos obrigatórios e como garantir conformidade até 3 de abril de 2026.",
    type: "website",
  },
};

// Filter NIS2 articles (category "legislacao" and slug containing "nis2")
const nis2Posts = posts
  .filter((post) => post.category === "legislacao" && post.slug.includes("nis2"))
  .sort((a, b) => {
    // Order from beginner to advanced based on slug
    const order = [
      "nis2-portugal-o-que-pmes-precisam-saber", // Overview - beginner
      "nis2-portugal-guia-pme", // Detailed guide - intermediate
      "checklist-nis2-conformidade", // Implementation checklist - advanced
    ];
    return order.indexOf(a.slug) - order.indexOf(b.slug);
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

export default function NIS2SiloPage() {
  const countdown = getCountdownData();

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-brand">
          CiberPME
        </Link>
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <Link href="/blog" className="hover:text-brand transition">
            Blog
          </Link>
          <Link href="/#sobre" className="hover:text-brand transition">
            Sobre
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand mb-6">
              NIS2 em Portugal
            </h1>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              A Diretiva NIS2 entra em vigor em Portugal a 3 de abril de 2026 através do Decreto-Lei 125/2025.
              Esta nova legislação europeia expande significativamente o número de empresas obrigadas a cumprir
              requisitos rigorosos de cibersegurança.
            </p>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2">18 Setores Abrangidos</h3>
              <p className="text-sm text-text-secondary">
                De energia a administração pública, a NIS2 expande de 7 para 18 setores regulamentados.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2">PMEs Incluídas</h3>
              <p className="text-sm text-text-secondary">
                Empresas médias (50-249 trabalhadores) em setores essenciais estão automaticamente abrangidas.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-bg-subtle">
              <h3 className="font-bold text-brand mb-2">Multas até 2%</h3>
              <p className="text-sm text-text-secondary">
                Penalizações podem chegar a 2% do volume de negócios anual global da empresa.
              </p>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-brand mb-4">
                Prazo de Conformidade
              </h2>
              <p className="text-text-secondary mb-8">
                Tempo restante para implementar as medidas de conformidade NIS2:
              </p>

              {countdown.isExpired ? (
                <div className="p-8 rounded-xl border border-error bg-error/5">
                  <p className="text-2xl font-bold text-error mb-2">Prazo Expirado</p>
                  <p className="text-text-secondary">
                    A data limite de 3 de abril de 2026 passou. Contacte um consultor especializado.
                  </p>
                </div>
              ) : (
                <div className="p-8 rounded-xl border border-accent bg-accent/5">
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
            <h2 className="text-3xl font-bold text-brand mb-4 text-center">
              Guias NIS2 para PMEs Portuguesas
            </h2>
            <p className="text-text-secondary text-center mb-12">
              Artigos ordenados do básico ao avançado para ajudar a sua empresa a implementar
              conformidade com a Diretiva NIS2.
            </p>

            {nis2Posts.length === 0 ? (
              <p className="text-text-muted text-center">
                Nenhum artigo NIS2 encontrado.
              </p>
            ) : (
              <div className="space-y-6">
                {nis2Posts.map((post, index) => {
                  const levelLabels = ["Introdução", "Implementação", "Conformidade"];
                  const levelColors = [
                    "bg-success/10 text-success border-success/20",
                    "bg-warning/10 text-warning border-warning/20",
                    "bg-accent/10 text-accent border-accent/20",
                  ];

                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block p-6 rounded-xl border border-border hover:border-accent hover:shadow-sm transition"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border ${levelColors[index] || levelColors[0]}`}>
                          {levelLabels[index] || "Avançado"}
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

            {/* Internal Links for Topical Authority */}
            <div className="mt-12 p-6 rounded-xl border border-border bg-bg-subtle">
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

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-brand">CiberPME</span>
          <div className="flex gap-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-brand transition">
              Início
            </Link>
            <Link href="/blog" className="hover:text-brand transition">
              Blog
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