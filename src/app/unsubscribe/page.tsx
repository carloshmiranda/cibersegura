import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancelar Subscrição — CiberPME",
  description: "Cancelar subscrição da newsletter de cibersegurança CiberPME",
  robots: "noindex, nofollow", // Don't index unsubscribe pages
};

async function UnsubscribeContent({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const email = params?.email;

  if (!email) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-brand mb-4">
            Cancelar Subscrição
          </h1>
          <p className="text-text-secondary mb-8">
            Para cancelar a sua subscrição, utilize o link enviado por email
            ou contacte-nos diretamente.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition"
          >
            Voltar ao Site
          </Link>
        </div>
      </div>
    );
  }

  // Process unsubscribe request
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://ciberpme.vercel.app";
    const response = await fetch(`${baseUrl}/api/unsubscribe?email=${encodeURIComponent(email)}`, {
      method: "GET",
    });

    const data = await response.json();

    if (data.ok) {
      return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 text-success">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-brand mb-4">
              Subscrição Cancelada
            </h1>
            <p className="text-text-secondary mb-8">
              {data.already_unsubscribed
                ? `O email ${email} já estava dessubs-crito da nossa newsletter.`
                : `O email ${email} foi removido da nossa lista de newsletter com sucesso.`
              }
            </p>
            <p className="text-text-secondary text-sm mb-8">
              Pode continuar a aceder aos nossos artigos de cibersegurança gratuitamente no site.
            </p>
            <Link
              href="/blog"
              className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition"
            >
              Ver Artigos
            </Link>
          </div>
        </div>
      );
    } else {
      throw new Error(data.error || "Failed to unsubscribe");
    }
  } catch (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 text-error">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-brand mb-4">
            Erro no Cancelamento
          </h1>
          <p className="text-text-secondary mb-8">
            Não foi possível processar o pedido de cancelamento.
            Por favor, tente novamente ou contacte-nos diretamente.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition"
          >
            Voltar ao Site
          </Link>
        </div>
      </div>
    );
  }
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-secondary">A processar...</p>
        </div>
      </div>
    }>
      <UnsubscribeContent searchParams={searchParams} />
    </Suspense>
  );
}