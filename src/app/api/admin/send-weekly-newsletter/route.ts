import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { posts } from "@/lib/posts";

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

function json(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

function getCurrentWeekData() {
  const today = new Date();
  const weekNumber = Math.ceil(
    (today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) /
    (7 * 24 * 60 * 60 * 1000)
  );

  return {
    weekDate: today.toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    editionNumber: weekNumber
  };
}

function getRecentPosts(days = 7) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return posts.filter(post => {
    const postDate = new Date(post.publishedAt);
    return postDate >= cutoffDate;
  }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

function generateWeeklyContent() {
  const currentWeek = getCurrentWeekData();

  // Cybersecurity threats and tips (rotated weekly based on week number)
  const threats = [
    "Novo malware 'StealC' visou 50+ empresas portuguesas esta semana através de emails falsos da AT. O malware instala-se via anexos .zip e rouba credenciais bancárias. **Ação imediata**: Verifique se tem emails da AT e delete sem abrir anexos.",
    "Vulnerabilidade crítica descoberta no Microsoft Exchange (CVE-2024-8534). Atacantes podem aceder remotamente a emails empresariais. **Ação imediata**: Atualize o Exchange para a versão mais recente ou contacte o seu fornecedor IT.",
    "Campanha de phishing massiva imita a EDP com faturas falsas. Os emails contêm links que instalam ransomware. **Ação imediata**: Verifique faturas diretamente no site oficial da EDP, nunca através de links em emails.",
    "Ataques de 'Business Email Compromise' aumentaram 300% em Portugal. Criminosos fingem ser CEOs e pedem transferências urgentes. **Ação imediata**: Confirme sempre pedidos de transferência por telefone antes de executar."
  ];

  const tips = [
    "🔐 **Password da Semana**: Use frases em vez de palavras. 'MeuCafe7DaManha!' é mais forte que '&Kd8$mN2'. Mais fácil de lembrar, impossível de quebrar por força bruta.",
    "📱 **2FA Inteligente**: Use apps como Microsoft Authenticator ou Google Authenticator em vez de SMS. Os SMS podem ser interceptados, as apps são à prova de ataques SIM swap.",
    "☁️ **Backup 3-2-1**: 3 cópias dos dados, em 2 tipos de suporte diferentes, 1 offsite. Use Dropbox/OneDrive para documentos + disco externo para backups completos.",
    "🌐 **WiFi Empresarial**: Crie uma rede separada para visitantes. Use WPA3 sempre que possível. Altere a password da rede principal mensalmente."
  ];

  const tools = [
    "**Bitwarden** (gratuito) — Gestor de passwords para equipas. Permite partilhar logins empresariais de forma segura. Gera passwords fortes automaticamente.",
    "**Windows Defender** (incluído) — Antivírus empresarial gratuito da Microsoft. Proteção em tempo real contra malware e ransomware. Configure scans automáticos.",
    "**Cloudflare** (plano gratuito) — Proteção DDoS e firewall para websites empresariais. Bloqueia 99% dos ataques antes de chegarem ao servidor.",
    "**HaveIBeenPwned** (gratuito) — Verifique se emails da empresa foram comprometidos em vazamentos. Configure alertas automáticos para novos vazamentos."
  ];

  const weekIndex = currentWeek.editionNumber % threats.length;

  return {
    ...currentWeek,
    threat: threats[weekIndex],
    tips: tips[weekIndex],
    tool: tools[weekIndex]
  };
}

function formatArticlesForEmail(recentPosts: typeof posts) {
  if (recentPosts.length === 0) {
    return {
      html: '<p style="color: #6b7280; font-size: 16px; margin: 0;">Nenhum artigo novo esta semana. Explore o <a href="https://ciberpme.vercel.app/blog" style="color: #3b82f6;">arquivo completo</a>.</p>',
      text: 'Nenhum artigo novo esta semana. Explore o arquivo completo: https://ciberpme.vercel.app/blog'
    };
  }

  const htmlArticles = recentPosts.map(post => `
    <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 15px; margin-bottom: 15px;">
      <h4 style="color: #1f2937; font-size: 16px; font-weight: 600; margin-bottom: 8px; line-height: 1.4;">
        <a href="https://ciberpme.vercel.app/blog/${post.slug}" style="color: #1f2937; text-decoration: none;">
          ${post.title}
        </a>
      </h4>
      <p style="color: #6b7280; font-size: 14px; margin-bottom: 8px; line-height: 1.5;">
        ${post.excerpt}
      </p>
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="background-color: #eff6ff; color: #1e40af; font-size: 12px; padding: 4px 8px; border-radius: 4px; font-weight: 500;">
          ${post.categoryLabel}
        </span>
        <span style="color: #9ca3af; font-size: 12px;">
          ${post.readingTime} min de leitura
        </span>
      </div>
    </div>
  `).join('');

  const textArticles = recentPosts.map(post => `
📄 ${post.title}
   ${post.excerpt}
   Categoria: ${post.categoryLabel} | ${post.readingTime} min
   Link: https://ciberpme.vercel.app/blog/${post.slug}
`).join('\n');

  return {
    html: htmlArticles,
    text: textArticles
  };
}

// POST /api/admin/send-weekly-newsletter — Send weekly newsletter
export async function POST(req: NextRequest) {
  const sql = getDb();

  try {
    // Auth check
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

    // Get newsletter content
    const weeklyContent = generateWeeklyContent();
    const recentPosts = getRecentPosts(7);
    const articlesContent = formatArticlesForEmail(recentPosts);

    // Get active newsletter subscribers
    const subscribers = await sql`
      SELECT id, email, name
      FROM waitlist
      WHERE status = 'waiting'
      ORDER BY created_at ASC
    `;

    if (subscribers.length === 0) {
      return json({ ok: true, message: "No active subscribers", sent: 0 });
    }

    // Get newsletter template
    const [template] = await sql`
      SELECT id, subject, body_html, body_text
      FROM email_sequences
      WHERE sequence = 'weekly_newsletter' AND step = 1 AND variant = 'a'
      LIMIT 1
    `;

    if (!template) {
      return json({ ok: false, error: "Newsletter template not found" }, 500);
    }

    let successCount = 0;
    const errors = [];

    for (const subscriber of subscribers) {
      try {
        const unsubscribeUrl = `${process.env.NEXT_PUBLIC_URL}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;

        // Replace template variables
        const subject = template.subject
          .replace(/\{\{WEEK_DATE\}\}/g, weeklyContent.weekDate)
          .replace(/\{\{EDITION_NUMBER\}\}/g, String(weeklyContent.editionNumber));

        const bodyHtml = template.body_html
          .replace(/\{\{WEEK_DATE\}\}/g, weeklyContent.weekDate)
          .replace(/\{\{EDITION_NUMBER\}\}/g, String(weeklyContent.editionNumber))
          .replace(/\{\{THREAT_DESCRIPTION\}\}/g, weeklyContent.threat)
          .replace(/\{\{TIPS_CONTENT\}\}/g, weeklyContent.tips)
          .replace(/\{\{ARTICLES_CONTENT\}\}/g, articlesContent.html)
          .replace(/\{\{TOOL_RECOMMENDATION\}\}/g, weeklyContent.tool)
          .replace(/\{\{UNSUBSCRIBE_LINK\}\}/g, unsubscribeUrl);

        const bodyText = template.body_text
          .replace(/\{\{WEEK_DATE\}\}/g, weeklyContent.weekDate)
          .replace(/\{\{EDITION_NUMBER\}\}/g, String(weeklyContent.editionNumber))
          .replace(/\{\{THREAT_DESCRIPTION\}\}/g, weeklyContent.threat)
          .replace(/\{\{TIPS_CONTENT\}\}/g, weeklyContent.tips)
          .replace(/\{\{ARTICLES_CONTENT\}\}/g, articlesContent.text)
          .replace(/\{\{TOOL_RECOMMENDATION\}\}/g, weeklyContent.tool)
          .replace(/\{\{UNSUBSCRIBE_LINK\}\}/g, unsubscribeUrl);

        // Send email via Resend
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: `CiberPME <newsletter@${process.env.SENDING_DOMAIN || "resend.dev"}>`,
            to: subscriber.email,
            subject,
            html: bodyHtml,
            text: bodyText,
          }),
        });

        if (res.ok) {
          const { id: resendId } = await res.json();

          // Log successful send
          await sql`
            INSERT INTO email_log (recipient, sequence_id, subject, resend_id)
            VALUES (${subscriber.email}, ${template.id}, ${subject}, ${resendId})
          `;

          successCount++;
        } else {
          const errorData = await res.json();
          errors.push(`Failed to send to ${subscriber.email}: ${errorData.message || 'Unknown error'}`);
        }

      } catch (error: any) {
        errors.push(`Error sending to ${subscriber.email}: ${error.message}`);
      }
    }

    // Update template send count
    await sql`
      UPDATE email_sequences
      SET send_count = send_count + ${successCount}
      WHERE id = ${template.id}
    `;

    return json({
      ok: true,
      sent: successCount,
      total_subscribers: subscribers.length,
      errors: errors.length > 0 ? errors : undefined,
      newsletter_data: {
        week: weeklyContent.weekDate,
        edition: weeklyContent.editionNumber,
        articles_count: recentPosts.length
      }
    });

  } catch (error: any) {
    console.error("Weekly newsletter error:", error);
    return json({ ok: false, error: "Failed to send newsletter" }, 500);
  }
}

// GET /api/admin/send-weekly-newsletter — Preview newsletter content
export async function GET(req: NextRequest) {
  try {
    // Auth check (lighter for preview)
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return json({ ok: false, error: "Authorization required" }, 401);
    }

    const token = authHeader.split(" ")[1];
    if (token !== process.env.ADMIN_API_TOKEN) {
      return json({ ok: false, error: "Invalid token" }, 403);
    }

    const sql = getDb();

    // Get preview content
    const weeklyContent = generateWeeklyContent();
    const recentPosts = getRecentPosts(7);
    const articlesContent = formatArticlesForEmail(recentPosts);

    // Get subscriber count
    const [{ count }] = await sql`
      SELECT COUNT(*) as count FROM waitlist WHERE status = 'waiting'
    `;

    return json({
      ok: true,
      preview: true,
      total_subscribers: Number(count),
      newsletter_data: {
        week: weeklyContent.weekDate,
        edition: weeklyContent.editionNumber,
        threat: weeklyContent.threat,
        tips: weeklyContent.tips,
        tool: weeklyContent.tool,
        articles: recentPosts.map(post => ({
          title: post.title,
          excerpt: post.excerpt,
          category: post.categoryLabel,
          reading_time: post.readingTime,
          url: `https://ciberpme.vercel.app/blog/${post.slug}`
        }))
      }
    });

  } catch (error: any) {
    console.error("Newsletter preview error:", error);
    return json({ ok: false, error: "Failed to generate preview" }, 500);
  }
}