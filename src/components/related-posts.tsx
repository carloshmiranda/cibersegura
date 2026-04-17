import Link from "next/link";
import { posts, type Post } from "@/lib/posts";

interface RelatedPostsProps {
  currentPostSlug: string;
  category: Post["category"];
}

/**
 * Extract meaningful keywords from text (Portuguese cybersecurity terms)
 */
function extractKeywords(text: string): string[] {
  const normalizedText = text.toLowerCase();

  // Common Portuguese cybersecurity keywords
  const keywords = [
    'ransomware', 'phishing', 'malware', 'antivírus', 'firewall', 'backup',
    'password', 'mfa', '2fa', 'vpn', 'ssl', 'tls', 'gdpr', 'rgpd', 'nis2',
    'microsoft', 'windows', 'linux', 'android', 'ios', 'apple',
    'segurança', 'cibersegurança', 'proteção', 'ameaças', 'vulnerabilidades',
    'pme', 'empresa', 'negócio', 'colaboradores', 'dados', 'informação',
    'autenticação', 'autorização', 'acesso', 'identidade', 'permissões',
    'rede', 'wifi', 'internet', 'email', 'cloud', 'nuvem',
    'formação', 'treino', 'políticas', 'procedimentos', 'compliance',
    'incidentes', 'resposta', 'recovery', 'continuidade', 'auditoria'
  ];

  return keywords.filter(keyword => normalizedText.includes(keyword));
}

/**
 * Calculate relevance score based on category and keyword overlap
 */
function calculateRelevanceScore(post: Post, currentCategory: string, currentKeywords: string[]): number {
  let score = 0;

  // Same category gets high base score
  if (post.category === currentCategory) {
    score += 10;
  }

  // Keyword matches in title are weighted heavily
  const postKeywords = extractKeywords(post.title);
  const titleMatches = postKeywords.filter(k => currentKeywords.includes(k)).length;
  score += titleMatches * 5;

  // Keyword matches in excerpt
  const excerptKeywords = extractKeywords(post.excerpt);
  const excerptMatches = excerptKeywords.filter(k => currentKeywords.includes(k)).length;
  score += excerptMatches * 2;

  // Boost for recent articles
  const postDate = new Date(post.publishedAt);
  const monthsOld = (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (monthsOld < 3) score += 2;

  return score;
}

/**
 * Find related articles based on category and keyword similarity
 */
function findRelatedArticles(currentSlug: string, currentCategory: string, maxResults = 3): Post[] {
  const currentPost = posts.find(p => p.slug === currentSlug);
  if (!currentPost) return [];

  // Get current post's keywords from title and excerpt
  const currentKeywords = extractKeywords(currentPost.title + " " + currentPost.excerpt);

  // Calculate relevance scores for other posts
  const candidates = posts
    .filter(p => p.slug !== currentSlug) // Exclude current article
    .map(post => ({
      post,
      score: calculateRelevanceScore(post, currentCategory, currentKeywords)
    }))
    .filter(candidate => candidate.score > 0) // Only include relevant articles
    .sort((a, b) => b.score - a.score); // Sort by relevance score

  return candidates.slice(0, maxResults).map(c => c.post);
}

export function RelatedPosts({ currentPostSlug, category }: RelatedPostsProps) {
  const relatedPosts = findRelatedArticles(currentPostSlug, category, 3);

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