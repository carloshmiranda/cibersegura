import { NextResponse } from "next/server";
import { posts } from "@/lib/posts";

const INDEXNOW_KEY = "fc431a309850fb7ff6682a95bee49ba3";

export async function POST() {
  try {
    const baseUrl = "https://ciberpme.vercel.app";

    // Generate all site URLs
    const urls = [
      baseUrl,
      `${baseUrl}/blog`,
      `${baseUrl}/faq`,
      ...posts.map(post => `${baseUrl}/blog/${post.slug}`)
    ];

    const payload = {
      host: "ciberpme.vercel.app",
      key: INDEXNOW_KEY,
      keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    };

    // Submit to IndexNow API
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("IndexNow API error:", errorText);
      return NextResponse.json(
        {
          success: false,
          error: "IndexNow API request failed",
          status: response.status
        },
        { status: 500 }
      );
    }

    // Also ping Bing sitemap directly
    try {
      await fetch(`https://www.bing.com/ping?sitemap=${baseUrl}/sitemap.xml`);
    } catch (error) {
      console.warn("Bing sitemap ping failed:", error);
      // Continue even if Bing ping fails - don't block the main IndexNow response
    }

    return NextResponse.json({
      success: true,
      submitted: urls.length,
      urls: urls,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Bulk IndexNow submission error:", error);
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