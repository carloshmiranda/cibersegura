'use client';

import { useState, useEffect } from 'react';

interface WebVitalMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

interface VitalStats {
  name: string;
  current: number | null;
  rating: string;
  description: string;
  threshold: { good: number; poor: number };
}

const VITALS_CONFIG: Record<string, VitalStats> = {
  LCP: {
    name: 'Largest Contentful Paint',
    current: null,
    rating: 'unknown',
    description: 'Time until the largest content element is rendered',
    threshold: { good: 2500, poor: 4000 }
  },
  FCP: {
    name: 'First Contentful Paint',
    current: null,
    rating: 'unknown',
    description: 'Time until first content is painted',
    threshold: { good: 1800, poor: 3000 }
  },
  CLS: {
    name: 'Cumulative Layout Shift',
    current: null,
    rating: 'unknown',
    description: 'Visual stability of the page',
    threshold: { good: 0.1, poor: 0.25 }
  },
  INP: {
    name: 'Interaction to Next Paint',
    current: null,
    rating: 'unknown',
    description: 'Responsiveness to user interactions',
    threshold: { good: 200, poor: 500 }
  },
  TTFB: {
    name: 'Time to First Byte',
    current: null,
    rating: 'unknown',
    description: 'Server response time',
    threshold: { good: 800, poor: 1800 }
  }
};

function formatValue(metric: string, value: number): string {
  if (metric === 'CLS') {
    return value.toFixed(3);
  }
  return Math.round(value) + 'ms';
}

function getRatingColor(rating: string): string {
  switch (rating) {
    case 'good': return 'text-success';
    case 'needs-improvement': return 'text-warning';
    case 'poor': return 'text-error';
    default: return 'text-text-secondary';
  }
}

function getRatingEmoji(rating: string): string {
  switch (rating) {
    case 'good': return '✅';
    case 'needs-improvement': return '⚠️';
    case 'poor': return '❌';
    default: return '⏳';
  }
}

export function WebVitalsDashboard() {
  const [vitals, setVitals] = useState<Record<string, VitalStats>>(VITALS_CONFIG);
  const [isCollecting, setIsCollecting] = useState(true);

  useEffect(() => {
    // Listen for Web Vitals data from our tracking script
    const handleWebVital = (event: CustomEvent<WebVitalMetric>) => {
      const metric = event.detail;

      setVitals(prev => ({
        ...prev,
        [metric.name]: {
          ...prev[metric.name],
          current: metric.value,
          rating: metric.rating
        }
      }));
    };

    // Type assertion for custom event
    window.addEventListener('webvital' as any, handleWebVital);

    // Stop collecting after 10 seconds to avoid constant updates
    const timeout = setTimeout(() => {
      setIsCollecting(false);
    }, 10000);

    return () => {
      window.removeEventListener('webvital' as any, handleWebVital);
      clearTimeout(timeout);
    };
  }, []);

  const overallScore = Object.values(vitals).reduce((score, vital) => {
    if (vital.current === null) return score;

    switch (vital.rating) {
      case 'good': return score + 20;
      case 'needs-improvement': return score + 10;
      case 'poor': return score + 0;
      default: return score;
    }
  }, 0);

  const measuredVitals = Object.values(vitals).filter(v => v.current !== null).length;

  return (
    <div className="fixed bottom-4 right-4 bg-bg-subtle border border-border rounded-lg p-4 shadow-md max-w-sm z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-brand">Core Web Vitals</h3>
        <div className="text-xs text-text-secondary">
          {isCollecting ? '📊 Collecting...' : '✓ Complete'}
        </div>
      </div>

      {measuredVitals > 0 && (
        <div className="mb-3 p-2 bg-bg rounded border">
          <div className="text-xs text-text-secondary mb-1">Performance Score</div>
          <div className={`text-lg font-bold ${overallScore >= 80 ? 'text-success' : overallScore >= 60 ? 'text-warning' : 'text-error'}`}>
            {Math.round(overallScore)}/100
          </div>
        </div>
      )}

      <div className="space-y-2">
        {Object.entries(vitals).map(([key, vital]) => (
          <div key={key} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={getRatingColor(vital.rating)}>
                {getRatingEmoji(vital.rating)}
              </span>
              <span className="font-medium">{key}</span>
            </div>
            <div className="text-text-secondary">
              {vital.current !== null ? formatValue(key, vital.current) : '--'}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-border text-xs text-text-secondary">
        <p>
          Monitoring performance for Portuguese SME users.{' '}
          <a
            href="https://web.dev/vitals/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Learn more
          </a>
        </p>
      </div>
    </div>
  );
}

// Development-only component - only show in dev mode
export function DevWebVitalsDashboard() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <WebVitalsDashboard />;
}