import { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_URL || "https://ciberpme.vercel.app";

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: "2026-03-24",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: "2026-03-24",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recursos`,
      lastModified: "2026-04-05",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: "2026-04-01",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogPosts,
  ];
}
