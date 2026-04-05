import Link from 'next/link';

export function NIS2Banner() {
  return (
    <div
      role="alert"
      aria-label="Alerta de conformidade NIS2"
      className="w-full border-l-4 border-warning bg-warning-bg text-warning-text"
    >
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            <span className="font-bold text-sm">NIS2 já está em vigor em Portugal.</span>
            <span className="text-sm"> Verifique se a sua empresa está em conformidade.</span>
          </div>
          <Link
            href="/blog/nis2-portugal-guia-pme"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-warning hover:opacity-90 rounded-lg transition-colors flex-shrink-0"
          >
            Guia de Conformidade
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
