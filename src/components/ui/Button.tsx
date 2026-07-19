import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base = "inline-flex items-center justify-center cursor-pointer transition-all";

const variants = {
  /* Primário: gradiente roxo com anel de glow no hover */
  primary:
    "gap-2.5 overflow-hidden rounded-[10px] border-[3px] border-transparent bg-gradient-to-b from-[rgb(79,26,214)] to-[rgb(128,89,227)] bg-origin-border px-[18px] py-2.5 font-display text-base font-medium text-white shadow-[0_0_0_0_rgba(79,26,214,0.3)] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/15 hover:shadow-[0_0_0_5px_rgba(79,26,214,0.3)]",
  /* Secundário: glass translúcido com borda leve */
  secondary:
    "gap-2 rounded-xl border border-line-strong bg-white/[0.05] px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm duration-300 hover:bg-white/[0.1] hover:-translate-y-0.5",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
