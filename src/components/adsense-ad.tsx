"use client";

import { useEffect } from 'react';

interface AdSenseAdProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSenseAd({
  slot,
  format = 'auto',
  responsive = true,
  style = { display: 'block' },
  className = ''
}: AdSenseAdProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    try {
      // Only push ads if Google AdSense is available and client ID is configured
      if (typeof window !== 'undefined' && window.adsbygoogle && clientId) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [clientId]);

  // Don't render if no client ID is configured
  if (!clientId) {
    return null;
  }

  // Determine min-height based on format to prevent CLS
  const getMinHeight = () => {
    switch (format) {
      case 'rectangle':
        return '250px';
      case 'horizontal':
        return '90px';
      case 'vertical':
        return '600px';
      default:
        return '200px';
    }
  };

  const containerStyle = {
    minHeight: getMinHeight(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  };

  return (
    <div className={`adsense-container ${className}`} style={containerStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}