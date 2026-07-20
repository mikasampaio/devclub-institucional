"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsRight, User, UserRound } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Página Inicial", href: "#home" },
  { label: "Formações", href: "#about" },
  { label: "Faculdade", href: "#portfolio" },
  { label: "Contato", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

/** Navbar fixa com logo, menu e CTA. Colapsa em menu hambúrguer no mobile. */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-2 font-display text-lg font-bold"
        >
          <Image
            src="/logo-devclub.png"
            alt="Logo DevClub"
            width={28}
            height={28}
            className="h-7 w-7 rounded-lg object-contain"
          />
          DevClub
        </Link>

        {/* Menu desktop */}
        <nav
          aria-label="Principal"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-normal text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" icon={<UserRound size={16} />}>
            Área do aluno
          </Button>

          <Button icon={<ChevronsRight size={16} />}>Quero ser aluno</Button>
        </div>

        {/* Botão hambúrguer (mobile) */}
        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-5 bg-foreground transition-transform ${menuOpen ? "translate-y-1 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-foreground transition-transform ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Principal (mobile)"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}

              <Button variant="outline" icon={<UserRound size={16} />}>
                Área do aluno
              </Button>

              <Button icon={<ChevronsRight size={16} />}>
                Quero ser aluno
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
