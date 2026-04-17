import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// GET /api/cta-stats — return impression vs click counts for last 7 days
export async function GET(req: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    // Get impressions for the last 7 days
    const impressions = await sql`
      SELECT
        cta_position,
        link_id,
        COUNT(*) as count
      FROM affiliate_impressions
      WHERE date >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY cta_position, link_id
      ORDER BY count DESC
    `;

    // Get clicks for the last 7 days
    const clicks = await sql`
      SELECT
        cta_position,
        link_id,
        COUNT(*) as count
      FROM affiliate_clicks
      WHERE date >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY cta_position, link_id
      ORDER BY count DESC
    `;

    // Combine the data
    const stats: Record<string, {
      cta_position: string;
      link_id: string;
      impressions: number;
      clicks: number;
    }> = {};

    // Add impression data
    impressions.forEach(row => {
      const key = `${row.cta_position}-${row.link_id}`;
      stats[key] = {
        cta_position: row.cta_position,
        link_id: row.link_id,
        impressions: parseInt(row.count),
        clicks: 0
      };
    });

    // Add click data
    clicks.forEach(row => {
      const key = `${row.cta_position}-${row.link_id}`;
      if (stats[key]) {
        stats[key].clicks = parseInt(row.count);
      } else {
        stats[key] = {
          cta_position: row.cta_position,
          link_id: row.link_id,
          impressions: 0,
          clicks: parseInt(row.count)
        };
      }
    });

    // Calculate click-through rates and convert to array
    const statsArray = Object.values(stats).map(stat => ({
      ...stat,
      ctr: stat.impressions > 0 ? (stat.clicks / stat.impressions * 100).toFixed(2) : '0.00'
    }));

    // Get totals
    const totalImpressions = statsArray.reduce((sum, stat) => sum + stat.impressions, 0);
    const totalClicks = statsArray.reduce((sum, stat) => sum + stat.clicks, 0);
    const overallCTR = totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : '0.00';

    return Response.json({
      ok: true,
      data: {
        period_days: 7,
        total_impressions: totalImpressions,
        total_clicks: totalClicks,
        overall_ctr: overallCTR,
        by_cta: statsArray
      }
    });

  } catch (error) {
    console.error('Error retrieving CTA stats:', error);

    // If the impressions table doesn't exist yet, return zero data
    if (error instanceof Error && error.message?.includes('affiliate_impressions')) {
      return Response.json({
        ok: true,
        data: {
          period_days: 7,
          total_impressions: 0,
          total_clicks: 0,
          overall_ctr: '0.00',
          by_cta: []
        }
      });
    }

    return Response.json({
      ok: false,
      error: 'Failed to retrieve CTA statistics'
    }, { status: 500 });
  }
}