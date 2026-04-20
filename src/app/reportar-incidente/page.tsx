"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NewsletterForm } from "../newsletter-form";

interface Question {
  id: string;
  question: string;
  options: {
    value: "yes" | "no" | "unsure";
    label: string;
    description?: string;
  }[];
  weight: number; // Higher weight = more likely to be reportable
}

interface IncidentClassification {
  level: "critical" | "major" | "minor" | "non-reportable";
  title: string;
  description: string;
  timeline: string;
  actions: string[];
  contacts: string[];
}

const questions: Question[] = [
  {
    id: "data-access",
    question: "Houve acesso não autorizado aos sistemas da empresa ou dados de clientes?",
    options: [
      { value: "yes", label: "Sim, confirmado", description: "Evidência clara de acesso não autorizado" },
      { value: "unsure", label: "Possível", description: "Suspeita mas não confirmado" },
      { value: "no", label: "Não", description: "Sem evidência de acesso não autorizado" },
    ],
    weight: 10,
  },
  {
    id: "data-theft",
    question: "Foram roubados ou expostos dados pessoais de clientes, colaboradores ou parceiros?",
    options: [
      { value: "yes", label: "Sim", description: "Dados pessoais foram comprometidos" },
      { value: "unsure", label: "Possível", description: "Não temos certeza se dados foram expostos" },
      { value: "no", label: "Não", description: "Nenhum dado pessoal foi afetado" },
    ],
    weight: 9,
  },
  {
    id: "service-disruption",
    question: "Os serviços críticos da empresa estão indisponíveis ou gravemente afetados?",
    options: [
      { value: "yes", label: "Sim", description: "Sistemas principais em baixo ou muito lentos" },
      { value: "unsure", label: "Parcial", description: "Alguns serviços afetados" },
      { value: "no", label: "Não", description: "Serviços funcionam normalmente" },
    ],
    weight: 7,
  },
  {
    id: "malware",
    question: "Foi detetado malware, ransomware ou software malicioso nos sistemas?",
    options: [
      { value: "yes", label: "Sim", description: "Confirmada presença de malware" },
      { value: "unsure", label: "Suspeita", description: "Comportamento suspeito mas não confirmado" },
      { value: "no", label: "Não", description: "Sem deteção de malware" },
    ],
    weight: 8,
  },
  {
    id: "financial-loss",
    question: "O incidente resultou ou pode resultar em perda financeira direta?",
    options: [
      { value: "yes", label: "Sim", description: "Perdas financeiras confirmadas ou iminentes" },
      { value: "unsure", label: "Possível", description: "Risco de perdas mas não confirmado" },
      { value: "no", label: "Não", description: "Sem impacto financeiro esperado" },
    ],
    weight: 6,
  },
];

function classifyIncident(answers: Record<string, "yes" | "no" | "unsure">): IncidentClassification {
  const score = questions.reduce((total, q) => {
    const answer = answers[q.id];
    if (answer === "yes") return total + q.weight;
    if (answer === "unsure") return total + (q.weight * 0.5);
    return total;
  }, 0);

  if (score >= 25) {
    return {
      level: "critical",
      title: "Incidente Crítico — Reportar Imediatamente",
      description: "Este incidente deve ser reportado ao CNCS imediatamente. Há evidência de comprometimento significativo que pode afetar dados pessoais ou serviços essenciais.",
      timeline: "IMEDIATO (até 4 horas)",
      actions: [
        "Contactar CNCS imediatamente através do portal de incidentes",
        "Documentar todos os detalhes conhecidos do incidente",
        "Isolar sistemas afetados se seguro fazê-lo",
        "Contactar CERT.PT para assistência técnica",
        "Notificar stakeholders internos críticos",
        "Preparar comunicação externa se necessário",
      ],
      contacts: ["CNCS", "CERT.PT", "CNPD (se dados pessoais)", "Polícia Judiciária (se crime)"],
    };
  } else if (score >= 15) {
    return {
      level: "major",
      title: "Incidente Major — Reportar em 24h",
      description: "Este incidente tem impacto significativo e deve ser reportado ao CNCS dentro de 24 horas. Requer ação imediata para contenção.",
      timeline: "24 HORAS",
      actions: [
        "Reportar ao CNCS através do portal oficial",
        "Documentar chronologia do incidente",
        "Implementar medidas de contenção",
        "Avaliar impacto em dados pessoais",
        "Contactar fornecedores afetados se aplicável",
        "Começar processo de recovery",
      ],
      contacts: ["CNCS", "CERT.PT", "CNPD (se aplicável)"],
    };
  } else if (score >= 8) {
    return {
      level: "minor",
      title: "Incidente Menor — Reportar em 72h",
      description: "Este incidente deve ser reportado ao CNCS dentro de 72 horas conforme obrigação legal, mas não representa risco imediato crítico.",
      timeline: "72 HORAS",
      actions: [
        "Reportar ao CNCS dentro do prazo legal",
        "Documentar o incidente para análise",
        "Verificar se existem vulnerabilidades similares",
        "Implementar melhorias preventivas",
        "Comunicar internamente lições aprendidas",
      ],
      contacts: ["CNCS"],
    };
  } else {
    return {
      level: "non-reportable",
      title: "Provavelmente Não Reportável",
      description: "Com base nas respostas, este incidente pode não necessitar de reporte ao CNCS, mas deve ser documentado internamente.",
      timeline: "SEM PRAZO OBRIGATÓRIO",
      actions: [
        "Documentar o incidente internamente",
        "Verificar se não há impactos ocultos",
        "Implementar melhorias preventivas",
        "Considerar formação adicional da equipa",
        "Monitorizar situações similares",
      ],
      contacts: ["Documentação interna apenas"],
    };
  }
}

export default function ReportarIncidentePage() {
  const [currentStep, setCurrentStep] = useState<"assessment" | "questions" | "classification" | "reporting">("assessment");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "yes" | "no" | "unsure">>({});
  const [classification, setClassification] = useState<IncidentClassification | null>(null);

  const handleStartQuestions = () => {
    setCurrentStep("questions");
  };

  const handleAnswer = (questionId: string, value: "yes" | "no" | "unsure") => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete
      const result = classifyIncident(newAnswers);
      setClassification(result);
      setCurrentStep("classification");
    }
  };

  const resetAssessment = () => {
    setCurrentStep("assessment");
    setCurrentQuestion(0);
    setAnswers({});
    setClassification(null);
  };

  const goToReporting = () => {
    setCurrentStep("reporting");
  };

  if (currentStep === "reporting") {
    return (
      <div className="min-h-screen bg-bg">
        <Header currentPath="/reportar-incidente" />

        <main id="main-content" className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 font-display">
              Como Reportar ao CNCS
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Guia passo-a-passo para reportar incidentes de cibersegurança ao Centro Nacional de Cibersegurança.
            </p>
          </div>

          {/* Reporting Steps */}
          <div className="space-y-8">
            <div className="p-8 rounded-xl bg-error-bg border border-error/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-error text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand mb-3">
                    Portal Oficial do CNCS
                  </h2>
                  <p className="text-text-secondary mb-4">
                    Aceda ao portal oficial do CNCS para reportar o incidente:
                  </p>
                  <a
                    href="https://incidentes.cncs.gov.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg font-bold hover:opacity-90 transition"
                  >
                    Portal de Incidentes CNCS
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-xl bg-bg-subtle border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand mb-3">
                    Informação Necessária
                  </h2>
                  <p className="text-text-secondary mb-4">
                    Prepare os seguintes dados antes de preencher o formulário:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Data e hora do incidente (quando foi detetado)",
                      "Descrição detalhada do que aconteceu",
                      "Sistemas ou dados afetados",
                      "Ações de contenção já implementadas",
                      "Impacto estimado no negócio",
                      "Contacto da pessoa responsável pelo reporte",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-text-secondary">
                        <svg aria-hidden="true" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-xl bg-bg-subtle border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand mb-3">
                    Contactos de Emergência
                  </h2>
                  <p className="text-text-secondary mb-4">
                    Para incidentes críticos, contacte também:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-accent-light">
                      <h4 className="font-bold text-brand mb-2">CERT.PT</h4>
                      <p className="text-sm text-text-secondary mb-2">Assistência técnica especializada</p>
                      <p className="text-sm font-mono">cert@cert.pt</p>
                    </div>
                    <div className="p-4 rounded-lg bg-accent-light">
                      <h4 className="font-bold text-brand mb-2">Linha SOS</h4>
                      <p className="text-sm text-text-secondary mb-2">Para incidentes críticos urgentes</p>
                      <p className="text-sm font-mono">+351 213 126 400</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-xl bg-warning-bg border border-warning/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-warning text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  4
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand mb-3">
                    Documentação Interna
                  </h2>
                  <p className="text-text-secondary mb-4">
                    Mantenha registos detalhados do incidente e ações tomadas:
                  </p>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• Timeline completo dos eventos</li>
                    <li>• Screenshots ou evidências técnicas</li>
                    <li>• Comunicações internas sobre o incidente</li>
                    <li>• Medidas de recuperação implementadas</li>
                    <li>• Lições aprendidas para futuras melhorias</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button
              onClick={resetAssessment}
              className="px-6 py-3 border border-border text-brand rounded-lg font-medium hover:border-accent transition"
            >
              ← Voltar ao Início
            </button>
            <Link
              href="/blog/plano-resposta-incidentes-ciberseguranca-pme"
              className="px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition text-center"
            >
              Ler Guia Completo de Resposta
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (currentStep === "classification" && classification) {
    return (
      <div className="min-h-screen bg-bg">
        <Header currentPath="/reportar-incidente" />

        <main id="main-content" className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 font-display">
              Classificação do Incidente
            </h1>
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg font-bold text-lg ${
              classification.level === "critical"
                ? "bg-error text-white"
                : classification.level === "major"
                ? "bg-warning text-white"
                : classification.level === "minor"
                ? "bg-accent/10 text-accent"
                : "bg-success/10 text-success"
            }`}>
              {classification.level === "critical" && (
                <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
              )}
              {classification.title}
            </div>
          </div>

          <div className="space-y-8">
            {/* Description */}
            <div className="p-6 rounded-xl bg-bg-subtle border border-border">
              <h2 className="text-xl font-bold text-brand mb-3 font-display">
                Avaliação
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                {classification.description}
              </p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
                classification.level === "critical" || classification.level === "major"
                  ? "bg-error/10 text-error"
                  : classification.level === "minor"
                  ? "bg-warning/10 text-warning"
                  : "bg-success/10 text-success"
              }`}>
                <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Prazo: {classification.timeline}
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 rounded-xl bg-bg-subtle border border-border">
              <h2 className="text-xl font-bold text-brand mb-4 font-display">
                Ações Recomendadas
              </h2>
              <ol className="space-y-3">
                {classification.actions.map((action, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-text-secondary">{action}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Contacts */}
            <div className="p-6 rounded-xl bg-bg-subtle border border-border">
              <h2 className="text-xl font-bold text-brand mb-4 font-display">
                Entidades a Contactar
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {classification.contacts.map((contact, index) => (
                  <div key={index} className="p-4 rounded-lg bg-accent-light border border-accent/20">
                    <span className="text-brand font-medium">{contact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div id="newsletter" className="p-8 rounded-xl bg-accent-light border border-accent/20 text-center">
              <h2 className="text-xl font-bold text-brand mb-4 font-display">
                Mantenha-se Preparado
              </h2>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                Subscreva a nossa newsletter e receba guias práticos para prevenir
                e responder a incidentes de cibersegurança.
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
              {classification.level !== "non-reportable" && (
                <button
                  onClick={goToReporting}
                  className="px-6 py-3 bg-brand text-white rounded-lg font-bold hover:opacity-90 transition"
                >
                  Como Reportar ao CNCS
                </button>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (currentStep === "questions") {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-bg">
        <Header currentPath="/reportar-incidente" />

        <main id="main-content" className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 font-display">
              Avaliação do Incidente
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Responda às perguntas para determinar se o incidente deve ser reportado ao CNCS.
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
              {question.question}
            </h2>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className="w-full p-4 text-left rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition group"
                >
                  <div className="font-medium text-brand group-hover:text-accent mb-1">
                    {option.label}
                  </div>
                  {option.description && (
                    <p className="text-sm text-text-muted">
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

  // Assessment landing page
  return (
    <div className="min-h-screen bg-bg">
      <Header currentPath="/reportar-incidente" />

      <main id="main-content" className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-brand transition">
            Início
          </Link>
          <span>/</span>
          <span className="text-text-secondary">Reportar Incidente</span>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand mb-6 text-balance font-display tracking-tight">
            Reportar Incidente de Cibersegurança
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto text-pretty">
            Guia interativo para determinar se deve reportar um incidente de cibersegurança
            ao CNCS e como fazê-lo dentro dos prazos legais obrigatórios.
          </p>
        </div>

        {/* Legal Requirement Warning */}
        <div className="mb-12 p-8 rounded-xl bg-error-bg border border-error/20">
          <div className="flex items-start gap-4">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-error flex-shrink-0 mt-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <div>
              <h2 className="text-xl font-bold text-brand mb-3">
                Obrigação Legal em Portugal
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Desde a entrada em vigor do Decreto-Lei n.º 125/2025 (transposição da Diretiva NIS2),
                as empresas portuguesas têm <strong>obrigação legal</strong> de reportar incidentes
                de cibersegurança ao CNCS dentro de <strong>72 horas</strong>.
                O não cumprimento pode resultar em coimas até <strong>€10 milhões</strong> para entidades essenciais.
              </p>
            </div>
          </div>
        </div>

        {/* What this tool does */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-xl bg-bg-subtle border border-border">
            <div className="w-12 h-12 bg-accent text-white rounded-lg flex items-center justify-center mb-4">
              <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-brand mb-3">O que faz esta ferramenta?</h3>
            <p className="text-text-secondary text-sm">
              Avalia a gravidade do seu incidente através de 5 perguntas específicas
              e determina se deve ser reportado ao CNCS, com que urgência,
              e quais os próximos passos recomendados.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-bg-subtle border border-border">
            <div className="w-12 h-12 bg-success text-white rounded-lg flex items-center justify-center mb-4">
              <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-brand mb-3">Quanto tempo demora?</h3>
            <p className="text-text-secondary text-sm">
              A avaliação demora apenas <strong>3-5 minutos</strong> e fornece
              orientações específicas sobre prazos, entidades a contactar,
              e um guia passo-a-passo para reportar ao CNCS.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-brand mb-6 text-center font-display">
            Exemplos de Incidentes Reportáveis
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border">
              <h3 className="font-bold text-brand mb-3 text-red-600">🔴 Críticos (Imediato)</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Ransomware ativo nos sistemas</li>
                <li>• Fuga de dados de clientes confirmada</li>
                <li>• Sistemas críticos completamente indisponíveis</li>
                <li>• Acesso não autorizado a dados financeiros</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border">
              <h3 className="font-bold text-brand mb-3 text-orange-600">🟡 Menores (72h)</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Tentativas de phishing direcionadas</li>
                <li>• Malware detetado e removido</li>
                <li>• Acesso suspeito a emails corporativos</li>
                <li>• Vulnerabilidades críticas descobertas</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={handleStartQuestions}
            className="px-8 py-4 bg-brand text-white rounded-lg font-bold text-lg hover:opacity-90 transition"
          >
            Iniciar Avaliação do Incidente
          </button>
          <p className="text-sm text-text-muted mt-4">
            Ferramenta gratuita • 5 perguntas • Orientação específica para Portugal
          </p>
        </div>

        {/* Resources */}
        <div className="mt-20 p-8 rounded-xl bg-bg-subtle">
          <h2 className="text-xl font-bold text-brand mb-6 text-center font-display">
            Recursos Relacionados
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/blog/plano-resposta-incidentes-ciberseguranca-pme"
              className="p-4 rounded-lg border border-border hover:border-accent transition group"
            >
              <h3 className="font-medium text-brand group-hover:text-accent transition mb-2">
                Plano de Resposta a Incidentes
              </h3>
              <p className="text-sm text-text-secondary">
                Como criar um plano completo de resposta a incidentes para a sua PME.
              </p>
            </Link>
            <Link
              href="/blog/nis2-decreto-lei-125-2025-obrigacoes-pme"
              className="p-4 rounded-lg border border-border hover:border-accent transition group"
            >
              <h3 className="font-medium text-brand group-hover:text-accent transition mb-2">
                Guia NIS2 para PMEs
              </h3>
              <p className="text-sm text-text-secondary">
                Entenda as novas obrigações legais de cibersegurança em Portugal.
              </p>
            </Link>
            <Link
              href="/recursos"
              className="p-4 rounded-lg border border-border hover:border-accent transition group"
            >
              <h3 className="font-medium text-brand group-hover:text-accent transition mb-2">
                Contactos Oficiais
              </h3>
              <p className="text-sm text-text-secondary">
                CNCS, CERT.PT, CNPD e outras entidades para reportar incidentes.
              </p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}