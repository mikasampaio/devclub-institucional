import { useCallback, useRef, useSyncExternalStore } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export type EmblaState = {
  selectedIndex: number;
  scrollSnaps: number[];
  canPrev: boolean;
  canNext: boolean;
};

const EMBLA_DEFAULT: EmblaState = {
  selectedIndex: 0,
  scrollSnaps: [],
  canPrev: false,
  canNext: false,
};

/**
 * Lê o estado do Embla via useSyncExternalStore: o carrossel é a store externa,
 * `subscribe` liga/desliga os eventos e `getSnapshot` deriva os valores na hora.
 * O snapshot é memoizado (mesma referência quando nada muda) para não disparar
 * renders em loop — e evita o `setState`-em-effect que o lint do projeto proíbe.
 */
export function useEmblaState(
  emblaApi: EmblaCarouselType | undefined,
): EmblaState {
  const snapshotRef = useRef<EmblaState>(EMBLA_DEFAULT);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on("select", onStoreChange).on("reInit", onStoreChange);
      return () => {
        emblaApi.off("select", onStoreChange).off("reInit", onStoreChange);
      };
    },
    [emblaApi],
  );

  const getSnapshot = useCallback((): EmblaState => {
    if (!emblaApi) return EMBLA_DEFAULT;
    const next: EmblaState = {
      selectedIndex: emblaApi.selectedScrollSnap(),
      scrollSnaps: emblaApi.scrollSnapList(),
      canPrev: emblaApi.canScrollPrev(),
      canNext: emblaApi.canScrollNext(),
    };
    const prev = snapshotRef.current;
    if (
      prev.selectedIndex === next.selectedIndex &&
      prev.canPrev === next.canPrev &&
      prev.canNext === next.canNext &&
      prev.scrollSnaps.length === next.scrollSnaps.length
    ) {
      return prev;
    }
    snapshotRef.current = next;
    return next;
  }, [emblaApi]);

  // getServerSnapshot: no SSR não há Embla — devolve o default estável.
  return useSyncExternalStore(subscribe, getSnapshot, () => EMBLA_DEFAULT);
}
