#!/usr/bin/env node

// Test script to verify complete impression tracking pipeline
// Tests both the table creation and the actual tracking workflow

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: '.env.local' });

// This script tests the impression tracking with a database connection
// If DATABASE_URL is not set, it will skip database tests

console.log('🔍 Verifying complete impression tracking pipeline...\n');

async function verifyImpressionTracking() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.log('⚠️ DATABASE_URL not set - testing API endpoints only');
    await testAPIEndpoints();
    return;
  }

  console.log('✅ DATABASE_URL configured - testing full pipeline');

  try {
    const sql = neon(databaseUrl);

    // Test 1: Create the affiliate_impressions table
    console.log('1. Testing table creation...');
    await sql`
      CREATE TABLE IF NOT EXISTS affiliate_impressions (
        id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        date            DATE NOT NULL DEFAULT CURRENT_DATE,
        article_slug    TEXT,
        cta_position    TEXT,
        referrer        TEXT,
        link_id         TEXT NOT NULL,
        destination_url TEXT,
        source_path     TEXT NOT NULL DEFAULT '/',
        created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_affiliate_impressions_date ON affiliate_impressions(date)
    `;

    console.log('✅ Table created successfully');

    // Test 2: Insert test impression
    console.log('\n2. Testing impression insertion...');
    const testImpression = {
      article_slug: 'test-verification',
      cta_position: 'verification-test',
      referrer: 'verification-script',
      link_id: 'verify-tracking',
      destination_url: 'https://example.com',
      source_path: '/verify'
    };

    const insertResult = await sql`
      INSERT INTO affiliate_impressions (
        article_slug,
        cta_position,
        referrer,
        link_id,
        destination_url,
        source_path
      ) VALUES (
        ${testImpression.article_slug},
        ${testImpression.cta_position},
        ${testImpression.referrer},
        ${testImpression.link_id},
        ${testImpression.destination_url},
        ${testImpression.source_path}
      )
      RETURNING id, created_at
    `;

    console.log('✅ Test impression inserted:', insertResult[0]);

    // Test 3: Query impressions (test the stats query)
    console.log('\n3. Testing impression retrieval...');
    const impressions = await sql`
      SELECT
        cta_position,
        link_id,
        COUNT(*) as count
      FROM affiliate_impressions
      WHERE date >= CURRENT_DATE - INTERVAL '7 days'
        AND link_id = ${testImpression.link_id}
      GROUP BY cta_position, link_id
      ORDER BY count DESC
    `;

    console.log('✅ Retrieved impressions:', impressions);

    // Test 4: Cleanup test data
    await sql`DELETE FROM affiliate_impressions WHERE link_id = ${testImpression.link_id}`;
    console.log('✅ Test data cleaned up');

  } catch (error) {
    console.error('❌ Database tests failed:', error);
    console.log('\n🔧 This suggests either:');
    console.log('   - Database connection issues');
    console.log('   - Permissions problems');
    console.log('   - Schema conflicts');
  }

  // Test API endpoints
  await testAPIEndpoints();
}

async function testAPIEndpoints() {
  console.log('\n4. Testing API endpoints...');

  try {
    // Test the tracking API
    const trackingResponse = await fetch('http://localhost:3000/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'cta_impression',
        article_slug: 'verification-test',
        cta_position: 'api-test',
        link_id: 'api-verification',
        destination_url: 'https://example.com'
      }),
    });

    console.log('📊 Tracking API response:', trackingResponse.status, trackingResponse.statusText);

    // Test the stats API
    const statsResponse = await fetch('http://localhost:3000/api/cta-stats');
    const statsData = await statsResponse.json();
    console.log('📈 Stats API response:', statsData);

    if (statsData.ok && statsData.data.total_impressions >= 0) {
      console.log('✅ CTA stats API working correctly');
    } else {
      console.log('⚠️ CTA stats API returned error (expected if no DATABASE_URL)');
    }

  } catch (error) {
    console.error('❌ API endpoint tests failed:', error);
  }
}

verifyImpressionTracking().catch(console.error);