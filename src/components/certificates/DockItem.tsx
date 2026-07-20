"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from "framer-motion";
import { useRef } from "react";
import type { DockItemData } from "./Dock";

type DockItemProps = DockItemData & {
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
};

/**
 * Item do Dock: cresce por `transform: scale` (não mexe no layout) num slot de
 * tamanho fixo, e mede a proximidade do cursor pelo próprio slot — não pelo
 * tile que escala. É isso que evita o "jitter" do Dock original. A label fica
 * fora do elemento escalado (não cresce junto) e é dirigida por MotionValue.
 */
export default function DockItem({
  icon,
  label,
  onClick,
  onHover,
  className = "",
  style,
  active = false,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  // Ref no SLOT fixo (não no tile que escala) → rect estável, sem realimentação.
  const slotRef = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = slotRef.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - rect.width / 2;
  });

  // Escala (transform) em vez de width/height: não altera o layout, logo os
  // vizinhos não são empurrados e o painel não se re-centraliza.
  const targetScale = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [1, magnification / baseItemSize, 1],
  );
  const scale = useSpring(targetScale, spring);

  // Label: fade/slide suave a partir do hover (0→1), sem estado.
  const labelOpacity = useSpring(isHovered, { stiffness: 300, damping: 30 });
  const labelY = useTransform(labelOpacity, [0, 1], [4, 0]);

  return (
    <div
      ref={slotRef}
      className="dock-slot"
      style={{ width: baseItemSize, height: baseItemSize }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        onHoverStart={() => {
          isHovered.set(1);
          onHover?.(); // hover = select
        }}
        onHoverEnd={() => isHovered.set(0)}
        onFocus={() => {
          isHovered.set(1);
          onHover?.();
        }}
        onBlur={() => isHovered.set(0)}
        // origem embaixo-centro: cresce "pra cima" como um dock.
        style={{ scale, transformOrigin: "50% 100%", ...style }}
        className={`dock-item ${className}`}
        aria-label={label}
        aria-pressed={active}
      >
        {icon}
      </motion.button>

      {/* Label fora do tile escalado → tamanho constante */}
      <motion.span
        role="tooltip"
        style={{ opacity: labelOpacity, y: labelY, x: "-50%" }}
        className="dock-label"
      >
        {label}
      </motion.span>
    </div>
  );
}
