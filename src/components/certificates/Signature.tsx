"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Certificate } from "./certificates";

type SignatureProps = {
  name: string;
  theme: Certificate["theme"];
};

/**
 * Assinatura: nome em fonte manuscrita (Caveat) + floreio SVG "desenhado".
 * O Framer Motion anima `pathLength` de 0→1 (que internamente controla
 * stroke-dasharray/offset), criando o efeito de "escrever" o traço quando o
 * card entra na viewport.
 */
export default function Signature({ name, theme }: SignatureProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="relative inline-block">
      <span
        className="block text-4xl leading-none sm:text-5xl"
        style={{ fontFamily: "var(--font-signature)", color: theme.ink }}
      >
        {name}
      </span>

      <svg
        aria-hidden="true"
        viewBox="0 0 220 26"
        className="mt-0.5 w-40 sm:w-48"
        fill="none"
      >
        <motion.path
          d="M4 15 C 40 2, 70 24, 108 11 S 176 2, 214 14"
          stroke={theme.ink}
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.35 }}
        />
      </svg>
    </span>
  );
}
