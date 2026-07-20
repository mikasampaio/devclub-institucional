"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useEmblaState } from "@/hooks/useEmblaState";
import Reveal from "@/components/ui/Reveal";
import { TESTIMONIALS } from "./testimonials";
import Author from "./Author";
import VideoThumb from "./VideoThumb";
import NavArrow from "./NavArrow";

/**
 * Versão carrossel dos depoimentos. Embla é headless: controla só a mecânica
 * de scroll/snap; markup e estilo continuam nossos. O estado (índice, limites
 * das setas) vem do hook compartilhado `useEmblaState` (useSyncExternalStore),
 * sem setState em effect — respeitando o lint. Ver [[lint-react-compiler-rules]].
 */
export default function CarrosselView() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });

  const { selectedIndex, scrollSnaps, canPrev, canNext } =
    useEmblaState(emblaApi);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <Reveal>
      <div className="relative">
        {/* Wrapper relativo só do viewport, para ancorar as máscaras laterais */}
        <div className="relative">
          {/* Viewport — recebe a ref do Embla e faz o clip do overflow */}
          <div ref={emblaRef} className="overflow-hidden">
            {/* Container — a faixa flex que o Embla desloca */}
            <div className="flex gap-5">
              {TESTIMONIALS.map((t) => (
                <article
                  key={t.name}
                  className="min-w-0 shrink-0 grow-0 basis-[88%] sm:basis-160 lg:basis-220"
                >
                  <div className="flex h-full flex-col gap-6 overflow-hidden rounded-card border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:p-8 lg:flex-row lg:items-center">
                    {/* Texto do depoimento */}
                    <div className="flex flex-1 flex-col">
                      <blockquote className="text-lg leading-relaxed text-foreground sm:text-xl">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <Author t={t} className="mt-8" />
                    </div>

                    {/* Mídia — thumbnail de vídeo ou placeholder */}
                    <VideoThumb featured={t.featured} />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Máscaras laterais: fade da cor de fundo sobre as bordas, escondendo
              o "corte" do card que espia na próxima posição. pointer-events-none
              para não bloquear o arrasto. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-background to-transparent sm:w-16 lg:w-24"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-background to-transparent sm:w-16 lg:w-24"
          />
        </div>

        {/* Controles: setas + dots de paginação */}
        <div className="mt-6 flex items-center justify-center gap-5">
          <NavArrow direction="prev" onClick={scrollPrev} disabled={!canPrev} />

          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Ir para o depoimento ${i + 1}`}
                aria-current={i === selectedIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-6 bg-accent-soft"
                    : "w-2 bg-line-strong hover:bg-muted"
                }`}
              />
            ))}
          </div>

          <NavArrow direction="next" onClick={scrollNext} disabled={!canNext} />
        </div>
      </div>
    </Reveal>
  );
}
