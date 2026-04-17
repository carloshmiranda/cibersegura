import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/admin/analytics — fetch site analytics
export async function GET(req: NextRequest) {
  // Check admin authentication
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token || token !== process.env.ADMIN_API_TOKEN) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  const sql = getDb();

  try {
    // Newsletter metrics
    const [{ total_signups }] = await sql`
      SELECT COUNT(*) as total_signups FROM waitlist
    `;

    const [{ signups_last_30_days }] = await sql`
      SELECT COUNT(*) as signups_last_30_days
      FROM waitlist
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `;

    const [{ signups_last_7_days }] = await sql`
      SELECT COUNT(*) as signups_last_7_days
      FROM waitlist
      WHERE created_at >= NOW() - INTERVAL '7 days'
    `;

    // Top referral sources
    const referralSources = await sql`
      SELECT
        COALESCE(utm_source, 'organic') as source,
        COUNT(*) as signups
      FROM waitlist
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY COALESCE(utm_source, 'organic')
      ORDER BY signups DESC
      LIMIT 10
    `;

    // CTA impression metrics (last 30 days)
    const ctaMetrics = await sql`
      SELECT
        COUNT(*) as total_impressions,
        COUNT(DISTINCT article_slug) as articles_with_impressions,
        COUNT(DISTINCT cta_position) as unique_cta_positions
      FROM affiliate_impressions
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `;

    // Top performing articles by CTA impressions
    const topArticles = await sql`
      SELECT
        article_slug,
        COUNT(*) as impressions,
        COUNT(DISTINCT cta_position) as cta_variations
      FROM affiliate_impressions
      WHERE created_at >= NOW() - INTERVAL '30 days'
        AND article_slug IS NOT NULL
      GROUP BY article_slug
      ORDER BY impressions DESC
      LIMIT 10
    `;

    // CTA position performance
    const ctaPositions = await sql`
      SELECT
        cta_position,
        COUNT(*) as impressions
      FROM affiliate_impressions
      WHERE created_at >= NOW() - INTERVAL '30 days'
        AND cta_position IS NOT NULL
      GROUP BY cta_position
      ORDER BY impressions DESC
    `;

    // Email sequence performance
    const emailMetrics = await sql`
      SELECT
        sequence,
        step,
        send_count,
        subject
      FROM email_sequences
      WHERE is_active = true
      ORDER BY sequence, step
    `;

    // Daily signups for the last 30 days
    const dailySignups = await sql`
      SELECT
        DATE(created_at) as date,
        COUNT(*) as signups
      FROM waitlist
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `;

    return json({
      ok: true,
      data: {
        newsletter: {
          total_signups: Number(total_signups),
          signups_last_30_days: Number(signups_last_30_days),
          signups_last_7_days: Number(signups_last_7_days),
          daily_signups: dailySignups.map(row => ({
            date: row.date,
            signups: Number(row.signups)
          })),
          referral_sources: referralSources.map(row => ({
            source: row.source,
            signups: Number(row.signups)
          }))
        },
        content: {
          total_impressions: ctaMetrics[0]?.total_impressions ? Number(ctaMetrics[0].total_impressions) : 0,
          articles_with_impressions: ctaMetrics[0]?.articles_with_impressions ? Number(ctaMetrics[0].articles_with_impressions) : 0,
          unique_cta_positions: ctaMetrics[0]?.unique_cta_positions ? Number(ctaMetrics[0].unique_cta_positions) : 0,
          top_articles: topArticles.map(row => ({
            article_slug: row.article_slug,
            impressions: Number(row.impressions),
            cta_variations: Number(row.cta_variations)
          })),
          cta_positions: ctaPositions.map(row => ({
            position: row.cta_position,
            impressions: Number(row.impressions)
          }))
        },
        email: {
          sequences: emailMetrics.map(row => ({
            sequence: row.sequence,
            step: row.step,
            send_count: row.send_count,
            subject: row.subject
          }))
        },
        generated_at: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error("Analytics error:", error);
    return json({ ok: false, error: "Failed to fetch analytics" }, 500);
  }
}