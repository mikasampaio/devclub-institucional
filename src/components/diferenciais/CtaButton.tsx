import type { ReactNode } from "react";
import { ChevronsRight } from "lucide-react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/* CTA reutilizável — pílula clara com ícone de seta dupla                     */
/* -------------------------------------------------------------------------- */

export default function CtaButton({
  children = "Saiba mais",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "group/cta inline-flex items-center gap-2 self-start rounded-full",
        "bg-white px-6 py-3 text-sm font-semibold text-neutral-900",
        "shadow-lg transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
      <ChevronsRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
      />
    </button>
  );
}
