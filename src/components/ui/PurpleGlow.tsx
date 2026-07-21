import Image from "next/image";
import { cn } from "@/lib/cn";

type PurpleGlowProps = {
  className?: string;
  /** Pulsação sutil de opacidade (desligada por padrão). */
  animate?: boolean;
};

/**
 * Arco de brilho roxo ancorado na base da section — usa o asset
 * `/public/PurpleGlow.avif`, que já vem com o preto de fundo embutido, então
 * as bordas se fundem com `--color-background` sem precisar de máscara.
 */
export default function PurpleGlow({ className, animate = false }: PurpleGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden",
        className
      )}
    >
      <Image
        src="/PurpleGlow.avif"
        alt=""
        width={2160}
        height={850}
        priority
        className={cn(
          "h-auto w-full translate-y-[38%] object-contain object-bottom",
          animate && "animate-glow-pulse"
        )}
      />
    </div>
  );
}
