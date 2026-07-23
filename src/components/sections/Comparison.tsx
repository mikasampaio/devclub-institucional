import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";

const OTHERS = [
  "Cluttered & Outdated UI",
  "Slow & Unoptimized",
  "Generic One-Size-Fits-All",
  "No AI Capabilities",
  "Limited Support Hours",
];

const NUBIEN = [
  "AI-Driven Design",
  "Performance Optimized",
  "Tailored to Your Brand",
  "Future-Proof Technology",
  "24/7 Expert Support",
];

/** Comparison: duas colunas — concorrência (X vermelho) vs Nubien (check roxo). */
export default function Comparison() {
  return (
    <section className="mx-auto max-w-[80rem] px-5 py-24 sm:py-32">
      <SectionHeading
        badge="Comparison"
        title={
          <>
            Nubien vs. The Rest —
            <br />
            <TitleContrast>Let&apos;s See the Difference</TitleContrast>
          </>
        }
        description="Why teams switch to Nubien and never look back."
      />

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        {/* Coluna negativa */}
        <Reveal>
          <div className="h-full rounded-card border border-line bg-surface p-8">
            <h3 className="text-lg font-semibold text-muted">Other Agencies</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {OTHERS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-muted"
                >
                  <CrossIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Coluna positiva (destacada) */}
        <Reveal delay={0.1}>
          <div className="h-full rounded-card border border-accent/60 bg-surface-2 p-8 shadow-[0_0_48px_rgba(124,58,237,0.2)]">
            <h3 className="text-lg font-semibold">Nubien</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {NUBIEN.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CrossIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </span>
  );
}

function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-secondary"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}
