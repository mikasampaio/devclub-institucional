import { cn } from "@/lib/cn";

type BottomFadeProps = {
  className?: string;
};

/**
 * Fade para `--color-background` na base da section — dilui o corte seco de
 * raios de luz, glows e bordas antes da próxima section começar.
 */
export default function BottomFade({ className }: BottomFadeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent h-24 z-[10]",
        className,
      )}
    />
  );
}
