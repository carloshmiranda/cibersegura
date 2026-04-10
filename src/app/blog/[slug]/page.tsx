import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "@/lib/posts";
import { parseMarkdown, renderMarkdown } from "@/lib/markdown";
import { RelatedPosts } from "@/components/related-posts";
import { SocialShare } from "@/components/social-share";
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

  // Detect if this post has FAQ content
  const hasFAQContent = post.content.includes('Perguntas Frequentes') ||
                        post.content.includes('## FAQ') ||
                        post.content.includes('### FAQ');

  // Extract FAQ structured data if present
  const extractFAQStructuredData = () => {
    if (!hasFAQContent) return null;

    const faqItems = [];
    const lines = post.content.split('\n');
    let currentQuestion = '';
    let currentAnswer = '';
    let inFAQSection = false;
    let collectingAnswer = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Start of FAQ section
      if (line.includes('Perguntas Frequentes') || line.includes('## FAQ')) {
        inFAQSection = true;
        continue;
      }

      // Question (starts with ###)
      if (inFAQSection && line.startsWith('### ')) {
        // Save previous Q&A if exists
        if (currentQuestion && currentAnswer) {
          faqItems.push({
            "@type": "Question",
            name: currentQuestion,
            acceptedAnswer: {
              "@type": "Answer",
              text: currentAnswer.trim()
            }
          });
        }

        currentQuestion = line.replace('### ', '');
        currentAnswer = '';
        collectingAnswer = true;
        continue;
      }

      // Collect answer content
      if (inFAQSection && collectingAnswer && line && !line.startsWith('##')) {
        // Skip lines that start with **Sim or **Não as those are just formatting
        if (!line.startsWith('**Sim,') && !line.startsWith('**Não,') && !line.startsWith('**Depende')) {
          currentAnswer += line + ' ';
        } else {
          currentAnswer += line.replace(/\*\*/g, '') + ' ';
        }
      }

      // End of current section
      if (inFAQSection && line.startsWith('## ') && !line.includes('FAQ') && !line.includes('Perguntas')) {
        // Save last Q&A
        if (currentQuestion && currentAnswer) {
          faqItems.push({
            "@type": "Question",
            name: currentQuestion,
            acceptedAnswer: {
              "@type": "Answer",
              text: currentAnswer.trim()
            }
          });
        }
        break;
      }
    }

    // Save final Q&A if we're at the end
    if (inFAQSection && currentQuestion && currentAnswer) {
      faqItems.push({
        "@type": "Question",
        name: currentQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: currentAnswer.trim()
        }
      });
    }

    if (faqItems.length > 0) {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems
      };
    }

    return null;
  };

  const faqStructuredData = extractFAQStructuredData();

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
    dateModified: post.publishedAt,
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
