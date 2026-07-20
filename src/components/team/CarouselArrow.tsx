import { ArrowLeft, ArrowRight } from "lucide-react";

/** Seta de navegação do carrossel — reutilizada nos dois sentidos. */
export default function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isNext ? "Próximo mentor" : "Mentor anterior"}
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
