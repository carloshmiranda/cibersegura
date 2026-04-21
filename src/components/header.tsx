"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "./search";

interface HeaderProps {
  currentPath?: string;
}

const COMPANY_NAME = "CiberPME";

export default function Header({ currentPath }: HeaderProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header>
      <nav className="max-w-5xl mx-auto px-6 py-4">
        {/* Main navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold text-brand"
            aria-current={currentPath === "/" ? "page" : undefined}
          >
            {COMPANY_NAME}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Navigation Links */}
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

            {/* Desktop Search */}
            <div className="ml-4">
              <Search placeholder="Procurar artigos..." className="w-64" />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Search Toggle */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 text-text-secondary hover:text-brand transition"
              aria-label="Pesquisar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>

            {/* Mobile Menu Links */}
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <Link
                href="/blog"
                className={currentPath === "/blog" ? "text-brand font-bold" : "hover:text-brand transition"}
              >
                Blog
              </Link>
              <Link
                href="/recursos"
                className={currentPath === "/recursos" ? "text-brand font-bold" : "hover:text-brand transition"}
              >
                Recursos
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {showMobileSearch && (
          <div className="lg:hidden mt-4 pt-4 border-t border-border">
            <Search
              placeholder="Procurar artigos..."
              className="w-full"
              fullWidth
            />
          </div>
        )}
      </nav>
    </header>
  );
}