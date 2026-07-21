import { ArrowLeft, ArrowRight } from "lucide-react";

/** Seta de navegação do carrossel — reutilizada nos dois sentidos. */
export default function CarouselArrow({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  /** aria-label customizado — default cobre o uso no carrossel de mentores. */
  label?: string;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label ?? (isNext ? "Próximo mentor" : "Mentor anterior")}
      className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface/70 text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-2 disabled:pointer-events-none disabled:opacity-30"
    >
      {isNext ? (
        <ArrowRight aria-hidden="true" className="size-5" />
      ) : (
        <ArrowLeft aria-hidden="true" className="size-5" />
      )}
    </button>
  );
}
