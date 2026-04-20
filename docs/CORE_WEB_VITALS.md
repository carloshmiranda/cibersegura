# Core Web Vitals Optimization for CiberPME

## Overview

This document outlines the Core Web Vitals optimization features implemented for CiberPME, specifically tailored for Portuguese SME users who often access the site via mobile devices on varying connection speeds.

## What are Core Web Vitals?

Core Web Vitals are a set of metrics that Google uses to measure user experience on web pages:

- **LCP (Largest Contentful Paint)**: Measures loading performance
- **FID (First Input Delay)**: Measures interactivity (being replaced by INP)
- **CLS (Cumulative Layout Shift)**: Measures visual stability
- **INP (Interaction to Next Paint)**: Measures responsiveness
- **FCP (First Contentful Paint)**: Measures perceived loading speed
- **TTFB (Time to First Byte)**: Measures server response time

## Features Implemented

### 1. Web Vitals Tracking (`src/components/web-vitals.tsx`)

Real-time tracking of Core Web Vitals metrics that:
- Collects metrics using the `next/web-vitals` hook
- Sends data to Google Analytics (when configured)
- Posts metrics to `/api/web-vitals` for custom analytics
- Only runs in production to avoid development noise

### 2. Web Vitals API Endpoint (`src/app/api/web-vitals/route.ts`)

Edge function that:
- Receives Web Vitals data from the client
- Validates metric data
- Logs metrics for monitoring (can be extended to store in database)
- Provides a health check endpoint

### 3. Development Dashboard (`src/components/web-vitals-dashboard.tsx`)

Development-only visual dashboard that:
- Shows real-time Core Web Vitals metrics
- Displays performance score (0-100)
- Color-codes metrics based on Google's thresholds
- Only appears in development mode
- Provides educational links about Web Vitals

### 4. Core Web Vitals Audit Script (`scripts/audit-core-web-vitals.js`)

Comprehensive audit tool that:
- Tests multiple pages using Playwright
- Measures all Core Web Vitals metrics
- Simulates mobile devices for realistic testing
- Checks for common performance issues
- Provides SME-specific recommendations
- Saves detailed JSON reports to `reports/` directory

## Usage

### Running the Audit

```bash
# Test against production
npm run audit-cwv

# Test against local development
AUDIT_URL=http://localhost:3000 npm run audit-cwv
```

### Viewing Real-time Metrics

1. Start the development server: `npm run dev`
2. Open the site in your browser
3. Look for the Web Vitals dashboard in the bottom-right corner
4. Interact with the page to trigger metrics collection

### Checking Web Vitals API

```bash
# Health check
curl https://ciberpme.vercel.app/api/web-vitals

# View logs in Vercel dashboard for production metrics
```

## Performance Thresholds

### Google's Core Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP    | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| FID/INP | ≤ 100ms | 100ms - 300ms | > 300ms |
| CLS    | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |
| FCP    | ≤ 1.8s | 1.8s - 3.0s | > 3.0s |
| TTFB   | ≤ 800ms | 800ms - 1.8s | > 1.8s |

## SME-Specific Considerations

### Why Performance Matters for Portuguese SMEs

1. **Trust & Professionalism**: Fast loading builds credibility
2. **Mobile Usage**: SME owners often browse on mobile devices
3. **Connection Variability**: Rural areas may have slower internet
4. **Competition**: Performance affects search rankings
5. **Conversion**: Slower sites have higher bounce rates

### Optimization Strategy

1. **Mobile-First**: Test primarily on mobile devices
2. **3G Simulation**: Test under slow network conditions
3. **Critical Path**: Prioritize above-fold content loading
4. **Progressive Enhancement**: Ensure core functionality works without JS
5. **Resource Optimization**: Minimize bundle sizes for slower connections

## Monitoring & Alerts

### Current Implementation

- Real-time client-side collection
- Server-side logging via Edge API
- Development dashboard for immediate feedback
- Automated audit script for CI/CD integration

### Recommended Extensions

1. **Database Storage**: Store metrics for historical analysis
2. **Alert System**: Email/Slack notifications for performance regressions
3. **RUM (Real User Monitoring)**: Google Analytics 4 with custom events
4. **Synthetic Monitoring**: Regular automated audits from different locations

## Common Issues & Solutions

### Poor LCP (> 4.0s)

**Causes:**
- Large, unoptimized images
- Render-blocking resources
- Slow server response

**Solutions:**
- Use `next/image` with `priority={true}` for above-fold images
- Optimize image formats (WebP, AVIF)
- Preload critical resources
- Reduce server response time

### Poor CLS (> 0.25)

**Causes:**
- Images without explicit dimensions
- Dynamic content insertion
- Web fonts causing layout shifts

**Solutions:**
- Set explicit `width` and `height` on all images
- Use `aspect-ratio` CSS for responsive images
- Reserve space for dynamic content
- Use `font-display: swap` (already implemented)

### Poor FCP (> 3.0s)

**Causes:**
- Large CSS bundles
- Blocking JavaScript
- Slow network conditions

**Solutions:**
- Minimize critical CSS
- Use code splitting
- Implement service worker caching
- Optimize critical rendering path

## Integration with Next.js

### Already Optimized

- ✅ Fonts: Using `next/font` with `display: swap`
- ✅ Images: Using `next/image` throughout the site
- ✅ Code Splitting: Automatic with Next.js App Router
- ✅ Static Generation: Most pages are statically generated
- ✅ Edge Functions: Fast response times with Vercel Edge Runtime

### Additional Optimizations

- Server Components by default (reduces client-side JS)
- Vercel Analytics integration
- Automatic image optimization
- Built-in performance monitoring

## Continuous Improvement

### Regular Audits

1. Run `npm run audit-cwv` before major releases
2. Monitor metrics in production via Vercel Analytics
3. Set up alerts for performance regressions
4. Test on real devices with varying network conditions

### Performance Budget

- LCP: < 2.5s (target: < 2.0s)
- CLS: < 0.1 (target: < 0.05)
- FCP: < 1.8s (target: < 1.5s)
- Bundle Size: < 500KB total transfer size

### Quarterly Reviews

- Analyze Web Vitals trends
- Identify performance bottlenecks
- Update optimization strategies
- Compare against competitors

---

This optimization system ensures CiberPME delivers fast, reliable performance for Portuguese SME users across all devices and network conditions.