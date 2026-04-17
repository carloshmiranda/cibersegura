import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// POST /api/track — log CTA impression events
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      article_slug,
      cta_position,
      link_id,
      destination_url,
      event_type
    } = body;

    // Only handle impression events for now
    if (event_type !== 'cta_impression') {
      return new Response(JSON.stringify({
        ok: false,
        error: 'Invalid event type'
      }), { status: 400 });
    }

    // Get referrer from headers
    const referrer = req.headers.get('referer') || '';

    const sql = neon(process.env.DATABASE_URL!);

    // Create table if it doesn't exist
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
    await sql`
      CREATE INDEX IF NOT EXISTS idx_affiliate_impressions_date ON affiliate_impressions(date)
    `;

    // Insert impression record
    await sql`
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
    `;

    // Return 204 No Content like the click endpoint
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error logging CTA impression:', error);
    // Still return 204 to not break the user experience
    return new Response(null, { status: 204 });
  }
}