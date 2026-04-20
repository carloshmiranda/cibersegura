"use client";

import { useState } from "react";

interface NewsletterCaptureProps {
  placement: "inline" | "footer";
  articleTitle?: string;
}

export function NewsletterCapture({ placement, articleTitle }: NewsletterCaptureProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          utm_source: `blog-${placement}`,
          utm_medium: "newsletter-capture",
          utm_campaign: "blog-article",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="text-center p-6 bg-accent-light border border-accent rounded-lg">
        <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-accent mb-2">
          Email subscrito com sucesso!
        </p>
        <p className="text-text-secondary">
          Irá receber os nossos artigos de cibersegurança e dicas práticas para PMEs diretamente no seu email.
        </p>
      </div>
    );
  }

  return (
    <div className={`
      ${placement === "inline"
        ? "my-8 p-6 bg-accent-light border border-accent rounded-lg"
        : "mt-12 p-8 bg-bg-subtle border border-border rounded-xl"
      }
    `}>
      <div className="text-center mb-4">
        {placement === "inline" ? (
          <>
            <h3 className="text-xl font-bold text-brand mb-2">
              💡 Receba Mais Artigos Como Este
            </h3>
            <p className="text-text-secondary">
              Subscreva a nossa newsletter e receba dicas práticas de cibersegurança para PMEs,
              diretamente no seu email.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-brand mb-2">
              📧 Newsletter Semanal
            </h3>
            <p className="text-text-secondary">
              Artigos de cibersegurança, alertas de segurança e recursos práticos
              para manter a sua empresa protegida. Sem spam, apenas conteúdo útil.
            </p>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor={`newsletter-email-${placement}`} className="sr-only">
              Email
            </label>
            <input
              id={`newsletter-email-${placement}`}
              type="email"
              required
              placeholder="o-seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby={state === "error" ? `newsletter-error-${placement}` : undefined}
              className="w-full px-4 py-3 border border-border rounded-lg text-brand placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>
          <button
            type="submit"
            disabled={state === "loading"}
            aria-busy={state === "loading"}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition disabled:opacity-50 whitespace-nowrap"
          >
            {state === "loading" ? "A subscrever…" : "Subscrever"}
          </button>
        </div>
        {state === "error" && (
          <p id={`newsletter-error-${placement}`} role="alert" className="text-sm text-error mt-3 text-center">
            Não foi possível subscrever. Verifique o email e tente novamente.
          </p>
        )}
        <p className="text-xs text-text-muted mt-3 text-center">
          Sem spam. Pode cancelar a subscrição a qualquer momento.
        </p>
      </form>
    </div>
  );
}