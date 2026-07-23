"use client";

import { useEffect, useRef } from "react";

type InteractiveLogoProps = {
  /** Caminho do SVG (deve ser same-origin p/ o canvas poder ler os pixels). */
  src?: string;
  /** Tamanho renderizado do quadrado, em px CSS. */
  size?: number;
  /** Cor das partículas. */
  color?: string;
  /** Espaçamento de amostragem em px de origem — quanto menor, mais partículas. */
  gap?: number;
  /** Raio de influência do cursor, em px CSS. */
  radius?: number;
  className?: string;
};

type P = {
  hx: number; // posição de origem (home)
  hy: number;
  x: number; // posição atual
  y: number;
  vx: number;
  vy: number;
  s: number; // tamanho do "pixel"
};

/**
 * Logo do DevClub renderizada como um campo de partículas em canvas. Cada pixel
 * preenchido do SVG vira uma partícula que é repelida pelo cursor e volta à sua
 * posição de origem por uma mola simples. Respeita `prefers-reduced-motion`
 * (desenha estático) e limpa o rAF/listeners ao desmontar.
 */
export default function InteractiveLogo({
  src = "/devclub-logo.svg",
  size = 200,
  color = "#39d354",
  gap = 5,
  radius = 44,
  className,
}: InteractiveLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let particles: P[] = [];
    let rafId: number | null = null;
    const mouse = { x: -9999, y: -9999, active: false };
    const influence = radius * dpr;
    const influence2 = influence * influence;

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      for (const p of particles) ctx.fillRect(p.hx, p.hy, p.s, p.s);
    };

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      for (const p of particles) {
        // Repulsão pelo cursor (dentro do raio).
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (mouse.active && d2 < influence2 && d2 > 0.001) {
          const d = Math.sqrt(d2);
          const force = ((influence - d) / influence) * 6;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
        // Mola de retorno à origem + atrito.
        p.vx += (p.hx - p.x) * 0.06;
        p.vy += (p.hy - p.y) * 0.06;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      rafId = requestAnimationFrame(frame);
    };

    const build = () => {
      const sample = document.createElement("canvas");
      sample.width = canvas.width;
      sample.height = canvas.height;
      const sctx = sample.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;
      sctx.drawImage(img, 0, 0, sample.width, sample.height);

      const data = sctx.getImageData(0, 0, sample.width, sample.height).data;
      const step = Math.max(2, Math.floor(gap * dpr));
      const built: P[] = [];
      for (let y = 0; y < sample.height; y += step) {
        for (let x = 0; x < sample.width; x += step) {
          if (data[(y * sample.width + x) * 4 + 3] > 128) {
            built.push({
              hx: x,
              hy: y,
              x,
              y,
              vx: 0,
              vy: 0,
              s: step * 0.8,
            });
          }
        }
      }
      particles = built;

      if (prefersReduced) drawStatic();
      else rafId = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    if (img.complete && img.naturalWidth) build();
    else img.onload = build;

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [src, size, color, gap, radius]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="DevClub"
    />
  );
}
