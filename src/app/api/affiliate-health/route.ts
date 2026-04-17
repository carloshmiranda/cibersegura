import { getAllNIS2Tools } from "@/lib/affiliate-tools";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface LinkHealth {
  tool_name: string;
  original_url: string;
  test_url: string;
  status: "healthy" | "warning" | "error";
  http_status?: number;
  response_time?: number;
  utm_params_valid: boolean;
  error_message?: string;
  checks: {
    url_accessible: boolean;
    utm_source_present: boolean;
    utm_medium_present: boolean;
    utm_campaign_present: boolean;
    utm_content_present: boolean;
    utm_term_present: boolean;
  };
}

interface HealthReport {
  timestamp: string;
  total_links: number;
  healthy_links: number;
  warning_links: number;
  error_links: number;
  overall_status: "healthy" | "warning" | "critical";
  links: LinkHealth[];
  summary: {
    click_tracking_test: {
      status: "tested" | "manual_verification_required";
      message: string;
    };
  };
}

// Add UTM parameters to a URL for testing
function addTestUTMParams(url: string): string {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('utm_source', 'ciberpme.pt');
    urlObj.searchParams.set('utm_medium', 'affiliate');
    urlObj.searchParams.set('utm_campaign', 'nis2-health-test');
    urlObj.searchParams.set('utm_content', 'diagnostic-test');
    urlObj.searchParams.set('utm_term', 'health-check');
    return urlObj.toString();
  } catch (error) {
    return url;
  }
}

// Check if UTM parameters are properly formatted in a URL
function validateUTMParams(url: string): {
  utm_source_present: boolean;
  utm_medium_present: boolean;
  utm_campaign_present: boolean;
  utm_content_present: boolean;
  utm_term_present: boolean;
} {
  try {
    const urlObj = new URL(url);
    return {
      utm_source_present: urlObj.searchParams.has('utm_source') &&
                          urlObj.searchParams.get('utm_source') === 'ciberpme.pt',
      utm_medium_present: urlObj.searchParams.has('utm_medium') &&
                         urlObj.searchParams.get('utm_medium') === 'affiliate',
      utm_campaign_present: urlObj.searchParams.has('utm_campaign') &&
                           urlObj.searchParams.get('utm_campaign') !== '',
      utm_content_present: urlObj.searchParams.has('utm_content') &&
                          urlObj.searchParams.get('utm_content') !== '',
      utm_term_present: urlObj.searchParams.has('utm_term') &&
                       urlObj.searchParams.get('utm_term') !== '',
    };
  } catch (error) {
    return {
      utm_source_present: false,
      utm_medium_present: false,
      utm_campaign_present: false,
      utm_content_present: false,
      utm_term_present: false,
    };
  }
}

// Test if a URL is accessible and returns 200
async function testLinkAccessibility(url: string): Promise<{
  accessible: boolean;
  http_status?: number;
  response_time: number;
  error?: string;
}> {
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      method: 'HEAD', // Use HEAD to avoid downloading full content
      headers: {
        'User-Agent': 'CiberPME-HealthChecker/1.0 (+https://ciberpme.vercel.app)',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    return {
      accessible: response.ok,
      http_status: response.status,
      response_time: responseTime,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;

    if (error instanceof Error && error.name === 'AbortError') {
      return {
        accessible: false,
        response_time: responseTime,
        error: 'Request timeout (>10s)',
      };
    }

    return {
      accessible: false,
      response_time: responseTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// GET /api/affiliate-health — perform health check on all affiliate links
export async function GET() {
  try {
    const tools = getAllNIS2Tools();
    const linkHealthResults: LinkHealth[] = [];

    for (const tool of tools) {
      const testUrl = addTestUTMParams(tool.url);
      const utmChecks = validateUTMParams(testUrl);
      const accessibilityTest = await testLinkAccessibility(testUrl);

      const utmParamsValid = Object.values(utmChecks).every(check => check === true);

      let status: "healthy" | "warning" | "error";
      if (!accessibilityTest.accessible) {
        status = "error";
      } else if (!utmParamsValid || accessibilityTest.response_time > 5000) {
        status = "warning";
      } else {
        status = "healthy";
      }

      linkHealthResults.push({
        tool_name: tool.name,
        original_url: tool.url,
        test_url: testUrl,
        status,
        http_status: accessibilityTest.http_status,
        response_time: accessibilityTest.response_time,
        utm_params_valid: utmParamsValid,
        error_message: accessibilityTest.error,
        checks: {
          url_accessible: accessibilityTest.accessible,
          ...utmChecks,
        },
      });
    }

    // Calculate summary statistics
    const healthyCount = linkHealthResults.filter(link => link.status === "healthy").length;
    const warningCount = linkHealthResults.filter(link => link.status === "warning").length;
    const errorCount = linkHealthResults.filter(link => link.status === "error").length;

    let overallStatus: "healthy" | "warning" | "critical";
    if (errorCount > 0) {
      overallStatus = "critical";
    } else if (warningCount > 0) {
      overallStatus = "warning";
    } else {
      overallStatus = "healthy";
    }

    const report: HealthReport = {
      timestamp: new Date().toISOString(),
      total_links: tools.length,
      healthy_links: healthyCount,
      warning_links: warningCount,
      error_links: errorCount,
      overall_status: overallStatus,
      links: linkHealthResults,
      summary: {
        click_tracking_test: {
          status: "manual_verification_required",
          message: "Click tracking verification requires manual testing. Check browser DevTools Console for 'Affiliate click tracked:' messages when clicking affiliate CTAs on blog articles.",
        },
      },
    };

    return NextResponse.json(report);
  } catch (error) {
    console.error('Affiliate health check failed:', error);

    return NextResponse.json(
      {
        error: "Health check failed",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}