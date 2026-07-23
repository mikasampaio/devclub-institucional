import Link from "next/link";
import Image from "next/image";

const PAGES = [
  { label: "Página Inicial", href: "#home" },
  { label: "Formações", href: "#about" },
  { label: "Contato", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Youtube", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "LinkedIn", href: "#" },
];

/** Footer: logo + tagline, colunas de links, newsletter e linha legal. */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/50">
      <div className="mx-auto max-w-[80rem] px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          {/* Logo + tagline */}
          <div>
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Transformando carreiras em tecnologia, do zero ao
              <br />
              profissional.
            </p>
          </div>

          {/* Páginas */}
          <nav aria-label="Páginas do site">
            <h3 className="text-sm font-semibold">Páginas</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {PAGES.map((page) => (
                <li key={page.label}>
                  <Link
                    href={page.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <nav aria-label="Redes sociais">
            <h3 className="text-sm font-semibold">Redes Sociais</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold">Assine nossa lista</h3>
            <p className="mt-4 text-sm text-muted">
              Receba dicas de programação e novidades do DevClub direto no seu
              e-mail.
            </p>
            <form
              className="mt-4 flex gap-2"
              /* Integre com seu provedor de e-mail (ex: Resend, Mailchimp) */
              action="#"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Seu e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-line bg-white/[0.04] px-4 py-2.5 text-sm text-foreground placeholder:text-faded focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-soft"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>

        {/* Linha legal */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-faded">
            © {new Date().getFullYear()} DevClub. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-faded transition-colors hover:text-foreground"
            >
              Termos de Uso
            </a>
            <a
              href="#"
              className="text-xs text-faded transition-colors hover:text-foreground"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
