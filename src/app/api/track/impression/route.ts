import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// POST /api/track/impression — log CTA impression events
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      article_slug,
      cta_position,
      link_id,
      cta_type,
      position,
      event_type,
      timestamp
    } = body;

    // Get referrer from headers
    const referrer = req.headers.get('referer') || '';

    const sql = neon(process.env.DATABASE_URL!);

    // Store impression data in the affiliate_clicks table with a special event type
    // We'll differentiate impressions from clicks using cta_position with 'impression-' prefix
    await sql`
      INSERT INTO affiliate_clicks (
        article_slug,
        cta_position,
        referrer,
        link_id,
        destination_url,
        source_path
      ) VALUES (
        ${article_slug || null},
        ${'impression-' + cta_position},
        ${referrer},
        ${link_id || 'unknown'},
        ${JSON.stringify({ cta_type, position, event_type, timestamp })},
        ${article_slug ? `/blog/${article_slug}` : '/'}
      )
    `;

    // Return 204 No Content for consistency with click tracking
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error logging CTA impression:', error);
    // Still return 204 to not break the user experience
    return new Response(null, { status: 204 });
  }
}