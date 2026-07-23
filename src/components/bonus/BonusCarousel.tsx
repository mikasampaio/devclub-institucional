"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useEmblaState } from "@/hooks/useEmblaState";
import CarouselArrow from "@/components/team/CarouselArrow";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import { BONUS_CLASSES } from "./bonusClasses";
import BonusClassCard from "./BonusClassCard";

export default function BonusCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    containScroll: "trimSnaps",
  });

  const { canPrev, canNext } = useEmblaState(emblaApi);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      <div className="mx-auto flex max-w-[80rem] items-end justify-between gap-6 px-5">
        <SectionHeading
          badge="Bônus"
          align="left"
          className="flex-1"
          title={
            <>
              Módulos Bônus para te levar
              <br />
              <TitleContrast>mais longe.</TitleContrast>
            </>
          }
        />

        <div className="hidden shrink-0 gap-3 sm:flex">
          <CarouselArrow
            direction="prev"
            onClick={scrollPrev}
            disabled={!canPrev}
            label="Aula bônus anterior"
          />
          <CarouselArrow
            direction="next"
            onClick={scrollNext}
            disabled={!canNext}
            label="Próxima aula bônus"
          />
        </div>
      </div>

      <div ref={emblaRef} className="mt-10 overflow-hidden cursor-grab">
        <div className="flex gap-5">
          {BONUS_CLASSES.map((bonusClass, i) => (
            <div
              key={`${bonusClass.topic}-${i}`}
              className="min-w-0 shrink-0 grow-0 basis-[78%] sm:basis-[42%] lg:basis-[30%] xl:basis-[23%]"
            >
              <BonusClassCard bonusClass={bonusClass} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
