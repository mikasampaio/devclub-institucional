"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import CtaButton from "@/components/diferenciais/CtaButton";
import { EASE, VIEWPORT } from "@/components/diferenciais/constants";
import { cards, ILLUSTRATIONS } from "@/components/diferenciais/cards";

export default function Diferencials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col gap-14 px-5">
        <SectionHeading
          badge="Diferenciais"
          title={
            <>
              Tudo que você precisa{" "}
              <TitleContrast>além do código</TitleContrast>
              <br />
              para evoluir mais rápido
            </>
          }
          description="Muito além das aulas: carreira, saúde mental, mentoria e suporte para você chegar mais longe, mais rápido."
        />

        <div className="flex flex-col gap-6 sm:gap-8">
          {cards.map((card, i) => {
            const Illustration = ILLUSTRATIONS[card.illustration];
            const reverse = i % 2 === 1; // alterna o lado da ilustração

            return (
              <motion.article
                key={card.id}
                className={cn(
                  "grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[2rem] p-8 text-white sm:p-10 md:grid-cols-2 md:gap-12 md:p-12",
                  card.bg,
                )}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {/* Texto — sempre primeiro no DOM (leitura/acessibilidade) */}
                <div
                  className={cn("flex flex-col gap-5", reverse && "md:order-2")}
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                    {card.group}
                  </span>
                  <h3 className="text-2xl font-medium leading-tight tracking-tight text-balance sm:text-3xl">
                    {card.title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-white/85">
                    {card.description}
                  </p>
                  <CtaButton />
                </div>

                {/* Ilustração — abaixo no mobile, alterna de lado no desktop */}
                <div className={cn(reverse && "md:order-1")}>
                  <Illustration />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
