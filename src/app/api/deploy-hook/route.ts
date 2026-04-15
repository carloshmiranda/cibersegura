import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Verify the request is from Vercel (basic security)
    const userAgent = request.headers.get('user-agent') || '';
    const isVercelHook = userAgent.includes('vercel') || userAgent.includes('Vercel');

    // For additional security, check for a secret token if needed
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.DEPLOY_HOOK_SECRET;

    if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log('Deploy hook triggered, initiating IndexNow submission for new content...');

    // Call our IndexNow automation endpoint
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://ciberpme.vercel.app';

    const indexNowResponse = await fetch(`${baseUrl}/api/indexnow-deploy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CiberPME-Deploy-Hook/1.0'
      }
    });

    const indexNowResult = await indexNowResponse.json();

    if (!indexNowResponse.ok) {
      console.error('IndexNow submission failed:', indexNowResult);
      return NextResponse.json({
        success: false,
        error: "IndexNow submission failed",
        details: indexNowResult
      }, { status: 500 });
    }

    console.log('Deploy hook completed successfully:', indexNowResult);

    return NextResponse.json({
      success: true,
      message: "Deploy hook executed successfully",
      indexNowResult: {
        submitted: indexNowResult.submitted,
        urls: indexNowResult.urls?.length || 0,
        timestamp: indexNowResult.timestamp
      }
    });

  } catch (error) {
    console.error('Deploy hook error:', error);
    return NextResponse.json({
      success: false,
      error: "Deploy hook execution failed",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    service: "Deploy Hook",
    status: "healthy",
    description: "Endpoint for Vercel deploy hooks to trigger IndexNow submissions",
    timestamp: new Date().toISOString()
  });
}