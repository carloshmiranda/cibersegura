import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// GET /api/cta-stats — return CTA impression vs click stats for last 7 days
export async function GET(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    // Get URL params for filtering
    const { searchParams } = new URL(req.url);
    const days = Math.min(parseInt(searchParams.get('days') || '7'), 30); // Max 30 days

    // Get impression counts (cta_position starts with 'impression-')
    const impressionStats = await sql`
      SELECT
        DATE(created_at) as date,
        REPLACE(cta_position, 'impression-', '') as cta_position,
        link_id,
        COUNT(*) as impressions
      FROM affiliate_clicks
      WHERE created_at >= CURRENT_DATE - INTERVAL '${days} days'
        AND cta_position LIKE 'impression-%'
      GROUP BY DATE(created_at), REPLACE(cta_position, 'impression-', ''), link_id
      ORDER BY date DESC, cta_position, link_id
    `;

    // Get click counts (cta_position doesn't start with 'impression-')
    const clickStats = await sql`
      SELECT
        DATE(created_at) as date,
        cta_position,
        link_id,
        COUNT(*) as clicks
      FROM affiliate_clicks
      WHERE created_at >= CURRENT_DATE - INTERVAL '${days} days'
        AND cta_position NOT LIKE 'impression-%'
      GROUP BY DATE(created_at), cta_position, link_id
      ORDER BY date DESC, cta_position, link_id
    `;

    // Combine and calculate metrics
    const statsMap = new Map<string, any>();

    // Process impressions
    impressionStats.forEach((row: any) => {
      const key = `${row.date}_${row.cta_position}_${row.link_id}`;
      if (!statsMap.has(key)) {
        statsMap.set(key, {
          date: row.date,
          cta_position: row.cta_position,
          link_id: row.link_id,
          impressions: 0,
          clicks: 0,
          ctr: 0,
        });
      }
      statsMap.get(key)!.impressions = parseInt(row.impressions);
    });

    // Process clicks
    clickStats.forEach((row: any) => {
      const key = `${row.date}_${row.cta_position}_${row.link_id}`;
      if (!statsMap.has(key)) {
        statsMap.set(key, {
          date: row.date,
          cta_position: row.cta_position,
          link_id: row.link_id,
          impressions: 0,
          clicks: 0,
          ctr: 0,
        });
      }
      statsMap.get(key)!.clicks = parseInt(row.clicks);
    });

    // Calculate CTR and format results
    const results = Array.from(statsMap.values()).map(stat => {
      stat.ctr = stat.impressions > 0 ? ((stat.clicks / stat.impressions) * 100).toFixed(2) : 0;
      return stat;
    });

    // Calculate summary totals
    const summary = {
      total_impressions: results.reduce((sum, s) => sum + s.impressions, 0),
      total_clicks: results.reduce((sum, s) => sum + s.clicks, 0),
      overall_ctr: 0,
      date_range: {
        from: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
        days: days
      }
    };

    summary.overall_ctr = summary.total_impressions > 0
      ? parseFloat(((summary.total_clicks / summary.total_impressions) * 100).toFixed(2))
      : 0;

    // Group by CTA position for easier analysis
    const byPosition = results.reduce((acc, stat) => {
      const pos = stat.cta_position;
      if (!acc[pos]) {
        acc[pos] = {
          position: pos,
          total_impressions: 0,
          total_clicks: 0,
          ctr: 0,
          daily_stats: []
        };
      }
      acc[pos].total_impressions += stat.impressions;
      acc[pos].total_clicks += stat.clicks;
      acc[pos].daily_stats.push({
        date: stat.date,
        link_id: stat.link_id,
        impressions: stat.impressions,
        clicks: stat.clicks,
        ctr: stat.ctr
      });
      return acc;
    }, {} as Record<string, any>);

    // Calculate CTR for each position
    Object.values(byPosition).forEach((pos: any) => {
      pos.ctr = pos.total_impressions > 0
        ? parseFloat(((pos.total_clicks / pos.total_impressions) * 100).toFixed(2))
        : 0;
    });

    return Response.json({
      ok: true,
      data: {
        summary,
        by_position: byPosition,
        raw_stats: results
      }
    });

  } catch (error) {
    console.error('Error fetching CTA stats:', error);
    return Response.json(
      { ok: false, error: 'Failed to fetch CTA statistics' },
      { status: 500 }
    );
  }
}