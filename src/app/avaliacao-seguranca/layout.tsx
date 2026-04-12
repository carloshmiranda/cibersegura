import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avaliação de Cibersegurança Gratuita — CiberPME",
  description:
    "Avaliação especializada de cibersegurança para PMEs portuguesas. Análise detalhada por categorias, relatório em PDF e plano de ação personalizado. Gratuito e completo em 5-7 minutos.",
  keywords: [
    "avaliação cibersegurança",
    "auditoria segurança PME",
    "teste segurança empresa",
    "avaliação risco cibernético",
    "diagnóstico segurança Portugal",
    "checklist cibersegurança",
  ],
  alternates: {
    canonical: "https://ciberpme.vercel.app/avaliacao-seguranca",
  },
  openGraph: {
    title: "Avaliação Gratuita de Cibersegurança para PMEs",
    description:
      "Teste gratuito em 5 minutos para descobrir vulnerabilidades na sua empresa e receber recomendações personalizadas de segurança.",
    type: "website",
    url: "https://ciberpme.vercel.app/avaliacao-seguranca",
    images: [
      {
        url: "/api/og?title=Avaliação%20de%20Cibersegurança",
        width: 1200,
        height: 630,
        alt: "Avaliação Gratuita de Cibersegurança para PMEs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avaliação Gratuita de Cibersegurança para PMEs",
    description:
      "Teste gratuito em 5 minutos para descobrir vulnerabilidades na sua empresa.",
    images: ["/api/og?title=Avaliação%20de%20Cibersegurança"],
  },
};

export default function AvaliacaoSegurancaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["WebApplication", "SoftwareApplication"],
            name: "Avaliação de Cibersegurança CiberPME",
            description:
              "Ferramenta gratuita para avaliar o nível de cibersegurança de pequenas e médias empresas portuguesas.",
            url: "https://ciberpme.vercel.app/avaliacao-seguranca",
            applicationCategory: "SecurityApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
            provider: {
              "@type": "Organization",
              name: "CiberPME",
              url: "https://ciberpme.vercel.app",
            },
            audience: {
              "@type": "BusinessAudience",
              audienceType: "Small and Medium Businesses",
              geographicArea: {
                "@type": "Country",
                name: "Portugal",
              },
            },
            featureList: [
              "Avaliação especializada de cibersegurança em 10 critérios fundamentais",
              "Análise detalhada por categorias (Rede, Dados, Acessos, Incidentes)",
              "Pontuação ponderada com explicações técnicas",
              "Relatório em PDF com plano de ação personalizado",
              "Recomendações específicas com cronograma e recursos",
              "Links diretos para ferramentas e artigos relevantes",
            ],
          }),
        }}
      />
    </>
  );
}