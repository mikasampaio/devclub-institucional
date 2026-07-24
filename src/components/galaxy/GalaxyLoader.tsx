"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

/**
 * Wrapper do fundo Galaxy do hero. Carrega o componente WebGL só no cliente
 * (`ssr: false` — obrigatório no Next 16 para código que toca o DOM/WebGL) e
 * mantém aqui a config visual escolhida para o hero.
 */
const Galaxy = dynamic(() => import("./Galaxy"), {
  ssr: false,
  loading: () => <div aria-hidden className="absolute inset-0" />,
});

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

export default function GalaxyLoader() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Galaxy
        starSpeed={0.5}
        density={1}
        hueShift={140}
        speed={1}
        glowIntensity={0.1}
        saturation={1}
        mouseInteraction={false}
        mouseRepulsion={false}
        repulsionStrength={2}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        disableAnimation={reducedMotion}
        renderScale={0.7}
        transparent
      />
    </div>
  );
}
