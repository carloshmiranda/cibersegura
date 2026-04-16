import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/lib/posts";
import { parseMarkdown, renderMarkdown } from "@/lib/markdown";
import { extractFAQStructuredData } from "@/lib/seo-utils";
import { RelatedPosts } from "@/components/related-posts";
import { SocialShare } from "@/components/social-share";
import CountdownTimer from "@/components/countdown-timer";
import AffiliateCTABanner from "@/components/affiliate-cta-banner";
import { getAllNIS2Tools } from "@/lib/affiliate-tools";
import type { Metadata } from "next";
import Footer from "@/components/footer";

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
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`/api/og?title=${encodeURIComponent(post.title)}`],
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

  // Detect if this is a how-to guide based on content and slug
  const isHowToGuide = post.slug.includes('guia') ||
                       post.slug.includes('registo') ||
                       post.content.includes('Passo ') ||
                       post.content.includes('### Passo');

  // Extract FAQ structured data if present
  const faqStructuredData = extractFAQStructuredData(post.content);

  // Check if this article should show the NIS2 countdown timer
  const shouldShowCountdown = post.slug.includes('nis2') || post.category === 'legislacao';

  // Check if this is a top NIS2 article that should show affiliate recommendations
  const isTopNIS2Article = [
    'nis2-portugal-guia-pme',
    'checklist-nis2-conformidade',
    'nis2-decreto-lei-125-2025-obrigacoes-pme',
    'multas-coimas-nis2-pme',
    'registo-cncs-nis2-guia-completo'
  ].includes(post.slug);

  // Generate BreadcrumbList JSON-LD for improved SEO and search result display
  // Structure: Home > Blog > Category > Post Title
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.categoryLabel,
        item: `${baseUrl}/blog/categoria/${post.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": isHowToGuide ? "HowTo" : "BlogPosting",
    name: post.title,
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
    dateModified: post.updatedAt || post.publishedAt,
    url: articleUrl,
    articleSection: post.categoryLabel,
    inLanguage: "pt-PT",
    image: `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}`,
    ...(isHowToGuide && {
      totalTime: `PT${post.readingTime}M`,
      supply: [
        {
          "@type": "HowToSupply",
          name: "Documentos empresariais (certidão comercial, estatutos)"
        },
        {
          "@type": "HowToSupply",
          name: "Identificação do responsável pela cibersegurança"
        },
        {
          "@type": "HowToSupply",
          name: "Contactos de emergência 24/7"
        }
      ],
      tool: [
        {
          "@type": "HowToTool",
          name: "Chave Móvel Digital ou Cartão de Cidadão"
        },
        {
          "@type": "HowToTool",
          name: "Portal CNCS (portal.cncs.gov.pt)"
        }
      ],
      step: [
        {
          "@type": "HowToStep",
          name: "Avalie a Aplicabilidade",
          text: "Confirme se a sua empresa está abrangida pela NIS2 consultando os anexos do Decreto-Lei 125/2025 e verificando os critérios de dimensão.",
          url: `${articleUrl}#passo-1`
        },
        {
          "@type": "HowToStep",
          name: "Reúna a Documentação",
          text: "Prepare todos os documentos obrigatórios incluindo certificado permanente da empresa, identificação do responsável pela cibersegurança e inventário de sistemas.",
          url: `${articleUrl}#passo-2`
        },
        {
          "@type": "HowToStep",
          name: "Aceda ao Portal de Registo",
          text: "Entre no portal oficial do CNCS e autentique-se com Chave Móvel Digital ou Cartão de Cidadão.",
          url: `${articleUrl}#passo-3`
        },
        {
          "@type": "HowToStep",
          name: "Complete o Formulário",
          text: "Preencha todas as secções obrigatórias do formulário de registo NIS2 com informação detalhada sobre a empresa e sistemas.",
          url: `${articleUrl}#passo-4`
        },
        {
          "@type": "HowToStep",
          name: "Submeta Documentos",
          text: "Faça upload de todos os documentos de suporte em formato PDF, Word ou Excel.",
          url: `${articleUrl}#passo-5`
        },
        {
          "@type": "HowToStep",
          name: "Valide e Submeta",
          text: "Revise toda a informação, confirme com a checklist automática e submeta o registo oficial.",
          url: `${articleUrl}#passo-6`
        }
      ]
    })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      <div className="min-h-screen bg-bg">
        {/* Navigation */}
      <header>
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-brand">
            CiberPME
          </Link>
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <Link href="/recursos" className="hover:text-brand transition">Recursos</Link>
            <Link href="/blog" className="text-brand font-bold" aria-current="page">
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
      </header>

      <main id="main-content" className="max-w-3xl mx-auto px-6 py-12">
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
          <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 leading-tight text-balance font-display tracking-tight">
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

        {/* NIS2 Countdown Timer for legislacao articles */}
        {shouldShowCountdown && (
          <div className="mb-8 p-6 bg-warning-bg border border-warning-border rounded-lg">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-warning-text mb-2">
                Prazo para Registo NIS2
              </h2>
              <p className="text-sm text-warning-text/80">
                Tempo restante para cumprir as obrigações de registo
              </p>
            </div>
            <CountdownTimer targetDate="2026-05-04T23:59:59" />
          </div>
        )}

        {/* Social share buttons */}
        <div className="mb-8 pb-8 border-b border-border">
          <SocialShare
            title={post.title}
            url={articleUrl}
            description={post.excerpt}
          />
        </div>

        {/* Article content */}
        <article className="space-y-6">
          {renderedContent}
        </article>

        {/* Affiliate CTA for top NIS2 articles */}
        {isTopNIS2Article && (
          <div className="mt-12 mb-12">
            <AffiliateCTABanner
              tools={getAllNIS2Tools()}
              title="Ferramentas Recomendadas para Conformidade NIS2"
              description="Soluções de cibersegurança selecionadas pela nossa equipa para implementar os requisitos da diretiva NIS2 de forma eficaz"
              source={`blog-${post.slug}`}
            />
          </div>
        )}

        {/* Related posts */}
        <RelatedPosts currentPostSlug={post.slug} category={post.category} />

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

      <Footer />
    </div>
    </>
  );
}
