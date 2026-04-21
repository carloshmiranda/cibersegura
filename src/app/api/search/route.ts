import { NextRequest } from "next/server";
import { posts } from "@/lib/posts";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.trim().length < 2) {
    return Response.json({
      ok: false,
      error: "Query deve ter pelo menos 2 caracteres"
    });
  }

  const searchTerm = query.toLowerCase().trim();

  // Search in title, excerpt, content, and category
  const results = posts
    .filter(post => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm);
      const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);
      const contentMatch = post.content.toLowerCase().includes(searchTerm);
      const categoryMatch = post.category.toLowerCase().includes(searchTerm);

      return titleMatch || excerptMatch || contentMatch || categoryMatch;
    })
    .map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime,
      // Highlight search term in title and excerpt
      highlightedTitle: highlightSearchTerm(post.title, searchTerm),
      highlightedExcerpt: highlightSearchTerm(post.excerpt, searchTerm)
    }))
    // Sort by relevance (title matches first, then excerpt, then content)
    .sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchTerm) ? 1 : 0;
      const bTitle = b.title.toLowerCase().includes(searchTerm) ? 1 : 0;

      if (aTitle !== bTitle) {
        return bTitle - aTitle; // Title matches first
      }

      const aExcerpt = a.excerpt.toLowerCase().includes(searchTerm) ? 1 : 0;
      const bExcerpt = b.excerpt.toLowerCase().includes(searchTerm) ? 1 : 0;

      if (aExcerpt !== bExcerpt) {
        return bExcerpt - aExcerpt; // Then excerpt matches
      }

      // Finally sort by date (newest first)
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, 20); // Limit to 20 results

  return Response.json({
    ok: true,
    data: {
      query: searchTerm,
      results,
      count: results.length
    }
  });
}

function highlightSearchTerm(text: string, term: string): string {
  if (!term) return text;

  const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}