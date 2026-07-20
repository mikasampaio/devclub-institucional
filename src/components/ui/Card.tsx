import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

/** Card glassmorphism leve: fundo elevado, borda sutil, cantos grandes. */
export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`rounded-card border border-line bg-surface p-6 transition-all duration-300 ${
        hover
          ? "hover:border-line-strong hover:bg-surface-2 hover:-translate-y-1"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
