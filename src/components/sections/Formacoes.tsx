"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Area = {
  title: string;
  description: string;
  trilhas: string[];
  icon: ReactNode;
};

/**
 * As 14 trilhas agrupadas em 5 áreas — cada área vira um card largo.
 * Para adicionar uma trilha, basta incluí-la no array `trilhas` da área.
 */
const AREAS: Area[] = [
  {
    title: "Front End",
    description:
      "Interfaces modernas e responsivas: do HTML e CSS ao JavaScript e React.",
    trilhas: [
      "Programação Front End",
      "React",
      "JavaScript Completo",
      "HTML5",
      "CSS3",
    ],
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18M9 21h6M12 18v3" />
      </>
    ),
  },
  {
    title: "Back End & Full Stack",
    description:
      "A lógica por trás das aplicações — APIs, servidores e o ciclo completo do front ao back.",
    trilhas: ["Back End", "Node", "Full Stack"],
    icon: (
      <>
        <path d="M12 2 2 7l10 5 10-5-10-5z" />
        <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
      </>
    ),
  },
  {
    title: "Mobile",
    description:
      "Aplicativos nativos e híbridos para Android e iOS com as tecnologias mais pedidas.",
    trilhas: ["Mobile"],
    icon: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    title: "Inteligência Artificial",
    description:
      "Domine IA na prática: da gestão estratégica ao desenvolvimento com Claude.",
    trilhas: ["Gestor de IA", "IA e Automações", "Claude & Claude Code"],
    icon: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
      </>
    ),
  },
  {
    title: "Automação & Dados",
    description:
      "Automatize processos e transforme dados em decisões com dashboards profissionais.",
    trilhas: ["Trilha N8N", "Análise de Dados / Power BI"],
    icon: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
      </>
    ),
  },
];

/**
 * Formações: trilhas agrupadas por área em cards largos.
 * No desktop a seção é "pinada" e o scroll vertical vira movimento horizontal
 * dos cards (ScrollTrigger + pin + scrub). No mobile e com prefers-reduced-motion
 * cai para scroll nativo com snap — sem sequestrar o scroll da página.
 */
export default function Formacoes() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      // Distância que a faixa precisa percorrer para revelar o último card.
      const getDistance = () => track.scrollWidth - window.innerWidth;

      // Só ativa o pin no desktop e sem reduced-motion; caso contrário mantém
      // o scroll horizontal nativo definido no CSS.
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to(track, {
            x: () => -getDistance(),
            ease: "none", // obrigatório para o scroll casar 1:1 com a posição
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => "+=" + getDistance(),
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      <div className="flex flex-col justify-center gap-12 py-24 sm:py-32 md:min-h-screen md:py-0">
        {/* Cabeçalho contido, alinhado às demais seções */}
        <div className="mx-auto w-full max-w-6xl px-5">
          <SectionHeading
            badge="Formações"
            title={
              <>
                Formações Completas para Aprender tudo
                <br />
                <TitleContrast>do ZERO ao Avançado</TitleContrast>
              </>
            }
            description="Trilhas organizadas por área — do básico ao avançado. Escolha seu caminho e evolua no seu ritmo."
          />
        </div>

        {/* Faixa de áreas: scroll nativo no mobile, movida pelo GSAP no desktop */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto px-5 pb-4 snap-x snap-mandatory [scrollbar-width:none] md:overflow-visible md:snap-none md:pb-0 md:pl-[max(1.25rem,calc((100vw-72rem)/2))] md:pr-[15vw] [&::-webkit-scrollbar]:hidden"
        >
          {AREAS.map((area) => (
            <article
              key={area.title}
              className="w-[86vw] shrink-0 snap-start sm:w-[560px] lg:w-[640px]"
            >
              <div className="group grid h-full grid-cols-1 overflow-hidden rounded-card border border-line bg-surface transition-all duration-300 hover:border-line-strong hover:bg-surface-2 sm:grid-cols-[minmax(0,42%)_1fr]">
                {/* Visual — ícone da área sobre gradiente */}
                <div className="relative flex min-h-[160px] items-center justify-center bg-gradient-to-br from-accent/20 via-surface-2 to-accent-deep/30 p-8 sm:min-h-[300px]">
                  <span
                    aria-hidden="true"
                    className="flex h-20 w-20 items-center justify-center rounded-2xl border border-line bg-surface/70 text-accent-soft shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
                  >
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {area.icon}
                    </svg>
                  </span>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col justify-center gap-4 p-7 sm:p-9">
                  <h2 className="text-2xl font-medium sm:text-2xl">
                    {area.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-muted">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {area.trilhas.map((trilha) => (
                      <span
                        key={trilha}
                        className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-xs text-muted"
                      >
                        {trilha}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
