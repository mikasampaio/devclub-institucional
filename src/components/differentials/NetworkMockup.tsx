"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "./constants";
import MockupFrame from "./MockupFrame";

/* --- 3. Aprendizado guiado: rede de avatares com linhas animadas ---------- */

// Posições fixas (viewBox 0..100) — determinísticas, sem PRNG.
const NODES = [
  { cx: 20, cy: 22 },
  { cx: 80, cy: 20 },
  { cx: 16, cy: 78 },
  { cx: 84, cy: 76 },
  { cx: 50, cy: 12 },
] as const;
const CENTER = { cx: 50, cy: 50 } as const;

export default function NetworkMockup() {
  const reduce = useReducedMotion() ?? false;

  return (
    <MockupFrame>
      <svg
        viewBox="0 0 100 100"
        className="mx-auto block aspect-square w-full max-w-[280px]"
        role="img"
        aria-label="Rede de pessoas conectadas na comunidade"
      >
        {/* Linhas do centro até cada nó — desenhadas com pathLength */}
        {NODES.map((n, i) => (
          <motion.line
            key={`l-${i}`}
            x1={CENTER.cx}
            y1={CENTER.cy}
            x2={n.cx}
            y2={n.cy}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={0.8}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: 0.15 * i, ease: EASE }}
          />
        ))}

        {/* Nós periféricos com pulso de destaque */}
        {NODES.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={n.cx}
            cy={n.cy}
            r={6}
            fill="rgba(255,255,255,0.9)"
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.4, delay: 0.15 * i + 0.3, ease: EASE }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
        ))}

        {/* Nó central pulsando continuamente */}
        <motion.circle
          cx={CENTER.cx}
          cy={CENTER.cy}
          r={9}
          fill="#fff"
          animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          style={{ transformOrigin: `${CENTER.cx}px ${CENTER.cy}px` }}
        />
        {/* Anel de pulso irradiando do centro */}
        {!reduce && (
          <motion.circle
            cx={CENTER.cx}
            cy={CENTER.cy}
            r={9}
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={1}
            animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
            transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
            style={{ transformOrigin: `${CENTER.cx}px ${CENTER.cy}px` }}
          />
        )}
      </svg>
    </MockupFrame>
  );
}
