import { Play } from "lucide-react";

/** Thumbnail de vídeo com botão de play (placeholder — troque pela mídia real).
 *  Versão grande usada nos cards do carrossel. */
export default function VideoThumb({ featured }: { featured?: boolean }) {
  return (
    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl border border-line bg-linear-to-br from-surface-2 via-accent-deep/20 to-surface lg:aspect-square lg:w-72">
      {/* textura sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.25),transparent_60%)]"
      />
      <button
        aria-label={featured ? "Assistir depoimento em vídeo" : "Ver depoimento"}
        className="group absolute inset-0 flex items-center justify-center"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-linear-to-b from-secondary to-secondary-deep text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play
            aria-hidden="true"
            className="size-6 translate-x-0.5"
            fill="currentColor"
          />
        </span>
      </button>
    </div>
  );
}
