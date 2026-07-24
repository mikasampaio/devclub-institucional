"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "./constants";
import MockupFrame from "./MockupFrame";

/* --- 1. Carreira: card de vaga + notificações em fade sequencial ---------- */

const VAGAS = [
  { role: "Desenvolvedor(a) React", company: "TechCorp", pay: "R$ 9k" },
  { role: "Front-end Pleno", company: "Nubien", pay: "R$ 8k" },
  { role: "Engenheiro(a) de Software", company: "Orbit", pay: "R$ 12k" },
];

export default function CareerMockup() {
  const reduce = useReducedMotion() ?? false;

  return (
    <MockupFrame>
      {/* Card de vaga em destaque */}
      <div className="relative rounded-xl border border-white/15 bg-white/10 p-4">
        {/* Badge "Exclusiva" pulsando */}
        <motion.span
          className="absolute -top-2.5 right-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-900 shadow"
          animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        >
          Exclusiva
        </motion.span>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-sm font-bold">
            TC
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Desenvolvedor(a) React
            </p>
            <p className="truncate text-xs text-white/70">
              TechCorp • Remoto • R$ 9k
            </p>
          </div>
        </div>
      </div>

      {/* Lista de notificações de vagas surgindo em sequência */}
      <motion.ul
        className="mt-4 flex flex-col gap-2.5"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{ show: { transition: { staggerChildren: 0.18 } } }}
      >
        {VAGAS.map((v) => (
          <motion.li
            key={v.role}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5"
            variants={{
              hidden: reduce ? {} : { opacity: 0, x: 16 },
              show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: EASE },
              },
            }}
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-white/80" />
            <span className="min-w-0 flex-1 truncate text-xs text-white/85">
              Nova vaga: {v.role} — {v.company}
            </span>
            <span className="shrink-0 text-xs font-semibold text-white">
              {v.pay}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </MockupFrame>
  );
}
