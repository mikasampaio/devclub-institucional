"use client";

import { ChevronsRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import LightRays from "@/components/LightRays";
import { DotPattern } from "@/components/ui/dot-pattern";
import SectionHeading, { TitleContrast } from "../ui/SectionHeading";
import BottomFade from "../ui/BottomFade";

/** CTA final: chamada para virar parte do time/cliente. */
export default function CtaFinal() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border border-accent/20 border-b-0! rounded-2xl mx-4 my-10 max-w-6xl px-5 py-16 sm:mx-6 sm:px-8 sm:py-20 lg:mx-auto"
    >
      {/* Glow radial roxo de fundo */}
      <div aria-hidden="true" className="glow-radial absolute inset-0" />

      {/* Raios de luz WebGL — camada própria, sem blur, atrás do conteúdo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#7c3aed"
          raysSpeed={2.3}
          lightSpread={3}
          rayLength={1.3}
          pulsating={false}
          fadeDistance={1.8}
          saturation={1}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="mix-blend-screen"
        />
      </div>

      <div className="absolute top-0 h-100 w-full">
        <DotPattern
          className="text-white/20 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          width={12}
          height={12}
        />
      </div>

      <Reveal className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <SectionHeading
          badge="Junte-se a nós"
          title={
            <>
              Pronto para transformar <br />
              <TitleContrast>sua carreira em tecnologia?</TitleContrast>
            </>
          }
          description="Junte-se a mais de 25 mil alunos que já mudaram de vida com o DevClub.
          Comece hoje sua jornada do zero ao profissional."
        />

        <Button
          icon={<ChevronsRight size={16} />}
          className="mt-8 w-full sm:mt-10 sm:w-auto"
        >
          Quero ser aluno
        </Button>
      </Reveal>

      <BottomFade />
    </section>
  );
}
