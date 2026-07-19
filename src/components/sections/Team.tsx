import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const MEMBERS = [
  { name: "Ava Richards", role: "CEO & Founder" },
  { name: "Liam Costa", role: "Head of AI Engineering" },
  { name: "Maya Oliveira", role: "Lead Product Designer" },
  { name: "Noah Ferreira", role: "ML Research Lead" },
  { name: "Sofia Almeida", role: "Growth Strategist" },
  { name: "Ethan Souza", role: "Solutions Architect" },
];

/** Our Team: grid de membros com foto, nome e cargo. */
export default function Team() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        badge="Our Team"
        title={
          <>
            Meet the Team Making
            <br />
            <TitleContrast>Things Happen Every Day</TitleContrast>
          </>
        }
        description="A multidisciplinary crew of engineers, designers and strategists obsessed with results."
      />

      <Reveal delay={0.15} className="mt-8 flex justify-center">
        <Button variant="secondary">View About Reboot</Button>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3">
        {MEMBERS.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.06}>
            <div className="group overflow-hidden rounded-card border border-line bg-surface transition-all duration-300 hover:border-line-strong hover:-translate-y-1">
              {/* Placeholder da foto — troque pela foto real do membro (alt = nome) */}
              <div
                role="img"
                aria-label={`Foto de ${member.name}`}
                className="aspect-square bg-gradient-to-br from-accent/30 via-surface-2 to-accent-deep/40 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-5">
                <h3 className="text-sm font-semibold sm:text-base">{member.name}</h3>
                <p className="mt-1 text-xs text-muted sm:text-sm">{member.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
