"use client";

import { useState } from "react";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ViewToggle, {
  type ViewMode,
} from "@/components/testimonials/ViewToggle";
import CarrosselView from "@/components/testimonials/CarrosselView";
import MosaicoView from "@/components/testimonials/MosaicoView";
import LightRays from "@/components/LightRays";
import { DotPattern } from "../ui/dot-pattern";

export default function Testimonials() {
  const [view, setView] = useState<ViewMode>("carrossel");

  return (
    <section className="relative mx-auto overflow-hidden max-w-[80rem] rounded-2xl border border-line lg:px-5 py-24 mb-24">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-96 w-[80%] -translate-x-1/2 rounded-[100%] bg-accent/30 blur-[120px]"
      />

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

      <div className="relative z-10 mx-auto max-w-[80rem]">
        <SectionHeading
          badge="Depoimentos"
          title={
            <>
              Milhares de vidas <TitleContrast>TRANSFORMADAS</TitleContrast>
              <br />
              dentro da nossa Comunidade
            </>
          }
          description="Histórias reais de quem começou do zero e mudou de carreira com o DevClub."
        />

        <Reveal delay={0.15} className="mt-8 flex justify-center">
          <ViewToggle view={view} onChange={setView} />
        </Reveal>

        <div className="mt-14">
          {view === "carrossel" ? <CarrosselView /> : <MosaicoView />}
        </div>
      </div>
    </section>
  );
}
