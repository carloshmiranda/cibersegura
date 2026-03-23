import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CiberSegura",
  description: "Plataforma de ferramentas e consciencialização em cibersegurança para empresas portuguesas",
  metadataBase: new URL("https://cibersegura.vercel.app"),
  verification: {
    google: "", // Google Search Console
  },
  openGraph: {
    title: "CiberSegura",
    description: "Plataforma de ferramentas e consciencialização em cibersegurança para empresas portuguesas",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "CiberSegura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CiberSegura",
    description: "Plataforma de ferramentas e consciencialização em cibersegurança para empresas portuguesas",
    images: ["/api/og"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "CiberSegura",
      url: "https://cibersegura.vercel.app",
      description: "Plataforma de ferramentas e consciencialização em cibersegurança para empresas portuguesas",
    },
    {
      "@type": "WebSite",
      name: "CiberSegura",
      url: "https://cibersegura.vercel.app",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}<Analytics /></body>
    </html>
  );
}
