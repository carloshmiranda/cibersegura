import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Skip tracking for:
  // - API routes
  // - Static files (_next/static)
  // - Favicons and robots.txt
  // - Images and other assets
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|webp|svg|css|js|woff|woff2|ttf|eot)$/i)
  ) {
    return NextResponse.next();
  }

  // Record page view asynchronously (don't block the response)
  // We'll fire and forget this request to avoid slowing down the user experience
  recordPageView(origin, pathname);

  return NextResponse.next();
}

async function recordPageView(origin: string, path: string) {
  try {
    // Make the request but don't await it to avoid blocking
    fetch(`${origin}/api/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path }),
    }).catch(() => {
      // Silently handle failures to avoid cluttering logs
      // Page view tracking is nice-to-have, not critical
    });
  } catch (error) {
    // Silently handle any errors to avoid breaking the page load
  }
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern based on your needs.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};