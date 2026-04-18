"use client";

import { useImpressionTracking } from '@/lib/use-impression-tracking';

export default function DebugImpressionTest() {
  const testRef = useImpressionTracking({
    article_slug: 'debug-test',
    cta_position: 'debug-banner',
    link_id: 'debug-cta',
    destination_url: 'https://example.com'
  });

  return (
    <div className="p-4 border border-red-500 bg-red-50">
      <h2 className="text-lg font-bold text-red-800 mb-2">Debug: Impression Tracking Test</h2>
      <p className="text-red-700 mb-4">
        This component is used to debug impression tracking. It should log to the console
        when it becomes visible and send a tracking request to /api/track.
      </p>

      <div ref={testRef} className="p-4 bg-white border border-red-300 rounded">
        <div className="h-32 flex items-center justify-center">
          <p className="text-center text-gray-700">
            🎯 <strong>Tracked Element</strong><br />
            Check the browser console for tracking logs.<br />
            This element needs to be 50%+ visible for 1 second to trigger tracking.
          </p>
        </div>
      </div>

      <div className="mt-4 text-xs text-red-600">
        <strong>Debug Info:</strong>
        <ul className="list-disc list-inside">
          <li>Check browser console for IntersectionObserver logs</li>
          <li>Check Network tab for /api/track requests</li>
          <li>Scroll this element into view to test tracking</li>
        </ul>
      </div>
    </div>
  );
}