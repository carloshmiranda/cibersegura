import AffiliateCTABanner from "@/components/affiliate-cta-banner";
import { getAllNIS2Tools } from "@/lib/affiliate-tools";
import Link from "next/link";

export default function AffiliateTestPage() {
  const tools = getAllNIS2Tools();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Affiliate Click Tracking Test</h1>
          <p className="text-gray-600 mb-4">
            This page is for testing the affiliate click tracking functionality.
            Open browser developer tools to see tracking logs.
          </p>

          <div className="bg-white p-4 rounded-lg border mb-6">
            <h2 className="text-lg font-bold mb-2">Test Instructions:</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Open browser developer tools (F12)</li>
              <li>Go to the Console tab</li>
              <li>Click on any affiliate tool below</li>
              <li>Check the console for tracking logs</li>
              <li>Verify the test API endpoint works:
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => {
                      fetch('/api/affiliate/test-click', { method: 'POST' })
                        .then(res => res.json())
                        .then(data => console.log('Test click result:', data))
                        .catch(err => console.error('Test click error:', err));
                    }}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    Create Test Click
                  </button>
                  <button
                    onClick={() => {
                      fetch('/api/affiliate/test-click')
                        .then(res => res.json())
                        .then(data => console.log('Recent clicks:', data))
                        .catch(err => console.error('Fetch error:', err));
                    }}
                    className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                  >
                    Check Recent Clicks
                  </button>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Sample Affiliate Banner</h2>
          <AffiliateCTABanner
            tools={tools}
            title="Test Affiliate Tools"
            description="Click any tool below to test affiliate tracking. Check browser console for debug logs."
            source="test-page"
            articleSlug="affiliate-test"
          />
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h2 className="text-lg font-bold mb-2">Expected UTM Parameters:</h2>
          <ul className="text-sm space-y-1">
            <li><strong>utm_source:</strong> ciberpme.pt</li>
            <li><strong>utm_medium:</strong> affiliate</li>
            <li><strong>utm_campaign:</strong> nis2-recommendations</li>
            <li><strong>utm_content:</strong> {tools[0]?.name.toLowerCase().replace(/\s+/g, '-')}-1 (varies by tool)</li>
            <li><strong>utm_term:</strong> test-page</li>
          </ul>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}