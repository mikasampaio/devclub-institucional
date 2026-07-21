"use client";

import Image, { type StaticImageData } from "next/image";
import { useReducedMotion } from "framer-motion";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import pageOne from "@/components/projects/assets/page_one.png";
import pageTwo from "@/components/projects/assets/page_two.png";
import pageThree from "@/components/projects/assets/page_three.png";

type ShowcaseProject = {
  src: StaticImageData;
  alt: string;
};

/** Landing pages inteiras (screenshots verticais) feitas por alunos. */
const PROJECTS: ShowcaseProject[] = [
  {
    src: pageOne,
    alt: "Landing page de app financeiro criada por aluno da Academy Skills",
  },
  {
    src: pageTwo,
    alt: "Landing page de banco digital criada por aluno da Academy Skills",
  },
  {
    src: pageThree,
    alt: "Landing page de plataforma de investimentos criada por aluno da Academy Skills",
  },
];

/** Projetos: galeria de 3 landing pages inteiras em colunas com parallax. */
export default function Projects() {
  return (
    <section
      id="project"
      className="flex flex-col gap-20 mx-auto max-w-6xl px-5 py-24"
    >
      <SectionHeading
        badge="Projetos dos alunos"
        title={<>Projetos reais criados por alunos</>}
      />

      <div className="grid grid-cols-3 items-start gap-6">
        {PROJECTS.map((project, i) => (
          <Parallax key={project.alt} speed={i % 2 ? -5 : 15}>
            <Reveal delay={i * 0.08}>
              <div className="overflow-hidden rounded-2xl border border-white/5 shadow-lg shadow-black/30">
                <Image
                  src={project.src}
                  alt={project.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  // Import estático fornece width/height/blurDataURL automaticamente
                  style={{ width: "100%", height: "auto" }}
                  {...(i === 0 ? { preload: true } : {})}
                />
              </div>
            </Reveal>
          </Parallax>
        ))}
      </div>
    </section>
  );
}
