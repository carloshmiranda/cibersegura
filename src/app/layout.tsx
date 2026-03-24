import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CiberSegura — Ciberseguranca para PMEs Portuguesas",
  description:
    "Blog de ciberseguranca e recursos para pequenas e medias empresas portuguesas. Artigos sobre ameacas, boas praticas, ferramentas e legislacao RGPD.",
  metadataBase: new URL("https://cibersegura-flax.vercel.app"),
  verification: {
    google: "", // Google Search Console
  },
  openGraph: {
    title: "CiberSegura — Ciberseguranca para PMEs Portuguesas",
    description:
      "Blog de ciberseguranca e recursos para pequenas e medias empresas portuguesas.",
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
    title: "CiberSegura — Ciberseguranca para PMEs Portuguesas",
    description:
      "Blog de ciberseguranca e recursos para pequenas e medias empresas portuguesas.",
    images: ["/api/og"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "CiberSegura",
      url: "https://cibersegura-flax.vercel.app",
      description:
        "Blog de ciberseguranca e recursos para pequenas e medias empresas portuguesas",
    },
    {
      "@type": "WebSite",
      name: "CiberSegura",
      url: "https://cibersegura-flax.vercel.app",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
