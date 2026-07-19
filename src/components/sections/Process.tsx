import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const STEPS = [
  {
    number: "01",
    title: "Discover Insights",
    description:
      "We dive deep into your business, data and goals to map the highest-impact AI opportunities.",
  },
  {
    number: "02",
    title: "Develop Solutions",
    description:
      "Our team designs, builds and trains tailored AI solutions with rapid iteration cycles.",
  },
  {
    number: "03",
    title: "Deploy Success",
    description:
      "We launch, monitor and continuously optimize so results keep compounding over time.",
  },
];

/** Our Process: 3 passos numerados. */
export default function Process() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        badge="Our Process"
        title={
          <>
            Our Proven Process
            <br />
            <TitleContrast>for AI-Driven Success</TitleContrast>
          </>
        }
        description="With years of innovation and refinement, we keep every step clear and every deliverable on time."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.08}>
            <Card className="h-full">
              <span className="text-sm font-bold tracking-widest text-accent-soft">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
