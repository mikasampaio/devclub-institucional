"use client";

import { LayoutGrid, GalleryHorizontalEnd } from "lucide-react";

export type ViewMode = "carrossel" | "mosaico";

/** Segmented control que alterna entre as visualizações carrossel e mosaico. */
export default function ViewToggle({
  view,
  onChange,
}: {
  view: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  const options: {
    id: ViewMode;
    label: string;
    icon: typeof GalleryHorizontalEnd;
  }[] = [
    { id: "carrossel", label: "Carrossel", icon: GalleryHorizontalEnd },
    { id: "mosaico", label: "Mosaico", icon: LayoutGrid },
  ];

  return (
    <div
      role="tablist"
      aria-label="Modo de visualização dos depoimentos"
      className="inline-flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1 backdrop-blur-sm"
    >
      {options.map(({ id, label, icon: Icon }) => {
        const active = view === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              active
                ? "bg-linear-to-b from-accent to-accent-deep text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                : "text-muted hover:text-foreground"
            }`}
          >
            <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
