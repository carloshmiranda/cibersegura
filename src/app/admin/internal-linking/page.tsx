"use client";

import { useState, useEffect } from "react";
import { LinkSuggestion, InternalLinkAnalysis } from "@/lib/internal-linking";

interface ApiResponse {
  ok: boolean;
  data: InternalLinkAnalysis[];
  meta: {
    total_posts: number;
    posts_with_suggestions: number;
    total_suggestions: number;
    high_confidence_suggestions: number;
    generated_at: string;
  };
  error?: string;
}

interface ApplyResponse {
  ok: boolean;
  data: {
    modified_content: string;
    applied_suggestions: LinkSuggestion[];
    failed_suggestions: Array<{ suggestion: LinkSuggestion; reason: string }>;
    changes_count: number;
  };
  error?: string;
}

export default function InternalLinkingAdmin() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSuggestions, setSelectedSuggestions] = useState<Set<string>>(new Set());
  const [applyingChanges, setApplyingChanges] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const loadData = async () => {
    if (!adminToken) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/internal-linking', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      const result: ApiResponse = await response.json();

      if (!result.ok) {
        throw new Error(result.error || 'Failed to load data');
      }

      setData(result);
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

  const toggleSuggestion = (postSlug: string, suggestionIndex: number) => {
    const key = `${postSlug}-${suggestionIndex}`;
    const newSelected = new Set(selectedSuggestions);

    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }

    setSelectedSuggestions(newSelected);
  };

  const applySuggestions = async (postSlug: string, suggestions: LinkSuggestion[]) => {
    if (!adminToken || suggestions.length === 0) return;

    setApplyingChanges(true);

    try {
      const response = await fetch('/api/admin/internal-linking', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post_slug: postSlug,
          suggestions
        })
      });

      const result: ApplyResponse = await response.json();

      if (!result.ok) {
        throw new Error(result.error || 'Failed to apply suggestions');
      }

      // Show results in a modal or alert
      alert(`Successfully applied ${result.data.changes_count} suggestions to ${postSlug}. Check console for details.`);
      console.log('Applied changes:', result.data);

    } catch (err) {
      alert(`Error applying suggestions: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setApplyingChanges(false);
    }
  };

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
              {loading ? "Authenticating..." : "Access Admin"}
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
          <p className="text-text-secondary">Loading internal linking analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-brand mb-2">Error Loading Data</h1>
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
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brand">Internal Linking Admin</h1>
              <p className="text-sm text-text-secondary">Smart internal link suggestions for CiberPME blog</p>
            </div>
            <div className="text-sm text-text-muted">
              Generated: {new Date(data.meta.generated_at).toLocaleString('pt-PT')}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-border">
            <div className="text-2xl font-bold text-brand">{data.meta.total_posts}</div>
            <div className="text-sm text-text-secondary">Total Posts</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-border">
            <div className="text-2xl font-bold text-accent">{data.meta.posts_with_suggestions}</div>
            <div className="text-sm text-text-secondary">Posts with Suggestions</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-border">
            <div className="text-2xl font-bold text-success">{data.meta.total_suggestions}</div>
            <div className="text-sm text-text-secondary">Total Suggestions</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-border">
            <div className="text-2xl font-bold text-warning">{data.meta.high_confidence_suggestions}</div>
            <div className="text-sm text-text-secondary">High Confidence</div>
          </div>
        </div>

        {/* Post Analysis */}
        <div className="space-y-6">
          {data.data
            .filter(analysis => analysis.suggestions.length > 0)
            .map((analysis) => (
              <div key={analysis.sourcePost.slug} className="bg-white rounded-xl border border-border">
                <div className="p-6 border-b border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-brand mb-2">
                        {analysis.sourcePost.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-text-secondary mb-2">
                        <span className="px-2 py-1 bg-accent-light text-accent rounded">
                          {analysis.sourcePost.categoryLabel}
                        </span>
                        <span>{analysis.suggestions.length} suggestions</span>
                        <span>Keywords: {Object.keys(analysis.keywordDensity).length}</span>
                        <span>Existing links: {analysis.existingLinks.length}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const postSuggestions = analysis.suggestions.filter((_, index) =>
                          selectedSuggestions.has(`${analysis.sourcePost.slug}-${index}`)
                        );
                        applySuggestions(analysis.sourcePost.slug, postSuggestions);
                      }}
                      disabled={applyingChanges || !Array.from(selectedSuggestions).some(key => key.startsWith(analysis.sourcePost.slug))}
                      className="px-4 py-2 bg-success text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
                    >
                      {applyingChanges ? "Applying..." : "Apply Selected"}
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {analysis.suggestions.map((suggestion, index) => {
                      const suggestionKey = `${analysis.sourcePost.slug}-${index}`;
                      const isSelected = selectedSuggestions.has(suggestionKey);

                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border transition ${
                            isSelected ? 'border-accent bg-accent-light' : 'border-border hover:border-accent'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSuggestion(analysis.sourcePost.slug, index)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-medium text-brand">
                                  Link to: {suggestion.targetPost}
                                </span>
                                <span className={`px-2 py-0.5 text-xs rounded ${
                                  suggestion.confidence > 0.7
                                    ? 'bg-success text-white'
                                    : suggestion.confidence > 0.5
                                    ? 'bg-warning text-white'
                                    : 'bg-border text-text-secondary'
                                }`}>
                                  {Math.round(suggestion.confidence * 100)}% confidence
                                </span>
                                <span className="px-2 py-0.5 text-xs bg-border text-text-secondary rounded">
                                  {suggestion.type}
                                </span>
                              </div>
                              <div className="text-sm text-text-secondary mb-2">
                                <strong>Context:</strong> "{suggestion.contextSentence}"
                              </div>
                              <div className="text-sm">
                                <strong>Anchor text:</strong>{' '}
                                <code className="px-1 py-0.5 bg-bg-subtle rounded">{suggestion.anchorText}</code>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {data.data.filter(analysis => analysis.suggestions.length > 0).length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔗</div>
            <h2 className="text-xl font-bold text-brand mb-2">No Internal Link Suggestions</h2>
            <p className="text-text-secondary">
              All posts seem to have good internal linking already, or the content similarity threshold wasn't met.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}