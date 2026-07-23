/* -------------------------------------------------------------------------- */
/* Constantes de animação compartilhadas pelos mockups de Diferenciais         */
/* -------------------------------------------------------------------------- */

// Mesmo easing usado nas demais seções (Reveal / GuaranteeSection).
export const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Viewport padrão: dispara uma vez, com folga para não animar cedo demais.
export const VIEWPORT = { once: true, margin: "-80px" } as const;
