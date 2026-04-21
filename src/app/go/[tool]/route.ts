import { NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";
import { getAllNIS2Tools } from "@/lib/affiliate-tools";

export const dynamic = "force-dynamic";

// GET /go/[tool] — affiliate redirect with tracking
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ tool: string }> }
) {
  try {
    const { tool } = await context.params;
    const searchParams = request.nextUrl.searchParams;
    const source = searchParams.get('source') || 'direct';
    const article = searchParams.get('article');
    const position = searchParams.get('pos') || 'unknown';

    // Find the tool in our affiliate tools list
    const tools = getAllNIS2Tools();
    const targetTool = tools.find(t =>
      t.name.toLowerCase().replace(/\s+/g, '-') === tool ||
      t.name.toLowerCase().includes(tool.toLowerCase())
    );

    if (!targetTool) {
      return new Response('Tool not found', { status: 404 });
    }

    // Log the affiliate click for analytics
    try {
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
          ${article || null},
          ${position},
          ${request.headers.get('referer') || ''},
          ${tool},
          ${targetTool.affiliateUrl},
          ${source === 'direct' ? `/go/${tool}` : `/blog/${article || 'unknown'}`}
        )
      `;
    } catch (dbError) {
      console.error('Error logging affiliate click:', dbError);
      // Don't fail the redirect if logging fails
    }

    // Build the final URL with additional tracking
    const finalUrl = new URL(targetTool.affiliateUrl);

    // Add our specific tracking parameters
    finalUrl.searchParams.set('ref', 'ciberpme');
    if (article) {
      finalUrl.searchParams.set('utm_content', article);
    }

    // Add timestamp for cache busting if needed
    finalUrl.searchParams.set('t', Date.now().toString());

    // Redirect to the affiliate URL
    return new Response(null, {
      status: 302,
      headers: {
        'Location': finalUrl.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Error in affiliate redirect:', error);

    // Fallback redirect to the main tools page
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/ferramentas',
      },
    });
  }
}