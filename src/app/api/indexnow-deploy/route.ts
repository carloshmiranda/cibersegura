import { NextResponse } from "next/server";
import { posts } from "@/lib/posts";

const INDEXNOW_KEY = "fc431a309850fb7ff6682a95bee49ba3";

interface SubmissionRecord {
  timestamp: string;
  submittedUrls: string[];
  lastPublishedAt: string;
  lastUpdatedAt?: string;
}

// In a production environment, this should be stored in a database or external storage
// For now, we'll use an environment variable to track the last submission
function getLastSubmission(): SubmissionRecord | null {
  try {
    const lastSubmissionData = process.env.INDEXNOW_LAST_SUBMISSION;
    return lastSubmissionData ? JSON.parse(lastSubmissionData) : null;
  } catch {
    return null;
  }
}

function setLastSubmission(record: SubmissionRecord): void {
  // In production, this would be saved to a database or external storage
  // For now, we'll log it so it can be manually added to env vars if needed
  console.log('Next submission record:', JSON.stringify(record));
}

export async function POST(request: Request) {
  try {
    const baseUrl = "https://ciberpme.vercel.app";
    const lastSubmission = getLastSubmission();

    // Determine what URLs are new or updated
    const newOrUpdatedUrls: string[] = [];

    // Always include main pages if this is the first run
    if (!lastSubmission) {
      newOrUpdatedUrls.push(
        baseUrl,
        `${baseUrl}/blog`,
        `${baseUrl}/faq`
      );
    }

    // Check for new or updated blog posts
    for (const post of posts) {
      const postUrl = `${baseUrl}/blog/${post.slug}`;

      if (!lastSubmission) {
        // First run - include all posts
        newOrUpdatedUrls.push(postUrl);
      } else {
        // Check if post is new or updated since last submission
        const postPublishedDate = new Date(post.publishedAt);
        const postUpdatedDate = post.updatedAt ? new Date(post.updatedAt) : postPublishedDate;
        const lastSubmissionDate = new Date(lastSubmission.timestamp);

        // Include if published after last submission
        const isNew = postPublishedDate > lastSubmissionDate;

        // Include if updated after last submission
        const isUpdated = postUpdatedDate > lastSubmissionDate;

        // Include if not in the previous submission list
        const wasNotSubmitted = !lastSubmission.submittedUrls.includes(postUrl);

        if (isNew || isUpdated || wasNotSubmitted) {
          newOrUpdatedUrls.push(postUrl);
        }
      }
    }

    // Remove duplicates
    const uniqueUrls = Array.from(new Set(newOrUpdatedUrls));

    if (uniqueUrls.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No new or updated URLs to submit",
        submitted: 0,
        timestamp: new Date().toISOString(),
      });
    }

    // Submit to IndexNow API
    const payload = {
      host: "ciberpme.vercel.app",
      key: INDEXNOW_KEY,
      keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
      urlList: uniqueUrls,
    };

    console.log(`🚀 Submitting ${uniqueUrls.length} new/updated URLs to IndexNow:`, uniqueUrls);

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "CiberPME-Auto-IndexNow/1.0"
      },
      body: JSON.stringify(payload),
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("IndexNow API error:", errorText);
      return NextResponse.json(
        {
          success: false,
          error: "IndexNow API request failed",
          status: response.status,
          urls: uniqueUrls
        },
        { status: 500 }
      );
    }

    // Also ping Bing sitemap
    try {
      await fetch(`https://www.bing.com/ping?sitemap=${baseUrl}/sitemap.xml`, {
        headers: {
          "User-Agent": "CiberPME-Sitemap-Ping/1.0"
        }
      });
    } catch (error) {
      console.warn("Bing sitemap ping failed:", error);
    }

    // Record this submission
    const currentTime = new Date().toISOString();
    const allCurrentUrls = [
      baseUrl,
      `${baseUrl}/blog`,
      `${baseUrl}/faq`,
      ...posts.map(post => `${baseUrl}/blog/${post.slug}`)
    ];

    const submissionRecord: SubmissionRecord = {
      timestamp: currentTime,
      submittedUrls: allCurrentUrls,
      lastPublishedAt: posts.reduce((latest, post) => {
        const postDate = post.publishedAt;
        return postDate > latest ? postDate : latest;
      }, '1900-01-01'),
      lastUpdatedAt: posts.reduce((latest, post) => {
        const postDate = post.updatedAt || post.publishedAt;
        return postDate > latest ? postDate : latest;
      }, '1900-01-01')
    };

    setLastSubmission(submissionRecord);

    console.log(`✅ Successfully submitted ${uniqueUrls.length} URLs to IndexNow`);

    return NextResponse.json({
      success: true,
      submitted: uniqueUrls.length,
      urls: uniqueUrls,
      timestamp: currentTime,
      totalPosts: posts.length,
      message: `Successfully submitted ${uniqueUrls.length} new/updated URLs to IndexNow`,
      summary: {
        totalUrlsInSystem: allCurrentUrls.length,
        newOrUpdatedSubmitted: uniqueUrls.length,
        lastSubmissionTimestamp: lastSubmission?.timestamp || 'first-run',
        searchEnginesPinged: ['IndexNow API', 'Bing Sitemap']
      }
    });

  } catch (error) {
    console.error("IndexNow deploy automation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// GET endpoint for manual testing and status checking
export async function GET() {
  try {
    const baseUrl = "https://ciberpme.vercel.app";
    const lastSubmission = getLastSubmission();

    // Get current content info
    const allCurrentUrls = [
      baseUrl,
      `${baseUrl}/blog`,
      `${baseUrl}/faq`,
      ...posts.map(post => `${baseUrl}/blog/${post.slug}`)
    ];

    const latestPost = posts.reduce((latest, post) => {
      const postDate = new Date(post.updatedAt || post.publishedAt);
      const latestDate = new Date(latest.updatedAt || latest.publishedAt);
      return postDate > latestDate ? post : latest;
    }, posts[0]);

    return NextResponse.json({
      lastSubmission,
      currentStatus: {
        totalUrls: allCurrentUrls.length,
        totalPosts: posts.length,
        latestPost: {
          slug: latestPost.slug,
          publishedAt: latestPost.publishedAt,
          updatedAt: latestPost.updatedAt
        }
      },
      nextSubmissionWould: lastSubmission ?
        `Submit URLs newer than ${lastSubmission.timestamp}` :
        'Submit all URLs (first run)'
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get status", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}