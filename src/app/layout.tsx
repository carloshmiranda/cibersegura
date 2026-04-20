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
    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.BING_VERIFICATION_TOKEN && {
      other: {
        "msvalidate.01": process.env.BING_VERIFICATION_TOKEN,
        ...(process.env.GOOGLE_ADSENSE_VERIFICATION && {
          "google-adsense-account": process.env.GOOGLE_ADSENSE_VERIFICATION,
        }),
      },
    }),
    ...(process.env.GOOGLE_ADSENSE_VERIFICATION && {
      other: {
        "google-adsense-account": process.env.GOOGLE_ADSENSE_VERIFICATION,
      },
    }),
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
    <html lang="pt-PT" className={`${jakartaSans.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
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
