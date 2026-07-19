import type { ReactNode } from "react";
import Badge from "./Badge";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  badge: string;
  /** Título; use <TitleContrast> para o trecho em cinza apagado */
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

/** Cabeçalho de seção: badge + título grande + descrição. */
export default function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <Reveal className={`flex flex-col gap-5 ${alignment} ${className}`}>
      <Badge>{badge}</Badge>
      <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-muted">{description}</p>
      )}
    </Reveal>
  );
}

/** Trecho do título com contraste apagado (efeito branco forte / cinza). */
export function TitleContrast({ children }: { children: ReactNode }) {
  return <span className="text-faded">{children}</span>;
}
