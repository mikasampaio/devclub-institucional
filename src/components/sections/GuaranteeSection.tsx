"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface GuaranteeSectionProps {
  /** Título grande da seção. Ex: "E se eu não curtir?". */
  title: string;
  /** Texto da garantia (parágrafo de apoio). */
  description: string;
  /** Prazo da garantia em dias. Default: 15. */
  days?: number;
  /** Classes extras aplicadas ao `<section>` raiz. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/* Selo ondulado — geometria pura, versionável em SVG                          */
/* -------------------------------------------------------------------------- */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Constrói o contorno ondulado (estilo carimbo/selo de certificação) como um
 * único path SVG fechado. `scallops` bolhas convexas ao redor do centro: as
 * ondas usam os vales (raio `rIn`) como âncoras e os picos (raio `rOut`) como
 * pontos de controle de curvas quadráticas, garantindo bolhas voltadas para
 * fora. Função pura e determinística — sem `Math.random` —, então o path é
 * calculado uma única vez no carregamento do módulo.
 */
function buildSealPath(
  scallops: number,
  cx: number,
  cy: number,
  rIn: number,
  rOut: number,
): string {
  const at = (angle: number, r: number): readonly [number, number] => [
    cx + r * Math.cos(angle),
    cy + r * Math.sin(angle),
  ];
  const fmt = ([x, y]: readonly [number, number]) =>
    `${x.toFixed(2)} ${y.toFixed(2)}`;

  const step = (Math.PI * 2) / scallops;
  let d = `M ${fmt(at(0, rIn))}`;

  for (let k = 0; k < scallops; k++) {
    const peak = at((k + 0.5) * step, rOut); // controle (pico da onda)
    const nextValley = at((k + 1) * step, rIn); // âncora (vale)
    d += ` Q ${fmt(peak)} ${fmt(nextValley)}`;
  }

  return `${d} Z`;
}

const SEAL_PATH = buildSealPath(15, 50, 50, 35, 49);

/* -------------------------------------------------------------------------- */
/* GuaranteeBadge — o selo em si (isolado do bloco de texto)                   */
/* -------------------------------------------------------------------------- */

interface GuaranteeBadgeProps {
  days: number;
}

function GuaranteeBadge({ days }: GuaranteeBadgeProps) {
  // `null` (sem preferência declarada, ex.: jsdom) equivale a "pode animar".
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      role="img"
      aria-label={`Garantia de ${days} dias`}
      className="relative flex aspect-square w-48 items-center justify-center sm:w-60"
      initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      // `once: true` → a entrada dispara uma única vez e nunca reverte no scroll.
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-primary-contrast drop-shadow-xl"
        aria-hidden="true"
        focusable="false"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        <path d={SEAL_PATH} fill="currentColor" />
      </motion.svg>

      <div className="relative flex flex-col items-center gap-1 text-secondary">
        <Check aria-hidden="true" strokeWidth={3} className="h-9 w-9" />
        <span className="text-4xl font-bold leading-none">{days}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">
          dias
        </span>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* GuaranteeSection — bloco full-bleed reaproveitável                          */
/* -------------------------------------------------------------------------- */

export default function GuaranteeSection({
  title,
  description,
  days = 15,
  className,
}: GuaranteeSectionProps) {
  return (
    <section
      className={cn(
        "relative left-1/2 right-1/2 -mx-[50vw] flex h-screen w-screen items-center",
        "bg-secondary text-primary-contrast",
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-[80rem] grid-cols-1 items-center gap-12 px-5 py-16 sm:py-20 md:grid-cols-2 md:gap-16 md:py-24">
        <div className="flex flex-col gap-8">
          <h2 className="text-6xl font-medium tracking-tight text-balance sm:text-5xl">
            {title}
          </h2>
          <p className="max-w-md text-lg  text-primary-contrast">
            {description}
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <GuaranteeBadge days={days} />
        </div>
      </div>
    </section>
  );
}
