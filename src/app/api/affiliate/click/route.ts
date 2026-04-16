import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// POST /api/affiliate/click — log affiliate click events
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      article_slug,
      cta_position,
      link_id,
      destination_url
    } = body;

    // Get referrer from headers
    const referrer = req.headers.get('referer') || '';

    const sql = neon(process.env.DATABASE_URL!);

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
        ${cta_position || null},
        ${referrer},
        ${link_id || 'unknown'},
        ${destination_url || null},
        ${article_slug ? `/blog/${article_slug}` : '/'}
      )
    `;

    // Return 204 No Content as requested
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error logging affiliate click:', error);
    // Still return 204 to not break the user experience
    return new Response(null, { status: 204 });
  }
}