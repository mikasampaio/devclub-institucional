import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import TeamCarousel from "@/components/team/TeamCarousel";
import BottomFade from "@/components/ui/BottomFade";

/** Professores: carrossel de mentores com card que revela a bio no "+". */
export default function Team() {
  return (
    <section className="relative mx-auto overflow-hidden py-24">
      {/* Glow roxo forte */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-96 w-[80%] -translate-x-1/2 rounded-[100%]  blur-[120px]"
      />

      {/* Raios de luz */}
      <Image
        src="/light_rays.avif"
        alt=""
        fill
        priority
        className="pointer-events-none object-cover object-top mix-blend-screen"
      />

      <BottomFade />

      <div className="relative z-10">
        <SectionHeading
          badge="Professores"
          title={
            <>
              Aprenda com os <TitleContrast>Melhores</TitleContrast>
            </>
          }
          description="Mentores que já viveram o mercado e vão te guiar do primeiro código à primeira vaga."
        />

        <Reveal delay={0.15} className="mt-14">
          <TeamCarousel />
        </Reveal>
      </div>
    </section>
  );
}
