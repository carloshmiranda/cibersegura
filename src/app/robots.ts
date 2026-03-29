import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://ciberpme.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // AI crawlers — explicitly allowed for SEO and discovery
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "Bytespider", "PerplexityBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}