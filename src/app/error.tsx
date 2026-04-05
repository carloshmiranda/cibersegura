'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-xl font-bold text-brand mb-4">Algo correu mal</h1>
        <p className="text-text-secondary mb-8">
          Ocorreu um erro inesperado. Por favor, tente novamente.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
