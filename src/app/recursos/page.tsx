import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recursos — Ferramentas e Checklists de Cibersegurança",
  description:
    "Ferramentas essenciais, checklists práticos e recursos gratuitos para proteger a sua PME. Antivírus, backup, RGPD, NIS2 e muito mais.",
};

const toolCategories = [
  {
    title: "Antivírus Empresarial",
    description: "Proteção endpoint para empresas",
    tools: [
      {
        name: "Microsoft Defender Business",
        description: "Solução integrada com Office 365",
        price: "€3/utilizador/mês",
        pros: "Integração nativa, boa deteção",
        cons: "Funcionalidades limitadas comparado com especialistas",
        verdict: "Ideal para empresas Microsoft 365"
      },
      {
        name: "Bitdefender GravityZone",
        description: "Solução robusta para empresas",
        price: "€25-45/dispositivo/ano",
        pros: "Excelente deteção, gestão centralizada",
        cons: "Pode ser pesado em sistemas antigos",
        verdict: "Melhor proteção global para PMEs"
      },
      {
        name: "ESET Protect Entry",
        description: "Solução leve e eficaz",
        price: "€20-35/dispositivo/ano",
        pros: "Leve, boa performance, suporte local",
        cons: "Interface pode ser complexa",
        verdict: "Óptimo compromisso qualidade-preço"
      }
    ]
  },
  {
    title: "Backup e Recuperação",
    description: "Soluções para proteger dados críticos",
    tools: [
      {
        name: "Microsoft OneDrive Business",
        description: "Backup automático e sincronização",
        price: "€5-12,5/utilizador/mês",
        pros: "Integração Office, versionamento, partilha",
        cons: "Limitado para sistemas/bases de dados",
        verdict: "Essencial para documentos de trabalho"
      },
      {
        name: "Acronis Cyber Backup",
        description: "Backup completo de sistemas",
        price: "€69-179/estação/ano",
        pros: "Backup de imagem completa, recuperação rápida",
        cons: "Mais caro, requer conhecimento técnico",
        verdict: "Para empresas que precisam de backup completo"
      },
      {
        name: "Carbonite Safe",
        description: "Backup automático na nuvem",
        price: "€50-100/mês (ilimitado)",
        pros: "Automático, ilimitado, fácil de usar",
        cons: "Restauração pode ser lenta",
        verdict: "Simples para pequenas empresas"
      }
    ]
  },
  {
    title: "Gestão de Passwords",
    description: "Centralize e proteja credenciais",
    tools: [
      {
        name: "Microsoft Authenticator + Password",
        description: "Integrado com ecossistema Microsoft",
        price: "Incluído no Microsoft 365",
        pros: "Gratuito, SSO, 2FA integrado",
        cons: "Funcionalidades limitadas",
        verdict: "Básico mas suficiente para muitas PMEs"
      },
      {
        name: "Bitwarden Business",
        description: "Gestor robusto para equipas",
        price: "€3/utilizador/mês",
        pros: "Partilha segura, auditoria, open-source",
        cons: "Interface menos polida",
        verdict: "Melhor valor para equipas"
      },
      {
        name: "1Password Business",
        description: "Solução premium para empresas",
        price: "€7-12/utilizador/mês",
        pros: "Interface excelente, recursos avançados",
        cons: "Mais caro",
        verdict: "Para empresas que valorizam UX"
      }
    ]
  },
  {
    title: "Firewall e Rede",
    description: "Proteção perimetral",
    tools: [
      {
        name: "SonicWall TZ370",
        description: "Firewall para pequenos escritórios",
        price: "€200-400 + €100-200/ano licenças",
        pros: "Fácil configuração, boa proteção",
        cons: "Requer conhecimento de rede",
        verdict: "Sólido para escritórios até 50 pessoas"
      },
      {
        name: "Fortinet FortiGate 40F",
        description: "Firewall enterprise para PMEs",
        price: "€300-600 + licenças anuais",
        pros: "Recursos avançados, boa performance",
        cons: "Configuração mais complexa",
        verdict: "Para empresas com requisitos avançados"
      },
      {
        name: "pfSense Community",
        description: "Firewall open-source",
        price: "Gratuito (hardware €200-500)",
        pros: "Flexível, sem custos de licença",
        cons: "Requer expertise técnica",
        verdict: "Para empresas com competências IT"
      }
    ]
  }
];

const checklists = [
  {
    title: "Checklist RGPD para PMEs",
    items: [
      "Mapear todos os dados pessoais recolhidos",
      "Definir bases legais para cada tratamento",
      "Criar política de privacidade transparente",
      "Implementar procedimentos para direitos dos titulares",
      "Configurar sistemas para anonimização/pseudonimização",
      "Documentar medidas de segurança implementadas",
      "Avaliar necessidade de DPO",
      "Estabelecer procedimentos de notificação de violações",
      "Formar funcionários sobre RGPD",
      "Auditar fornecedores que acedem a dados pessoais"
    ]
  },
  {
    title: "Preparação NIS2 (até 3 Abril 2026)",
    items: [
      "Verificar se a empresa está abrangida (50+ funcionários, €10M+ volume)",
      "Nomear responsável pela cibersegurança",
      "Implementar política de gestão de risco de cibersegurança",
      "Estabelecer procedimentos de backup e recuperação",
      "Configurar monitorização de segurança 24/7",
      "Implementar gestão de patches automática",
      "Estabelecer controlos de acesso e gestão de identidades",
      "Criar plano de continuidade de negócio",
      "Formar funcionários em cibersegurança",
      "Preparar procedimentos de notificação de incidentes ao CNCS"
    ]
  },
  {
    title: "Segurança Básica (Mínimo Essencial)",
    items: [
      "Antivírus empresarial em todos os dispositivos",
      "Backup automático diário (regra 3-2-1)",
      "Passwords fortes + autenticação de dois fatores",
      "Firewall configurado e atualizado",
      "Software sempre atualizado (patches automáticos)",
      "WiFi empresarial seguro (WPA3/WPA2)",
      "Formação básica de funcionários (phishing)",
      "Política de dispositivos móveis",
      "Plano de resposta a incidentes",
      "Auditoria trimestral de acessos"
    ]
  }
];

const emergencyContacts = [
  {
    entity: "CNPD - Comissão Nacional de Proteção de Dados",
    purpose: "Violações de dados pessoais (RGPD)",
    contact: "geral@cnpd.pt",
    timeframe: "72 horas",
    note: "Obrigatório para violações que afetem direitos e liberdades"
  },
  {
    entity: "CNCS - Centro Nacional de Cibersegurança",
    purpose: "Incidentes de cibersegurança (NIS2)",
    contact: "cert@cncs.gov.pt",
    timeframe: "24 horas (significativos)",
    note: "Para empresas abrangidas pela NIS2"
  },
  {
    entity: "Polícia Judiciária - UNC3T",
    purpose: "Crimes informáticos",
    contact: "unc3t@pj.pt | 214 407 000",
    timeframe: "Imediato para crimes",
    note: "Ransomware, fraude, sabotagem"
  },
  {
    entity: "ANACOM",
    purpose: "Incidentes em telecomunicações",
    contact: "anacom@anacom.pt",
    timeframe: "Conforme regulamento",
    note: "Para operadores de telecomunicações"
  }
];

export default function RecursosPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-brand">
          CiberPME
        </Link>
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <Link href="/blog" className="hover:text-brand transition">
            Blog
          </Link>
          <Link href="/faq" className="hover:text-brand transition">
            FAQ
          </Link>
          <Link href="/recursos" className="text-brand font-bold">
            Recursos
          </Link>
          <Link href="/#sobre" className="hover:text-brand transition">
            Sobre
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-brand transition">
            Início
          </Link>
          <span>/</span>
          <span className="text-text-secondary">Recursos</span>
        </div>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4">
            Recursos de Cibersegurança
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl">
            Ferramentas essenciais, checklists práticos e contactos de emergência
            para proteger a sua PME contra ameaças digitais.
          </p>
        </header>

        {/* Tools Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-brand mb-8">Ferramentas Recomendadas</h2>
          <div className="space-y-12">
            {toolCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border-b border-border pb-12">
                <h3 className="text-xl font-bold text-brand mb-2">{category.title}</h3>
                <p className="text-text-secondary mb-6">{category.description}</p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="p-6 border border-border rounded-xl">
                      <h4 className="font-bold text-brand mb-2">{tool.name}</h4>
                      <p className="text-sm text-text-secondary mb-3">{tool.description}</p>
                      <div className="space-y-2 text-sm mb-4">
                        <div><span className="font-medium">Preço:</span> {tool.price}</div>
                        <div><span className="font-medium text-success">Prós:</span> {tool.pros}</div>
                        <div><span className="font-medium text-error">Contras:</span> {tool.cons}</div>
                      </div>
                      <div className="p-3 bg-bg-subtle rounded-lg">
                        <span className="text-sm font-medium">Veredicto: </span>
                        <span className="text-sm">{tool.verdict}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Checklists Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-brand mb-8">Checklists de Compliance</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {checklists.map((checklist, index) => (
              <div key={index} className="p-6 border border-border rounded-xl">
                <h3 className="text-lg font-bold text-brand mb-4">{checklist.title}</h3>
                <div className="space-y-3">
                  {checklist.items.map((item, itemIndex) => (
                    <label key={itemIndex} className="flex items-start gap-3 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 text-accent border-border rounded focus:ring-accent"
                      />
                      <span className="text-text-secondary leading-relaxed">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-brand mb-8">Contactos de Emergência</h2>
          <div className="bg-bg-subtle rounded-xl p-6">
            <p className="text-text-secondary mb-6">
              Em caso de incidente de cibersegurança, contacte as autoridades competentes:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="p-4 bg-bg border border-border rounded-lg">
                  <h3 className="font-bold text-brand mb-2">{contact.entity}</h3>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">Propósito:</span> {contact.purpose}</div>
                    <div><span className="font-medium">Contacto:</span> {contact.contact}</div>
                    <div><span className="font-medium">Prazo:</span> {contact.timeframe}</div>
                    <div className="text-text-muted italic">{contact.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Calculator */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-brand mb-8">Calculadora de Custos</h2>
          <div className="p-6 border border-border rounded-xl bg-bg-subtle">
            <h3 className="text-lg font-bold text-brand mb-4">Custo Estimado para PME (20 funcionários)</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-3">Setup Básico Mensal:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Antivírus (€4/user)</span>
                    <span>€80/mês</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Backup nuvem</span>
                    <span>€60/mês</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Gestor passwords</span>
                    <span>€60/mês</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Formação anual ÷ 12</span>
                    <span>€170/mês</span>
                  </li>
                  <li className="flex justify-between border-t border-border pt-2 font-bold">
                    <span>Total mensal</span>
                    <span>€370/mês</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Custos One-Time:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Firewall</span>
                    <span>€400</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Consultoria inicial</span>
                    <span>€2.000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Setup e configuração</span>
                    <span>€1.500</span>
                  </li>
                  <li className="flex justify-between border-t border-border pt-2 font-bold">
                    <span>Total inicial</span>
                    <span>€3.900</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-bg border border-accent rounded-lg">
              <p className="text-sm text-text-secondary">
                <span className="font-bold text-accent">Custo vs. Risco:</span> O investimento de ~€370/mês é
                muito inferior ao custo médio de um ataque (€50.000-200.000 entre downtime, recuperação,
                multas e perda de reputação).
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-8 rounded-xl bg-bg-subtle">
          <h2 className="text-xl font-bold text-brand mb-4">
            Precisa de Ajuda Específica?
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Explore os nossos artigos detalhados sobre implementação ou
            subscreva a newsletter para receber guias práticos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition"
            >
              Ver Guias Detalhados
            </Link>
            <Link
              href="/#newsletter"
              className="px-6 py-3 border border-border text-brand rounded-lg font-medium hover:border-accent transition"
            >
              Subscrever Newsletter
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-brand">CiberPME</span>
          <div className="flex gap-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-brand transition">
              Início
            </Link>
            <Link href="/blog" className="hover:text-brand transition">
              Blog
            </Link>
            <Link href="/faq" className="hover:text-brand transition">
              FAQ
            </Link>
            <Link href="/recursos" className="hover:text-brand transition">
              Recursos
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