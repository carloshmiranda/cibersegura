import Link from "next/link";

interface HeaderProps {
  currentPath?: string;
}

const COMPANY_NAME = "CiberPME";

export default function Header({ currentPath }: HeaderProps) {
  return (
    <header>
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold text-brand"
          aria-current={currentPath === "/" ? "page" : undefined}
        >
          {COMPANY_NAME}
        </Link>
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <Link
            href="/avaliacao-seguranca"
            className={currentPath === "/avaliacao-seguranca" ? "text-brand font-bold" : "hover:text-brand transition"}
            aria-current={currentPath === "/avaliacao-seguranca" ? "page" : undefined}
          >
            Avaliação
          </Link>
          <Link
            href="/reportar-incidente"
            className={currentPath === "/reportar-incidente" ? "text-brand font-bold" : "hover:text-brand transition"}
            aria-current={currentPath === "/reportar-incidente" ? "page" : undefined}
          >
            Reportar Incidente
          </Link>
          <Link
            href="/recursos"
            className={currentPath === "/recursos" ? "text-brand font-bold" : "hover:text-brand transition"}
            aria-current={currentPath === "/recursos" ? "page" : undefined}
          >
            Recursos
          </Link>
          <Link
            href="/blog"
            className={currentPath === "/blog" ? "text-brand font-bold" : "hover:text-brand transition"}
            aria-current={currentPath === "/blog" ? "page" : undefined}
          >
            Blog
          </Link>
          <Link
            href="/ferramentas"
            className={currentPath === "/ferramentas" ? "text-brand font-bold" : "hover:text-brand transition"}
            aria-current={currentPath === "/ferramentas" ? "page" : undefined}
          >
            Ferramentas
          </Link>
          <Link
            href="/faq"
            className={currentPath === "/faq" ? "text-brand font-bold" : "hover:text-brand transition"}
            aria-current={currentPath === "/faq" ? "page" : undefined}
          >
            FAQ
          </Link>
          <Link
            href="/#sobre"
            className="hover:text-brand transition"
          >
            Sobre
          </Link>
        </div>
      </nav>
    </header>
  );
}