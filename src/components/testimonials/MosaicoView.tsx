import Reveal from "@/components/ui/Reveal";
import { TESTIMONIALS } from "./testimonials";
import Author from "./Author";
import VideoThumbCompact from "./VideoThumbCompact";

/** Versão mosaico (masonry) dos depoimentos. */
export default function MosaicoView() {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {TESTIMONIALS.map((t, i) => (
        <Reveal
          key={t.name}
          delay={(i % 3) * 0.06}
          className="mb-5 break-inside-avoid"
        >
          <div className="flex flex-col gap-5 rounded-card border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface-2">
            {t.featured && <VideoThumbCompact />}
            <blockquote className="text-sm leading-relaxed text-muted">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <Author t={t} className="border-t border-line pt-5" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
