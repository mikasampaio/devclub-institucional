import Reveal from "@/components/ui/Reveal";
import { TESTIMONIALS } from "./testimonials";
import Author from "./Author";
import VideoThumbCompact from "./VideoThumbCompact";

export default function MosaicoView() {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {TESTIMONIALS.map((t, i) => (
        <Reveal
          key={t.name}
          delay={(i % 3) * 0.06}
          className="mb-5 break-inside-avoid"
        >
          <div className="relative flex flex-col gap-5 rounded-card border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-px w-[62%] -translate-x-1/2 bg-[linear-gradient(to_right,rgba(79,26,214,0),#4F1AD6,rgba(0,85,255,0))]"
            />

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
