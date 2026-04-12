"use client";

import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/footer";
import { AssessmentResult } from "@/components/assessment-result";
import { questions, calculateAssessmentResult, CATEGORY_INFO } from "@/lib/assessment";
import type { AssessmentResult as AssessmentResultType } from "@/lib/assessment";

export default function AvaliacaoSegurancaPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<AssessmentResultType | null>(null);

  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete
      const assessmentResult = calculateAssessmentResult(newAnswers);
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
        <header>
          <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-brand">
              CiberPME
            </Link>
            <div className="flex items-center gap-6 text-sm text-text-secondary">
              <Link href="/avaliacao-seguranca" className="text-brand font-bold" aria-current="page">
                Avaliação
              </Link>
              <Link href="/recursos" className="hover:text-brand transition">
                Recursos
              </Link>
              <Link href="/blog" className="hover:text-brand transition">
                Blog
              </Link>
              <Link href="/ferramentas" className="hover:text-brand transition">
                Ferramentas
              </Link>
              <Link href="/faq" className="hover:text-brand transition">
                FAQ
              </Link>
            </div>
          </nav>
        </header>

        <main id="main-content" className="max-w-4xl mx-auto px-6 py-12">
          {/* Result Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 font-display">
              Resultado da Avaliação de Cibersegurança
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Análise detalhada da postura de segurança da sua PME com recomendações específicas e plano de ação.
            </p>
          </div>

          <AssessmentResult
            result={result}
            questions={questions}
            answers={answers}
            onReset={resetAssessment}
          />
        </main>

        <Footer />
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <header>
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-brand">
            CiberPME
          </Link>
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <Link href="/recursos" className="hover:text-brand transition">
              Recursos
            </Link>
            <Link href="/blog" className="hover:text-brand transition">
              Blog
            </Link>
            <Link href="/ferramentas" className="hover:text-brand transition">
              Ferramentas
            </Link>
            <Link href="/faq" className="hover:text-brand transition">
              FAQ
            </Link>
          </div>
        </nav>
      </header>

      <main id="main-content" className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4 font-display">
            Avaliação de Segurança Empresarial
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-4">
            Descubra o nível de cibersegurança da sua PME com esta avaliação especializada de {questions.length} critérios fundamentais.
          </p>
          <p className="text-sm text-text-muted max-w-xl mx-auto">
            ⏱️ Tempo estimado: 5-7 minutos | 📊 Relatório detalhado com plano de ação personalizado
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

        {/* Category Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            <span>{CATEGORY_INFO[question.category].icon}</span>
            <span>{CATEGORY_INFO[question.category].name}</span>
          </div>
        </div>

        {/* Question */}
        <div className="p-8 rounded-xl bg-bg-subtle border border-border mb-8">
          <h2 className="text-xl font-bold text-brand mb-4 leading-relaxed">
            {question.text}
          </h2>
          {question.explanation && (
            <div className="mb-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
                <p className="text-sm text-text-secondary leading-relaxed">
                  <strong className="text-brand">Porquê importante:</strong> {question.explanation}
                </p>
              </div>
            </div>
          )}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, option.value)}
                className="w-full p-4 text-left rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition group relative"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                    option.value === 3 ? 'border-success bg-success/10' :
                    option.value === 2 ? 'border-accent bg-accent/10' :
                    option.value === 1 ? 'border-warning bg-warning/10' :
                    'border-error bg-error/10'
                  }`}>
                    <span className={`text-xs font-bold ${
                      option.value === 3 ? 'text-success' :
                      option.value === 2 ? 'text-accent' :
                      option.value === 1 ? 'text-warning' :
                      'text-error'
                    }`}>
                      {option.value}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-text-secondary group-hover:text-brand font-medium block">
                      {option.label}
                    </span>
                    {option.description && (
                      <p className="text-sm text-text-muted mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
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