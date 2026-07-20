import { Play } from "lucide-react";

/** Thumbnail compacta para os cards em vídeo do mosaico. */
export default function VideoThumbCompact() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-linear-to-br from-surface-2 via-accent-deep/20 to-surface">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.25),transparent_60%)]"
      />
      <button
        aria-label="Assistir depoimento em vídeo"
        className="group absolute inset-0 flex items-center justify-center"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-linear-to-b from-accent to-accent-deep text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play
            aria-hidden="true"
            className="size-5 translate-x-0.5"
            fill="currentColor"
          />
        </span>
      </button>
    </div>
  );
}
