"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor global: um dot que segue o mouse instantaneamente e um anel que o
 * persegue com leve atraso (lerp). Fica junto do cursor nativo em toda a tela.
 *
 * Performance: posiciona via `transform` direto no DOM (refs), sem re-render.
 * Só ativa em ponteiros finos (mouse) e respeita "reduzir movimento".
 */
export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let raf = 0;

    const place = (el: HTMLElement | null, x: number, y: number) => {
      if (el) {
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      place(dotRef.current, mouse.x, mouse.y);
    };

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;
      raf = requestAnimationFrame(tick);
    };

    // Posição inicial no centro para evitar salto do canto (0,0).
    place(dotRef.current, mouse.x, mouse.y);

    window.addEventListener("mousemove", onMove, { passive: true });
    if (!reduceMotion) raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-white mix-blend-difference"
      />
    </>
  );
}
