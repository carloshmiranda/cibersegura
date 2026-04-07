import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

// POST /api/admin/send-scheduled-emails — Send scheduled follow-up emails
export async function POST(req: NextRequest) {
  const sql = getDb();

  try {
    // Simple auth check - in production, use proper authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return json({ ok: false, error: "Authorization required" }, 401);
    }

    const token = authHeader.split(" ")[1];
    if (token !== process.env.ADMIN_API_TOKEN) {
      return json({ ok: false, error: "Invalid token" }, 403);
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return json({ ok: false, error: "Resend API key not configured" }, 500);
    }

    // Get all active email sequences with their delay requirements
    const sequences = await sql`
      SELECT id, sequence, step, subject, body_html, body_text, delay_hours, variant
      FROM email_sequences
      WHERE is_active = true AND delay_hours > 0
      ORDER BY sequence, step
    `;

    const results = [];
    let totalSent = 0;

    for (const seq of sequences) {
      // Find waitlist members who should receive this email
      // They should be: signed up >= delay_hours ago, haven't received this specific email yet
      const candidates = await sql`
        SELECT w.id, w.email, w.name, w.referral_code, w.position, w.created_at
        FROM waitlist w
        WHERE w.status = 'waiting'
          AND w.created_at <= NOW() - INTERVAL '${seq.delay_hours} hours'
          AND NOT EXISTS (
            SELECT 1 FROM email_log el
            WHERE el.recipient = w.email
            AND el.sequence_id = ${seq.id}
          )
        ORDER BY w.created_at ASC
        LIMIT 50
      `;

      let sequenceSent = 0;
      const errors = [];

      for (const candidate of candidates) {
        try {
          // Replace template variables
          const subject = seq.subject
            .replace(/\{\{NAME\}\}/g, candidate.name || "there")
            .replace(/\{\{POSITION\}\}/g, String(candidate.position || ""))
            .replace(/\{\{REFERRAL_CODE\}\}/g, candidate.referral_code || "");

          const bodyHtml = seq.body_html
            .replace(/\{\{NAME\}\}/g, candidate.name || "there")
            .replace(/\{\{POSITION\}\}/g, String(candidate.position || ""))
            .replace(/\{\{REFERRAL_CODE\}\}/g, candidate.referral_code || "")
            .replace(/\{\{REFERRAL_LINK\}\}/g, `${process.env.NEXT_PUBLIC_URL}?ref=${candidate.referral_code}`);

          const bodyText = seq.body_text
            ?.replace(/\{\{NAME\}\}/g, candidate.name || "there")
            .replace(/\{\{POSITION\}\}/g, String(candidate.position || ""))
            .replace(/\{\{REFERRAL_CODE\}\}/g, candidate.referral_code || "")
            .replace(/\{\{REFERRAL_LINK\}\}/g, `${process.env.NEXT_PUBLIC_URL}?ref=${candidate.referral_code}`);

          // Send email via Resend
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: `CiberPME <hello@${process.env.SENDING_DOMAIN || "resend.dev"}>`,
              to: candidate.email,
              subject,
              html: bodyHtml,
              text: bodyText,
            }),
          });

          if (res.ok) {
            const { id: resendId } = await res.json();

            // Log the sent email
            await sql`
              INSERT INTO email_log (recipient, sequence_id, subject, resend_id)
              VALUES (${candidate.email}, ${seq.id}, ${subject}, ${resendId})
            `;

            sequenceSent++;
            totalSent++;
          } else {
            const errorText = await res.text();
            errors.push(`${candidate.email}: ${res.status} ${errorText}`);
          }
        } catch (error: any) {
          errors.push(`${candidate.email}: ${error.message}`);
        }
      }

      // Update send count for this sequence
      if (sequenceSent > 0) {
        await sql`
          UPDATE email_sequences
          SET send_count = send_count + ${sequenceSent}
          WHERE id = ${seq.id}
        `;
      }

      results.push({
        sequence: seq.sequence,
        step: seq.step,
        variant: seq.variant,
        candidates_found: candidates.length,
        emails_sent: sequenceSent,
        errors: errors.length > 0 ? errors : undefined
      });
    }

    return json({
      ok: true,
      total_sent: totalSent,
      sequences_processed: results.length,
      results
    });

  } catch (error: any) {
    console.error("Scheduled email sending error:", error);
    return json({ ok: false, error: "Failed to send scheduled emails" }, 500);
  }
}

// GET /api/admin/send-scheduled-emails — Check what emails would be sent (dry run)
export async function GET(req: NextRequest) {
  const sql = getDb();

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return json({ ok: false, error: "Authorization required" }, 401);
    }

    const token = authHeader.split(" ")[1];
    if (token !== process.env.ADMIN_API_TOKEN) {
      return json({ ok: false, error: "Invalid token" }, 403);
    }

    // Get all active email sequences
    const sequences = await sql`
      SELECT id, sequence, step, subject, delay_hours, variant, send_count
      FROM email_sequences
      WHERE is_active = true AND delay_hours > 0
      ORDER BY sequence, step
    `;

    const results = [];
    let totalCandidates = 0;

    for (const seq of sequences) {
      // Count candidates who would receive this email
      const [{ count }] = await sql`
        SELECT COUNT(*) as count
        FROM waitlist w
        WHERE w.status = 'waiting'
          AND w.created_at <= NOW() - INTERVAL '${seq.delay_hours} hours'
          AND NOT EXISTS (
            SELECT 1 FROM email_log el
            WHERE el.recipient = w.email
            AND el.sequence_id = ${seq.id}
          )
      `;

      const candidateCount = Number(count);
      totalCandidates += candidateCount;

      results.push({
        sequence: seq.sequence,
        step: seq.step,
        variant: seq.variant,
        subject: seq.subject,
        delay_hours: seq.delay_hours,
        send_count: seq.send_count,
        candidates_ready: candidateCount
      });
    }

    return json({
      ok: true,
      total_candidates_ready: totalCandidates,
      sequences: results
    });

  } catch (error: any) {
    console.error("Scheduled email check error:", error);
    return json({ ok: false, error: "Failed to check scheduled emails" }, 500);
  }
}