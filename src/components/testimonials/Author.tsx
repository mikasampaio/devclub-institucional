import type { Testimonial } from "./testimonials";

/** Autor do depoimento (avatar com iniciais + nome/cargo) — reutilizado nas
 *  duas visualizações (carrossel e mosaico). */
export default function Author({
  t,
  className = "",
}: {
  t: Testimonial;
  className?: string;
}) {
  const initials = t.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <footer className={`flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-deep text-xs font-semibold text-white"
      >
        {initials}
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">{t.name}</p>
        <p className="text-xs text-muted">
          {t.role ? `${t.role} · ${t.handle}` : t.handle}
        </p>
      </div>
    </footer>
  );
}
