"use client";

import Link from "next/link";
import { useState } from "react";
import { NewsletterForm } from "@/app/newsletter-form";

interface Question {
  id: string;
  text: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
  category: "basic" | "network" | "data" | "access" | "incident";
}

interface CategoryScore {
  category: "basic" | "network" | "data" | "access" | "incident";
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: "critical" | "basic" | "good" | "excellent";
  recommendations: string[];
  relatedResources: { title: string; url: string; type: "article" | "tool" | "resource" }[];
}

interface AssessmentResult {
  score: number;
  maxScore: number;
  percentage: number;
  level: "critical" | "basic" | "good" | "excellent";
  title: string;
  description: string;
  recommendations: string[];
  priority: string[];
  categoryScores: CategoryScore[];
  nextSteps: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

interface AssessmentResultProps {
  result: AssessmentResult;
  questions: Question[];
  answers: Record<string, number>;
  onReset: () => void;
}

function generateActionPlan(result: AssessmentResult): {
  immediate: { action: string; deadline: string; resources: string[] }[];
  shortTerm: { action: string; deadline: string; resources: string[] }[];
  longTerm: { action: string; deadline: string; resources: string[] }[];
} {
  const baseActions = {
    immediate: [
      {
        action: "Implementar backups automáticos dos dados críticos",
        deadline: "Esta semana",
        resources: ["/ferramentas", "/blog/backup-estrategia-321"]
      },
      {
        action: "Verificar e atualizar software antivírus em todos os dispositivos",
        deadline: "Esta semana",
        resources: ["/recursos", "/blog/antivirus-empresarial"]
      }
    ],
    shortTerm: [
      {
        action: "Estabelecer política de passwords fortes e implementar gestor de passwords",
        deadline: "2-4 semanas",
        resources: ["/ferramentas", "/blog/gestao-passwords-seguras"]
      },
      {
        action: "Configurar autenticação de dois fatores em serviços críticos",
        deadline: "1-2 semanas",
        resources: ["/blog/autenticacao-multifator", "/recursos"]
      }
    ],
    longTerm: [
      {
        action: "Desenvolver plano formal de resposta a incidentes",
        deadline: "1-3 meses",
        resources: ["/ferramentas", "/blog/plano-resposta-incidentes"]
      },
      {
        action: "Implementar formação regular de cibersegurança para colaboradores",
        deadline: "2-6 meses",
        resources: ["/blog/formacao-colaboradores", "/recursos"]
      }
    ]
  };

  // Customize based on result level
  if (result.level === "critical") {
    baseActions.immediate.push({
      action: "URGENTE: Contactar especialista em cibersegurança para auditoria",
      deadline: "Esta semana",
      resources: ["/blog/como-escolher-especialista-ciberseguranca"]
    });
  }

  return baseActions;
}

function downloadAssessmentReport(result: AssessmentResult, answers: Record<string, number>) {
  // Create a detailed HTML report that can be printed as PDF
  const reportContent = `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Avaliação de Cibersegurança - CiberPME</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #1f2937;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #0369a1;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .score-box {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
        .category {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
        }
        .recommendations {
            background: #fefce8;
            border: 1px solid #facc15;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .priority {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            margin-left: 10px;
        }
        .critical { background: #fee2e2; color: #dc2626; }
        .basic { background: #fef3c7; color: #d97706; }
        .good { background: #dbeafe; color: #2563eb; }
        .excellent { background: #dcfce7; color: #16a34a; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>Relatório de Avaliação de Cibersegurança</h1>
        <p><strong>Desenvolvido por CiberPME</strong></p>
        <p>Data: ${new Date().toLocaleDateString('pt-PT')} | Empresa: ________________________</p>
    </div>

    <div class="score-box">
        <h2>Resultado Geral</h2>
        <p style="font-size: 24px; font-weight: bold; color: #0369a1;">${result.score}/${result.maxScore} pontos (${Math.round(result.percentage)}%)</p>
        <p class="priority ${result.level}">${result.title}</p>
        <p>${result.description}</p>
    </div>

    <h3>Análise por Categoria</h3>
    ${result.categoryScores.map(cat => `
    <div class="category">
        <h4>${cat.name} <span class="priority ${cat.level}">${Math.round(cat.percentage)}%</span></h4>
        <p><strong>Pontuação:</strong> ${cat.score}/${cat.maxScore}</p>
        ${cat.recommendations.length > 0 ? `
        <p><strong>Recomendações:</strong></p>
        <ul>
            ${cat.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        ` : ''}
    </div>
    `).join('')}

    <div class="recommendations">
        <h3>Plano de Ação Recomendado</h3>
        <h4>Prioridades Imediatas (Esta semana)</h4>
        <ul>
            ${result.nextSteps.immediate.map(step => `<li>${step}</li>`).join('')}
        </ul>
        <h4>Médio Prazo (1-2 meses)</h4>
        <ul>
            ${result.nextSteps.shortTerm.map(step => `<li>${step}</li>`).join('')}
        </ul>
        <h4>Longo Prazo (3-6 meses)</h4>
        <ul>
            ${result.nextSteps.longTerm.map(step => `<li>${step}</li>`).join('')}
        </ul>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
        <p><strong>Próximos Passos:</strong></p>
        <p>1. Implemente as ações de prioridade crítica imediatamente</p>
        <p>2. Agende uma reavaliação em 3-6 meses</p>
        <p>3. Subscreva a newsletter do CiberPME para dicas regulares</p>
        <br>
        <p>© 2026 CiberPME | Para mais recursos visite: <strong>ciberpme.vercel.app</strong></p>
    </div>

    <script>
        // Auto print on load for easy PDF generation
        window.onload = function() {
            setTimeout(() => window.print(), 1000);
        }
    </script>
</body>
</html>
  `;

  // Create downloadable HTML file
  const blob = new Blob([reportContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `relatorio-ciberseguranca-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function AssessmentResult({ result, questions, answers, onReset }: AssessmentResultProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'action-plan'>('overview');
  const actionPlan = generateActionPlan(result);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "excellent": return "bg-success/10 text-success border-success/20";
      case "good": return "bg-accent/10 text-accent border-accent/20";
      case "basic": return "bg-warning/10 text-warning border-warning/20";
      case "critical": return "bg-error/10 text-error border-error/20";
      default: return "bg-bg-subtle text-text-secondary border-border";
    }
  };

  const handleDownloadReport = () => {
    downloadAssessmentReport(result, answers);
  };

  return (
    <div className="space-y-8">
      {/* Result Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-1">
              {result.score}
            </div>
            <div className="text-sm text-text-secondary">
              de {result.maxScore} pontos
            </div>
          </div>
          <div className="h-12 w-px bg-border"></div>
          <div className="text-center">
            <div className="text-4xl font-bold text-brand mb-1">
              {Math.round(result.percentage)}%
            </div>
            <div className="text-sm text-text-secondary">
              pontuação geral
            </div>
          </div>
        </div>
        <div className={`inline-block px-6 py-3 rounded-xl border font-bold ${getLevelColor(result.level)}`}>
          {result.title}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-border">
        {[
          { key: 'overview' as const, label: 'Resumo' },
          { key: 'categories' as const, label: 'Por Categoria' },
          { key: 'action-plan' as const, label: 'Plano de Ação' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium rounded-t-lg border-b-2 transition ${
              activeTab === tab.key
                ? "border-accent text-accent"
                : "border-transparent text-text-secondary hover:text-brand"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-bg-subtle border border-border">
            <h2 className="text-xl font-bold text-brand mb-3 font-display">
              Diagnóstico
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              {result.description}
            </p>
            <div className="text-sm text-text-muted">
              <strong>Avaliação baseada em:</strong> {questions.length} critérios de segurança fundamentais para PMEs
            </div>
          </div>

          <div className="p-6 rounded-xl bg-bg-subtle border border-border">
            <h2 className="text-xl font-bold text-brand mb-4 font-display">
              Prioridades Imediatas
            </h2>
            <ul className="space-y-3">
              {result.priority.map((priority, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-error text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    !
                  </span>
                  <span className="text-text-secondary">{priority}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-bg-subtle border border-border">
            <h2 className="text-xl font-bold text-brand mb-4 font-display">
              Recomendações Principais
            </h2>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="text-text-secondary text-sm leading-relaxed">
                    {recommendation}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="grid gap-6">
          {result.categoryScores.map((category) => (
            <div key={category.category} className="p-6 rounded-xl bg-bg-subtle border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-brand font-display">
                  {category.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-text-secondary">
                    {category.score}/{category.maxScore}
                  </span>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(category.level)}`}>
                    {Math.round(category.percentage)}%
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-border rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full transition-all ${
                    category.level === 'excellent' ? 'bg-success' :
                    category.level === 'good' ? 'bg-accent' :
                    category.level === 'basic' ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>

              {category.recommendations.length > 0 && (
                <div>
                  <h4 className="font-medium text-text-secondary mb-2">Recomendações:</h4>
                  <ul className="space-y-1">
                    {category.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2"></span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {category.relatedResources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="font-medium text-text-secondary mb-2 text-sm">Recursos úteis:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.relatedResources.map((resource, index) => (
                      <Link
                        key={index}
                        href={resource.url}
                        className="text-xs px-2 py-1 bg-accent/10 text-accent rounded hover:bg-accent/20 transition"
                      >
                        {resource.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'action-plan' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-error/5 border border-error/20">
            <h3 className="text-lg font-bold text-error mb-4 font-display">
              🚨 Ações Imediatas (Esta semana)
            </h3>
            <div className="space-y-3">
              {actionPlan.immediate.map((action, index) => (
                <div key={index} className="p-4 bg-bg rounded-lg border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-brand">{action.action}</h4>
                    <span className="text-xs bg-error text-white px-2 py-1 rounded">
                      {action.deadline}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {action.resources.map((resource, idx) => (
                      <Link
                        key={idx}
                        href={resource}
                        className="text-xs text-accent hover:underline"
                      >
                        Ver recursos →
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-warning/5 border border-warning/20">
            <h3 className="text-lg font-bold text-warning mb-4 font-display">
              ⏰ Médio Prazo (1-2 meses)
            </h3>
            <div className="space-y-3">
              {actionPlan.shortTerm.map((action, index) => (
                <div key={index} className="p-4 bg-bg rounded-lg border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-brand">{action.action}</h4>
                    <span className="text-xs bg-warning text-white px-2 py-1 rounded">
                      {action.deadline}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {action.resources.map((resource, idx) => (
                      <Link
                        key={idx}
                        href={resource}
                        className="text-xs text-accent hover:underline"
                      >
                        Ver recursos →
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
            <h3 className="text-lg font-bold text-accent mb-4 font-display">
              📈 Longo Prazo (3-6 meses)
            </h3>
            <div className="space-y-3">
              {actionPlan.longTerm.map((action, index) => (
                <div key={index} className="p-4 bg-bg rounded-lg border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-brand">{action.action}</h4>
                    <span className="text-xs bg-accent text-white px-2 py-1 rounded">
                      {action.deadline}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {action.resources.map((resource, idx) => (
                      <Link
                        key={idx}
                        href={resource}
                        className="text-xs text-accent hover:underline"
                      >
                        Ver recursos →
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <div id="newsletter" className="p-8 rounded-xl bg-accent-light border border-accent/20 text-center">
        <h2 className="text-xl font-bold text-brand mb-4 font-display">
          Continue a Melhorar a Segurança da Sua Empresa
        </h2>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Subscreva a newsletter e receba dicas práticas, alertas de segurança e guias para implementar estas recomendações.
        </p>
        <NewsletterForm />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onReset}
          className="px-6 py-3 border border-border text-brand rounded-lg font-medium hover:border-accent transition"
        >
          Repetir Avaliação
        </button>
        <button
          onClick={handleDownloadReport}
          className="px-6 py-3 border border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-white transition"
        >
          📄 Descarregar Relatório
        </button>
        <Link
          href="/ferramentas"
          className="px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition text-center"
        >
          Ver Ferramentas Práticas
        </Link>
      </div>
    </div>
  );
}