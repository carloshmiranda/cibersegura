"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  newsletter: {
    total_signups: number;
    signups_last_30_days: number;
    signups_last_7_days: number;
    daily_signups: Array<{ date: string; signups: number }>;
    referral_sources: Array<{ source: string; signups: number }>;
  };
  content: {
    total_impressions: number;
    articles_with_impressions: number;
    unique_cta_positions: number;
    top_articles: Array<{
      article_slug: string;
      impressions: number;
      cta_variations: number;
    }>;
    cta_positions: Array<{
      position: string;
      impressions: number;
    }>;
  };
  email: {
    sequences: Array<{
      sequence: string;
      step: number;
      send_count: number;
      subject: string;
    }>;
  };
  generated_at: string;
}

interface ApiResponse {
  ok: boolean;
  data?: AnalyticsData;
  error?: string;
}

export default function AnalyticsAdmin() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const loadData = async () => {
    if (!adminToken) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/analytics', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      const result: ApiResponse = await response.json();

      if (!result.ok) {
        throw new Error(result.error || 'Failed to load analytics');
      }

      setData(result.data!);
      setAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      if (err instanceof Error && err.message === 'Unauthorized') {
        setAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
      loadData();
    }
  }, [adminToken]);

  if (!authenticated && !loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-6 rounded-xl border border-border">
          <h1 className="text-2xl font-bold text-brand mb-4">Admin Access</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-text-secondary mb-1">
                Admin Token
              </label>
              <input
                id="token"
                type="password"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                placeholder="Enter admin token..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>
            <button
              onClick={loadData}
              disabled={!adminToken || loading}
              className="w-full px-4 py-2 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access Analytics"}
            </button>
            {error && (
              <p className="text-sm text-error">{error}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-text-secondary">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">📊</div>
          <h1 className="text-xl font-bold text-brand mb-2">Error Loading Analytics</h1>
          <p className="text-text-secondary mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brand">Analytics Dashboard</h1>
              <p className="text-sm text-text-secondary">Content performance and newsletter metrics</p>
            </div>
            <div className="text-sm text-text-muted">
              Generated: {new Date(data.generated_at).toLocaleString('pt-PT')}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Newsletter Metrics */}
        <section>
          <h2 className="text-xl font-bold text-brand mb-6">Newsletter Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-brand">{data.newsletter.total_signups}</div>
              <div className="text-sm text-text-secondary">Total Signups</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-accent">{data.newsletter.signups_last_30_days}</div>
              <div className="text-sm text-text-secondary">Signups (30 days)</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-success">{data.newsletter.signups_last_7_days}</div>
              <div className="text-sm text-text-secondary">Signups (7 days)</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Referral Sources */}
            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="font-bold text-brand mb-4">Top Referral Sources (30 days)</h3>
              <div className="space-y-3">
                {data.newsletter.referral_sources.slice(0, 5).map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{source.source || 'Direct'}</span>
                    <span className="font-medium">{source.signups}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Daily Signups */}
            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="font-bold text-brand mb-4">Daily Signups (Last 7 days)</h3>
              <div className="space-y-2">
                {data.newsletter.daily_signups.slice(0, 7).map((day, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{new Date(day.date).toLocaleDateString('pt-PT')}</span>
                    <span className="font-medium">{day.signups}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content Performance */}
        <section>
          <h2 className="text-xl font-bold text-brand mb-6">Content Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-brand">{data.content.total_impressions}</div>
              <div className="text-sm text-text-secondary">Total CTA Impressions (30 days)</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-accent">{data.content.articles_with_impressions}</div>
              <div className="text-sm text-text-secondary">Articles with CTAs</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border">
              <div className="text-3xl font-bold text-success">{data.content.unique_cta_positions}</div>
              <div className="text-sm text-text-secondary">CTA Positions Tested</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Articles */}
            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="font-bold text-brand mb-4">Top Performing Articles</h3>
              <div className="space-y-3">
                {data.content.top_articles.slice(0, 8).map((article, index) => (
                  <div key={index} className="border-b border-border pb-2 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-brand truncate">
                          {article.article_slug.replace(/-/g, ' ')}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {article.cta_variations} CTA variations
                        </div>
                      </div>
                      <div className="text-sm font-medium ml-2">
                        {article.impressions} impressions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Position Performance */}
            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="font-bold text-brand mb-4">CTA Position Performance</h3>
              <div className="space-y-3">
                {data.content.cta_positions.map((position, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{position.position}</span>
                    <span className="font-medium">{position.impressions}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Email Sequences */}
        <section>
          <h2 className="text-xl font-bold text-brand mb-6">Email Automation</h2>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bg-subtle">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Sequence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Step
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Sent
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border">
                  {data.email.sequences.map((email, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-brand">
                        {email.sequence}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        {email.step}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary max-w-xs truncate">
                        {email.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {email.send_count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}