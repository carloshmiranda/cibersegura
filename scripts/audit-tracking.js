import { neon } from "@neondatabase/serverless";
import { config } from 'dotenv';

// Load environment variables
config();

async function auditTracking() {
  console.log('🔍 Auditing CTA tracking pipeline...\n');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable not set');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('1. Checking if affiliate_impressions table exists...');

    // Check if table exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'affiliate_impressions'
      )
    `;

    console.log('   Table exists:', tableExists[0].exists);

    if (!tableExists[0].exists) {
      console.log('❌ affiliate_impressions table does not exist');
      return;
    }

    console.log('\n2. Checking for impression records since Apr 19, 2026...');

    // Query for impressions since Apr 19, 2026 (when PR #118 was deployed)
    const impressionsSinceApr19 = await sql`
      SELECT
        COUNT(*) as total_impressions,
        COUNT(DISTINCT date) as days_with_impressions,
        MIN(created_at) as first_impression,
        MAX(created_at) as latest_impression
      FROM affiliate_impressions
      WHERE created_at >= '2026-04-19'::date
    `;

    console.log('   Total impressions since Apr 19:', impressionsSinceApr19[0].total_impressions);
    console.log('   Days with impressions:', impressionsSinceApr19[0].days_with_impressions);
    console.log('   First impression:', impressionsSinceApr19[0].first_impression);
    console.log('   Latest impression:', impressionsSinceApr19[0].latest_impression);

    console.log('\n3. Sample of recent impression records...');

    // Get sample recent records
    const sampleRecords = await sql`
      SELECT
        id,
        date,
        article_slug,
        cta_position,
        link_id,
        created_at
      FROM affiliate_impressions
      WHERE created_at >= '2026-04-19'::date
      ORDER BY created_at DESC
      LIMIT 10
    `;

    if (sampleRecords.length > 0) {
      console.log('   Recent impression samples:');
      sampleRecords.forEach((record, index) => {
        console.log(`   ${index + 1}. ${record.created_at} | ${record.link_id} | ${record.article_slug || 'no-slug'} | ${record.cta_position}`);
      });
    } else {
      console.log('   No impression records found since Apr 19, 2026');
    }

    console.log('\n4. Checking for affiliate click tracking table...');

    // Check if click tracking table exists
    const clickTableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'affiliate_clicks'
      )
    `;

    console.log('   Click table exists:', clickTableExists[0].exists);

    if (clickTableExists[0].exists) {
      const clicksSinceApr19 = await sql`
        SELECT COUNT(*) as total_clicks
        FROM affiliate_clicks
        WHERE created_at >= '2026-04-19'::date
      `;
      console.log('   Total clicks since Apr 19:', clicksSinceApr19[0].total_clicks);
    }

    console.log('\n📊 AUDIT SUMMARY:');
    const totalImpressions = Number(impressionsSinceApr19[0].total_impressions);
    if (totalImpressions === 0) {
      console.log('🚨 ISSUE DETECTED: Zero impression records since PR #118 deployment (Apr 19)');
      console.log('   This suggests the impression tracking pipeline is broken.');
      console.log('   Need to trace: IntersectionObserver → /api/track → DB write');
    } else {
      console.log('✅ Impression tracking is working - found', totalImpressions, 'records');
      if (clickTableExists[0].exists) {
        const totalClicks = Number(clicksSinceApr19[0].total_clicks);
        const ctr = totalClicks > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
        console.log('📈 Click-through rate:', `${totalClicks}/${totalImpressions} = ${ctr}%`);
      }
    }

  } catch (error) {
    console.error('❌ Database query error:', error);
  }
}

// Run the audit
auditTracking().catch(console.error);