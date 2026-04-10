import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Recursos de Cibersegurança — Ferramentas e Guias para PMEs",
  description:
    "Catálogo de ferramentas de cibersegurança recomendadas para pequenas e médias empresas portuguesas. Antivírus, backup, VPN, formação e mais recursos essenciais.",
  alternates: {
    canonical: "https://ciberpme.vercel.app/recursos",
  },
  openGraph: {
    title: "Recursos de Cibersegurança — Ferramentas e Guias para PMEs",
    description:
      "Catálogo de ferramentas de cibersegurança recomendadas para pequenas e médias empresas portuguesas. Antivírus, backup, VPN, formação e mais recursos essenciais.",
    type: "website",
    url: "https://ciberpme.vercel.app/recursos",
    images: [
      {
        url: "/api/og?title=Recursos%20de%20Cibersegurança",
        width: 1200,
        height: 630,
        alt: "Recursos de Cibersegurança para PMEs",
      },
    ],
  },
};

interface Tool {
  name: string;
  description: string;
  pricing: string;
  pros: string[];
  ideal: string;
  website: string;
}

interface ResourceCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  tools: Tool[];
}

const categories: ResourceCategory[] = [
  {
    title: "Antivírus Empresarial",
    description:
      "Proteção contra malware, ransomware e ameaças avançadas com gestão centralizada.",
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
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
    tools: [
      {
        name: "Microsoft Defender Business",
        description:
          "Solução nativa do Microsoft 365 com proteção avançada contra ameaças e gestão centralizada.",
        pricing: "€3-5/utilizador/mês",
        pros: [
          "Integração perfeita com Microsoft 365",
          "Gestão através do portal de administração",
          "Proteção de email e colaboração incluída",
        ],
        ideal: "PMEs já no ecossistema Microsoft",
        website: "microsoft.com/pt-pt/security/business/threat-protection",
      },
      {
        name: "Bitdefender GravityZone Business Security",
        description:
          "Proteção empresarial com machine learning e controlo de dispositivos móveis.",
        pricing: "€25-35/dispositivo/ano",
        pros: [
          "Excelente deteção de ameaças zero-day",
          "Gestão de dispositivos móveis incluída",
          "Suporte técnico em português",
        ],
        ideal: "Empresas com dispositivos diversos (Windows, Mac, mobile)",
        website: "bitdefender.pt/business",
      },
      {
        name: "ESET Protect Entry",
        description:
          "Solução europeia com foco em performance e baixo impacto no sistema.",
        pricing: "€20-30/dispositivo/ano",
        pros: [
          "Muito baixo impacto na performance",
          "Interface intuitiva em português",
          "Excelente para ambientes com hardware limitado",
        ],
        ideal: "PMEs com sistemas mais antigos ou recursos limitados",
        website: "eset.pt/empresas/protect-entry",
      },
    ],
  },
  {
    title: "Backup e Recuperação",
    description:
      "Soluções para proteger dados críticos e garantir continuidade do negócio.",
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
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
    tools: [
      {
        name: "Microsoft 365 Backup",
        description:
          "Backup nativo para dados do Microsoft 365 (Exchange, SharePoint, OneDrive).",
        pricing: "€2-4/utilizador/mês",
        pros: [
          "Integração nativa com Microsoft 365",
          "Conformidade com RGPD incluída",
          "Retenção configurável por compliance",
        ],
        ideal: "Empresas dependentes do Microsoft 365",
        website: "microsoft.com/pt-pt/microsoft-365/backup",
      },
      {
        name: "Acronis Cyber Backup",
        description:
          "Backup híbrido para sistemas on-premises e cloud com proteção anti-ransomware.",
        pricing: "€50-150/mês",
        pros: [
          "Proteção ativa contra ransomware",
          "Backup completo de sistemas e dados",
          "Recuperação granular e rápida",
        ],
        ideal: "PMEs com infraestrutura mista (local + cloud)",
        website: "acronis.com/pt-pt/products/cyber-backup",
      },
      {
        name: "Veeam Backup Essentials",
        description:
          "Solução robusta para backup de máquinas virtuais e sistemas físicos.",
        pricing: "€400-800/ano",
        pros: [
          "Líder de mercado em backup empresarial",
          "Recuperação instantânea (Instant VM Recovery)",
          "Replicação para disaster recovery",
        ],
        ideal: "Empresas com VMware ou Hyper-V",
        website: "veeam.com/pt/backup-essentials",
      },
    ],
  },
  {
    title: "Gestão de Passwords",
    description:
      "Ferramentas para criar, armazenar e partilhar passwords de forma segura.",
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
          d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
        />
      </svg>
    ),
    tools: [
      {
        name: "Bitwarden Business",
        description:
          "Gestor de passwords open-source com funcionalidades empresariais avançadas.",
        pricing: "€3/utilizador/mês",
        pros: [
          "Open-source auditado publicamente",
          "Partilha segura entre equipas",
          "Compliance com standards internacionais",
        ],
        ideal: "PMEs que valorizam transparência e opensource",
        website: "bitwarden.com/products/business",
      },
      {
        name: "1Password Business",
        description:
          "Interface intuitiva com foco na experiência do utilizador e segurança empresarial.",
        pricing: "€7/utilizador/mês",
        pros: [
          "Interface mais intuitiva do mercado",
          "Integração com Single Sign-On (SSO)",
          "Relatórios detalhados de segurança",
        ],
        ideal: "Empresas que priorizam usabilidade",
        website: "1password.com/pt/business",
      },
      {
        name: "Dashlane Business",
        description:
          "Solução premium com VPN incluída e monitorização de dark web.",
        pricing: "€5-8/utilizador/mês",
        pros: [
          "VPN incluída no plano business",
          "Monitorização da dark web",
          "Autenticação multifator avançada",
        ],
        ideal: "PMEs que querem funcionalidades premium all-in-one",
        website: "dashlane.com/pt/business",
      },
    ],
  },
  {
    title: "VPN e Acesso Remoto",
    description:
      "Soluções para acesso seguro a recursos empresariais remotamente.",
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
          d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-10.5 9v-1.5m15-9v-1.5M8.25 21v-1.5m9-15V3m-9 9h9m-9-3h9m-9-3h9M8.25 9v6m9-6v6"
        />
      </svg>
    ),
    tools: [
      {
        name: "NordLayer",
        description:
          "VPN empresarial com gestão centralizada e controlo de acesso granular.",
        pricing: "€5-7/utilizador/mês",
        pros: [
          "Implementação muito rápida",
          "Interface de gestão intuitiva",
          "Servidores otimizados na Europa",
        ],
        ideal: "PMEs que precisam de VPN empresarial rapidamente",
        website: "nordlayer.com",
      },
      {
        name: "Cisco AnyConnect",
        description:
          "Solução enterprise com integração em firewalls Cisco e funcionalidades avançadas.",
        pricing: "€50-100/utilizador/ano",
        pros: [
          "Integração perfeita com equipamentos Cisco",
          "Funcionalidades enterprise robustas",
          "Suporte técnico premium",
        ],
        ideal: "Empresas com infraestrutura Cisco existente",
        website: "cisco.com/c/en/us/products/security/anyconnect-secure-mobility-client",
      },
      {
        name: "Fortinet FortiClient",
        description:
          "Cliente VPN integrado com antivírus e proteção de endpoint.",
        pricing: "€30-60/utilizador/ano",
        pros: [
          "Cliente integrado com antivírus",
          "Gestão unificada de segurança",
          "Boa relação qualidade/preço",
        ],
        ideal: "PMEs que querem segurança unificada (VPN + antivírus)",
        website: "fortinet.com/products/endpoint-security/forticlient",
      },
    ],
  },
  {
    title: "Firewall e Segurança de Rede",
    description:
      "Proteção perimetral e monitorização de tráfego para prevenir intrusões e ataques.",
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
          d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3V7.875a1.125 1.125 0 0 1 1.125-1.125h16.5A1.125 1.125 0 0 1 21.75 7.875v3.375a3 3 0 0 1-3 3m-16.5 0a3 3 0 0 1 3-3h10.5a3 3 0 0 1 3 3m-16.5 0h13.5m-16.5 0v5.25A2.25 2.25 0 0 0 7.5 21.75h9a2.25 2.25 0 0 0 2.25-2.25V14.25"
        />
      </svg>
    ),
    tools: [
      {
        name: "FortiGate SMB Series",
        description:
          "Firewall empresarial da Fortinet especificamente desenhado para pequenas e médias empresas com interface intuitiva.",
        pricing: "€300-800/ano + hardware",
        pros: [
          "Interface muito intuitiva para não especialistas",
          "Proteção integrada contra ameaças avançadas",
          "Suporte técnico em português disponível",
        ],
        ideal: "PMEs que precisam de firewall robusto mas fácil de gerir",
        website: "fortinet.com/products/smb",
      },
      {
        name: "SonicWall TZ Series",
        description:
          "Firewall compacto com proteção avançada contra ransomware e controlo de aplicações integrado.",
        pricing: "€200-600/ano + hardware",
        pros: [
          "Excelente proteção contra ransomware",
          "Relatórios de segurança detalhados",
          "Implementação rápida (menos de 1 hora)",
        ],
        ideal: "Empresas que querem proteção anti-ransomware especializada",
        website: "sonicwall.com/products/firewalls/tz-series",
      },
      {
        name: "Cisco Meraki MX",
        description:
          "Firewall gerido em cloud com visibilidade completa e gestão simplificada através de dashboard web.",
        pricing: "€100-400/mês (inclui hardware)",
        pros: [
          "Gestão 100% em cloud (sem servidores locais)",
          "Visibilidade de tráfego em tempo real",
          "Atualizações automáticas de segurança",
        ],
        ideal: "PMEs que preferem soluções geridas externamente",
        website: "meraki.cisco.com/products/appliances",
      },
    ],
  },
  {
    title: "Formação e Sensibilização",
    description:
      "Plataformas para educar colaboradores sobre cibersegurança.",
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
        name: "KnowBe4",
        description:
          "Líder mundial em formação de sensibilização para cibersegurança com conteúdo em português.",
        pricing: "€15-25/utilizador/ano",
        pros: [
          "Conteúdo de qualidade em português",
          "Simulações de phishing personalizadas",
          "Relatórios detalhados de progresso",
        ],
        ideal: "PMEs que querem formação completa e profissional",
        website: "knowbe4.com",
      },
      {
        name: "Proofpoint Security Awareness",
        description:
          "Plataforma abrangente com simulações avançadas e microlearning.",
        pricing: "€10-20/utilizador/ano",
        pros: [
          "Metodologia baseada em microlearning",
          "Simulações muito realistas",
          "Integração com ferramentas de email",
        ],
        ideal: "Empresas que querem abordagem educativa contínua",
        website: "proofpoint.com/us/products/security-awareness-training",
      },
      {
        name: "Microsoft Viva Learning",
        description:
          "Integrado no Microsoft 365 com conteúdo de cibersegurança personalizado.",
        pricing: "€2-5/utilizador/mês",
        pros: [
          "Integração nativa com Microsoft 365",
          "Conteúdo adaptado ao contexto da empresa",
          "Facilita adoção por estar no Teams",
        ],
        ideal: "Empresas já no ecossistema Microsoft",
        website: "microsoft.com/pt-pt/viva/learning",
      },
    ],
  },
];

const additionalResources = [
  {
    title: "CNCS — Centro Nacional de Cibersegurança",
    description: "Portal oficial para reportar incidentes e obter orientações.",
    url: "cncs.gov.pt",
    type: "Oficial",
  },
  {
    title: "CNPD — Comissão Nacional de Proteção de Dados",
    description: "Orientações sobre RGPD e proteção de dados.",
    url: "cnpd.pt",
    type: "Oficial",
  },
  {
    title: "CERT.PT",
    description: "Equipa de resposta a incidentes informáticos em Portugal.",
    url: "cert.pt",
    type: "Técnico",
  },
  {
    title: "NIST Cybersecurity Framework",
    description: "Framework internacional de referência para cibersegurança.",
    url: "nist.gov/cyberframework",
    type: "Internacional",
  },
];

export default function RecursosPage() {
  return (
    <div className="min-h-screen bg-bg">
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
            <Link href="/recursos" className="text-brand font-bold" aria-current="page">
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
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-brand transition">
            Início
          </Link>
          <span>/</span>
          <span className="text-text-secondary">Recursos</span>
        </div>

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand mb-6 text-balance font-display tracking-tight">
            Recursos de Cibersegurança
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto text-pretty">
            Ferramentas, serviços e recursos cuidadosamente selecionados para
            ajudar pequenas e médias empresas portuguesas a protegerem-se contra
            ameaças digitais. Todas as recomendações são baseadas em experiência
            real de implementação.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-12 p-6 rounded-xl bg-accent-light border border-accent/20">
          <p className="text-sm text-text-secondary">
            <strong>Aviso:</strong> As recomendações desta página são
            informativas e baseadas em análise independente. Os preços podem
            variar e devem ser confirmados diretamente com os fornecedores. Não
            recebemos comissões pelas recomendações apresentadas.
          </p>
        </div>

        {/* Tool Categories */}
        <div className="space-y-16">
          {categories.map((category, index) => (
            <section key={index} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                {category.icon}
                <div>
                  <h2 className="text-2xl font-bold text-brand text-balance font-display">
                    {category.title}
                  </h2>
                  <p className="text-text-secondary text-pretty">{category.description}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <div
                    key={toolIndex}
                    className="p-6 rounded-xl border border-border hover:border-accent hover:shadow-sm transition cursor-pointer"
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-brand mb-2">
                        {tool.name}
                      </h3>
                      <span className="inline-block px-3 py-1 text-sm font-medium text-accent bg-accent-light rounded-full">
                        {tool.pricing}
                      </span>
                    </div>

                    <p className="text-text-secondary text-sm mb-4 leading-relaxed text-pretty">
                      {tool.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-brand mb-2">
                        Pontos fortes:
                      </h4>
                      <ul className="space-y-1">
                        {tool.pros.map((pro, proIndex) => (
                          <li
                            key={proIndex}
                            className="text-xs text-text-secondary flex items-start gap-2"
                          >
                            <svg aria-hidden="true" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <span className="text-xs font-medium text-text-muted">
                        Ideal para:
                      </span>
                      <p className="text-xs text-text-secondary italic">
                        {tool.ideal}
                      </p>
                    </div>

                    <a
                      href={`https://${tool.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center px-4 py-2 text-sm font-medium text-accent border border-accent rounded-lg hover:bg-accent hover:text-white transition"
                    >
                      Visitar Website
                    </a>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Additional Resources */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-brand mb-8 text-center text-balance font-display">
            Recursos Oficiais e Técnicos
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalResources.map((resource, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border hover:border-accent transition cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-brand">{resource.title}</h3>
                  <span className="px-2 py-1 text-xs font-medium text-text-secondary bg-bg-subtle rounded">
                    {resource.type}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  {resource.description}
                </p>
                <a
                  href={`https://${resource.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline"
                >
                  {resource.url} →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 p-8 rounded-xl bg-bg-subtle text-center">
          <h2 className="text-2xl font-bold text-brand mb-4 text-balance font-display">
            Precisa de ajuda na escolha?
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto text-pretty">
            Explore os nossos artigos detalhados sobre implementação de
            cibersegurança ou subscreva a newsletter para receber
            recomendações personalizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="px-8 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition"
            >
              Ver Guias de Implementação
            </Link>
            <Link
              href="/#newsletter"
              className="px-8 py-3 border border-border text-brand rounded-lg font-medium hover:border-accent transition"
            >
              Newsletter Gratuita
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}