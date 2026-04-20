'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Only track in production
    if (process.env.NODE_ENV !== 'production') {
      console.log(metric);
      return;
    }

    // Send to analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }

    // Send to custom endpoint for tracking
    fetch('/api/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
        delta: metric.delta,
        timestamp: Date.now(),
      }),
    }).catch(() => {
      // Fail silently in case of network issues
    });
  });

  return null;
}

// Extend Window type for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}