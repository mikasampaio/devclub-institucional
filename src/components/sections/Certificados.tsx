import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import CertificateCarousel from "@/components/certificates/CertificateCarousel";

/** Certificados: carrossel de cards oficiais navegável por chips de curso. */
export default function Certificados() {
  return (
    <section
      id="certificados"
      className="mx-auto max-w-6xl px-5 py-24 sm:py-32"
    >
      <SectionHeading
        badge="Certificação"
        title={
          <>
            Escola Reconhecida pelo MEC e com{" "}
            <TitleContrast>Diplomas Oficiais</TitleContrast>
          </>
        }
      />

      <Reveal delay={0.15} className="mt-14">
        <CertificateCarousel />
      </Reveal>
    </section>
  );
}
