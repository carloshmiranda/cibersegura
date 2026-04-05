import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "CiberPME — Cibersegurança para PMEs Portuguesas",
  description:
    "Blog de cibersegurança e recursos para pequenas e médias empresas portuguesas. Artigos sobre ameaças, boas práticas, ferramentas e legislação RGPD.",
  metadataBase: new URL("https://ciberpme.vercel.app"),
  verification: {
    other: {
      "msvalidate.01": "BING_WMT_TOKEN", // Placeholder for Bing Webmaster Tools verification
    },
  },
  openGraph: {
    title: "CiberPME — Cibersegurança para PMEs Portuguesas",
    description:
      "Blog de cibersegurança e recursos para pequenas e médias empresas portuguesas.",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "CiberPME",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CiberPME — Cibersegurança para PMEs Portuguesas",
    description:
      "Blog de cibersegurança e recursos para pequenas e médias empresas portuguesas.",
    images: ["/api/og"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "CiberPME",
      url: "https://ciberpme.vercel.app",
      description:
        "Blog de cibersegurança e recursos para pequenas e médias empresas portuguesas",
    },
    {
      "@type": "WebSite",
      name: "CiberPME",
      url: "https://ciberpme.vercel.app",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${jakartaSans.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:font-bold"
        >
          Saltar para o conteúdo principal
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
