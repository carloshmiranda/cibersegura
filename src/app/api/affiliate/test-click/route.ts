import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// POST /api/affiliate/test-click — manually create a test affiliate click for debugging
export async function POST() {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const testClickData = {
      article_slug: "test-article",
      cta_position: "test-banner-1",
      referrer: "http://localhost:3000/test",
      link_id: "test-tool-siem",
      destination_url: "https://example.com?utm_source=ciberpme.pt&utm_medium=affiliate&utm_campaign=nis2-recommendations&utm_content=test-tool-siem-1&utm_term=test-article",
      source_path: "/test"
    };

    const result = await sql`
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

    return Response.json({
      ok: true,
      message: "Test affiliate click recorded",
      click: result[0],
      data: testClickData
    });
  } catch (error) {
    console.error('Error creating test affiliate click:', error);
    return Response.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// GET /api/affiliate/test-click — check recent affiliate clicks for testing
export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const recentClicks = await sql`
      SELECT
        id,
        date,
        article_slug,
        cta_position,
        link_id,
        destination_url,
        source_path,
        created_at
      FROM affiliate_clicks
      ORDER BY created_at DESC
      LIMIT 10
    `;

    const today = new Date().toISOString().split("T")[0];
    const todayClicks = await sql`
      SELECT COUNT(*)::int as count
      FROM affiliate_clicks
      WHERE date = ${today}
    `;

    return Response.json({
      ok: true,
      recent_clicks: recentClicks,
      today_count: todayClicks[0]?.count || 0,
      today_date: today
    });
  } catch (error) {
    console.error('Error fetching affiliate clicks:', error);
    return Response.json({
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}