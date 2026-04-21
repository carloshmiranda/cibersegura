"use client";

import { getAllNIS2Tools, getToolsByCategory, type AffiliateTool } from "@/lib/affiliate-tools";

// Component for displaying recommended affiliate software
export default function RecommendedSoftware() {
  const allTools = getAllNIS2Tools();
  const categories = [
    { name: "passwords", label: "Gestão de Passwords", icon: "🔐" },
    { name: "backup", label: "Backup e Recuperação", icon: "💾" },
    { name: "email", label: "Email Seguro", icon: "📧" },
    { name: "siem", label: "Monitorização", icon: "🛡️" },
  ];

  // Helper to build redirect URL with tracking parameters
  const buildTrackingUrl = (tool: AffiliateTool, position: string): string => {
    const toolSlug = tool.name.toLowerCase().replace(/\s+/g, '-');
    const params = new URLSearchParams({
      source: 'ferramentas',
      pos: position,
    });
    return `/go/${toolSlug}?${params.toString()}`;
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => {
        const categoryTools = getToolsByCategory(category.name as any);
        const recommendedTool = categoryTools.find(t => t.recommended) || categoryTools[0];

        if (!recommendedTool) return null;

        return (
          <div
            key={category.name}
            className="p-6 rounded-xl border border-border hover:border-accent hover:shadow-md transition group bg-white"
          >
            {/* Category Header */}
            <div className="text-center mb-4">
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="font-bold text-brand text-sm uppercase tracking-wide">
                {category.label}
              </h3>
            </div>

            {/* Recommended Tool */}
            <div className="text-center mb-6">
              <h4 className="font-bold text-lg text-brand mb-2 leading-tight">
                {recommendedTool.name}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {recommendedTool.description}
              </p>
              {recommendedTool.commission && (
                <div className="mt-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-accent bg-accent-light rounded">
                    Parceiro Oficial
                  </span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href={buildTrackingUrl(recommendedTool, category.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full px-4 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition text-sm"
              >
                Ver Planos →
              </a>
              <p className="text-xs text-text-muted mt-2">
                Link externo • Teste gratuito disponível
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}