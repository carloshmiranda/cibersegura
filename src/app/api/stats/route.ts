import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// GET /api/stats — returns total views from page_views table
// Called by Hive's metrics cron to collect validation metrics across companies
export async function GET() {
  // Handle development mode when DATABASE_URL is not set
  if (!process.env.DATABASE_URL) {
    console.log('⚠️ DATABASE_URL not set - returning mock stats for development');

    if (process.env.NODE_ENV === 'development') {
      return Response.json({
        ok: true,
        views: 0,
      });
    }

    return Response.json({
      ok: false,
      error: 'Database connection not configured'
    }, { status: 500 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    const [views] = await sql`SELECT COALESCE(SUM(views), 0) as total FROM page_views`;

    return Response.json({
      ok: true,
      views: Number(views.total),
    });
  } catch (error) {
    console.error('❌ Error fetching stats:', error);

    return Response.json({
      ok: false,
      error: 'Database query failed'
    }, { status: 500 });
  }
}

// POST /api/stats — increment pageview counter (called from middleware)
export async function POST(req: Request) {
  const { path = "/" } = await req.json().catch(() => ({ path: "/" }));
  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    INSERT INTO page_views (date, path, views)
    VALUES (CURRENT_DATE, ${path}, 1)
    ON CONFLICT (date, path) DO UPDATE SET views = page_views.views + 1
  `;

  return Response.json({ ok: true });
}
