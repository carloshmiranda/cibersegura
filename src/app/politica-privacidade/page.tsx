import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Política de Privacidade — CiberPME",
  description:
    "Política de privacidade do CiberPME. Informação sobre como recolhemos, usamos e protegemos os seus dados pessoais em conformidade com o RGPD.",
  alternates: {
    canonical: "https://ciberpme.vercel.app/politica-privacidade",
  },
  openGraph: {
    title: "Política de Privacidade — CiberPME",
    description:
      "Política de privacidade do CiberPME. Informação sobre como recolhemos, usamos e protegemos os seus dados pessoais em conformidade com o RGPD.",
    type: "website",
    url: "https://ciberpme.vercel.app/politica-privacidade",
    images: [
      {
        url: "/api/og?title=Política%20de%20Privacidade",
        width: 1200,
        height: 630,
        alt: "Política de Privacidade - CiberPME",
      },
    ],
  },
};

export default function PoliticaPrivacidadePage() {
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

      <main id="main-content" className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-brand transition">
            Início
          </Link>
          <span>/</span>
          <span className="text-text-secondary">Política de Privacidade</span>
        </div>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand mb-6 text-balance font-display tracking-tight">
            Política de Privacidade
          </h1>
          <p className="text-text-secondary text-pretty leading-relaxed">
            Esta política de privacidade explica como o CiberPME recolhe, usa e protege
            os seus dados pessoais em conformidade com o Regulamento Geral sobre a Proteção
            de Dados (RGPD) e a legislação portuguesa aplicável.
          </p>
          <p className="text-sm text-text-muted mt-4">
            Última atualização: 7 de abril de 2026
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          {/* Section 1: Responsável pelo Tratamento */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand mb-4 font-display">
              1. Responsável pelo Tratamento de Dados
            </h2>
            <div className="bg-bg-subtle p-6 rounded-xl mb-6">
              <p className="text-text-secondary mb-4">
                <strong>CiberPME</strong><br />
                Website: https://ciberpme.vercel.app<br />
                Email: hello@ciberpme.pt<br />
                Portugal
              </p>
              <p className="text-sm text-text-muted">
                Para questões específicas sobre proteção de dados, pode contactar-nos
                através do email indicado acima.
              </p>
            </div>
          </section>

          {/* Section 2: Dados que Recolhemos */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand mb-4 font-display">
              2. Dados Pessoais que Recolhemos
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-brand mb-3">
                  2.1 Newsletter e Comunicações
                </h3>
                <p className="text-text-secondary mb-4">
                  Quando se subscreve à nossa newsletter, recolhemos:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Endereço de email (obrigatório)</li>
                  <li>Nome (opcional)</li>
                  <li>Data e hora da subscrição</li>
                  <li>Endereço IP da subscrição (para prevenção de spam)</li>
                  <li>Fonte da subscrição (página web, referral, etc.)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand mb-3">
                  2.2 Utilização do Website
                </h3>
                <p className="text-text-secondary mb-4">
                  Durante a navegação no nosso website, podem ser recolhidos automaticamente:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Informações técnicas (browser, sistema operativo, resolução de ecrã)</li>
                  <li>Dados de navegação (páginas visitadas, tempo de sessão, origem do tráfego)</li>
                  <li>Endereço IP (anonimizado para análise de tráfego)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand mb-3">
                  2.3 Cookies e Tecnologias Similares
                </h3>
                <p className="text-text-secondary">
                  Utilizamos cookies essenciais para o funcionamento do website e cookies
                  de análise (Vercel Analytics) para compreender como os utilizadores
                  interagem com o nosso conteúdo.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Finalidades do Tratamento */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand mb-4 font-display">
              3. Como Usamos os Seus Dados
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-brand mb-3">
                  3.1 Newsletter e Comunicações
                </h3>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Envio de artigos e conteúdo sobre cibersegurança</li>
                  <li>Alertas de segurança e atualizações importantes</li>
                  <li>Informações sobre novos recursos e ferramentas</li>
                  <li>Comunicações relacionadas com a sua subscrição</li>
                </ul>
                <p className="text-sm text-text-muted mt-2">
                  <strong>Base legal:</strong> Consentimento (RGPD Art. 6.º, n.º 1, alínea a)
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand mb-3">
                  3.2 Melhoria do Serviço
                </h3>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Análise de utilização para melhorar o conteúdo</li>
                  <li>Compreender quais tópicos são mais relevantes</li>
                  <li>Otimizar a experiência de navegação</li>
                  <li>Detetar e prevenir uso inadequado</li>
                </ul>
                <p className="text-sm text-text-muted mt-2">
                  <strong>Base legal:</strong> Interesse legítimo (RGPD Art. 6.º, n.º 1, alínea f)
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand mb-3">
                  3.3 Obrigações Legais
                </h3>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Cumprimento de obrigações fiscais e contabilísticas</li>
                  <li>Resposta a solicitações de autoridades competentes</li>
                  <li>Manutenção de registos conforme exigido por lei</li>
                </ul>
                <p className="text-sm text-text-muted mt-2">
                  <strong>Base legal:</strong> Obrigação legal (RGPD Art. 6.º, n.º 1, alínea c)
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Partilha de Dados */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand mb-4 font-display">
              4. Partilha de Dados com Terceiros
            </h2>
            <div className="space-y-6">
              <p className="text-text-secondary">
                Não vendemos, alugamos ou partilhamos os seus dados pessoais com terceiros
                para fins comerciais. Os seus dados podem ser partilhados apenas nas
                seguintes situações:
              </p>

              <div className="bg-bg-subtle p-6 rounded-xl">
                <h3 className="text-lg font-bold text-brand mb-3">
                  Prestadores de Serviços Técnicos
                </h3>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li><strong>Vercel</strong> (alojamento do website) — Estados Unidos/UE</li>
                  <li><strong>Neon</strong> (base de dados) — Estados Unidos/UE</li>
                  <li><strong>Resend</strong> (envio de emails) — Estados Unidos/UE</li>
                </ul>
                <p className="text-sm text-text-muted mt-4">
                  Todos estes prestadores operam sob contratos de tratamento de dados
                  e implementam as medidas de segurança adequadas exigidas pelo RGPD.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-brand mb-3">
                  Transferências Internacionais
                </h3>
                <p className="text-text-secondary">
                  Quando os dados são transferidos para países fora do Espaço Económico Europeu,
                  garantimos proteção adequada através de:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-2">
                  <li>Cláusulas contratuais tipo aprovadas pela Comissão Europeia</li>
                  <li>Certificações de adequação dos prestadores</li>
                  <li>Medidas técnicas e organizacionais complementares</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Retenção de Dados */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand mb-4 font-display">
              5. Período de Conservação dos Dados
            </h2>
            <div className="bg-bg-subtle p-6 rounded-xl">
              <ul className="space-y-3 text-text-secondary">
                <li>
                  <strong>Newsletter:</strong> Até cancelar a subscrição ou até 3 anos
                  sem atividade (o que ocorrer primeiro)
                </li>
                <li>
                  <strong>Dados de navegação:</strong> Máximo de 26 meses (cookies de análise)
                </li>
                <li>
                  <strong>Registos de segurança:</strong> 12 meses para prevenção de abuso
                </li>
                <li>
                  <strong>Dados para obrigações legais:</strong> Conforme exigido por lei
                  (tipicamente 5-10 anos)
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6: Direitos dos Titulares */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand mb-4 font-display">
              6. Os Seus Direitos sobre os Dados Pessoais
            </h2>
            <div className="space-y-6">
              <p className="text-text-secondary">
                Nos termos do RGPD, tem os seguintes direitos relativamente aos seus dados pessoais:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-bold text-brand mb-2">Acesso</h3>
                  <p className="text-sm text-text-secondary">
                    Pode solicitar uma cópia dos seus dados pessoais que processamos.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-bold text-brand mb-2">Retificação</h3>
                  <p className="text-sm text-text-secondary">
                    Pode corrigir dados incorretos ou incompletos.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-bold text-brand mb-2">Apagamento</h3>
                  <p className="text-sm text-text-secondary">
                    Pode solicitar a eliminação dos seus dados pessoais ("direito a ser esquecido").
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-bold text-brand mb-2">Limitação</h3>
                  <p className="text-sm text-text-secondary">
                    Pode restringir o tratamento dos seus dados em determinadas situações.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-bold text-brand mb-2">Portabilidade</h3>
                  <p className="text-sm text-text-secondary">
                    Pode receber os seus dados num formato estruturado e portável.
                  </p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="font-bold text-brand mb-2">Oposição</h3>
                  <p className="text-sm text-text-secondary">
                    Pode opor-se ao tratamento baseado em interesse legítimo.
                  </p>
                </div>
              </div>

              <div className="bg-accent-light p-6 rounded-xl">
                <h3 className="font-bold text-brand mb-3">Como Exercer os Seus Direitos</h3>
                <p className="text-text-secondary mb-3">
                  Para exercer qualquer destes direitos, contacte-nos através de:
                </p>
                <ul className="text-text-secondary space-y-1">
                  <li>📧 Email: hello@ciberpme.pt</li>
                  <li>✉️ Identificação necessária para verificação de identidade</li>
                  <li>⏱️ Resposta em até 30 dias úteis</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: Segurança */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand mb-4 font-display">
              7. Medidas de Segurança
            </h2>
            <div className="space-y-4">
              <p className="text-text-secondary">
                Implementamos medidas técnicas e organizacionais adequadas para proteger
                os seus dados pessoais contra:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                <li>Acesso não autorizado ou ilegal</li>
                <li>Perda, destruição ou dano acidental</li>
                <li>Alteração, divulgação ou acesso não autorizado</li>
              </ul>

              <div className="bg-bg-subtle p-6 rounded-xl">
                <h3 className="font-bold text-brand mb-3">Medidas Técnicas Implementadas</h3>
                <ul className="text-text-secondary space-y-1 text-sm">
                  <li>• Encriptação de dados em trânsito (HTTPS/TLS)</li>
                  <li>• Encriptação de dados em repouso nas bases de dados</li>
                  <li>• Autenticação multi-fator para acesso a sistemas</li>
                  <li>• Monitorização contínua de segurança</li>
                  <li>• Backups regulares e testados</li>
                  <li>• Auditoria de acessos aos dados</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8: Reclamações */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand mb-4 font-display">
              8. Direito de Reclamação
            </h2>
            <div className="bg-warning-bg border border-warning text-warning-text p-6 rounded-xl">
              <p className="mb-4">
                Se considerar que o tratamento dos seus dados pessoais viola o RGPD,
                tem o direito de apresentar reclamação junto da autoridade de controlo competente.
              </p>
              <div>
                <h3 className="font-bold mb-2">Autoridade de Controlo em Portugal:</h3>
                <p>
                  <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong><br />
                  Website: www.cnpd.pt<br />
                  Email: geral@cnpd.pt<br />
                  Telefone: 213 928 400
                </p>
              </div>
            </div>
          </section>

          {/* Section 9: Atualizações */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand mb-4 font-display">
              9. Atualizações desta Política
            </h2>
            <p className="text-text-secondary mb-4">
              Esta política de privacidade pode ser atualizada periodicamente para
              refletir mudanças nos nossos serviços ou na legislação aplicável.
            </p>
            <div className="bg-bg-subtle p-6 rounded-xl">
              <p className="text-text-secondary">
                <strong>Notificação de alterações:</strong> As alterações significativas
                serão comunicadas através de email aos subscritores da newsletter ou
                através de aviso destacado no website.
              </p>
              <p className="text-sm text-text-muted mt-2">
                Recomendamos que consulte esta página regularmente para se manter
                informado sobre como protegemos os seus dados.
              </p>
            </div>
          </section>

          {/* Section 10: Contacto */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brand mb-4 font-display">
              10. Contacto
            </h2>
            <div className="bg-brand-light p-6 rounded-xl">
              <p className="text-text-secondary mb-4">
                Para questões sobre esta política de privacidade ou sobre o tratamento
                dos seus dados pessoais:
              </p>
              <div className="space-y-2 text-text-secondary">
                <p><strong>Email:</strong> hello@ciberpme.pt</p>
                <p><strong>Website:</strong> https://ciberpme.vercel.app</p>
                <p><strong>Resposta:</strong> Até 30 dias úteis</p>
              </div>
            </div>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/"
            className="text-sm text-accent hover:underline transition"
          >
            &larr; Voltar ao início
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}