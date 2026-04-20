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

  // Don't render anything if AdSense client ID is not configured
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
        return '280px'; // auto format typical height
    }
  };

  const containerStyle = {
    ...style,
    minHeight: getMinHeight(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb', // bg-subtle from design tokens
    border: '1px solid #e5e7eb', // border from design tokens
    borderRadius: '0.75rem', // radius-md from design tokens
    padding: '1rem',
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