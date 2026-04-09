import { NextRequest, NextResponse } from "next/server";
import { posts } from "@/lib/posts";

// IndexNow API key - matches the key in /fc431a309850fb7ff6682a95bee49ba3.txt
const INDEXNOW_KEY = "fc431a309850fb7ff6682a95bee49ba3";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const url = searchParams.get("url");

  // Verify the key matches our IndexNow key
  if (key !== INDEXNOW_KEY) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  // If URL parameter is provided, validate it's from our domain
  if (url) {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname !== "ciberpme.vercel.app") {
        return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }
  }

  return NextResponse.json({
    key: INDEXNOW_KEY,
    status: "validated"
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { host, key, keyLocation, urlList } = body;

    // Validate required fields
    if (!host || !key || !keyLocation || !urlList) {
      return NextResponse.json(
        { error: "Missing required fields: host, key, keyLocation, urlList" },
        { status: 400 }
      );
    }

    // Verify the key matches
    if (key !== INDEXNOW_KEY) {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });
    }

    // Verify host
    if (host !== "ciberpme.vercel.app") {
      return NextResponse.json({ error: "Invalid host" }, { status: 400 });
    }

    // Submit to Bing IndexNow API
    const indexNowResponse = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList,
      }),
    });

    if (!indexNowResponse.ok) {
      console.error("IndexNow API error:", await indexNowResponse.text());
      return NextResponse.json(
        { error: "IndexNow API request failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      submitted: urlList.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("IndexNow submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

