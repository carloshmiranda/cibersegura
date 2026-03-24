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
      <input
        type="text"
        placeholder="O seu nome (opcional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-3 border border-border rounded-lg text-brand placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="o-seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 border border-border rounded-lg text-brand placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          {state === "loading" ? "..." : "Subscrever"}
        </button>
      </div>
      {state === "error" && (
        <p className="text-sm text-error">
          Algo correu mal. Por favor, tente novamente.
        </p>
      )}
    </form>
  );
}
