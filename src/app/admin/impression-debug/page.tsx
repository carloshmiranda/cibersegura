import { Metadata } from "next";
import DebugImpressionTest from "@/components/debug-impression-test";

export const metadata: Metadata = {
  title: "Impression Tracking Debug | CiberPME Admin",
  robots: "noindex, nofollow",
};

export default function ImpressionDebugPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Impression Tracking Debug
          </h1>
          <p className="text-gray-700 mb-6">
            This page is used to debug CTA impression tracking issues.
            Open browser DevTools (Console + Network tabs) before testing.
          </p>

          <div className="space-y-8">
            <DebugImpressionTest />

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Testing Instructions:
              </h3>
              <ol className="list-decimal list-inside text-yellow-700 space-y-1">
                <li>Open browser DevTools (F12) and go to Console tab</li>
                <li>Also open the Network tab to monitor API requests</li>
                <li>Scroll the red test component into view</li>
                <li>Keep it visible for more than 1 second</li>
                <li>Check console logs for tracking events</li>
                <li>Check Network tab for POST request to /api/track</li>
                <li>Verify the response status (should be 204)</li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Expected Console Output:
              </h3>
              <div className="text-blue-700 font-mono text-sm space-y-1">
                <div>🔍 Setting up IntersectionObserver for: debug-cta</div>
                <div>✅ IntersectionObserver attached to element for: debug-cta</div>
                <div>👁️ IntersectionObserver triggered: {`{link_id: "debug-cta", isIntersecting: true, ...}`}</div>
                <div>⏰ Starting 1-second timer for: debug-cta</div>
                <div>👁️ CTA impression tracked: {`{position: "debug-banner", link_id: "debug-cta", ...}`}</div>
                <div>🚀 Sending impression tracking request: {`{...}`}</div>
                <div>📡 Tracking response status: 204 No Content</div>
                <div>✅ CTA impression tracking successful: debug-cta</div>
              </div>
            </div>

            {/* Add some spacing so we can test scrolling */}
            <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">Spacer area for testing scroll behavior</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Troubleshooting:
              </h3>
              <ul className="list-disc list-inside text-green-700 space-y-1">
                <li><strong>No IntersectionObserver logs:</strong> Check if element ref is properly attached</li>
                <li><strong>Observer triggers but no timer:</strong> Element might already be tracked or not 50%+ visible</li>
                <li><strong>Timer starts but no API call:</strong> Check fetch/network issues</li>
                <li><strong>API call fails:</strong> Check DATABASE_URL and API route logs</li>
                <li><strong>404 on /api/track:</strong> API route not properly configured</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}