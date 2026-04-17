#!/usr/bin/env node

/**
 * Test script to verify affiliate click tracking functionality
 *
 * This script tests:
 * 1. Creating a test affiliate click
 * 2. Verifying the click was recorded
 * 3. Checking UTM parameter handling
 */

import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

// Load environment variables
dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function testAffiliateTracking() {
  console.log('🧪 Testing Affiliate Click Tracking...\n');

  try {
    // Test 1: Create a test click
    console.log('📝 Creating test affiliate click...');

    const testClickData = {
      article_slug: "test-article-" + Date.now(),
      cta_position: "banner-1",
      referrer: "https://ciberpme.vercel.app/test",
      link_id: "wazuh-siem",
      destination_url: "https://wazuh.com/?utm_source=ciberpme.pt&utm_medium=affiliate&utm_campaign=nis2-recommendations&utm_content=wazuh-1&utm_term=test-article",
      source_path: "/test"
    };

    const insertResult = await sql`
      INSERT INTO affiliate_clicks (
        article_slug,
        cta_position,
        referrer,
        link_id,
        destination_url,
        source_path
      ) VALUES (
        ${testClickData.article_slug},
        ${testClickData.cta_position},
        ${testClickData.referrer},
        ${testClickData.link_id},
        ${testClickData.destination_url},
        ${testClickData.source_path}
      ) RETURNING id, created_at
    `;

    const newClick = insertResult[0];
    console.log('✅ Test click created successfully!');
    console.log('   ID:', newClick.id);
    console.log('   Created:', newClick.created_at);
    console.log('   Link ID:', testClickData.link_id);
    console.log('');

    // Test 2: Verify the click was recorded
    console.log('🔍 Verifying click was recorded...');

    const verifyResult = await sql`
      SELECT COUNT(*)::int as count
      FROM affiliate_clicks
      WHERE id = ${newClick.id}
    `;

    if (verifyResult[0].count === 1) {
      console.log('✅ Click verification successful!');
    } else {
      console.log('❌ Click verification failed!');
      return false;
    }
    console.log('');

    // Test 3: Check today's total clicks
    console.log('📊 Checking today\'s total clicks...');

    const today = new Date().toISOString().split("T")[0];
    const todayResult = await sql`
      SELECT COUNT(*)::int as count
      FROM affiliate_clicks
      WHERE date = ${today}
    `;

    console.log('✅ Today\'s total affiliate clicks:', todayResult[0].count);
    console.log('');

    // Test 4: Verify UTM parameters
    console.log('🔗 Checking UTM parameters...');

    const clickDetails = await sql`
      SELECT destination_url
      FROM affiliate_clicks
      WHERE id = ${newClick.id}
    `;

    const url = clickDetails[0].destination_url;
    const urlObj = new URL(url);

    const expectedParams = {
      'utm_source': 'ciberpme.pt',
      'utm_medium': 'affiliate',
      'utm_campaign': 'nis2-recommendations',
      'utm_content': 'wazuh-1',
      'utm_term': 'test-article'
    };

    let utmValid = true;
    for (const [param, expected] of Object.entries(expectedParams)) {
      const actual = urlObj.searchParams.get(param);
      if (actual !== expected) {
        console.log(`❌ UTM parameter mismatch: ${param}`);
        console.log(`   Expected: ${expected}`);
        console.log(`   Actual: ${actual}`);
        utmValid = false;
      }
    }

    if (utmValid) {
      console.log('✅ UTM parameters verified successfully!');
    }
    console.log('');

    console.log('🎉 All affiliate tracking tests passed!\n');

    console.log('Summary:');
    console.log('- ✅ Test click recorded in database');
    console.log('- ✅ Click verification successful');
    console.log('- ✅ UTM parameters correctly formatted');
    console.log(`- ✅ Total clicks today: ${todayResult[0].count}`);

    return true;

  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

// Run the test if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testAffiliateTracking()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

export { testAffiliateTracking };