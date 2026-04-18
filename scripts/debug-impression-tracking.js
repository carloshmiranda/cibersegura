import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function debugImpressionTracking() {
  console.log('🔍 Debugging impression tracking...\n');

  try {
    // Check if the table exists and has data
    console.log('1. Checking if affiliate_impressions table exists...');
    const tableCheck = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_name = 'affiliate_impressions'
    `;

    if (tableCheck.length === 0) {
      console.log('❌ Table affiliate_impressions does not exist!');
      console.log('   Creating table...');

      await sql`
        CREATE TABLE affiliate_impressions (
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
    } else {
      console.log('✅ Table affiliate_impressions exists');
    }

    // Check table structure
    console.log('\n2. Checking table structure...');
    const columns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'affiliate_impressions'
      ORDER BY ordinal_position
    `;
    console.log('Columns:', columns);

    // Check if there's any data in the table
    console.log('\n3. Checking existing impression data...');
    const totalCount = await sql`SELECT COUNT(*) as count FROM affiliate_impressions`;
    console.log('Total impressions:', totalCount[0].count);

    // Show recent data (last 7 days)
    const recentData = await sql`
      SELECT
        date,
        article_slug,
        cta_position,
        link_id,
        COUNT(*) as count
      FROM affiliate_impressions
      WHERE date >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY date, article_slug, cta_position, link_id
      ORDER BY date DESC, count DESC
      LIMIT 10
    `;

    if (recentData.length > 0) {
      console.log('\nRecent impressions (last 7 days):');
      recentData.forEach(row => {
        console.log(`  ${row.date} | ${row.article_slug || 'unknown'} | ${row.cta_position} | ${row.link_id} | Count: ${row.count}`);
      });
    } else {
      console.log('⚠️ No impressions recorded in the last 7 days!');
    }

    // Test inserting a sample impression
    console.log('\n4. Testing impression insertion...');
    await sql`
      INSERT INTO affiliate_impressions (
        article_slug,
        cta_position,
        referrer,
        link_id,
        destination_url,
        source_path
      ) VALUES (
        'test-debug',
        'debug-test',
        'debug-script',
        'debug-link',
        'https://example.com',
        '/debug'
      )
    `;
    console.log('✅ Test impression inserted successfully');

    // Verify insertion
    const testData = await sql`
      SELECT * FROM affiliate_impressions
      WHERE article_slug = 'test-debug'
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (testData.length > 0) {
      console.log('✅ Test impression verified in database');
      console.log('Test record:', testData[0]);
    }

    // Check affiliate_clicks table too
    console.log('\n5. Checking affiliate_clicks table...');
    const clicksTableCheck = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_name = 'affiliate_clicks'
    `;

    if (clicksTableCheck.length > 0) {
      const clicksCount = await sql`SELECT COUNT(*) as count FROM affiliate_clicks`;
      console.log('✅ affiliate_clicks table exists with', clicksCount[0].count, 'clicks');
    } else {
      console.log('⚠️ affiliate_clicks table does not exist');
    }

  } catch (error) {
    console.error('❌ Error during debugging:', error);

    if (error.message?.includes('connect')) {
      console.log('\n🔧 Potential fixes:');
      console.log('   - Check DATABASE_URL environment variable');
      console.log('   - Verify Neon database is accessible');
      console.log('   - Check network connectivity');
    }
  }
}

debugImpressionTracking();