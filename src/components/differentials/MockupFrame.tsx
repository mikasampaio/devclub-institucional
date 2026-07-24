import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/* Mockups — ilustrações leves feitas só com div/SVG + Tailwind                */
/* -------------------------------------------------------------------------- */

/**
 * Container comum dos mockups: painel escuro translúcido que funciona sobre
 * qualquer uma das 4 cores de card, com borda sutil e cantos arredondados.
 */
export default function MockupFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-black/25 p-5 backdrop-blur-sm sm:p-6">
      {children}
    </div>
  );
}
