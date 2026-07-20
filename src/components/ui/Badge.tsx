import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

type BadgeProps = {
  children: ReactNode;
  /** Ícone Lucide (ou qualquer node) exibido dentro do círculo roxo. */
  icon?: ReactNode;
  className?: string;
};

/**
 * "Dotted Highlight Tag": pílula com círculo de ícone em gradiente,
 * texto esmaecido, blue line no topo e overlay cônico sutil.
 */
export default function Badge({ children, icon, className = "" }: BadgeProps) {
  return (
    <span
      className={`relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/5 bg-[linear-gradient(to_bottom,rgba(79,26,214,0.08),rgba(153,153,153,0.10))] py-1.5 pl-1.5 pr-4 backdrop-blur-[2px] ${className}`}
    >
      {/* Blue line — brilho fino que atravessa o topo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[62%] -translate-x-1/2 bg-[linear-gradient(to_right,rgba(79,26,214,0),#4F1AD6,rgba(0,85,255,0))]"
      />

      {/* Gradient overlay — reflexo cônico sutil sobre todo o badge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_0deg,rgba(255,255,255,0.15),rgba(255,255,255,0),rgba(79,26,214,0.20),rgba(255,255,255,0),rgba(255,255,255,0.15))] opacity-20"
      />

      {/* Círculo do ícone */}
      <span className="relative z-10 flex size-7.25 shrink-0 items-center justify-center rounded-full border-2 border-white/15 bg-[linear-gradient(to_bottom,#4F1AD6,#8059E3)] text-white">
        {icon ?? <ShieldCheck aria-hidden="true" className="size-3.25" strokeWidth={2} />}
      </span>

      {/* Texto com esmaecimento no final */}
      <span className="relative z-10 whitespace-nowrap bg-[linear-gradient(to_right,#ffffff_55%,rgba(153,153,153,10))] bg-clip-text text-[16px] font-normal leading-6.5 tracking-[-0.5px] text-transparent">
        {children}
      </span>
    </span>
  );
}
