"use client";

import Image from "next/image";
import { Parallax } from "react-scroll-parallax";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/components/projects/projects";

export default function Projects() {
  return (
    <section
      id="project"
      className="flex flex-col gap-20 mx-auto px-5 py-24"
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
