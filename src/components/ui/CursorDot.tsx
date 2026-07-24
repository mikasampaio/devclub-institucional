"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Cursor global: um dot que persegue o mouse com leve atraso (quickTo) e fica
 * junto do cursor nativo em toda a tela.
 *
 * Performance: quickTo escreve direto no transform via GSAP, sem re-render.
 * Só ativa em ponteiros finos (mouse); em "reduzir movimento" segue sem easing.
 */
export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        fine: "(pointer: fine)",
        smooth: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { fine, smooth } = context.conditions as {
          fine: boolean;
          smooth: boolean;
        };
        // Sem ponteiro fino (touch) não há cursor a seguir.
        if (!fine) return;

        gsap.set(dot, { xPercent: -50, yPercent: -50 });

        const duration = smooth ? 0.6 : 0;
        const xTo = gsap.quickTo(dot, "x", { duration, ease: "power3" });
        const yTo = gsap.quickTo(dot, "y", { duration, ease: "power3" });

        const onMove = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
          // Revela só no primeiro movimento, evitando o flash no canto (0,0).
          gsap.set(dot, { autoAlpha: 1 });
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
      },
    );
  });

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-9999 h-3 w-3 rounded-full bg-white opacity-0 mix-blend-difference"
    />
  );
}
