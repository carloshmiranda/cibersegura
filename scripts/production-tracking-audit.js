#!/usr/bin/env node

/**
 * Production Tracking Audit Script
 *
 * This script should be run in production environment with DATABASE_URL
 * to complete the audit required by eng-1 task.
 *
 * Usage: node scripts/production-tracking-audit.js
 */

import { neon } from "@neondatabase/serverless";

async function auditProductionTracking() {
  console.log('🔍 Production Tracking Audit - eng-1 task');
  console.log('==========================================\n');

  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL not available.');
    console.log('   This script must be run in production environment or with DATABASE_URL set.');
    console.log('\n📋 To complete eng-1 audit manually:');
    console.log('   1. Connect to production database');
    console.log('   2. Run: SELECT COUNT(*) FROM affiliate_impressions WHERE created_at >= \'2026-04-19\'');
    console.log('   3. If zero records: investigate IntersectionObserver → /api/track → DB pipeline');
    console.log('   4. If records exist: analyze impression/click patterns\n');
    return;
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('📊 Checking impression records since PR #118 (Apr 19, 2026)...');

    // Check for impressions since PR #118 deployment
    const impressionStats = await sql`
      SELECT
        COUNT(*) as total_impressions,
        COUNT(DISTINCT DATE(created_at)) as active_days,
        COUNT(DISTINCT article_slug) as unique_articles,
        COUNT(DISTINCT link_id) as unique_ctas,
        MIN(created_at) as first_impression,
        MAX(created_at) as last_impression
      FROM affiliate_impressions
      WHERE created_at >= '2026-04-19'::date
    `;

    const stats = impressionStats[0];
    console.log(`   📈 Total impressions: ${stats.total_impressions}`);
    console.log(`   📅 Active days: ${stats.active_days}`);
    console.log(`   📄 Unique articles: ${stats.unique_articles}`);
    console.log(`   🎯 Unique CTAs: ${stats.unique_ctas}`);
    console.log(`   🕐 First impression: ${stats.first_impression || 'none'}`);
    console.log(`   🕐 Last impression: ${stats.last_impression || 'none'}`);

    if (Number(stats.total_impressions) === 0) {
      console.log('\n🚨 CRITICAL ISSUE: Zero impression records since PR #118 deployment!');
      console.log('   This indicates the impression tracking pipeline is broken.');

      console.log('\n🔧 Debugging steps needed:');
      console.log('   1. Verify IntersectionObserver is triggering on live pages');
      console.log('   2. Check browser console for tracking API calls');
      console.log('   3. Verify /api/track endpoint is reachable in production');
      console.log('   4. Check production logs for database connection errors');

      // Check if table exists but is empty
      const tableInfo = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_name = 'affiliate_impressions'
        ) as table_exists
      `;

      console.log(`   5. affiliate_impressions table exists: ${tableInfo[0].table_exists}`);

    } else {
      console.log('\n✅ Impression tracking is working!');

      // Get top performing CTAs
      const topCTAs = await sql`
        SELECT
          link_id,
          cta_position,
          article_slug,
          COUNT(*) as impressions
        FROM affiliate_impressions
        WHERE created_at >= '2026-04-19'::date
        GROUP BY link_id, cta_position, article_slug
        ORDER BY impressions DESC
        LIMIT 5
      `;

      console.log('\n📊 Top performing CTAs since Apr 19:');
      topCTAs.forEach((cta, i) => {
        console.log(`   ${i+1}. ${cta.link_id} (${cta.cta_position}) - ${cta.impressions} impressions`);
        if (cta.article_slug) console.log(`      Article: ${cta.article_slug}`);
      });

      // Check for recent activity
      const recentActivity = await sql`
        SELECT DATE(created_at) as day, COUNT(*) as impressions
        FROM affiliate_impressions
        WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY DATE(created_at)
        ORDER BY day DESC
        LIMIT 7
      `;

      console.log('\n📈 Recent daily impression counts:');
      recentActivity.forEach(day => {
        console.log(`   ${day.day}: ${day.impressions} impressions`);
      });
    }

    // Check click tracking table if it exists
    console.log('\n🖱️  Checking click tracking...');
    try {
      const clickStats = await sql`
        SELECT COUNT(*) as total_clicks
        FROM affiliate_clicks
        WHERE created_at >= '2026-04-19'::date
      `;

      const clickCount = Number(clickStats[0].total_clicks);
      const impressionCount = Number(stats.total_impressions);

      console.log(`   Total clicks since Apr 19: ${clickCount}`);

      if (impressionCount > 0) {
        const ctr = ((clickCount / impressionCount) * 100).toFixed(2);
        console.log(`   Click-through rate: ${clickCount}/${impressionCount} = ${ctr}%`);

        if (clickCount === 0 && impressionCount > 0) {
          console.log('\n⚠️  WARNING: Impressions detected but zero clicks');
          console.log('   Possible issues:');
          console.log('   - Click tracking endpoint (/api/affiliate/click) not working');
          console.log('   - CTA links not properly triggering click handlers');
          console.log('   - CTAs not visible or engaging to users');
        }
      }

    } catch (clickError) {
      console.log('   ℹ️  No affiliate_clicks table found (click tracking may not be set up)');
    }

  } catch (error) {
    console.error('❌ Database query failed:', error);
    console.log('\n🔧 This suggests:');
    console.log('   - Database connection issues');
    console.log('   - Missing affiliate_impressions table');
    console.log('   - Permission problems');
  }

  console.log('\n📋 END OF AUDIT');
  console.log('==========================================');
}

// Run the audit
auditProductionTracking().catch(console.error);