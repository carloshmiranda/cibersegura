import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface WebVitalMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  timestamp: number;
}

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalMetric = await request.json();

    // Validate metric data
    if (!metric.name || typeof metric.value !== 'number' || !metric.id) {
      return NextResponse.json(
        { error: "Invalid metric data" },
        { status: 400 }
      );
    }

    // In production, you might want to store this in a database or send to analytics
    // For now, we'll just log it for monitoring purposes
    console.log(`Web Vital: ${metric.name}`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      timestamp: new Date(metric.timestamp).toISOString(),
    });

    // You could also send this to external monitoring services like:
    // - Vercel Analytics (already included)
    // - Google Analytics 4
    // - DataDog
    // - New Relic
    // - Custom monitoring solution

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing web vital:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "web-vitals-tracker"
  });
}