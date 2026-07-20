"use client";

import { useMotionValue, type SpringOptions } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

import DockItem from "./DockItem";
import "./Dock.css";

/**
 * Dock (React Bits) adaptado ao projeto:
 *  - Importa de `framer-motion` (não `motion/react`) para não duplicar lib.
 *  - Magnificação por `transform: scale` em slot fixo (ver DockItem) — evita o
 *    "jitter" do original, que animava width/height e re-centralizava tudo.
 *  - Cada item aceita `style` para colorir o chip ativo mantendo a paleta.
 */

export type DockItemData = {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  /** Dispara ao passar o mouse/focar — usado para "hover = select". */
  onHover?: () => void;
  className?: string;
  style?: CSSProperties;
  active?: boolean;
};

type DockProps = {
  items: DockItemData[];
  className?: string;
  spring?: SpringOptions;
  magnification?: number;
  distance?: number;
  baseItemSize?: number;
  /** Mantidos por compatibilidade de API do React Bits (não usados aqui). */
  panelHeight?: number;
  dockHeight?: number;
};

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.2, stiffness: 170, damping: 18 },
  magnification = 78,
  distance = 130,
  baseItemSize = 56,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  // Altura fixa que acomoda o tile escalado + a label (sem animar a altura,
  // evitando "pulos" verticais no hover).
  const containerHeight = magnification + 56;

  return (
    <div className="dock-outer" style={{ height: containerHeight }}>
      <div
        onMouseMove={({ pageX }) => mouseX.set(pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`dock-panel ${className}`}
        role="toolbar"
        aria-label="Navegação dos certificados"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            {...item}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          />
        ))}
      </div>
    </div>
  );
}
