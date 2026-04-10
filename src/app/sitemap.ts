import { MetadataRoute } from "next";
import { posts, CATEGORIES } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_URL || "https://ciberpme.vercel.app";

  // Use current date for dynamic content and recent dates for static pages
  const currentDate = new Date().toISOString();
  const recentDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(); // 1 week ago

  // Find most recent blog post date for blog listing page
  const mostRecentPostDate = posts.length > 0
    ? posts.reduce((latest, post) =>
        new Date(post.publishedAt) > new Date(latest) ? post.publishedAt : latest,
        posts[0].publishedAt
      )
    : recentDate;

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categoryPages = Object.keys(CATEGORIES).map((categoria) => ({
    url: `${baseUrl}/blog/categoria/${categoria}`,
    lastModified: recentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: mostRecentPostDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recursos`,
      lastModified: recentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ferramentas`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: recentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/politica-privacidade`,
      lastModified: "2026-04-07",
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/unsubscribe`,
      lastModified: recentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...categoryPages,
    ...blogPosts,
  ];
}
