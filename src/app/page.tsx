import Link from "next/link";
import { posts, CATEGORIES } from "@/lib/posts";
import { NewsletterForm } from "./newsletter-form";
import { NIS2Banner } from "@/components/nis2-banner";
import Footer from "@/components/footer";
import { neon } from "@neondatabase/serverless";
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

async function getWaitlistCount() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const [{ count }] = await sql`SELECT COUNT(*) as count FROM waitlist`;
    return Number(count);
  } catch (error) {
    console.error("Failed to fetch waitlist count:", error);
    return 0;
  }
}

export default async function HomePage() {
  const waitlistCount = await getWaitlistCount();

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <header>
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-brand" aria-current="page">
            {COMPANY_NAME}
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
            <Link href="#sobre" className="hover:text-brand transition">
              Sobre
            </Link>
          </div>
        </nav>
      </header>

      {/* NIS2 Urgency Banner */}
      <NIS2Banner />

      <main id="main-content">
        {/* Hero — dark navy */}
        <section className="bg-brand pt-16 pb-20 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight text-balance font-display">
              Cibersegurança para PMEs Portuguesas
            </h1>
            <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed text-pretty">
              Artigos práticos, guias e ferramentas para proteger o seu negócio
              contra ameaças digitais. Conteúdo em português, pensado para
              pequenas e médias empresas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/avaliacao-seguranca"
                className="px-8 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition"
              >
                Avaliar a Minha Empresa
              </Link>
              <a
                href="#newsletter"
                className="px-8 py-3 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition"
              >
                Subscrever Newsletter
              </a>
            </div>
          </div>
        </section>

        {/* Social Proof — only show if we have real signups */}
        {waitlistCount > 0 && (
          <section className="bg-bg-subtle py-12">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <p className="text-text-secondary text-sm">
                Juntaram-se {waitlistCount > 1 ? <strong>{waitlistCount}</strong> : <strong>{waitlistCount}</strong>} {waitlistCount === 1 ? "empresa" : "empresas"} à nossa newsletter de cibersegurança
              </p>
            </div>
          </section>
        )}

        {/* Problem — specific to Portuguese SMEs */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand mb-4 text-balance font-display">
              As PMEs portuguesas enfrentam ameaças crescentes
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto text-pretty">
              Sem departamento de IT dedicado, muitas empresas ficam vulneráveis a ataques que podem custar milhares de euros.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-error">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-brand mb-2">Ransomware em alta</h3>
              <p className="text-sm text-text-secondary text-pretty">
                Ataques aumentaram 40% em Portugal nos últimos 2 anos, com PMEs como alvo principal.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-warning">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H4.5m2.25 0v3.75m0-3.75a1.875 1.875 0 0 1 1.875-1.875h1.875m0 0v.375c0 .621-.504 1.125-1.125 1.125h-1.5m0-3.75v.375c0 .621.504 1.125 1.125 1.125h1.5m-3.75 0V2.25m0 1.5v.375a1.125 1.125 0 0 1-1.125 1.125H9.75v1.5m3 0V4.875c0-.621.504-1.125 1.125-1.125h1.875a1.125 1.125 0 0 1 1.125 1.125v.375m-6 5.25v-.375a1.125 1.125 0 0 1 1.125-1.125h1.875a1.125 1.125 0 0 1 1.125 1.125v.375m-6 0V9.75a1.875 1.875 0 0 1 1.875-1.875h1.875A1.875 1.875 0 0 1 16.5 9.75v.375m-6 0h.008v.008H9.75V15Zm0 0v.375A1.125 1.125 0 0 1 8.625 16.5h-1.25A1.125 1.125 0 0 1 6.25 15.375v-.375m3.5 0v-.375A1.125 1.125 0 0 1 10.875 14.5h1.25a1.125 1.125 0 0 1 1.125 1.125v.375m-3.5 0h2.25v-.375a1.125 1.125 0 0 1 1.125-1.125H15.5a1.875 1.875 0 0 1 1.875 1.875v.375m-6.75 0V15a2.25 2.25 0 1 1 4.5 0v.375M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-brand mb-2">RGPD e compliance</h3>
              <p className="text-sm text-text-secondary text-pretty">
                Falhas de segurança podem resultar em multas até 20 milhões de euros sob o RGPD.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-accent">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-brand mb-2">Falta de tempo</h3>
              <p className="text-sm text-text-secondary text-pretty">
                Empresários focados no negócio não têm tempo para se manterem atualizados sobre ameaças.
              </p>
            </div>
          </div>
        </section>

        {/* Features — benefits of using CiberPME */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand mb-4 text-balance font-display">
              Proteja a sua empresa com conhecimento prático
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto text-pretty">
              Receba orientações claras, alertas de segurança e ferramentas testadas para manter o seu negócio seguro.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-accent">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189 6.01 6.01 0 0 0 1.125-2.486c.729-.065 1.434-.403 1.984-.963A3.961 3.961 0 0 0 18 7.5a3.968 3.968 0 0 0-3-3.85V3a.75.75 0 0 0-1.5 0v.65A3.968 3.968 0 0 0 10.5 7.5a3.961 3.961 0 0 0 1.391 3.002c.55.56 1.255.898 1.984.963a6.01 6.01 0 0 0 1.125 2.486A6.01 6.01 0 0 0 16.5 14.25H12Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand mb-3 font-display">Conteúdo verificado</h3>
              <p className="text-text-secondary text-pretty">
                Artigos revistos por especialistas em cibersegurança, adaptados à realidade das PMEs portuguesas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-accent">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand mb-3 font-display">Alertas antecipados</h3>
              <p className="text-text-secondary text-pretty">
                Seja o primeiro a saber sobre novas ameaças e vulnerabilidades que podem afetar o seu setor.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-accent">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.194-.14 1.743"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand mb-3 font-display">Ferramentas práticas</h3>
              <p className="text-text-secondary text-pretty">
                Guias passo-a-passo e listas de verificação que pode implementar hoje na sua empresa.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-accent hover:text-accent transition"
            >
              Ver todos os artigos
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-bg-subtle py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand mb-4 text-balance font-display">
                Como funciona o CiberPME
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto text-pretty">
                Três passos simples para manter a sua empresa protegida contra ameaças digitais.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold text-brand mb-3 font-display">Subscreva a newsletter</h3>
                <p className="text-text-secondary text-pretty">
                  Receba artigos semanais e alertas de segurança directamente no seu email. Conteúdo curado e verificado por especialistas.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-bold text-brand mb-3 font-display">Implemente as práticas</h3>
                <p className="text-text-secondary text-pretty">
                  Use os nossos guias passo-a-passo para fortalecer a segurança da sua empresa. Cada artigo inclui listas de verificação práticas.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-bold text-brand mb-3 font-display">Mantenha-se atualizado</h3>
                <p className="text-text-secondary text-pretty">
                  Continue a receber alertas sobre novas ameaças e ferramentas de proteção adequadas ao seu setor e dimensão.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-bg-subtle py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl font-bold text-brand mb-8 text-center text-balance font-display">
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
                        aria-hidden="true"
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
                        aria-hidden="true"
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
                        aria-hidden="true"
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
                        aria-hidden="true"
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
                    {key === "formacao" && (
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 mx-auto text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
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
          <h2 className="text-xl font-bold text-brand mb-4 text-center text-balance font-display">
            Sobre o CiberPME
          </h2>
          <p className="text-text-secondary text-center leading-relaxed max-w-xl mx-auto mb-6 text-pretty">
            O CiberPME é um recurso gratuito dedicado a ajudar pequenas e
            médias empresas portuguesas a protegerem-se contra ameaças digitais.
            Publicamos artigos práticos, guias passo-a-passo e análises de
            ferramentas, tudo em português e adaptado à realidade do mercado
            nacional.
          </p>
          <p className="text-text-secondary text-center leading-relaxed max-w-xl mx-auto text-pretty">
            Acreditamos que a cibersegurança não deve ser um luxo reservado a
            grandes empresas. Com as práticas certas, qualquer PME pode proteger
            os seus dados, os seus clientes e o seu negócio.
          </p>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-brand mb-12 text-center text-balance font-display">
            Perguntas frequentes
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-brand mb-2">
                O CiberPME é adequado para a minha pequena empresa?
              </h3>
              <p className="text-text-secondary text-pretty">
                Sim. O nosso conteúdo é especificamente direcionado para PMEs portuguesas com recursos limitados.
                Focamos em soluções práticas e económicas que pode implementar sem um departamento de IT dedicado.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand mb-2">
                Preciso de conhecimentos técnicos para seguir os vossos conselhos?
              </h3>
              <p className="text-text-secondary text-pretty">
                Não. Todos os nossos artigos são escritos em linguagem clara, com instruções passo-a-passo.
                Quando abordarmos temas mais técnicos, explicamos tudo de forma acessível.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand mb-2">
                Quanto custa implementar as vossas recomendações?
              </h3>
              <p className="text-text-secondary text-pretty">
                A maioria das nossas recomendações são gratuitas ou de baixo custo. Priorizamos sempre soluções
                acessíveis e indicamos quando uma ferramenta pode ter custos associados.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand mb-2">
                Com que frequência publicam novo conteúdo?
              </h3>
              <p className="text-text-secondary text-pretty">
                Publicamos artigos semanalmente e enviamos alertas de segurança sempre que surge uma ameaça
                relevante. A newsletter semanal resume as principais novidades em cibersegurança.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand mb-2">
                Posso confiar na informação que partilham?
              </h3>
              <p className="text-text-secondary text-pretty">
                Todo o nosso conteúdo é verificado por especialistas em cibersegurança e baseado em fontes oficiais.
                Citamos sempre as nossas fontes e atualizamos artigos quando surgem novas informações.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section id="newsletter" className="bg-bg-subtle py-20">
          <div className="max-w-md mx-auto px-6 text-center">
            <h2 className="text-xl font-bold text-brand mb-4 text-balance font-display">
              Receba as nossas dicas de segurança
            </h2>
            <p className="text-text-secondary mb-3 text-pretty">
              Subscreva a newsletter e receba artigos, alertas de segurança e
              guias práticos directamente no seu email.
            </p>
            <p className="text-sm text-text-secondary mt-3 mb-8 text-pretty">
              Conteúdo verificado por especialistas.{' '}
              <Link href="/blog" className="underline hover:text-brand transition">
                Ver artigos publicados →
              </Link>
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>

      <Footer />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "O CiberPME é adequado para a minha pequena empresa?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim. O nosso conteúdo é especificamente direcionado para PMEs portuguesas com recursos limitados. Focamos em soluções práticas e económicas que pode implementar sem um departamento de IT dedicado."
                }
              },
              {
                "@type": "Question",
                "name": "Preciso de conhecimentos técnicos para seguir os vossos conselhos?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Não. Todos os nossos artigos são escritos em linguagem clara, com instruções passo-a-passo. Quando abordarmos temas mais técnicos, explicamos tudo de forma acessível."
                }
              },
              {
                "@type": "Question",
                "name": "Quanto custa implementar as vossas recomendações?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A maioria das nossas recomendações são gratuitas ou de baixo custo. Priorizamos sempre soluções acessíveis e indicamos quando uma ferramenta pode ter custos associados."
                }
              },
              {
                "@type": "Question",
                "name": "Com que frequência publicam novo conteúdo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Publicamos artigos semanalmente e enviamos alertas de segurança sempre que surge uma ameaça relevante. A newsletter semanal resume as principais novidades em cibersegurança."
                }
              },
              {
                "@type": "Question",
                "name": "Posso confiar na informação que partilham?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Todo o nosso conteúdo é verificado por especialistas em cibersegurança e baseado em fontes oficiais. Citamos sempre as nossas fontes e atualizamos artigos quando surgem novas informações."
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
