"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MonitorPlay, Route, Users, Bot, Gamepad2, Trophy } from "lucide-react";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { DotPattern } from "@/components/ui/dot-pattern";

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

/** Gira --specular-angle na direção do cursor e liga --specular-on (ver .specular-card em globals.css). */
function handleSpecularMove(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const angle =
    Math.atan2(
      event.clientY - (rect.top + rect.height / 2),
      event.clientX - (rect.left + rect.width / 2),
    ) *
      (180 / Math.PI) +
    90;
  card.style.setProperty("--specular-angle", `${angle}deg`);
}

function handleSpecularEnter(event: MouseEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--specular-on", "1");
}

function handleSpecularLeave(event: MouseEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--specular-on", "0");
}

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
    <section
      id="plataforma"
      ref={rootRef}
      className="mx-auto max-w-[80rem] px-5 py-24 sm:py-32"
    >
      <SectionHeading
        badge="Plataforma"
        title={
          <>
            Aprenda, pratique e evolua em uma plataforma feita pra você
            <br />
            <TitleContrast>com suporte dos professores</TitleContrast>
          </>
        }
        description="Tudo em um só lugar: onde você assiste às aulas, evolui nas trilhas, troca com a comunidade e conta com IA e professores a cada passo."
        align="left"
      />

      <div className="mt-14 flex flex-col gap-6">
        {RECURSOS.map((item, i) => (
          <article
            key={item.title}
            className="scroll-stack-card specular-card relative origin-top overflow-hidden rounded-card border border-line bg-surface shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)] motion-safe:sticky"
            style={{ top: `${STACK_TOP + i * STACK_GAP}px` }}
            onMouseMove={handleSpecularMove}
            onMouseEnter={handleSpecularEnter}
            onMouseLeave={handleSpecularLeave}
          >
            <DotPattern
              className="text-white/15 w-full mask-[radial-gradient(560px_circle_at_20%_30%,white,transparent)]"
              width={14}
              height={14}
            />

            <div className="relative z-10 grid grid-cols-1 gap-7 p-8 sm:p-10 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:p-12">
              {/* Visual — ícone do recurso sobre gradiente de destaque */}
              <div
                aria-hidden="true"
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-secondary/25 via-surface-2 to-secondary-deep/35 text-secondary-soft shadow-lg"
              >
                {item.icon}
              </div>

              <div>
                <span className="text-sm font-medium tabular-nums text-secondary-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80">
                  {item.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full font-medium border border-secondary/60 bg-secondary-soft/20 px-4 py-1.5 text-sm text-secondary"
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
