"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import BottomFade from "@/components/ui/BottomFade";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiPython,
  SiStreamlit,
  SiN8N,
} from "react-icons/si";

gsap.registerPlugin(useGSAP);

type Tech = {
  name: string;
  icon: ReactNode;
  color: string;
};

const ROW_1: Tech[] = [
  { name: "HTML5", icon: <SiHtml5 />, color: "#E34F26" },
  { name: "CSS3", icon: <SiCss />, color: "#38BDF8" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#479BF3" },
  { name: "React", icon: <SiReact />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF" },
  { name: "Node.js", icon: <SiNodedotjs />, color: "#83C56F" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#38BDF8" },
];

const ROW_2: Tech[] = [
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "#6FA8FF" },
  { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
  { name: "Git", icon: <SiGit />, color: "#F05032" },
  { name: "GitHub", icon: <SiGithub />, color: "#FFFFFF" },
  { name: "Python", icon: <SiPython />, color: "#5A9FD4" },
  { name: "Streamlit", icon: <SiStreamlit />, color: "#FF4B4B" },
  { name: "n8n", icon: <SiN8N />, color: "#F06595" },
  { name: "OpenAI", icon: <Sparkles />, color: "#A78BFA" },
];

function TechPill({ tech, ariaHidden }: { tech: Tech; ariaHidden?: boolean }) {
  return (
    <span
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-foreground/90 transition-colors duration-300 hover:border-line-strong hover:bg-surface-2"
    >
      <span
        aria-hidden="true"
        className="flex text-lg [&>svg]:h-[1em] [&>svg]:w-[1em]"
        style={{ color: tech.color }}
      >
        {tech.icon}
      </span>
      {tech.name}
    </span>
  );
}

function Row({
  items,
  trackRef,
}: {
  items: Tech[];
  trackRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div ref={trackRef} className="flex w-max gap-3 pr-3">
        {items.map((tech) => (
          <TechPill key={tech.name} tech={tech} />
        ))}
        {items.map((tech) => (
          <TechPill key={`dup-${tech.name}`} tech={tech} ariaHidden />
        ))}
      </div>
    </div>
  );
}

export default function Technologies() {
  const rootRef = useRef<HTMLElement>(null);
  const tracksRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tweens = tracksRef.current.map((track, i) => {
          if (!track) return null;

          // Distância de um conjunto (o track tem 2 conjuntos idênticos).
          const speed = 45; // px/s — velocidade constante em ambas as fileiras
          const duration = track.scrollWidth / 2 / speed;
          const goesLeft = i % 2 === 0;

          const tween = gsap.fromTo(
            track,
            { xPercent: goesLeft ? 0 : -50 },
            {
              xPercent: goesLeft ? -50 : 0,
              duration,
              ease: "none",
              repeat: -1,
            },
          );

          // Pausa suave ao passar o mouse na fileira.
          const row = track.parentElement;
          const pause = () => gsap.to(tween, { timeScale: 0, duration: 0.4 });
          const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
          row?.addEventListener("mouseenter", pause);
          row?.addEventListener("mouseleave", resume);

          return { tween, row, pause, resume };
        });

        return () => {
          tweens.forEach((t) => {
            if (!t) return;
            t.row?.removeEventListener("mouseenter", t.pause);
            t.row?.removeEventListener("mouseleave", t.resume);
            t.tween.kill();
          });
        };
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden px-5 py-12 sm:py-32"
    >
      <Image
        src="/light_rays.avif"
        alt=""
        fill
        className="pointer-events-none object-cover object-top mix-blend-screen"
      />

      <BottomFade />

      <div className="relative mx-auto max-w-[80rem] z-10">
        <SectionHeading
          badge="Tecnologias"
          title={
            <>
              Aprenda as principais tecnologias do mercado
              <br />
              <TitleContrast>do ZERO e de forma didática</TitleContrast>
            </>
          }
          description="Dominamos as ferramentas mais pedidas do Front ao Back, passando por Dados, IA e Automação — com quem é referência no mercado."
        />

        <Reveal delay={0.15} className="mt-14 flex flex-col gap-3">
          <Row
            items={ROW_1}
            trackRef={(el) => void (tracksRef.current[0] = el)}
          />
          <Row
            items={ROW_2}
            trackRef={(el) => void (tracksRef.current[1] = el)}
          />
        </Reveal>
      </div>
    </section>
  );
}
