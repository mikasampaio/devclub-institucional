import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import TeamCarousel from "@/components/team/TeamCarousel";

/** Professores: carrossel de mentores com card que revela a bio no "+". */
export default function Team() {
  return (
    <section className="mx-auto py-24">
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
    </section>
  );
}
