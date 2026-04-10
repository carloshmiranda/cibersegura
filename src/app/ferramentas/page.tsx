import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import { NewsletterForm } from "../newsletter-form";

export const metadata: Metadata = {
  title: "Ferramentas Práticas de Cibersegurança — CiberPME",
  description:
    "Listas de verificação, templates e ferramentas gratuitas de cibersegurança para PMEs portuguesas. Implemente medidas de segurança na sua empresa com os nossos guias práticos.",
  alternates: {
    canonical: "https://ciberpme.vercel.app/ferramentas",
  },
  openGraph: {
    title: "Ferramentas Práticas de Cibersegurança — CiberPME",
    description:
      "Listas de verificação, templates e ferramentas gratuitas de cibersegurança para PMEs portuguesas. Implemente medidas de segurança na sua empresa com os nossos guias práticos.",
    type: "website",
    url: "https://ciberpme.vercel.app/ferramentas",
    images: [
      {
        url: "/api/og?title=Ferramentas%20Práticas%20de%20Cibersegurança",
        width: 1200,
        height: 630,
        alt: "Ferramentas Práticas de Cibersegurança para PMEs",
      },
    ],
  },
};

interface Tool {
  title: string;
  description: string;
  type: "checklist" | "template" | "guide" | "assessment";
  typeLabel: string;
  estimatedTime: string;
  difficulty: "Básico" | "Intermédio" | "Avançado";
  downloadUrl?: string;
  sections: string[];
  benefits: string[];
}

interface ToolCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  tools: Tool[];
}

const categories: ToolCategory[] = [
  {
    title: "Avaliação e Auditoria",
    description: "Ferramentas para avaliar o estado atual da cibersegurança da sua empresa.",
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
          d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.194-.14 1.743"
        />
      </svg>
    ),
    tools: [
      {
        title: "Lista de Verificação de Cibersegurança para PMEs",
        description:
          "Avaliação completa de 50 pontos para identificar vulnerabilidades na sua infraestrutura IT, políticas de segurança e práticas dos colaboradores.",
        type: "checklist",
        typeLabel: "Lista de Verificação",
        estimatedTime: "2-3 horas",
        difficulty: "Básico",
        sections: [
          "Segurança da rede e firewall",
          "Gestão de utilizadores e acessos",
          "Proteção de dados e backup",
          "Segurança dos endpoints",
          "Políticas e formação",
        ],
        benefits: [
          "Identifica rapidamente vulnerabilidades críticas",
          "Adequada para empresas sem departamento IT",
          "Inclui priorização de ações corretivas",
        ],
      },
      {
        title: "Auditoria RGPD Simplificada",
        description:
          "Template de auditoria para verificar a conformidade da sua empresa com o Regulamento Geral sobre a Proteção de Dados.",
        type: "assessment",
        typeLabel: "Avaliação",
        estimatedTime: "4-6 horas",
        difficulty: "Intermédio",
        sections: [
          "Inventário de dados pessoais",
          "Base legal para tratamento",
          "Direitos dos titulares",
          "Medidas técnicas e organizativas",
          "Transferências internacionais",
        ],
        benefits: [
          "Reduz risco de multas RGPD",
          "Identifica gaps de conformidade",
          "Inclui plano de ação corretiva",
        ],
      },
      {
        title: "Avaliação de Risco de Fornecedores",
        description:
          "Questionário estruturado para avaliar os riscos de cibersegurança dos seus fornecedores e prestadores de serviços externos.",
        type: "template",
        typeLabel: "Template",
        estimatedTime: "1-2 horas por fornecedor",
        difficulty: "Intermédio",
        sections: [
          "Certificações de segurança",
          "Políticas de proteção de dados",
          "Gestão de incidentes",
          "Contratos e SLAs de segurança",
          "Auditoria e monitoria contínua",
        ],
        benefits: [
          "Cumpre requisitos NIS2",
          "Padroniza avaliação de fornecedores",
          "Reduz riscos da cadeia de fornecimento",
        ],
      },
    ],
  },
  {
    title: "Políticas e Procedimentos",
    description: "Templates de políticas de segurança adaptadas para pequenas e médias empresas.",
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
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    tools: [
      {
        title: "Política de Segurança da Informação",
        description:
          "Template completo de política de segurança adequada para PMEs, com cláusulas específicas para o contexto português e RGPD.",
        type: "template",
        typeLabel: "Template",
        estimatedTime: "3-4 horas",
        difficulty: "Intermédio",
        sections: [
          "Objetivos e âmbito da política",
          "Responsabilidades dos colaboradores",
          "Classificação da informação",
          "Controlos de acesso",
          "Gestão de incidentes",
        ],
        benefits: [
          "Cumpre requisitos legais portugueses",
          "Adequada para empresas 10-250 funcionários",
          "Inclui formulários de implementação",
        ],
      },
      {
        title: "Procedimento de Resposta a Incidentes",
        description:
          "Guia passo-a-passo para responder a incidentes de cibersegurança, desde a deteção até à recuperação completa.",
        type: "guide",
        typeLabel: "Guia",
        estimatedTime: "2-3 horas",
        difficulty: "Básico",
        sections: [
          "Classificação de incidentes",
          "Equipa de resposta",
          "Procedimentos de contenção",
          "Investigação e evidências",
          "Recuperação e lições aprendidas",
        ],
        benefits: [
          "Reduz tempo de resposta a incidentes",
          "Minimiza impacto nos negócios",
          "Cumpre obrigações de notificação",
        ],
      },
      {
        title: "Política de Trabalho Remoto Seguro",
        description:
          "Diretrizes e controlos de segurança para colaboradores que trabalham remotamente ou em regime híbrido.",
        type: "template",
        typeLabel: "Template",
        estimatedTime: "1-2 horas",
        difficulty: "Básico",
        sections: [
          "Segurança do equipamento",
          "Conexões de rede seguras",
          "Proteção de dados em casa",
          "Comunicações seguras",
          "Boas práticas gerais",
        ],
        benefits: [
          "Protege dados fora do escritório",
          "Reduz riscos do trabalho remoto",
          "Facilita adoção de políticas",
        ],
      },
    ],
  },
  {
    title: "Formação e Sensibilização",
    description: "Materiais para educar colaboradores sobre cibersegurança e boas práticas.",
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
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
    tools: [
      {
        title: "Kit de Sensibilização para Phishing",
        description:
          "Materiais de formação para educar colaboradores sobre como identificar e reportar tentativas de phishing e engenharia social.",
        type: "guide",
        typeLabel: "Guia",
        estimatedTime: "30 min por sessão",
        difficulty: "Básico",
        sections: [
          "Como reconhecer emails suspeitos",
          "Verificação de links e anexos",
          "Proteção de credenciais",
          "Reportar tentativas de phishing",
          "Exercícios práticos",
        ],
        benefits: [
          "Reduz sucesso de ataques de phishing",
          "Aumenta consciência dos colaboradores",
          "Inclui slides para apresentação",
        ],
      },
      {
        title: "Guia de Passwords Seguras",
        description:
          "Material educativo sobre criação, gestão e proteção de passwords, incluindo utilização de gestores de passwords.",
        type: "guide",
        typeLabel: "Guia",
        estimatedTime: "45 min",
        difficulty: "Básico",
        sections: [
          "Características de passwords fortes",
          "Gestores de passwords",
          "Autenticação de dois fatores",
          "Passwords únicas por serviço",
          "Boas práticas diárias",
        ],
        benefits: [
          "Melhora higiene de passwords",
          "Reduz reutilização de credenciais",
          "Inclui recomendações de ferramentas",
        ],
      },
    ],
  },
  {
    title: "Implementação Técnica",
    description: "Guias passo-a-passo para implementar medidas de segurança específicas.",
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
          d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
        />
      </svg>
    ),
    tools: [
      {
        title: "Configuração Segura de Microsoft 365",
        description:
          "Guia detalhado para configurar controlos de segurança essenciais no Microsoft 365 para pequenas empresas.",
        type: "guide",
        typeLabel: "Guia",
        estimatedTime: "3-4 horas",
        difficulty: "Intermédio",
        sections: [
          "Configuração de MFA",
          "Políticas de acesso condicional",
          "Proteção contra phishing",
          "Backup de dados",
          "Monitoria de atividade suspeita",
        ],
        benefits: [
          "Melhora segurança do M365",
          "Adequado para administradores não especializados",
          "Inclui capturas de ecrã passo-a-passo",
        ],
      },
      {
        title: "Implementação de Backup 3-2-1",
        description:
          "Guia prático para implementar a estratégia de backup 3-2-1 (3 cópias, 2 meios, 1 offsite) em PMEs.",
        type: "guide",
        typeLabel: "Guia",
        estimatedTime: "4-6 horas",
        difficulty: "Avançado",
        sections: [
          "Identificação de dados críticos",
          "Seleção de soluções de backup",
          "Configuração de backup automático",
          "Testes de recuperação",
          "Monitoria e manutenção",
        ],
        benefits: [
          "Protege contra ransomware",
          "Garante continuidade do negócio",
          "Inclui comparação de ferramentas",
        ],
      },
    ],
  },
];

export default function FerramentasPage() {
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
            <Link href="/ferramentas" className="text-brand font-bold" aria-current="page">
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
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-brand transition">
            Início
          </Link>
          <span>/</span>
          <span className="text-text-secondary">Ferramentas</span>
        </div>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand mb-6 text-balance font-display tracking-tight">
            Ferramentas Práticas de Cibersegurança
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto text-pretty">
            Listas de verificação, templates e guias práticos para implementar
            medidas de cibersegurança na sua PME. Todas as ferramentas são
            gratuitas e adaptadas à realidade das empresas portuguesas.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-12 p-6 rounded-xl bg-warning-bg border border-warning/20">
          <div className="flex items-start gap-3">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-warning flex-shrink-0 mt-0.5"
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
            <div>
              <p className="text-sm text-warning-text font-medium mb-1">
                <strong>Aviso Legal:</strong>
              </p>
              <p className="text-sm text-warning-text">
                Estas ferramentas são materiais informativos e educativos. Não
                constituem aconselhamento legal ou de segurança profissional.
                Recomendamos consultar especialistas para necessidades específicas
                da sua empresa.
              </p>
            </div>
          </div>
        </div>

        {/* Tool Categories */}
        <div className="space-y-20">
          {categories.map((category, index) => (
            <section key={index} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-12">
                {category.icon}
                <div>
                  <h2 className="text-3xl font-bold text-brand text-balance font-display">
                    {category.title}
                  </h2>
                  <p className="text-text-secondary text-lg text-pretty">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {category.tools.map((tool, toolIndex) => (
                  <div
                    key={toolIndex}
                    className="p-6 rounded-xl border border-border hover:border-accent hover:shadow-md transition group"
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent-light rounded-full">
                          {tool.typeLabel}
                        </span>
                        <span className="text-xs text-text-muted px-2 py-1 bg-bg-subtle rounded">
                          {tool.difficulty}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-brand mb-3 text-balance font-display leading-tight">
                        {tool.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed text-pretty">
                        {tool.description}
                      </p>
                    </div>

                    {/* Estimated Time */}
                    <div className="flex items-center gap-2 mb-4 text-xs text-text-muted">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <span>Tempo estimado: {tool.estimatedTime}</span>
                    </div>

                    {/* Sections */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-brand mb-3">
                        O que inclui:
                      </h4>
                      <ul className="space-y-2">
                        {tool.sections.map((section, sectionIndex) => (
                          <li
                            key={sectionIndex}
                            className="text-xs text-text-secondary flex items-start gap-2"
                          >
                            <svg
                              aria-hidden="true"
                              className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                            {section}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium text-brand mb-3">
                        Benefícios principais:
                      </h4>
                      <ul className="space-y-1">
                        {tool.benefits.map((benefit, benefitIndex) => (
                          <li
                            key={benefitIndex}
                            className="text-xs text-text-secondary flex items-start gap-2"
                          >
                            <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA - Simplified to newsletter signup for MVP */}
                    <div className="border-t border-border pt-6">
                      <p className="text-xs text-text-muted mb-3">
                        Subscreva a newsletter para receber esta ferramenta gratuitamente:
                      </p>
                      <Link
                        href="#newsletter"
                        className="inline-block w-full text-center px-4 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition"
                      >
                        Aceder à Ferramenta
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Newsletter CTA */}
        <section id="newsletter" className="mt-20 bg-bg-subtle py-16 rounded-xl">
          <div className="max-w-md mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-brand mb-4 text-balance font-display">
              Aceda a todas as ferramentas gratuitamente
            </h2>
            <p className="text-text-secondary mb-6 text-pretty">
              Subscreva a nossa newsletter e receba acesso imediato a todas as
              listas de verificação, templates e guias práticos de cibersegurança.
            </p>
            <NewsletterForm />
            <p className="text-xs text-text-muted mt-4">
              Sem spam. Apenas conteúdo útil para proteger a sua empresa.{" "}
              <Link href="/politica-privacidade" className="underline hover:text-brand transition">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </section>

        {/* Related Resources */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-brand mb-8 text-center text-balance font-display">
            Recursos Relacionados
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
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
            <Link
              href="/recursos"
              className="p-6 rounded-xl border border-border hover:border-accent transition group"
            >
              <h3 className="font-bold text-brand mb-2 group-hover:text-accent transition">
                Catálogo de Recursos
              </h3>
              <p className="text-sm text-text-secondary">
                Ferramentas, serviços e software recomendados para proteger
                a sua empresa.
              </p>
            </Link>
            <Link
              href="/faq"
              className="p-6 rounded-xl border border-border hover:border-accent transition group"
            >
              <h3 className="font-bold text-brand mb-2 group-hover:text-accent transition">
                Perguntas Frequentes
              </h3>
              <p className="text-sm text-text-secondary">
                Respostas às dúvidas mais comuns sobre cibersegurança
                para PMEs portuguesas.
              </p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}