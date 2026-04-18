import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// POST /api/track — log CTA impression events
export async function POST(req: Request) {
  try {
    console.log('📊 Tracking API called');

    const body = await req.json();
    const {
      article_slug,
      cta_position,
      link_id,
      destination_url,
      event_type
    } = body;

    console.log('📊 Tracking data received:', {
      article_slug,
      cta_position,
      link_id,
      destination_url,
      event_type
    });

    // Only handle impression events for now
    if (event_type !== 'cta_impression') {
      console.error('❌ Invalid event type:', event_type);
      return new Response(JSON.stringify({
        ok: false,
        error: 'Invalid event type'
      }), { status: 400 });
    }

    // Get referrer from headers
    const referrer = req.headers.get('referer') || '';
    console.log('🔗 Referrer:', referrer);

    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL not set');

      // In development mode, just log to console and return success
      if (process.env.NODE_ENV === 'development') {
        console.log('🏠 Development mode: logging impression to console only');
        console.log('📊 Would track impression:', {
          article_slug,
          cta_position,
          link_id,
          destination_url,
          referrer,
          timestamp: new Date().toISOString()
        });
        return new Response(null, { status: 204 });
      }

      return new Response(JSON.stringify({
        ok: false,
        error: 'Database connection not configured'
      }), { status: 500 });
    }

    const sql = neon(process.env.DATABASE_URL);

    // Create table if it doesn't exist
    console.log('🛠️ Creating table if not exists...');
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

    // Create index if it doesn't exist
    console.log('🛠️ Creating index if not exists...');
    await sql`
      CREATE INDEX IF NOT EXISTS idx_affiliate_impressions_date ON affiliate_impressions(date)
    `;

    // Insert impression record
    console.log('💾 Inserting impression record...');
    const insertResult = await sql`
      INSERT INTO affiliate_impressions (
        article_slug,
        cta_position,
        referrer,
        link_id,
        destination_url,
        source_path
      ) VALUES (
        ${article_slug || null},
        ${cta_position || null},
        ${referrer},
        ${link_id || 'unknown'},
        ${destination_url || null},
        ${article_slug ? `/blog/${article_slug}` : '/'}
      )
      RETURNING id
    `;

    console.log('✅ Impression recorded successfully:', insertResult[0]?.id);

    // Return 204 No Content like the click endpoint
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('❌ Error logging CTA impression:', error);

    // Return error details in development mode
    if (process.env.NODE_ENV === 'development') {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      return new Response(JSON.stringify({
        ok: false,
        error: errorMessage,
        details: errorStack
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Still return 204 in production to not break user experience
    return new Response(null, { status: 204 });
  }
}