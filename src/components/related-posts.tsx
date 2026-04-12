import Link from "next/link";
import { posts, type Post } from "@/lib/posts";

interface RelatedPostsProps {
  currentPostSlug: string;
  category: Post["category"];
}

export function RelatedPosts({ currentPostSlug, category }: RelatedPostsProps) {
  // Get all posts excluding current post, sorted by published date (most recent first)
  const allOtherPosts = posts
    .filter((post) => post.slug !== currentPostSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // First, get posts from the same category
  const sameCategoryPosts = allOtherPosts
    .filter((post) => post.category === category);

  // Then, get posts from other categories to fill up to 3 total
  const otherCategoryPosts = allOtherPosts
    .filter((post) => post.category !== category);

  // Combine: prefer same category posts, then fill with others, limit to 3 total
  const relatedPosts = [
    ...sameCategoryPosts,
    ...otherCategoryPosts
  ].slice(0, 3);

  // Don't render if no related posts found
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="text-2xl font-bold text-brand mb-8 font-display text-balance">Artigos Relacionados</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="group border border-border rounded-xl p-6 hover:border-accent transition"
          >
            <span className="inline-block px-2 py-0.5 text-xs font-medium text-accent bg-accent-light rounded-full mb-3">
              {post.categoryLabel}
            </span>
            <h3 className="text-lg font-bold text-brand mb-2 group-hover:text-accent transition leading-tight font-display">
              <Link href={`/blog/${post.slug}`} className="stretched-link">
                {post.title}
              </Link>
            </h3>
            <p className="text-sm text-text-secondary mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("pt-PT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{post.readingTime} min de leitura</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}