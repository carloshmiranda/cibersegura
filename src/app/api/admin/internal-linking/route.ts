import { NextRequest, NextResponse } from "next/server";
import {
  generateInternalLinkingReport,
  analyzeInternalLinking,
  applyLinkSuggestion,
  validateSuggestion,
  applyLinkSuggestionsToFile,
  LinkSuggestion
} from "@/lib/internal-linking";
import { getPostBySlug } from "@/lib/posts";

// Simple admin authentication check
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.ADMIN_API_TOKEN;

  if (!expectedToken) {
    console.warn('ADMIN_API_TOKEN not configured');
    return false;
  }

  return authHeader === `Bearer ${expectedToken}`;
}

/**
 * GET /api/admin/internal-linking
 * Returns internal linking analysis and suggestions for all posts
 */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const postSlug = searchParams.get('post');

    if (postSlug) {
      // Analysis for specific post
      const post = getPostBySlug(postSlug);
      if (!post) {
        return NextResponse.json(
          { ok: false, error: 'Post not found' },
          { status: 404 }
        );
      }

      const analysis = analyzeInternalLinking(post);

      return NextResponse.json({
        ok: true,
        data: analysis,
        meta: {
          type: 'single_post',
          post_slug: postSlug,
          generated_at: new Date().toISOString()
        }
      });
    }

    // Full report for all posts
    const report = generateInternalLinkingReport();

    // Calculate summary stats
    const totalSuggestions = report.reduce((sum, analysis) => sum + analysis.suggestions.length, 0);
    const postsWithSuggestions = report.filter(analysis => analysis.suggestions.length > 0).length;
    const highConfidenceSuggestions = report.reduce((sum, analysis) =>
      sum + analysis.suggestions.filter(s => s.confidence > 0.7).length, 0
    );

    return NextResponse.json({
      ok: true,
      data: report,
      meta: {
        type: 'full_report',
        total_posts: report.length,
        posts_with_suggestions: postsWithSuggestions,
        total_suggestions: totalSuggestions,
        high_confidence_suggestions: highConfidenceSuggestions,
        generated_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Internal linking API error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/internal-linking
 * Applies selected link suggestions - can simulate or actually modify posts.ts
 * Body: { suggestions: LinkSuggestion[], post_slug: string, apply_to_file?: boolean }
 */
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { suggestions, post_slug, apply_to_file = false } = body;

    if (!suggestions || !Array.isArray(suggestions) || !post_slug) {
      return NextResponse.json(
        { ok: false, error: 'Invalid request body. Expected: { suggestions: LinkSuggestion[], post_slug: string, apply_to_file?: boolean }' },
        { status: 400 }
      );
    }

    const post = getPostBySlug(post_slug);
    if (!post) {
      return NextResponse.json(
        { ok: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    if (apply_to_file) {
      // Actually modify the posts.ts file
      try {
        const result = applyLinkSuggestionsToFile(post_slug, suggestions);

        return NextResponse.json({
          ok: true,
          data: {
            applied_suggestions: result.appliedSuggestions,
            failed_suggestions: result.failedSuggestions,
            changes_count: result.appliedSuggestions.length,
            backup_path: result.backupPath
          },
          meta: {
            post_slug,
            processed_at: new Date().toISOString(),
            mode: 'file_modification',
            note: 'Changes have been applied to posts.ts file. A backup has been created.'
          }
        });

      } catch (fileError) {
        console.error('File modification error:', fileError);
        return NextResponse.json(
          { ok: false, error: `Failed to modify posts.ts: ${fileError instanceof Error ? fileError.message : 'Unknown error'}` },
          { status: 500 }
        );
      }

    } else {
      // Simulation mode (existing behavior)
      let modifiedContent = post.content;
      const appliedSuggestions: LinkSuggestion[] = [];
      const failedSuggestions: Array<{ suggestion: LinkSuggestion; reason: string }> = [];

      // Apply each suggestion
      for (const suggestion of suggestions) {
        if (validateSuggestion(modifiedContent, suggestion)) {
          modifiedContent = applyLinkSuggestion(modifiedContent, suggestion);
          appliedSuggestions.push(suggestion);
        } else {
          failedSuggestions.push({
            suggestion,
            reason: 'Content changed or link already exists'
          });
        }
      }

      return NextResponse.json({
        ok: true,
        data: {
          original_content: post.content,
          modified_content: modifiedContent,
          applied_suggestions: appliedSuggestions,
          failed_suggestions: failedSuggestions,
          changes_count: appliedSuggestions.length
        },
        meta: {
          post_slug,
          processed_at: new Date().toISOString(),
          mode: 'simulation',
          note: 'This is a simulation. To actually modify posts, set apply_to_file: true.'
        }
      });
    }

  } catch (error) {
    console.error('Apply suggestions API error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}