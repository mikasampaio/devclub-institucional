"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, Headphones, Sparkles } from "lucide-react";
import MockupFrame from "./MockupFrame";

/* --- 4. Suporte contínuo: painel com "online" + IA/humano alternando ------ */

export default function SupportMockup() {
  const reduce = useReducedMotion() ?? false;

  return (
    <MockupFrame>
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          {/* Ícone que alterna entre IA e atendente humano via crossfade */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <motion.span
              className="absolute"
              animate={reduce ? undefined : { opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.45, 0.55, 1],
              }}
            >
              <Bot aria-hidden="true" className="h-5 w-5 text-white" />
            </motion.span>
            <motion.span
              className="absolute"
              animate={reduce ? undefined : { opacity: [0, 0, 1, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.45, 0.55, 1],
              }}
            >
              <Headphones aria-hidden="true" className="h-5 w-5 text-white" />
            </motion.span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Suporte Nubien</p>
            <p className="text-xs text-white/60">IA + humano</p>
          </div>
        </div>

        {/* Indicador "online" pulsando */}
        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          <motion.span
            className="h-2 w-2 rounded-full bg-emerald-400"
            animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
          />
          Online
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="max-w-[80%] self-start rounded-2xl rounded-bl-sm bg-white/15 px-3.5 py-2 text-xs text-white">
          Olá! Como posso te ajudar agora? 👋
        </div>
        {/* Indicador de digitação */}
        <div className="flex items-center gap-1 self-start rounded-2xl rounded-bl-sm bg-white/10 px-3.5 py-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-white/80"
              animate={reduce ? undefined : { y: [0, -3, 0] }}
              transition={{
                duration: 0.9,
                ease: "easeInOut",
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-[11px] text-white/60">
          <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
          Resposta em segundos, 24h por dia
        </p>
      </div>
    </MockupFrame>
  );
}
