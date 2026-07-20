"use client";

import { useState } from "react";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ViewToggle, { type ViewMode } from "@/components/testimonials/ViewToggle";
import CarrosselView from "@/components/testimonials/CarrosselView";
import MosaicoView from "@/components/testimonials/MosaicoView";

/**
 * Depoimentos/Transformação: duas versões da mesma dobra, alternadas por um
 * segmented control — carrossel (formato de referência) e mosaico. Só uma
 * aparece por vez para facilitar a comparação sem duplicar na tela.
 */
export default function Testimonials() {
  const [view, setView] = useState<ViewMode>("carrossel");

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-32">
      {/* Glow roxo forte tipo holofote */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-96 w-[80%] -translate-x-1/2 rounded-[100%] bg-accent/25 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
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
