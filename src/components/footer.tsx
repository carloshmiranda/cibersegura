import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <span className="font-bold text-brand">CiberPME</span>
          <div className="flex gap-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-brand transition">
              Início
            </Link>
            <Link href="/blog" className="hover:text-brand transition">
              Blog
            </Link>
            <Link href="/recursos" className="hover:text-brand transition">
              Recursos
            </Link>
            <Link href="/faq" className="hover:text-brand transition">
              FAQ
            </Link>
          </div>
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} CiberPME
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4 border-t border-border">
          <Link href="/politica-privacidade" className="text-xs text-text-muted hover:text-brand transition">
            Política de Privacidade
          </Link>
          <span className="text-xs text-text-muted">
            Cibersegurança para PMEs portuguesas
          </span>
        </div>
      </div>
    </footer>
  );
}
