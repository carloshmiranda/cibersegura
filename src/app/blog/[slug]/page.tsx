import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/lib/posts";
import { parseMarkdown, renderMarkdown } from "@/lib/markdown";
import { extractFAQStructuredData } from "@/lib/seo-utils";
import { RelatedPosts } from "@/components/related-posts";
import { SocialShare } from "@/components/social-share";
import CountdownTimer from "@/components/countdown-timer";
import AffiliateCTABanner from "@/components/affiliate-cta-banner";
import { AuthorByline, AuthorCard } from "@/components/author-byline";
import { getAllNIS2Tools } from "@/lib/affiliate-tools";
import { NewsletterCapture } from "@/components/blog/newsletter-capture";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import AdSenseAd from "@/components/adsense-ad";

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
  const renderedContent = renderMarkdown(markdownElements, post.slug);

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

  // Check if this is a CNCS urgent topic (NIS2/legislacao) for special urgency messaging
  const isCNCSUrgentTopic = post.slug.includes('nis2') ||
                           post.category === 'legislacao' ||
                           post.content.toLowerCase().includes('cncs') ||
                           post.content.toLowerCase().includes('nis2');

  // Calculate days remaining until CNCS deadline (May 4, 2026)
  const cncsDeadline = new Date('2026-05-04T23:59:59');
  const today = new Date();
  const daysRemaining = Math.ceil((cncsDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

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
    author: post.author ? {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.bio && { description: post.author.bio }),
      worksFor: {
        "@type": "Organization",
        name: "CiberPME",
        url: baseUrl,
      }
    } : {
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
          {post.author ? (
            <AuthorByline
              author={post.author}
              publishedAt={post.publishedAt}
              readingTime={post.readingTime}
            />
          ) : (
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
          )}
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

        {/* Download section for SPF/DKIM/DMARC article */}
        {post.slug === 'spf-dkim-dmarc-seguranca-email-pme' && (
          <div className="mb-8 p-6 bg-accent-light border border-accent rounded-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-brand mb-2">
                  📋 Checklist Gratuito: SPF, DKIM e DMARC
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Guia passo-a-passo para implementar proteção de email na sua empresa.
                  Inclui configurações específicas para Google Workspace, Microsoft 365 e outros provedores.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/downloads/checklist-spf-dkim-dmarc-email-security.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-accent/90 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Descarregar Checklist (PDF)
                  </a>
                  <div className="text-xs text-text-muted flex items-center gap-2">
                    <span>✓ Gratuito</span>
                    <span>✓ Pronto a imprimir</span>
                    <span>✓ Sem email necessário</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AdSense ad placement - after intro content */}
        <div className="my-8">
          <AdSenseAd
            slot="PLACEHOLDER-SLOT-1"
            format="rectangle"
            className="text-center"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </div>

        {/* Article content */}
        <article className="space-y-6">
          {renderedContent}
        </article>

        {/* Newsletter capture - inline placement */}
        <NewsletterCapture placement="inline" articleTitle={post.title} />

        {/* AdSense ad placement - after content */}
        <div className="my-8">
          <AdSenseAd
            slot="PLACEHOLDER-SLOT-2"
            format="horizontal"
            className="text-center"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </div>

        {/* Author card */}
        {post.author && post.author.bio && (
          <div className="mt-12 mb-12">
            <AuthorCard author={post.author} />
          </div>
        )}

        {/* Affiliate CTA for all blog articles */}
        <div className="mt-12 mb-12">
          <AffiliateCTABanner
            tools={getAllNIS2Tools()}
            title={isCNCSUrgentTopic
              ? `🚨 URGENTE: ${daysRemaining} Dias para Conformidade CNCS — Prazo: 4 Maio 2026`
              : "Ferramentas Recomendadas de Cibersegurança"
            }
            description={isCNCSUrgentTopic
              ? `PRAZO CRÍTICO: Faltam apenas ${daysRemaining} dias para o registo obrigatório CNCS! Implemente agora os controlos de segurança essenciais com estas ferramentas certificadas antes que seja tarde demais.`
              : "Soluções de cibersegurança selecionadas pela nossa equipa para proteger a sua PME de forma eficaz"
            }
            source={`blog-${post.slug}`}
            articleSlug={post.slug}
          />
        </div>

        {/* Newsletter capture - footer placement */}
        <NewsletterCapture placement="footer" />

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
