"use client";

import Link from "next/link";
import { useState } from "react";
import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NewsletterForm } from "../newsletter-form";

// Since this is a client component, we can't export metadata directly
// The parent layout will handle the meta tags

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

const questions: Question[] = [
  {
    id: "antivirus",
    text: "A sua empresa utiliza software antivírus atualizado em todos os computadores?",
    category: "basic",
    options: [
      { value: 3, label: "Sim, em todos os dispositivos e sempre atualizado" },
      { value: 2, label: "Sim, mas nem sempre atualizado" },
      { value: 1, label: "Apenas em alguns computadores" },
      { value: 0, label: "Não temos antivírus" },
    ],
  },
  {
    id: "backup",
    text: "Com que frequência fazem backup dos dados empresariais críticos?",
    category: "data",
    options: [
      { value: 3, label: "Diariamente e testamos a recuperação" },
      { value: 2, label: "Semanalmente" },
      { value: 1, label: "Mensalmente ou menos" },
      { value: 0, label: "Não fazemos backups regulares" },
    ],
  },
  {
    id: "passwords",
    text: "Como gerem as passwords na empresa?",
    category: "access",
    options: [
      { value: 3, label: "Usamos um gestor de passwords empresarial" },
      { value: 2, label: "Temos políticas de passwords fortes" },
      { value: 1, label: "Cada pessoa gere as suas passwords" },
      { value: 0, label: "Usamos passwords simples ou partilhadas" },
    ],
  },
  {
    id: "mfa",
    text: "Utilizam autenticação de dois fatores (2FA) nos serviços principais?",
    category: "access",
    options: [
      { value: 3, label: "Sim, em todos os serviços críticos" },
      { value: 2, label: "Em alguns serviços importantes" },
      { value: 1, label: "Apenas no email" },
      { value: 0, label: "Não usamos 2FA" },
    ],
  },
  {
    id: "updates",
    text: "Com que frequência atualizam o sistema operativo e software?",
    category: "basic",
    options: [
      { value: 3, label: "Automaticamente ou dentro de 1 semana" },
      { value: 2, label: "Mensalmente" },
      { value: 1, label: "Quando nos lembramos" },
      { value: 0, label: "Raramente atualizamos" },
    ],
  },
  {
    id: "wifi",
    text: "Como está configurada a rede Wi-Fi da empresa?",
    category: "network",
    options: [
      { value: 3, label: "WPA3 com password forte e rede separada para visitantes" },
      { value: 2, label: "WPA2 com password forte" },
      { value: 1, label: "Password simples ou WEP" },
      { value: 0, label: "Wi-Fi aberto ou não sabemos" },
    ],
  },
  {
    id: "training",
    text: "Os colaboradores recebem formação sobre cibersegurança?",
    category: "basic",
    options: [
      { value: 3, label: "Formação regular e testes de phishing" },
      { value: 2, label: "Formação anual" },
      { value: 1, label: "Formação ocasional" },
      { value: 0, label: "Sem formação específica" },
    ],
  },
  {
    id: "incident-plan",
    text: "Têm um plano para responder a incidentes de cibersegurança?",
    category: "incident",
    options: [
      { value: 3, label: "Plano detalhado e testado regularmente" },
      { value: 2, label: "Plano básico documentado" },
      { value: 1, label: "Sabemos quem contactar em caso de problema" },
      { value: 0, label: "Não temos plano" },
    ],
  },
  {
    id: "data-access",
    text: "Como controlam o acesso aos dados sensíveis?",
    category: "data",
    options: [
      { value: 3, label: "Acesso baseado em funções com revisão regular" },
      { value: 2, label: "Permissões definidas por departamento" },
      { value: 1, label: "Alguns controlos básicos" },
      { value: 0, label: "Todos têm acesso a quase tudo" },
    ],
  },
  {
    id: "remote-access",
    text: "Como acedem aos sistemas da empresa remotamente?",
    category: "network",
    options: [
      { value: 3, label: "VPN empresarial com autenticação forte" },
      { value: 2, label: "Acesso direto com passwords fortes" },
      { value: 1, label: "Acesso direto com controlos básicos" },
      { value: 0, label: "Acesso aberto pela internet" },
    ],
  },
];

interface AssessmentResult {
  score: number;
  maxScore: number;
  level: "critical" | "basic" | "good" | "excellent";
  title: string;
  description: string;
  recommendations: string[];
  priority: string[];
}

function calculateResult(answers: Record<string, number>): AssessmentResult {
  const score = Object.values(answers).reduce((sum, value) => sum + value, 0);
  const maxScore = questions.length * 3;
  const percentage = (score / maxScore) * 100;

  let level: AssessmentResult["level"];
  let title: string;
  let description: string;
  let recommendations: string[];
  let priority: string[];

  if (percentage >= 85) {
    level = "excellent";
    title = "Excelente - Segurança Robusta";
    description = "A sua empresa tem uma postura de segurança muito forte. Continue a manter as boas práticas e mantenha-se atualizado sobre novas ameaças.";
    recommendations = [
      "Realize auditorias de segurança trimestrais",
      "Implemente monitorização avançada de ameaças",
      "Considere certificações como ISO 27001",
      "Mantenha formação contínua da equipa",
    ];
    priority = [
      "Manter o nível atual de segurança",
      "Evoluir para práticas mais avançadas",
    ];
  } else if (percentage >= 65) {
    level = "good";
    title = "Bom - Segurança Adequada";
    description = "A sua empresa tem uma base sólida de segurança, mas há algumas áreas que podem ser melhoradas para reduzir ainda mais os riscos.";
    recommendations = [
      "Implemente autenticação de dois fatores em todos os serviços",
      "Estabeleça um plano formal de resposta a incidentes",
      "Melhore a formação de colaboradores",
      "Considere um gestor de passwords empresarial",
    ];
    priority = [
      "Fortalecer controlos de acesso",
      "Melhorar preparação para incidentes",
    ];
  } else if (percentage >= 40) {
    level = "basic";
    title = "Básico - Necessita Melhorias";
    description = "A sua empresa tem algumas medidas de segurança, mas existem vulnerabilidades significativas que devem ser corrigidas urgentemente.";
    recommendations = [
      "Implemente backups automáticos diários",
      "Atualize todos os sistemas e software",
      "Estabeleça políticas de passwords fortes",
      "Configure firewall e antivírus em todos os dispositivos",
      "Inicie formação básica de segurança para colaboradores",
    ];
    priority = [
      "Proteção básica de dados (backups)",
      "Segurança de endpoints (antivírus/atualizações)",
      "Gestão de passwords",
    ];
  } else {
    level = "critical";
    title = "Crítico - Ação Urgente Necessária";
    description = "A sua empresa está exposta a riscos significativos. É essencial implementar medidas básicas de segurança imediatamente.";
    recommendations = [
      "URGENTE: Implemente backups imediatos dos dados críticos",
      "Instale e configure antivírus em todos os computadores",
      "Mude todas as passwords para versões seguras",
      "Ative atualizações automáticas de segurança",
      "Considere contratar um especialista em cibersegurança",
    ];
    priority = [
      "Proteção imediata contra ransomware",
      "Implementação de controlos básicos de segurança",
      "Formação urgente de colaboradores",
    ];
  }

  return {
    score,
    maxScore,
    level,
    title,
    description,
    recommendations,
    priority,
  };
}

export default function AvaliacaoSegurancaPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete
      const assessmentResult = calculateResult(newAnswers);
      setResult(assessmentResult);
      setShowResult(true);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-bg">
        {/* Navigation */}
        <Header currentPath="/avaliacao-seguranca" />

        <main id="main-content" className="max-w-3xl mx-auto px-6 py-12">
          {/* Result Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 font-display">
              Resultado da Avaliação
            </h1>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-accent">
                {result.score}/{result.maxScore}
              </span>
              <div className="h-8 w-px bg-border"></div>
              <span className={`px-4 py-2 rounded-lg font-bold ${
                result.level === "excellent"
                  ? "bg-success/10 text-success"
                  : result.level === "good"
                  ? "bg-accent/10 text-accent"
                  : result.level === "basic"
                  ? "bg-warning/10 text-warning"
                  : "bg-error/10 text-error"
              }`}>
                {result.title}
              </span>
            </div>
          </div>

          {/* Result Content */}
          <div className="space-y-8">
            <div className="p-6 rounded-xl bg-bg-subtle border border-border">
              <h2 className="text-xl font-bold text-brand mb-3 font-display">
                Diagnóstico
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-bg-subtle border border-border">
              <h2 className="text-xl font-bold text-brand mb-4 font-display">
                Prioridades Imediatas
              </h2>
              <ul className="space-y-2">
                {result.priority.map((priority, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-text-secondary">{priority}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-bg-subtle border border-border">
              <h2 className="text-xl font-bold text-brand mb-4 font-display">
                Recomendações Específicas
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

            {/* Newsletter CTA */}
            <div id="newsletter" className="p-8 rounded-xl bg-accent-light border border-accent/20 text-center">
              <h2 className="text-xl font-bold text-brand mb-4 font-display">
                Receba Mais Dicas Personalizadas
              </h2>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                Subscreva a nossa newsletter e receba guias práticos para implementar
                estas recomendações na sua empresa.
              </p>
              <NewsletterForm />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetAssessment}
                className="px-6 py-3 border border-border text-brand rounded-lg font-medium hover:border-accent transition"
              >
                Repetir Avaliação
              </button>
              <Link
                href="/ferramentas"
                className="px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition text-center"
              >
                Ver Ferramentas Práticas
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <Header currentPath="/avaliacao-seguranca" />

      <main id="main-content" className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 font-display">
            Avaliação de Segurança
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Descubra rapidamente o nível de cibersegurança da sua PME com 10 perguntas simples.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm text-text-secondary">
              {Math.round(progress)}% completo
            </span>
          </div>
          <div className="w-full bg-bg-subtle rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="p-8 rounded-xl bg-bg-subtle border border-border mb-8">
          <h2 className="text-xl font-bold text-brand mb-6 leading-relaxed">
            {question.text}
          </h2>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, option.value)}
                className="w-full p-4 text-left rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition group"
              >
                <span className="text-text-secondary group-hover:text-brand">
                  {option.label}
                </span>
                {option.description && (
                  <p className="text-sm text-text-muted mt-1">
                    {option.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-sm text-text-secondary hover:text-brand transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>

          <Link
            href="/"
            className="text-sm text-text-muted hover:text-brand transition"
          >
            Sair da avaliação
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}