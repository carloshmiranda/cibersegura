import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// GET /api/unsubscribe?email=... — Unsubscribe via link
export async function GET(req: NextRequest) {
  const sql = getDb();
  const email = req.nextUrl.searchParams.get("email");

  if (!email || !email.includes("@")) {
    return json({ ok: false, error: "Valid email is required" }, 400);
  }

  try {
    // Check if email exists in waitlist
    const [entry] = await sql`SELECT id, status FROM waitlist WHERE email = ${email}`;
    if (!entry) {
      return json({ ok: false, error: "Email not found" }, 404);
    }

    if (entry.status === 'unsubscribed') {
      return json({ ok: true, already_unsubscribed: true, message: "Already unsubscribed" });
    }

    // Update status to unsubscribed
    await sql`UPDATE waitlist SET status = 'unsubscribed', updated_at = now() WHERE email = ${email}`;

    return json({
      ok: true,
      message: "Successfully unsubscribed from newsletter",
      email: email
    });

  } catch (error: any) {
    console.error("Unsubscribe error:", error);
    return json({ ok: false, error: "Failed to unsubscribe" }, 500);
  }
}

// POST /api/unsubscribe — Unsubscribe via API
export async function POST(req: NextRequest) {
  const sql = getDb();

  try {
    const body = await req.json();
    const { email } = body as { email?: string };

    if (!email || !email.includes("@")) {
      return json({ ok: false, error: "Valid email is required" }, 400);
    }

    // Check if email exists in waitlist
    const [entry] = await sql`SELECT id, status FROM waitlist WHERE email = ${email}`;
    if (!entry) {
      return json({ ok: false, error: "Email not found" }, 404);
    }

    if (entry.status === 'unsubscribed') {
      return json({ ok: true, already_unsubscribed: true, message: "Already unsubscribed" });
    }

    // Update status to unsubscribed
    await sql`UPDATE waitlist SET status = 'unsubscribed', updated_at = now() WHERE email = ${email}`;

    return json({
      ok: true,
      message: "Successfully unsubscribed from newsletter",
      email: email
    });

  } catch (error: any) {
    console.error("Unsubscribe error:", error);
    return json({ ok: false, error: "Failed to unsubscribe" }, 500);
  }
}