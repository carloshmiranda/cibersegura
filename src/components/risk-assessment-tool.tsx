"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  id: string;
  category: "basic" | "network" | "data" | "access" | "incident" | "compliance";
  categoryLabel: string;
  text: string;
  options: {
    value: number;
    label: string;
    description: string;
  }[];
  weight: number;
}

interface RiskLevel {
  level: "baixo" | "medio" | "alto" | "critico";
  label: string;
  color: string;
  bgColor: string;
  description: string;
  recommendations: string[];
}

const questions: Question[] = [
  {
    id: "antivirus",
    category: "basic",
    categoryLabel: "Proteção Básica",
    text: "A sua empresa tem antivírus empresarial instalado em todos os computadores?",
    options: [
      { value: 5, label: "Sim, solução empresarial atualizada", description: "Antivírus empresarial com gestão centralizada" },
      { value: 3, label: "Sim, antivírus básico", description: "Antivírus individual ou gratuito" },
      { value: 1, label: "Alguns computadores apenas", description: "Proteção parcial" },
      { value: 0, label: "Não temos antivírus", description: "Sem proteção" }
    ],
    weight: 3
  },
  {
    id: "backup",
    category: "data",
    categoryLabel: "Proteção de Dados",
    text: "Com que frequência fazem backup dos dados críticos da empresa?",
    options: [
      { value: 5, label: "Backup automático diário", description: "Backup automatizado para cloud/local" },
      { value: 4, label: "Backup semanal regular", description: "Processo regular mas não diário" },
      { value: 2, label: "Backup mensal ou irregular", description: "Processo inconsistente" },
      { value: 0, label: "Não fazemos backup", description: "Sem backup dos dados" }
    ],
    weight: 4
  },
  {
    id: "passwords",
    category: "access",
    categoryLabel: "Gestão de Acesso",
    text: "Como gerem as passwords da empresa?",
    options: [
      { value: 5, label: "Gestor de passwords empresarial", description: "Solução centralizada (Bitwarden, 1Password)" },
      { value: 3, label: "Políticas de passwords fortes", description: "Regras definidas mas sem gestor" },
      { value: 1, label: "Passwords simples mas únicas", description: "Cada serviço tem password diferente" },
      { value: 0, label: "Passwords simples reutilizadas", description: "Mesma password em vários serviços" }
    ],
    weight: 3
  },
  {
    id: "mfa",
    category: "access",
    categoryLabel: "Gestão de Acesso",
    text: "Usam autenticação de dois fatores (2FA/MFA) nos serviços importantes?",
    options: [
      { value: 5, label: "MFA em todos os serviços críticos", description: "Email, banca, sistemas empresariais" },
      { value: 3, label: "MFA em alguns serviços", description: "Pelo menos email e banca" },
      { value: 1, label: "MFA apenas na banca", description: "Proteção básica" },
      { value: 0, label: "Não usamos MFA", description: "Sem autenticação adicional" }
    ],
    weight: 3
  },
  {
    id: "firewall",
    category: "network",
    categoryLabel: "Segurança da Rede",
    text: "Que proteção tem na rede da empresa?",
    options: [
      { value: 5, label: "Firewall empresarial configurado", description: "Firewall dedicado com regras personalizadas" },
      { value: 3, label: "Firewall do router básico", description: "Proteção básica do equipamento" },
      { value: 1, label: "Apenas proteção do Windows", description: "Firewall do sistema operativo" },
      { value: 0, label: "Sem proteção de rede", description: "Rede aberta" }
    ],
    weight: 2
  },
  {
    id: "wifi",
    category: "network",
    categoryLabel: "Segurança da Rede",
    text: "Como está configurado o WiFi da empresa?",
    options: [
      { value: 5, label: "WPA3, rede separada para convidados", description: "Configuração empresarial segura" },
      { value: 4, label: "WPA2 com password forte", description: "Boa proteção básica" },
      { value: 2, label: "WPA2 com password simples", description: "Proteção básica" },
      { value: 0, label: "WiFi aberto ou WEP", description: "Configuração insegura" }
    ],
    weight: 2
  },
  {
    id: "updates",
    category: "basic",
    categoryLabel: "Proteção Básica",
    text: "Como gerem as atualizações de software?",
    options: [
      { value: 5, label: "Atualizações automáticas ativadas", description: "Sistemas e software sempre atualizados" },
      { value: 3, label: "Atualizações manuais regulares", description: "Processo manual mas consistente" },
      { value: 1, label: "Atualizações ocasionais", description: "Irregular, quando lembram" },
      { value: 0, label: "Raramente atualizamos", description: "Software desatualizado" }
    ],
    weight: 2
  },
  {
    id: "training",
    category: "incident",
    categoryLabel: "Resposta a Incidentes",
    text: "Os colaboradores recebem formação sobre cibersegurança?",
    options: [
      { value: 5, label: "Formação anual obrigatória", description: "Programa de sensibilização estruturado" },
      { value: 3, label: "Formação ocasional", description: "Algumas sessões por ano" },
      { value: 1, label: "Orientações básicas", description: "Apenas instruções básicas" },
      { value: 0, label: "Sem formação", description: "Colaboradores não têm preparação" }
    ],
    weight: 2
  },
  {
    id: "incident_plan",
    category: "incident",
    categoryLabel: "Resposta a Incidentes",
    text: "Têm um plano de resposta a incidentes de segurança?",
    options: [
      { value: 5, label: "Plano documentado e testado", description: "Procedimentos claros e praticados" },
      { value: 3, label: "Plano básico documentado", description: "Documento existe mas não testado" },
      { value: 1, label: "Sabemos a quem contactar", description: "Conhecimento informal" },
      { value: 0, label: "Não temos plano", description: "Sem preparação para incidentes" }
    ],
    weight: 3
  },
  {
    id: "rgpd",
    category: "compliance",
    categoryLabel: "Conformidade Legal",
    text: "Qual é o estado de conformidade com o RGPD?",
    options: [
      { value: 5, label: "Totalmente conforme, auditado", description: "Documentação completa e verificada" },
      { value: 4, label: "Maioritariamente conforme", description: "Principais requisitos cumpridos" },
      { value: 2, label: "Conformidade básica", description: "Alguns requisitos cumpridos" },
      { value: 0, label: "Não sabemos/não conforme", description: "Sem atenção ao RGPD" }
    ],
    weight: 2
  }
];

const riskLevels: RiskLevel[] = [
  {
    level: "baixo",
    label: "Risco Baixo",
    color: "text-success",
    bgColor: "bg-success/10",
    description: "A sua empresa tem boas práticas de cibersegurança implementadas.",
    recommendations: [
      "Manter as boas práticas atuais",
      "Fazer auditorias regulares de segurança",
      "Acompanhar novas ameaças e tecnologias",
      "Considerar certificações de segurança"
    ]
  },
  {
    level: "medio",
    label: "Risco Médio",
    color: "text-warning",
    bgColor: "bg-warning/10",
    description: "Existem algumas vulnerabilidades que devem ser corrigidas.",
    recommendations: [
      "Implementar autenticação de dois fatores",
      "Melhorar políticas de backup",
      "Formar colaboradores em cibersegurança",
      "Atualizar software e sistemas regularmente"
    ]
  },
  {
    level: "alto",
    label: "Risco Alto",
    color: "text-error",
    bgColor: "bg-error/10",
    description: "A empresa tem vulnerabilidades significativas que devem ser corrigidas urgentemente.",
    recommendations: [
      "Implementar antivírus empresarial imediatamente",
      "Configurar backup automático de dados",
      "Estabelecer políticas de passwords fortes",
      "Configurar firewall e segurança de rede",
      "Criar plano de resposta a incidentes"
    ]
  },
  {
    level: "critico",
    label: "Risco Crítico",
    color: "text-error",
    bgColor: "bg-error/20",
    description: "A empresa está extremamente vulnerável a ataques cibernéticos.",
    recommendations: [
      "URGENTE: Implementar proteção básica (antivírus, firewall)",
      "Fazer backup imediato de todos os dados críticos",
      "Contratar consultoria em cibersegurança",
      "Implementar todas as medidas básicas de segurança",
      "Formar toda a equipa em segurança informática",
      "Considerar seguro de cibercrimes"
    ]
  }
];

export function RiskAssessmentTool() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateRisk = () => {
    const totalWeightedScore = Object.entries(answers).reduce((sum, [questionId, score]) => {
      const question = questions.find(q => q.id === questionId);
      return sum + (score * (question?.weight || 1));
    }, 0);

    const maxPossibleScore = questions.reduce((sum, question) => {
      return sum + (5 * question.weight);
    }, 0);

    const riskPercentage = (totalWeightedScore / maxPossibleScore) * 100;

    if (riskPercentage >= 80) return riskLevels.find(r => r.level === "baixo")!;
    if (riskPercentage >= 60) return riskLevels.find(r => r.level === "medio")!;
    if (riskPercentage >= 30) return riskLevels.find(r => r.level === "alto")!;
    return riskLevels.find(r => r.level === "critico")!;
  };

  const restartAssessment = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const riskLevel = calculateRisk();
    const score = Math.round(((Object.values(answers).reduce((a, b) => a + b, 0)) / (questions.length * 5)) * 100);

    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl ${riskLevel.bgColor} ${riskLevel.color} font-bold text-lg`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {riskLevel.label}
          </div>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            Pontuação: {score}/100 | {riskLevel.description}
          </p>
        </div>

        {/* Recommendations */}
        <div className="bg-bg-subtle rounded-xl p-6">
          <h3 className="text-xl font-bold text-brand mb-4 font-display">
            Recomendações Prioritárias
          </h3>
          <ul className="space-y-3">
            {riskLevel.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-text-secondary">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Category Breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          {["basic", "network", "data", "access", "incident", "compliance"].map(category => {
            const categoryQuestions = questions.filter(q => q.category === category);
            const categoryScore = categoryQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
            const maxCategoryScore = categoryQuestions.length * 5;
            const categoryPercentage = Math.round((categoryScore / maxCategoryScore) * 100);

            return (
              <div key={category} className="p-4 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-brand">{categoryQuestions[0]?.categoryLabel}</span>
                  <span className="text-sm font-bold text-accent">{categoryPercentage}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="bg-accent rounded-full h-2 transition-all duration-300"
                    style={{ width: `${categoryPercentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={restartAssessment}
            className="px-6 py-3 border border-border text-brand rounded-lg font-medium hover:border-accent transition"
          >
            Fazer Nova Avaliação
          </button>
          <Link
            href="/recursos"
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition text-center"
          >
            Ver Recursos Recomendados
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const hasAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Pergunta {currentQuestionIndex + 1} de {questions.length}</span>
          <span>{Math.round(progress)}% completo</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-accent rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-bg-subtle rounded-xl p-6">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium text-accent bg-accent-light rounded-full mb-4">
            {currentQuestion.categoryLabel}
          </span>
          <h2 className="text-xl font-bold text-brand font-display">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className={`block p-4 rounded-lg border cursor-pointer transition ${
                answers[currentQuestion.id] === option.value
                  ? 'border-accent bg-accent-light'
                  : 'border-border hover:border-accent'
              }`}
            >
              <input
                type="radio"
                name={currentQuestion.id}
                value={option.value}
                onChange={() => handleAnswer(currentQuestion.id, option.value)}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 mt-0.5 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-accent bg-accent'
                    : 'border-border'
                }`}>
                  {answers[currentQuestion.id] === option.value && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-brand">{option.label}</div>
                  <div className="text-sm text-text-secondary">{option.description}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 border border-border text-brand rounded-lg font-medium hover:border-accent transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          onClick={nextQuestion}
          disabled={!hasAnswered}
          className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Ver Resultados' : 'Próxima'}
        </button>
      </div>
    </div>
  );
}