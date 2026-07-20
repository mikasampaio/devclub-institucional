"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useEmblaState } from "@/hooks/useEmblaState";
import { CERTIFICATES } from "./certificates";
import CertificateCard from "./CertificateCard";
import Dock, { type DockItemData } from "./Dock";

/**
 * Carrossel de certificados: mostra o card atual centralizado e uma fatia dos
 * vizinhos. Abaixo, um Dock (React Bits) funciona como abas — passar o mouse
 * ou clicar navega o carrossel e o item do card ativo fica colorido.
 *
 * O estado do Embla (índice ativo) é lido via `useEmblaState`
 * (useSyncExternalStore) para respeitar o lint do projeto — sem setState em
 * effect. Ver [[lint-react-compiler-rules]].
 */
export default function CertificateCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    // "center" mantém o card ativo no meio da tela. `containScroll: false` é
    // essencial: o default do Embla é "trimSnaps", que apara o espaço vazio das
    // pontas e gruda o primeiro/último card na borda. Com `false`, o Embla
    // permite esse espaço e o primeiro/último também ficam centralizados.
    align: "center",
    loop: false,
    containScroll: false,
  });

  const { selectedIndex } = useEmblaState(emblaApi);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  // Itens do Dock derivados dos certificados: ícone do curso + navegação.
  // O item ativo recebe a cor do curso (mantém a paleta dos chips antigos).
  const dockItems: DockItemData[] = CERTIFICATES.map((certificate, i) => {
    const Icon = certificate.icon;
    const active = i === selectedIndex;
    return {
      icon: <Icon aria-hidden="true" className="size-6" strokeWidth={1} />,
      label: certificate.course,
      onClick: () => scrollTo(i),
      onHover: () => scrollTo(i), // hover = select
      active,
      style: active
        ? {
            backgroundColor: certificate.theme.chip,
            borderColor: "transparent",
            color: certificate.theme.ink,
          }
        : undefined,
    };
  });

  return (
    <div>
      {/*
        Viewport — clipa o overflow e o container é a faixa que o Embla desloca.
        No desktop, `mx-[calc(50%-50vw)]` estende as DUAS bordas até as bordas da
        tela (full-bleed): o carrossel ocupa a largura toda e os cards vizinhos
        espiam dos dois lados do card centralizado.
      */}
      <div className="relative md:mx-[calc(50%-50vw)]">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-5">
            {CERTIFICATES.map((certificate) => (
              <div
                key={certificate.id}
                // Um card por vez no mobile; no desktop, centralizado com peek
                // dos dois lados (largura relativa à tela por causa do bleed).
                className="min-w-0 shrink-0 grow-0 basis-full md:basis-[80%] lg:basis-[62%] xl:basis-[52%]"
              >
                <CertificateCard certificate={certificate} />
              </div>
            ))}
          </div>
        </div>

        {/* Máscaras laterais: fade da cor de fundo sobre as bordas da tela,
            escondendo o "corte" dos cards que sangram. Só no desktop (no
            mobile é um card por vez, sem peek). pointer-events-none p/ não
            bloquear o arrasto. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-linear-to-r from-background to-transparent md:block lg:w-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-linear-to-l from-background to-transparent md:block lg:w-32"
        />
      </div>

      {/* Dock (abas): magnificação no hover + label; item ativo colorido */}
      <div className="mt-10">
        <Dock
          items={dockItems}
          baseItemSize={60}
          magnification={84}
          panelHeight={72}
          dockHeight={150}
          distance={160}
        />
      </div>
    </div>
  );
}
