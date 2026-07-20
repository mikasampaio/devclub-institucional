"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MonitorPlay,
  Route,
  Users,
  Bot,
  Gamepad2,
  Trophy,
} from "lucide-react";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* --- Parâmetros do empilhamento (equivalentes aos props do React Bits) --- */
const STACK_TOP = 104; // px do topo onde o card "prende" (stackPosition)
const STACK_GAP = 22; // px de sobra entre um card e o próximo na pilha (itemStackDistance)
const BASE_SCALE = 0.88; // escala do card mais ao fundo (baseScale)
const ITEM_SCALE = 0.02; // acréscimo de escala por índice (itemScale)

type Recurso = {
  title: string;
  description: string;
  tags: string[];
  icon: ReactNode;
};

/**
 * Os recursos da plataforma do DevClub.
 * Para adicionar um recurso, basta incluí-lo neste array.
 */
const RECURSOS: Recurso[] = [
  {
    title: "Plataforma de Ensino",
    description:
      "Ambiente moderno e intuitivo para assistir às aulas de onde estiver, no seu ritmo e acompanhando todo o seu progresso.",
    tags: ["Aulas em vídeo", "No seu ritmo"],
    icon: <MonitorPlay size={34} strokeWidth={1.6} />,
  },
  {
    title: "Cursos por Trilhas e Formações",
    description:
      "Conteúdo organizado em trilhas e formações completas — do zero ao avançado, com um caminho claro para cada objetivo.",
    tags: ["Trilhas", "Do zero ao avançado"],
    icon: <Route size={34} strokeWidth={1.6} />,
  },
  {
    title: "Comunidade de Alunos",
    description:
      "Uma comunidade ativa para trocar experiências, tirar dúvidas e fazer networking com quem está na mesma jornada que você.",
    tags: ["Networking", "Comunidade"],
    icon: <Users size={34} strokeWidth={1.6} />,
  },
  {
    title: "Club Agents",
    description:
      "Agentes de IA treinados no conteúdo do DevClub para acelerar seu aprendizado e responder suas dúvidas a qualquer hora do dia.",
    tags: ["Inteligência Artificial", "24 horas"],
    icon: <Bot size={34} strokeWidth={1.6} />,
  },
  {
    title: "Playground de Treinamento",
    description:
      "Um espaço para treinar na prática, resolver desafios e fixar o que aprendeu programando de verdade, sem medo de errar.",
    tags: ["Prática", "Desafios"],
    icon: <Gamepad2 size={34} strokeWidth={1.6} />,
  },
  {
    title: "Mural da Fama",
    description:
      "Reconhecimento para os alunos que se destacam — inspiração e visibilidade para quem faz acontecer e evolui de verdade.",
    tags: ["Reconhecimento", "Alunos destaque"],
    icon: <Trophy size={34} strokeWidth={1.6} />,
  },
];

/**
 * Plataforma: efeito "scroll stack" — os cards prendem no topo e vão
 * empilhando enquanto o próximo sobe por cima, encolhendo os de baixo. Cada card
 * ainda tem o "border glow" que segue o cursor (classe .border-glow).
 *
 * Implementado nativamente com o GSAP do projeto (ScrollTrigger + position:
 * sticky), sem depender de smooth-scroll global (Lenis) — assim não conflita
 * com o pin de Formacoes nem sequestra o scroll da página. Em telas pequenas ou
 * com prefers-reduced-motion o `motion-safe:sticky` cai para uma lista estática.
 */
export default function Plataforma() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Só empilha com movimento no desktop; mobile/reduced-motion ficam estáticos.
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            ".scroll-stack-card",
            rootRef.current,
          );
          const last = cards.length - 1;

          const tweens = cards.map((card, i) => {
            // O card do topo permanece em escala cheia — nada sobe sobre ele.
            if (i === last) return null;

            const targetScale = BASE_SCALE + i * ITEM_SCALE;

            return gsap.to(card, {
              scale: targetScale,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                // Começa a encolher quando o card chega à sua linha de "pin"...
                start: `top ${STACK_TOP + i * STACK_GAP}px`,
                // ...e termina quando o último card fecha a pilha.
                endTrigger: cards[last],
                end: `top ${STACK_TOP + last * STACK_GAP}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          });

          return () => tweens.forEach((t) => t?.scrollTrigger?.kill());
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        badge="Plataforma"
        title={
          <>
            Você terá acesso a uma plataforma moderna de aulas, nossa comunidade,
            área de vagas e IA&apos;s para acelerar seu progresso
            <br />
            <TitleContrast>e tudo com suporte dos professores</TitleContrast>
          </>
        }
        description="Tudo em um só lugar: onde você assiste às aulas, evolui nas trilhas, troca com a comunidade e conta com IA e professores a cada passo."
        align="left"
      />

      <div className="mt-14 flex flex-col gap-6">
        {RECURSOS.map((item, i) => (
          <article
            key={item.title}
            className="scroll-stack-card border-glow relative origin-top overflow-hidden rounded-card border border-line bg-surface shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)] motion-safe:sticky"
            style={{ top: `${STACK_TOP + i * STACK_GAP}px` }}
          >
            <div className="grid grid-cols-1 gap-7 p-8 sm:p-10 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:p-12">
              {/* Visual — ícone do recurso sobre gradiente de destaque */}
              <div
                aria-hidden="true"
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-accent/25 via-surface-2 to-accent-deep/35 text-accent-soft shadow-lg"
              >
                {item.icon}
              </div>

              <div>
                <span className="text-sm font-medium tabular-nums text-accent-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                  {item.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-white/[0.04] px-4 py-1.5 text-sm text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Button>Quero fazer parte</Button>
      </div>
    </section>
  );
}
