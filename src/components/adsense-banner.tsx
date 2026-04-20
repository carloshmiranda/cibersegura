'use client';

interface AdBannerProps {
  adSlot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdBanner({
  adSlot,
  format = 'auto',
  responsive = true,
  className = '',
  style = {},
}: AdBannerProps) {
  // Only render if AdSense client ID is configured
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!adsenseClientId) {
    return null;
  }

  // Set fixed min-height to prevent CLS (Cumulative Layout Shift)
  const defaultStyle: React.CSSProperties = {
    minHeight: format === 'horizontal' ? '90px' : format === 'rectangle' ? '250px' : '280px',
    display: 'block',
    backgroundColor: '#f8fafc', // subtle bg while loading
    ...style,
  };

  return (
    <div className={`ad-container ${className}`} style={defaultStyle}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        data-ad-client={adsenseClientId}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}

// Hook to load AdSense script and initialize ads
export function useAdSense() {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (typeof window !== 'undefined' && adsenseClientId) {
    try {
      // Initialize AdSense ads
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (error) {
      console.error('AdSense initialization error:', error);
    }
  }
}

// Pre-configured ad components for common placements
export function ArticleTopBanner({ className }: { className?: string }) {
  return (
    <AdBanner
      adSlot="article-top"
      format="horizontal"
      className={`mb-6 ${className || ''}`}
    />
  );
}

export function ArticleInlineBanner({ className }: { className?: string }) {
  return (
    <AdBanner
      adSlot="article-inline"
      format="rectangle"
      className={`my-8 ${className || ''}`}
    />
  );
}

export function ArticleBottomBanner({ className }: { className?: string }) {
  return (
    <AdBanner
      adSlot="article-bottom"
      format="horizontal"
      className={`mt-6 ${className || ''}`}
    />
  );
}

export function SidebarBanner({ className }: { className?: string }) {
  return (
    <AdBanner
      adSlot="sidebar"
      format="vertical"
      className={`sticky top-4 ${className || ''}`}
    />
  );
}