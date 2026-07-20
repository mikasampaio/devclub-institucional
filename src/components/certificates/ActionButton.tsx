import type { ReactNode } from "react";
import type { Certificate } from "./certificates";

type ActionButtonProps = {
  children: ReactNode;
  label: string;
  theme: Certificate["theme"];
  onClick?: () => void;
  square?: boolean;
};

/**
 * Botão de ação circular do cabeçalho do card (fundo escuro semitransparente
 * sobre a cor viva) com tooltip acima no hover/foco.
 */
export default function ActionButton({
  children,
  label,
  theme,
  onClick,
  square = false,
}: ActionButtonProps) {
  return (
    // `group` + `relative` para posicionar o tooltip acima no hover/foco.
    <span className="group relative inline-flex">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        // Fundo escuro semitransparente sobre a cor viva; escurece no hover.
        className={`flex size-9 cursor-pointer items-center justify-center bg-black/15 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-black/30 ${
          square ? "rounded-lg" : "rounded-full"
        }`}
        style={{ color: theme.ink }}
      >
        {children}
      </button>

      {/* Tooltip: pílula escura acima do botão, aparece no hover e no foco */}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/85 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
