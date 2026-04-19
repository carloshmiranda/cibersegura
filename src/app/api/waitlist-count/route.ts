import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// GET /api/waitlist-count — returns current waitlist subscriber count
export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const [{ count }] = await sql`SELECT COUNT(*) as count FROM waitlist`;

    return Response.json({
      ok: true,
      waitlistCount: Number(count)
    });
  } catch (error) {
    console.error("Failed to fetch waitlist count:", error);
    return Response.json({
      ok: false,
      error: "Failed to fetch waitlist count",
      waitlistCount: 0
    });
  }
}