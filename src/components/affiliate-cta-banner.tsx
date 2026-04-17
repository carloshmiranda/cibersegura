"use client";

interface AffiliateTool {
  name: string;
  description: string;
  category: "siem" | "passwords" | "email" | "backup";
  url: string;
  logo?: string; // Optional logo URL
  recommended?: boolean;
}

interface AffiliateCTABannerProps {
  tools: AffiliateTool[];
  title?: string;
  description?: string;
  source: string; // For UTM tracking (e.g., "blog-nis2", "recursos-nis2")
  articleSlug?: string; // Blog post slug for tracking
  className?: string;
}

// UTM tracking function
const addUTMParams = (url: string, source: string, medium: string, campaign: string, content: string): string => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('utm_source', 'ciberpme.pt');
    urlObj.searchParams.set('utm_medium', medium);
    urlObj.searchParams.set('utm_campaign', campaign);
    urlObj.searchParams.set('utm_content', content);
    urlObj.searchParams.set('utm_term', source);


    return urlObj.toString();
  } catch (error) {
    // Fallback to original URL if UTM addition fails
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to add UTM parameters:', error, { url, source, medium, campaign, content });
    }
    return url;
  }
};

// Click tracking function
const trackAffiliateClick = async (data: {
  article_slug?: string;
  cta_position: string;
  link_id: string;
  destination_url: string;
}) => {
  try {
    // Use fetch with keepalive to ensure tracking even if user navigates away
    const response = await fetch('/api/affiliate/click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      keepalive: true,
    });


    return response.ok;
  } catch (error) {
    // Debug logging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to track affiliate click:', error, data);
    }
    return false;
  }
};

export default function AffiliateCTABanner({
  tools,
  title = "Ferramentas Recomendadas",
  description = "Soluções de cibersegurança selecionadas para implementar conformidade NIS2",
  source,
  articleSlug,
  className = ""
}: AffiliateCTABannerProps) {

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "siem":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        );
      case "passwords":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        );
      case "email":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 21.75 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        );
      case "backup":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a6.759 6.759 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        );
    }
  };

  return (
    <div className={`p-6 rounded-xl border-l-4 border-accent bg-accent-light ${className}`}>
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 p-2 rounded-lg bg-accent text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 0 1-.1-3.528l.893-.893a2.548 2.548 0 0 1 3.528-.1l5.653 4.655M8.25 18.75a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3Z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-brand mb-2">{title}</h3>
          <p className="text-text-secondary text-sm">{description}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool, index) => {
          const trackedUrl = addUTMParams(
            tool.url,
            source,
            'affiliate',
            'nis2-recommendations',
            `${tool.name.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`
          );

          const ctaPosition = `banner-${index + 1}`;
          const linkId = `${tool.name.toLowerCase().replace(/\s+/g, '-')}-${tool.category}`;

          const handleClick = () => {
            // Fire-and-forget tracking with keepalive
            trackAffiliateClick({
              article_slug: articleSlug,
              cta_position: ctaPosition,
              link_id: linkId,
              destination_url: trackedUrl,
            }).catch(error => {
              // Don't block navigation if tracking fails
              if (process.env.NODE_ENV === 'development') {
                console.error('Click tracking error:', error);
              }
            });
          };

          return (
            <a
              key={tool.name}
              href={trackedUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="flex items-start gap-3 p-4 rounded-lg border border-border bg-white hover:border-accent hover:shadow-sm transition group"
            >
              <div className="flex-shrink-0 p-1.5 rounded bg-bg-subtle text-accent group-hover:text-accent group-hover:bg-accent-light transition">
                {getCategoryIcon(tool.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-brand text-sm truncate">
                    {tool.name}
                  </h4>
                  {tool.recommended && (
                    <span className="px-2 py-0.5 text-xs font-medium text-accent bg-accent-light rounded-full">
                      Top
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary line-clamp-2">
                  {tool.description}
                </p>
                <div className="mt-2 text-xs text-accent font-medium group-hover:underline">
                  Ver →
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-text-muted">
        💡 <strong>Nota:</strong> Estes links podem gerar comissões para o CiberPME,
        ajudando-nos a manter conteúdo gratuito e de qualidade sobre cibersegurança.
      </div>
    </div>
  );
}