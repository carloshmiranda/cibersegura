import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "FAQ — Perguntas Frequentes sobre Cibersegurança para PMEs",
  description:
    "Respostas às perguntas mais frequentes sobre cibersegurança para pequenas e médias empresas portuguesas. RGPD, NIS2, backup, antivírus e mais.",
  alternates: {
    canonical: "https://ciberpme.vercel.app/faq",
  },
  openGraph: {
    title: "FAQ — Perguntas Frequentes sobre Cibersegurança para PMEs",
    description:
      "Respostas às perguntas mais frequentes sobre cibersegurança para pequenas e médias empresas portuguesas. RGPD, NIS2, backup, antivírus e mais.",
    type: "website",
    url: "https://ciberpme.vercel.app/faq",
    images: [
      {
        url: "/api/og?title=FAQ%20-%20Cibersegurança",
        width: 1200,
        height: 630,
        alt: "FAQ - Perguntas Frequentes sobre Cibersegurança",
      },
    ],
  },
};

const faqItems = [
  {
    question: "O que é a NIS2 e a minha empresa está abrangida?",
    answer:
      "A NIS2 é uma diretiva europeia que entra em vigor em Portugal a 3 de abril de 2026. Está abrangida se a sua empresa tiver 50+ funcionários e €10M+ de volume de negócios anual, ou se operar em setores críticos como energia, transportes, saúde, ou banca (independentemente da dimensão). A NIS2 exige medidas específicas de cibersegurança, gestão de riscos e notificação de incidentes.",
  },
  {
    question: "Quanto custa implementar cibersegurança numa PME?",
    answer:
      "Uma PME pode começar com €500-1000/mês em ferramentas essenciais: antivírus empresarial (€3-5/utilizador/mês), backup na nuvem (€50-100/mês), firewall (€200-500 inicial), e formação (€100/funcionário/ano). O investimento total depende do número de funcionários e sistemas, mas é muito inferior ao custo de um ataque - que pode custar €50,000-200,000 entre recuperação, multas e perda de negócio.",
  },
  {
    question: "É obrigatório ter um antivírus nas empresas?",
    answer:
      "Sim, o RGPD exige 'medidas técnicas adequadas' para proteger dados pessoais, e o antivírus é considerado uma medida básica essencial. Além disso, a NIS2 exigirá explicitamente proteção contra malware. Para empresas, recomendamos soluções empresariais como Microsoft Defender Business, Bitdefender GravityZone, ou ESET Protect Entry, que oferecem gestão centralizada e relatórios de compliance.",
  },
  {
    question: "O que fazer se a empresa sofrer um ataque de ransomware?",
    answer:
      "1) Isole imediatamente os sistemas afetados da rede; 2) NÃO pague o resgate - não há garantias de recuperação; 3) Contacte as autoridades (PJ/CNCS) e notifique a CNPD no prazo de 72h se houver dados pessoais; 4) Ative o plano de continuidade e use os backups para restaurar; 5) Documente tudo para seguros e compliance. Por isto é essencial ter backups offline e um plano de resposta a incidentes preparado.",
  },
  {
    question: "Como proteger a empresa contra phishing?",
    answer:
      "Implementem filtros anti-spam no email (Microsoft Defender ou similar), configurem autenticação de dois fatores em todas as contas importantes, e façam formação regular dos funcionários. Criem uma cultura onde é normal confirmar pedidos suspeitos por telefone. Usem ferramentas como simulações de phishing para treinar a equipa. A regra de ouro: desconfiem sempre de emails urgentes pedindo ações financeiras ou credenciais.",
  },
  {
    question: "Backups: o que, quando e onde guardar?",
    answer:
      "Sigam a regra 3-2-1: 3 cópias dos dados, em 2 suportes diferentes, com 1 offline/offsite. Para PMEs recomendamos: backup diário automático para a nuvem (Google Workspace, Microsoft 365), backup semanal para disco externo offline, e teste mensal da restauração. Incluam: documentos, emails, bases de dados, configurações de sistemas. Guardem pelo menos 6 meses de histórico.",
  },
  {
    question: "WiFi da empresa: como configurar em segurança?",
    answer:
      "Usem WPA3 (ou WPA2 se o equipamento for antigo), criem redes separadas para funcionários, convidados e dispositivos IoT. Mudem a password padrão do router, desativem WPS, e configurem um firewall. Para empresas maiores, implementem autenticação 802.1X com credenciais individuais. Monitorizem dispositivos conectados regularmente e usem VPN para acessos remotos.",
  },
  {
    question: "Trabalho remoto: que medidas de segurança aplicar?",
    answer:
      "VPN obrigatória para aceder a sistemas da empresa, antivírus atualizado em todos os dispositivos, política de passwords fortes + 2FA, e formação sobre WiFi públicas (nunca usar para trabalho). Implementem gestão de dispositivos móveis (MDM) se possível, e definam políticas claras sobre BYOD. Façam auditorias regulares aos acessos remotos.",
  },
  {
    question: "Como estar em conformidade com o RGPD?",
    answer:
      "Mapeiem que dados pessoais recolhem e porquê, implementem bases legais claras, criem políticas de privacidade transparentes, e configurem sistemas para responder a pedidos de acesso/eliminação. Façam avaliações de impacto para tratamentos de risco, nomeiem um DPO se necessário, e documentem tudo. Implementem 'privacy by design' em novos sistemas. A multa pode chegar a 4% do volume de negócios global.",
  },
  {
    question: "Vale a pena contratar uma empresa de cibersegurança?",
    answer:
      "Depende da dimensão e complexidade. PMEs com 10-50 funcionários podem começar com consultoria pontual para auditorias anuais e implementação de políticas. Empresas maiores ou em setores regulados beneficiam de serviços managed (SOC, monitorização). Custos típicos: consultoria €150-300/dia, managed services €500-2000/mês. O ROI justifica-se face ao custo médio de um incidente (€150,000+ para PMEs).",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
              <Link href="/faq" className="text-brand font-bold" aria-current="page">
                FAQ
              </Link>
              <Link href="/#sobre" className="hover:text-brand transition">
                Sobre
              </Link>
            </div>
          </nav>
        </header>

        <main id="main-content" className="max-w-3xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-brand transition">
              Início
            </Link>
            <span>/</span>
            <span className="text-text-secondary">FAQ</span>
          </div>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 text-balance font-display tracking-tight">
              Perguntas Frequentes
            </h1>
            <p className="text-lg text-text-secondary text-pretty">
              Respostas às questões mais comuns sobre cibersegurança para
              pequenas e médias empresas portuguesas.
            </p>
          </header>

          {/* FAQ Items */}
          <div className="space-y-8">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-border pb-8">
                <h2 className="text-lg font-bold text-brand mb-4 text-balance font-display">
                  {item.question}
                </h2>
                <div className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-xl bg-bg-subtle text-center">
            <h2 className="text-xl font-bold text-brand mb-4 text-balance font-display">
              Não encontrou a resposta?
            </h2>
            <p className="text-text-secondary mb-6 text-pretty">
              Explore os nossos artigos detalhados ou subscreva a newsletter
              para receber mais dicas de segurança.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition"
              >
                Ver Artigos
              </Link>
              <Link
                href="/#newsletter"
                className="px-6 py-3 border border-border text-brand rounded-lg font-medium hover:border-accent transition"
              >
                Newsletter
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}