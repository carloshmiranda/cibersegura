import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm font-medium text-text-muted mb-2">404</p>
        <h1 className="text-3xl font-bold text-brand mb-4">
          Pagina nao encontrada
        </h1>
        <p className="text-text-secondary mb-8 max-w-sm mx-auto">
          A pagina que procura nao existe ou foi movida.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition"
          >
            Pagina inicial
          </Link>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 border border-border text-text-secondary rounded-lg font-bold hover:border-accent transition"
          >
            Ver blog
          </Link>
        </div>
      </div>
    </main>
  );
}
