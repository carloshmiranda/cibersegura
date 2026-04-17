/**
 * Analytics and tracking utilities for CiberPME
 */

export interface CTAImpressionData {
  article_slug?: string;
  cta_position: string;
  link_id: string;
  cta_type: 'banner' | 'inline';
  position?: number; // For inline CTAs
}

export interface CTAClickData {
  article_slug?: string;
  cta_position: string;
  link_id: string;
  destination_url: string;
}

/**
 * Track CTA impression when it becomes visible
 */
export async function trackCTAImpression(data: CTAImpressionData): Promise<boolean> {
  try {
    const response = await fetch('/api/track/impression', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        event_type: 'impression',
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to track CTA impression:', error);
    return false;
  }
}

/**
 * Track CTA click (existing functionality)
 */
export async function trackCTAClick(data: CTAClickData): Promise<boolean> {
  try {
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
    console.error('Failed to track CTA click:', error);
    return false;
  }
}

/**
 * React hook for tracking CTA impressions using IntersectionObserver
 */
export function useCTAImpressionTracking(
  elementRef: React.RefObject<HTMLElement | HTMLDivElement | null>,
  impressionData: CTAImpressionData,
  options: {
    threshold?: number;
    visibilityDuration?: number; // milliseconds
  } = {}
) {
  const {
    threshold = 0.5, // 50% visibility
    visibilityDuration = 1000, // 1 second
  } = options;

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let visibilityTimer: NodeJS.Timeout | null = null;
    let hasTracked = false; // Only track once per component lifetime

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            // Element is visible at required threshold
            if (!visibilityTimer && !hasTracked) {
              visibilityTimer = setTimeout(() => {
                // Element has been visible for required duration
                trackCTAImpression(impressionData)
                  .then((success) => {
                    if (success) {
                      hasTracked = true;
                      console.log('🎯 CTA impression tracked:', impressionData.link_id);
                    }
                  })
                  .catch(console.error);

                visibilityTimer = null;
              }, visibilityDuration);
            }
          } else {
            // Element is no longer visible or below threshold
            if (visibilityTimer) {
              clearTimeout(visibilityTimer);
              visibilityTimer = null;
            }
          }
        });
      },
      {
        threshold: [threshold],
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (visibilityTimer) {
        clearTimeout(visibilityTimer);
      }
    };
  }, [elementRef, impressionData, threshold, visibilityDuration]);
}

// Import React for the hook
import React from 'react';