import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/lib/posts";
import { parseMarkdown, renderMarkdown } from "@/lib/markdown";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const baseUrl = "https://ciberpme.vercel.app";
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} — CiberPME`,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      url: postUrl,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const markdownElements = parseMarkdown(post.content);
  const renderedContent = renderMarkdown(markdownElements);

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://ciberpme.vercel.app";
  const articleUrl = `${baseUrl}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: "CiberPME",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "CiberPME",
      url: baseUrl,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: articleUrl,
    articleSection: post.categoryLabel,
    inLanguage: "pt-PT",
    image: `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="min-h-screen bg-bg">
        {/* Navigation */}
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-brand">
          CiberPME
        </Link>
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <Link href="/blog" className="hover:text-brand transition">
            Blog
          </Link>
          <Link href="/faq" className="hover:text-brand transition">
            FAQ
          </Link>
          <Link href="/#sobre" className="hover:text-brand transition">
            Sobre
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-brand transition">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand transition">
            Blog
          </Link>
          <span>/</span>
          <span className="text-text-secondary">{post.categoryLabel}</span>
        </div>

        {/* Article header */}
        <header className="mb-10">
          <span className="inline-block px-2 py-0.5 text-xs font-medium text-accent bg-accent-light rounded-full mb-4">
            {post.categoryLabel}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-text-muted">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("pt-PT", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>{post.readingTime} min de leitura</span>
          </div>
        </header>

        {/* Article content */}
        <article className="space-y-6">
          {renderedContent}
        </article>

        {/* Back to blog */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="text-sm text-accent hover:underline transition"
          >
            &larr; Voltar ao blog
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-brand">CiberPME</span>
          <div className="flex gap-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-brand transition">
              Inicio
            </Link>
            <Link href="/blog" className="hover:text-brand transition">
              Blog
            </Link>
            <Link href="/faq" className="hover:text-brand transition">
              FAQ
            </Link>
          </div>
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} CiberPME
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}
