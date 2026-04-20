import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reportar Incidente de Cibersegurança — Guia CNCS para PMEs Portuguesas",
  description:
    "Ferramenta interativa para determinar se deve reportar um incidente de cibersegurança ao CNCS dentro de 72h. Cumpra as obrigações NIS2 em Portugal com orientação passo-a-passo.",
  alternates: {
    canonical: "https://ciberpme.vercel.app/reportar-incidente",
  },
  openGraph: {
    title: "Reportar Incidente de Cibersegurança — Guia CNCS para PMEs",
    description:
      "Ferramenta interativa para determinar se deve reportar um incidente de cibersegurança ao CNCS dentro de 72h. Cumpra as obrigações NIS2 em Portugal.",
    type: "website",
    url: "https://ciberpme.vercel.app/reportar-incidente",
    images: [
      {
        url: "/api/og?title=Reportar%20Incidente%20de%20Cibersegurança",
        width: 1200,
        height: 630,
        alt: "Reportar Incidente de Cibersegurança ao CNCS",
      },
    ],
  },
  keywords: [
    "reportar incidente cibersegurança",
    "CNCS Portugal",
    "NIS2",
    "obrigações legais cibersegurança",
    "PME Portugal",
    "incidente segurança informática",
    "72 horas reporte",
    "CERT.PT",
  ],
};

export default function ReportarIncidenteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}