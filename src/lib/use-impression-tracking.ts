import { useEffect, useRef, useCallback } from 'react';

interface ImpressionTrackingData {
  article_slug?: string;
  cta_position: string;
  link_id: string;
  destination_url: string;
}

// Track CTA impression function
const trackCTAImpression = async (data: ImpressionTrackingData) => {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        event_type: 'cta_impression'
      }),
      keepalive: true,
    });

    return true;
  } catch (error) {
    console.error('❌ CTA impression tracking error:', error);
    return false;
  }
};

export function useImpressionTracking(trackingData: ImpressionTrackingData) {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasTracked = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const trackImpression = useCallback(async () => {
    if (hasTracked.current) return;

    hasTracked.current = true;

    console.log('👁️ CTA impression tracked:', {
      position: trackingData.cta_position,
      link_id: trackingData.link_id,
      article: trackingData.article_slug,
    });

    const success = await trackCTAImpression(trackingData);
    if (success) {
      console.log('✅ CTA impression tracking successful:', trackingData.link_id);
    } else {
      console.warn('⚠️ CTA impression tracking failed:', trackingData.link_id);
    }
  }, [trackingData]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Element is 50%+ visible, start timer
            if (!timerRef.current && !hasTracked.current) {
              timerRef.current = setTimeout(() => {
                trackImpression();
              }, 1000); // 1 second delay
            }
          } else {
            // Element is not sufficiently visible, clear timer
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          }
        });
      },
      {
        threshold: 0.5, // 50% visibility threshold
        rootMargin: '0px'
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.unobserve(element);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [trackImpression]);

  return elementRef;
}