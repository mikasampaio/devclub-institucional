import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

/** Badge pill com ícone + texto, fundo semi-transparente e borda sutil. */
export default function Badge({ children, icon, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-muted backdrop-blur-sm ${className}`}
    >
      {icon ?? <SparkIcon />}
      {children}
    </span>
  );
}

function SparkIcon() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-accent-soft"
    >
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
    </svg>
  );
}
