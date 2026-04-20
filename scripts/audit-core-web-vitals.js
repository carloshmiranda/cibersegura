#!/usr/bin/env node

/**
 * Core Web Vitals Audit Script for CiberPME
 *
 * This script audits the site's Core Web Vitals performance using Playwright
 * and provides actionable recommendations for Portuguese SME audience.
 *
 * Run with: npm run audit-cwv
 * For production: AUDIT_URL=https://ciberpme.vercel.app npm run audit-cwv
 */

import { chromium } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

const CWV_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },        // Largest Contentful Paint
  FID: { good: 100, poor: 300 },          // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },         // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 },        // First Contentful Paint
  TTFB: { good: 800, poor: 1800 },        // Time to First Byte
  INP: { good: 200, poor: 500 }           // Interaction to Next Paint
};

function getRating(metric, value) {
  const thresholds = CWV_THRESHOLDS[metric];
  if (!thresholds) return 'unknown';
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

function formatValue(metric, value) {
  if (metric === 'CLS') {
    return value.toFixed(3);
  }
  return Math.round(value) + 'ms';
}

async function measureWebVitals(page) {
  // Inject Web Vitals script
  await page.addInitScript(() => {
    window.__webVitals = {};

    // LCP Observer
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      window.__webVitals.LCP = lastEntry.startTime;
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // CLS Observer
    let clsValue = 0;
    let clsEntries = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsEntries.push(entry);
          clsValue += entry.value;
        }
      }
      window.__webVitals.CLS = clsValue;
    }).observe({ entryTypes: ['layout-shift'] });

    // FCP Observer
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          window.__webVitals.FCP = entry.startTime;
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Store navigation timing for TTFB
    window.addEventListener('load', () => {
      const navEntry = performance.getEntriesByType('navigation')[0];
      if (navEntry) {
        window.__webVitals.TTFB = navEntry.responseStart - navEntry.requestStart;
      }
    });
  });

  // Simulate user interaction to trigger FID measurement
  await page.click('body'); // Trigger first input
  await page.waitForTimeout(1000); // Let metrics settle

  // Collect the measurements
  const vitals = await page.evaluate(() => {
    return window.__webVitals || {};
  });

  return vitals;
}

async function auditPage(url, name) {
  console.log(`\n🔍 Auditing ${name}: ${url}`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    // Simulate mobile device for more realistic metrics
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();

  try {
    const startTime = Date.now();

    // Navigate to page
    const response = await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    if (!response.ok()) {
      console.log(`❌ Failed to load ${name} (${response.status()})`);
      await browser.close();
      return null;
    }

    // Measure Web Vitals
    const vitals = await measureWebVitals(page);
    const loadTime = Date.now() - startTime;

    // Get additional performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const resources = performance.getEntriesByType('resource');

      return {
        domContentLoaded: nav ? nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart : null,
        loadComplete: nav ? nav.loadEventEnd - nav.loadEventStart : null,
        resourceCount: resources.length,
        totalTransferSize: resources.reduce((total, resource) => {
          return total + (resource.transferSize || 0);
        }, 0)
      };
    });

    // Check for images without explicit dimensions (CLS risk)
    const imageIssues = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const issues = [];

      images.forEach((img, index) => {
        if (!img.width || !img.height || img.style.aspectRatio === '') {
          issues.push({
            src: img.src,
            hasExplicitDimensions: !!(img.width && img.height)
          });
        }
      });

      return {
        totalImages: images.length,
        imagesWithoutDimensions: issues.length,
        issues: issues.slice(0, 5) // First 5 for brevity
      };
    });

    const result = {
      url,
      name,
      vitals,
      performanceMetrics,
      imageIssues,
      loadTime,
      timestamp: new Date().toISOString()
    };

    // Display results
    console.log(`✅ ${name} loaded in ${loadTime}ms`);
    console.log(`📊 Core Web Vitals:`);

    Object.entries(vitals).forEach(([metric, value]) => {
      if (value !== undefined && value !== null) {
        const rating = getRating(metric, value);
        const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
        console.log(`   - ${metric}: ${formatValue(metric, value)} ${emoji} (${rating})`);
      }
    });

    if (performanceMetrics.totalTransferSize) {
      const sizeKB = Math.round(performanceMetrics.totalTransferSize / 1024);
      console.log(`📦 Total transfer size: ${sizeKB}KB ${sizeKB < 500 ? '✅' : sizeKB < 1000 ? '⚠️' : '❌'}`);
    }

    if (imageIssues.imagesWithoutDimensions > 0) {
      console.log(`🖼️  Images without dimensions: ${imageIssues.imagesWithoutDimensions}/${imageIssues.totalImages} ⚠️`);
    } else {
      console.log(`🖼️  Images: ${imageIssues.totalImages} (all have dimensions) ✅`);
    }

    await browser.close();
    return result;

  } catch (error) {
    console.log(`❌ Error auditing ${name}: ${error.message}`);
    await browser.close();
    return null;
  }
}

function generateRecommendations(results) {
  const validResults = results.filter(r => r !== null);

  if (validResults.length === 0) return;

  console.log('\n💡 RECOMMENDATIONS FOR CIBERPME');
  console.log('================================');
  console.log('Optimized for Portuguese SME users who often access via mobile on slower connections:\n');

  // Analyze common issues
  const commonIssues = {
    poorLCP: validResults.filter(r => r.vitals.LCP && getRating('LCP', r.vitals.LCP) === 'poor'),
    poorCLS: validResults.filter(r => r.vitals.CLS && getRating('CLS', r.vitals.CLS) === 'poor'),
    poorFCP: validResults.filter(r => r.vitals.FCP && getRating('FCP', r.vitals.FCP) === 'poor'),
    imageIssues: validResults.filter(r => r.imageIssues.imagesWithoutDimensions > 0),
    largeBundles: validResults.filter(r => r.performanceMetrics.totalTransferSize > 1024 * 1024) // > 1MB
  };

  if (commonIssues.poorLCP.length > 0) {
    console.log('🎯 PRIORITY: Fix Largest Contentful Paint');
    console.log('   - Add priority={true} to hero images');
    console.log('   - Optimize/compress above-fold images');
    console.log('   - Consider using next/image with fill prop for backgrounds');
    console.log('   - Preload critical resources\n');
  }

  if (commonIssues.poorCLS.length > 0 || commonIssues.imageIssues.length > 0) {
    console.log('🎯 PRIORITY: Fix Cumulative Layout Shift');
    console.log('   - Set explicit width/height on ALL images');
    console.log('   - Add aspect-ratio CSS for responsive images');
    console.log('   - Reserve space for dynamic content (ads, forms)');
    console.log('   - Use font-display: swap (already implemented) ✅\n');
  }

  if (commonIssues.poorFCP.length > 0) {
    console.log('🎯 PRIORITY: Fix First Contentful Paint');
    console.log('   - Minimize above-the-fold CSS');
    console.log('   - Reduce server response time');
    console.log('   - Consider preloading critical fonts');
    console.log('   - Optimize critical rendering path\n');
  }

  if (commonIssues.largeBundles.length > 0) {
    console.log('🎯 OPTIMIZATION: Reduce Bundle Size');
    console.log('   - Code split non-critical JavaScript');
    console.log('   - Lazy load below-fold components');
    console.log('   - Tree shake unused dependencies');
    console.log('   - Consider dynamic imports for heavy features\n');
  }

  console.log('📱 MOBILE-FIRST OPTIMIZATIONS (Critical for SME users):');
  console.log('   - Test on 3G connections (DevTools Network throttling)');
  console.log('   - Optimize tap targets (minimum 44px for accessibility)');
  console.log('   - Consider PWA features for offline resilience');
  console.log('   - Monitor real user metrics with Google Analytics 4');
}

async function saveDetailedReport(results) {
  try {
    const reportsDir = path.join(process.cwd(), 'reports');
    await fs.mkdir(reportsDir, { recursive: true });

    const filename = `cwv-audit-${new Date().toISOString().split('T')[0]}.json`;
    const filepath = path.join(reportsDir, filename);

    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        pagesAudited: results.filter(r => r !== null).length,
        averageMetrics: {}
      },
      results: results,
      recommendations: 'See console output for detailed recommendations'
    };

    // Calculate average metrics
    const validResults = results.filter(r => r !== null);
    if (validResults.length > 0) {
      ['LCP', 'FCP', 'CLS', 'TTFB'].forEach(metric => {
        const values = validResults
          .map(r => r.vitals[metric])
          .filter(v => v !== undefined && v !== null);

        if (values.length > 0) {
          const avg = values.reduce((a, b) => a + b, 0) / values.length;
          reportData.summary.averageMetrics[metric] = {
            average: avg,
            rating: getRating(metric, avg)
          };
        }
      });
    }

    await fs.writeFile(filepath, JSON.stringify(reportData, null, 2));
    console.log(`\n📄 Detailed report saved to: ${filepath}`);
  } catch (error) {
    console.log('ℹ️  Could not save detailed report:', error.message);
  }
}

async function main() {
  console.log('🚀 Starting Core Web Vitals audit for CiberPME...');
  console.log('Focused on performance for Portuguese SME users\n');

  // Use production URL by default, allow override for local testing
  const baseUrl = process.env.AUDIT_URL || 'https://ciberpme.vercel.app';
  console.log(`📍 Testing: ${baseUrl}\n`);

  const pagesToTest = [
    { url: `${baseUrl}/`, name: 'Homepage' },
    { url: `${baseUrl}/blog`, name: 'Blog listing' },
    { url: `${baseUrl}/blog/ransomware-o-que-fazer-pme-guia-resposta`, name: 'Blog post' },
    { url: `${baseUrl}/avaliacao-seguranca`, name: 'Security assessment' },
    { url: `${baseUrl}/recursos`, name: 'Resources page' }
  ];

  try {
    const results = [];

    for (const { url, name } of pagesToTest) {
      const result = await auditPage(url, name);
      results.push(result);

      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Generate summary and recommendations
    const validResults = results.filter(r => r !== null);
    const avgScores = {};

    if (validResults.length > 0) {
      console.log('\n📊 AUDIT SUMMARY');
      console.log('=================');
      console.log(`Pages successfully audited: ${validResults.length}/${results.length}`);

      // Calculate averages
      ['LCP', 'FCP', 'CLS', 'TTFB'].forEach(metric => {
        const values = validResults
          .map(r => r.vitals[metric])
          .filter(v => v !== undefined && v !== null);

        if (values.length > 0) {
          const avg = values.reduce((a, b) => a + b, 0) / values.length;
          const rating = getRating(metric, avg);
          const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
          console.log(`Average ${metric}: ${formatValue(metric, avg)} ${emoji} (${rating})`);
          avgScores[metric] = rating;
        }
      });

      generateRecommendations(results);
      await saveDetailedReport(results);

      // Determine overall success
      const criticalMetrics = ['LCP', 'CLS', 'FCP'];
      const poorCriticalMetrics = criticalMetrics.filter(metric =>
        avgScores[metric] === 'poor'
      );

      console.log('\n🏁 FINAL RESULT:');
      if (poorCriticalMetrics.length === 0) {
        console.log('✅ Core Web Vitals audit PASSED');
        console.log('Your site meets performance standards for SME users!');
        process.exit(0);
      } else {
        console.log(`❌ Core Web Vitals audit FAILED (${poorCriticalMetrics.length} critical metrics poor)`);
        console.log('Please address the priority recommendations above.');
        process.exit(1);
      }
    } else {
      console.log('❌ No pages could be successfully audited');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}