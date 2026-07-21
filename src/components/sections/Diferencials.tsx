"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Bot, ChevronsRight, Headphones, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";

/* -------------------------------------------------------------------------- */
/* Constantes de animação                                                      */
/* -------------------------------------------------------------------------- */

// Mesmo easing usado nas demais seções (Reveal / GuaranteeSection).
const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Viewport padrão: dispara uma vez, com folga para não animar cedo demais.
const VIEWPORT = { once: true, margin: "-80px" } as const;

/* -------------------------------------------------------------------------- */
/* CTA reutilizável — pílula clara com ícone de seta dupla                     */
/* -------------------------------------------------------------------------- */

function CtaButton({
  children = "Saiba mais",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "group/cta inline-flex items-center gap-2 self-start rounded-full",
        "bg-white px-6 py-3 text-sm font-semibold text-neutral-900",
        "shadow-lg transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
      <ChevronsRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
      />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Mockups — ilustrações leves feitas só com div/SVG + Tailwind                */
/* -------------------------------------------------------------------------- */

/**
 * Container comum dos mockups: painel escuro translúcido que funciona sobre
 * qualquer uma das 4 cores de card, com borda sutil e cantos arredondados.
 */
function MockupFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/25 p-5 backdrop-blur-sm sm:p-6">
      {children}
    </div>
  );
}

/* --- 1. Carreira: card de vaga + notificações em fade sequencial ---------- */

const VAGAS = [
  { role: "Desenvolvedor(a) React", company: "TechCorp", pay: "R$ 9k" },
  { role: "Front-end Pleno", company: "Nubien", pay: "R$ 8k" },
  { role: "Engenheiro(a) de Software", company: "Orbit", pay: "R$ 12k" },
];

function CareerMockup() {
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
              show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
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

/* --- 2. Saúde mental: sessão de chat com bolhas em stagger ---------------- */

const MENSAGENS = [
  { from: "them" as const, text: "Como foi sua semana de estudos?" },
  { from: "me" as const, text: "Intensa, mas me senti travado algumas vezes." },
  { from: "them" as const, text: "Vamos trabalhar o foco e o ritmo juntos." },
];

const bubbleVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

function ChatMockup() {
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

function NetworkMockup() {
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

/* --- 4. Suporte contínuo: painel com "online" + IA/humano alternando ------ */

function SupportMockup() {
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
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.55, 1] }}
            >
              <Bot aria-hidden="true" className="h-5 w-5 text-white" />
            </motion.span>
            <motion.span
              className="absolute"
              animate={reduce ? undefined : { opacity: [0, 0, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.55, 1] }}
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

/* -------------------------------------------------------------------------- */
/* Dados dos cards — editar aqui para manter (não hardcoded no JSX)            */
/* -------------------------------------------------------------------------- */

type Illustration = "career" | "chat" | "network" | "support";

type DiferencialCard = {
  id: string;
  /** Grupo temático (eyebrow acima do título). */
  group: string;
  title: string;
  description: string;
  /** Cor sólida do card — classe utilitária Tailwind. */
  bg: string;
  illustration: Illustration;
};

const cards: DiferencialCard[] = [
  {
    id: "carreira",
    group: "Carreira",
    title: "Acompanhamento de carreira dedicado",
    description:
      "Acompanhamento semanal com uma recrutadora e acesso a vagas exclusivas — você não busca emprego sozinho.",
    bg: "bg-[#0f4c3a]",
    illustration: "career",
  },
  {
    id: "saude",
    group: "Saúde mental e performance",
    title: "Suporte psicológico de alta performance",
    description:
      "Um terapeuta especializado em alta performance para profissionais de tecnologia, focado no seu equilíbrio e evolução.",
    bg: "bg-[#e0503f]",
    illustration: "chat",
  },
  {
    id: "aprendizado",
    group: "Aprendizado guiado",
    title: "Mentoria e comunidade ativa",
    description:
      "Mentorias semanais e uma comunidade de tecnologia viva para trocar experiência, tirar dúvidas e crescer em rede.",
    bg: "bg-[#5b40e3]",
    illustration: "network",
  },
  {
    id: "suporte",
    group: "Suporte contínuo",
    title: "Suporte 24 horas, todos os dias",
    description:
      "Agentes de IA disponíveis 24h e suporte humano 7 dias por semana — sempre há alguém para destravar você.",
    bg: "bg-[#1866d6]",
    illustration: "support",
  },
];

const ILLUSTRATIONS: Record<Illustration, () => ReactNode> = {
  career: CareerMockup,
  chat: ChatMockup,
  network: NetworkMockup,
  support: SupportMockup,
};

/* -------------------------------------------------------------------------- */
/* Diferencials — seção pública                                                */
/* -------------------------------------------------------------------------- */

export default function Diferencials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-5">
        <SectionHeading
          badge="Diferenciais"
          title={
            <>
              Tudo que você precisa <TitleContrast>além do código</TitleContrast>
              <br />
              para evoluir mais rápido
            </>
          }
          description="Muito além das aulas: carreira, saúde mental, mentoria e suporte para você chegar mais longe, mais rápido."
        />

        <div className="flex flex-col gap-6 sm:gap-8">
          {cards.map((card, i) => {
            const Illustration = ILLUSTRATIONS[card.illustration];
            const reverse = i % 2 === 1; // alterna o lado da ilustração

            return (
              <motion.article
                key={card.id}
                className={cn(
                  "grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] p-8 text-white sm:p-10 md:grid-cols-2 md:gap-12 md:p-12",
                  card.bg,
                )}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {/* Texto — sempre primeiro no DOM (leitura/acessibilidade) */}
                <div
                  className={cn(
                    "flex flex-col gap-5",
                    reverse && "md:order-2",
                  )}
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                    {card.group}
                  </span>
                  <h3 className="text-2xl font-medium leading-tight tracking-tight text-balance sm:text-3xl">
                    {card.title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-white/85">
                    {card.description}
                  </p>
                  <CtaButton />
                </div>

                {/* Ilustração — abaixo no mobile, alterna de lado no desktop */}
                <div className={cn(reverse && "md:order-1")}>
                  <Illustration />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
