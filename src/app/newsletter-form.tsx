"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
          name: name || undefined,
          utm_source:
            typeof window !== "undefined"
              ? new URLSearchParams(window.location.search).get("utm_source") ||
                undefined
              : undefined,
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
      <div className="text-center">
        <p className="text-lg font-bold text-brand mb-2">
          Subscricao confirmada!
        </p>
        <p className="text-text-secondary">
          Obrigado. Ira receber os nossos artigos e dicas de seguranca no seu
          email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="newsletter-name" className="sr-only">Nome (opcional)</label>
      <input
        id="newsletter-name"
        type="text"
        placeholder="O seu nome (opcional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-3 border border-border rounded-lg text-brand placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <div>
        <label htmlFor="newsletter-email" className="block text-sm font-medium text-text-secondary mb-1">
          Email <span className="text-error" aria-hidden="true">*</span>
        </label>
        <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="o-seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={state === "error" ? "newsletter-error" : undefined}
          className="flex-1 px-4 py-3 border border-border rounded-lg text-brand placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-busy={state === "loading"}
          className="px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          {state === "loading" ? "A subscrever…" : "Subscrever"}
        </button>
        </div>
      </div>
      {state === "error" && (
        <p id="newsletter-error" role="alert" className="text-sm text-error">
          Não foi possível subscrever. Verifique o email e tente novamente.
        </p>
      )}
    </form>
  );
}
