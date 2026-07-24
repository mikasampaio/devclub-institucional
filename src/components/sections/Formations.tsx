"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Area = {
  title: string;
  description: string;
  trilhas: string[];
  icon: (accent: string) => ReactNode;
  accent: string;
};

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
    accent: "#8B5CF6",
    icon: (accent) => (
      <>
        <rect x="8" y="14" width="84" height="72" rx="16" fill="#fff" />
        <rect x="8" y="32" width="84" height="6" fill={accent} />
        <circle cx="24" cy="23" r="4" fill={accent} />
        <circle cx="36" cy="23" r="4" fill={accent} />
        <circle cx="48" cy="23" r="4" fill={accent} />
        <rect x="20" y="46" width="60" height="32" rx="8" fill={accent} />
      </>
    ),
  },
  {
    title: "Back End & Full Stack",
    description:
      "A lógica por trás das aplicações — APIs, servidores e o ciclo completo do front ao back.",
    trilhas: ["Back End", "Node", "Full Stack"],
    accent: "#6366F1",
    icon: () => (
      <>
        <rect x="15" y="14" width="70" height="18" rx="9" fill="#fff" />
        <rect x="15" y="41" width="70" height="18" rx="9" fill="#fff" />
        <rect x="15" y="68" width="70" height="18" rx="9" fill="#fff" />
      </>
    ),
  },
  {
    title: "Mobile",
    description:
      "Aplicativos nativos e híbridos para Android e iOS com as tecnologias mais pedidas.",
    trilhas: ["Mobile"],
    accent: "#22D3EE",
    icon: (accent) => (
      <>
        <rect x="28" y="10" width="44" height="80" rx="14" fill="#fff" />
        <rect x="44" y="18" width="12" height="4" rx="2" fill={accent} />
        <rect x="42" y="78" width="16" height="4" rx="2" fill={accent} />
      </>
    ),
  },
  {
    title: "Inteligência Artificial",
    description:
      "Domine IA na prática: da gestão estratégica ao desenvolvimento com Claude.",
    trilhas: ["Gestor de IA", "IA e Automações", "Claude & Claude Code"],
    accent: "#EC4899",
    icon: (accent) => (
      <>
        <rect x="34" y="12" width="6" height="10" rx="3" fill="#fff" />
        <rect x="47" y="12" width="6" height="10" rx="3" fill="#fff" />
        <rect x="60" y="12" width="6" height="10" rx="3" fill="#fff" />
        <rect x="34" y="78" width="6" height="10" rx="3" fill="#fff" />
        <rect x="47" y="78" width="6" height="10" rx="3" fill="#fff" />
        <rect x="60" y="78" width="6" height="10" rx="3" fill="#fff" />
        <rect x="12" y="34" width="10" height="6" rx="3" fill="#fff" />
        <rect x="12" y="47" width="10" height="6" rx="3" fill="#fff" />
        <rect x="12" y="60" width="10" height="6" rx="3" fill="#fff" />
        <rect x="78" y="34" width="10" height="6" rx="3" fill="#fff" />
        <rect x="78" y="47" width="10" height="6" rx="3" fill="#fff" />
        <rect x="78" y="60" width="10" height="6" rx="3" fill="#fff" />
        <rect x="25" y="25" width="50" height="50" rx="12" fill="#fff" />
        <circle cx="50" cy="50" r="9" fill={accent} />
      </>
    ),
  },
  {
    title: "Automação & Dados",
    description:
      "Automatize processos e transforme dados em decisões com dashboards profissionais.",
    trilhas: ["Trilha N8N", "Análise de Dados / Power BI"],
    accent: "#10B981",
    icon: () => (
      <>
        <rect x="10" y="64" width="18" height="18" rx="9" fill="#fff" />
        <rect x="24" y="46" width="18" height="18" rx="9" fill="#fff" />
        <rect x="41" y="28" width="18" height="18" rx="9" fill="#fff" />
        <rect x="58" y="46" width="18" height="18" rx="9" fill="#fff" />
        <rect x="72" y="64" width="18" height="18" rx="9" fill="#fff" />
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
export default function Formations() {
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
    <section id="formacoes" ref={rootRef} className="relative overflow-hidden">
      <div className="flex flex-col justify-center gap-12 py-24 sm:py-32 md:min-h-screen md:py-0">
        <div className="mx-auto w-full max-w-[80rem] px-5">
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
              <div className="group grid h-full grid-cols-1 overflow-hidden rounded-card border border-line bg-surface transition-colors duration-300 hover:border-line-strong sm:grid-cols-[minmax(0,42%)_1fr]">
                <div
                  className="relative flex min-h-[160px] items-center justify-center p-8 sm:min-h-[300px]"
                  style={{ backgroundColor: area.accent }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    className="h-24 w-24 transition-transform duration-300 group-hover:scale-105 sm:h-36 sm:w-36"
                  >
                    {area.icon(area.accent)}
                  </svg>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col justify-center gap-4 p-7 sm:p-9">
                  <h2 className="text-2xl font-medium sm:text-2xl">
                    {area.title}
                  </h2>

                  <p className="text-sm leading-relaxed">{area.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {area.trilhas.map((trilha) => (
                      <span
                        key={trilha}
                        className={cn(
                          `rounded-full border px-3 py-1 text-xs font-medium`,
                        )}
                        style={{
                          borderColor: area.accent,
                          color: area.accent,
                          backgroundColor: area.accent + 30,
                        }}
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
