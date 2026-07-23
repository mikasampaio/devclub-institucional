"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE, VIEWPORT } from "./constants";
import MockupFrame from "./MockupFrame";

/* --- 2. Saúde mental: sessão de chat com bolhas em stagger ---------------- */

const MENSAGENS = [
  { from: "them" as const, text: "Como foi sua semana de estudos?" },
  { from: "me" as const, text: "Intensa, mas me senti travado algumas vezes." },
  { from: "them" as const, text: "Vamos trabalhar o foco e o ritmo juntos." },
];

const bubbleVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function ChatMockup() {
  const reduce = useReducedMotion() ?? false;

  return (
    <MockupFrame>
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
          Dr
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Sessão de apoio</p>
          <p className="text-xs text-white/60">Terapeuta • Alta performance</p>
        </div>
      </div>

      <motion.div
        className="flex flex-col gap-2.5"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{ show: { transition: { staggerChildren: 0.22 } } }}
      >
        {MENSAGENS.map((m, i) => (
          <motion.div
            key={i}
            className={cn(
              "max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed",
              m.from === "me"
                ? "self-end rounded-br-sm bg-white text-neutral-900"
                : "self-start rounded-bl-sm bg-white/15 text-white",
            )}
            variants={reduce ? { hidden: {}, show: {} } : bubbleVariants}
          >
            {m.text}
          </motion.div>
        ))}
      </motion.div>
    </MockupFrame>
  );
}
