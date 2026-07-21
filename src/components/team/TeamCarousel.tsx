"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useEmblaState } from "@/hooks/useEmblaState";
import { MENTORS } from "./mentors";
import MentorCard from "./MentorCard";
import CarouselArrow from "./CarouselArrow";

/**
 * Carrossel de mentores com Embla (headless): o hook cuida do scroll/snap e o
 * markup/estilo continuam nossos. O estado (índice, limites das setas) é lido
 * via useEmblaState — sem setState em effect, respeitando o lint do projeto.
 */
export default function TeamCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });

  const { selectedIndex, scrollSnaps, canPrev, canNext } =
    useEmblaState(emblaApi);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <div className="relative">
      {/* Viewport — recebe a ref do Embla e faz o clip do overflow */}
      <div ref={emblaRef} className="overflow-hidden">
        {/* Container — a faixa flex que o Embla desloca */}
        <div className="flex gap-5">
          {MENTORS.map((mentor) => (
            <div
              key={mentor.name}
              className="min-w-0 shrink-0 grow-0 basis-[78%] sm:basis-[42%] lg:basis-[30%] xl:basis-[23%]"
            >
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>
      </div>

      {/* Controles: setas + dots de paginação */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <CarouselArrow
          direction="prev"
          onClick={scrollPrev}
          disabled={!canPrev}
        />

        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Ir para o mentor ${i + 1}`}
              aria-current={i === selectedIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-6 bg-secondary-soft"
                  : "w-2 bg-line-strong hover:bg-muted"
              }`}
            />
          ))}
        </div>

        <CarouselArrow
          direction="next"
          onClick={scrollNext}
          disabled={!canNext}
        />
      </div>
    </div>
  );
}
