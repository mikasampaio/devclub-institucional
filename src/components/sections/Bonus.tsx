"use client";

import Reveal from "@/components/ui/Reveal";
import BonusCarousel from "@/components/bonus/BonusCarousel";
import LightRays from "@/components/lightrays/LightRays";
import { DotPattern } from "@/components/ui/DotPattern";

export default function Bonus() {
  return (
    <section className="relative mx-auto overflow-hidden py-24">
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
          className="text-white/20 mask-[radial-gradient(300px_circle_at_center,white,transparent)]"
          width={12}
          height={12}
        />
      </div>

      <Reveal className="relative z-10">
        <BonusCarousel />
      </Reveal>
    </section>
  );
}
