import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const BLOCKS = [
  {
    title: "Advanced AI, Streamlined Design",
    description:
      "Powerful models wrapped in interfaces that anyone can use. We turn complex intelligence into simple, elegant experiences.",
    tags: ["Machine Learning", "Design Systems"],
  },
  {
    title: "Effortless Customization for Your Brand",
    description:
      "Every color, component and interaction adapts to your identity — no rebuilds, no compromises, just your brand amplified.",
    tags: ["White Label", "Theming"],
  },
  {
    title: "Future-Proof and Scalable Solutions",
    description:
      "Architecture built to grow with you, from the first hundred users to millions, without missing a beat.",
    tags: ["Cloud Native", "Scalability"],
  },
];

/** About Nubien: 3 blocos alternados texto/imagem. */
export default function AboutNubien() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        badge="About Nubien"
        title={
          <>
            AI Meets Design,
            <br />
            <TitleContrast>Purpose Into Ideas!</TitleContrast>
          </>
        }
        description="We blend engineering and aesthetics to turn ambitious ideas into products people love."
        align="left"
      />

      <div className="mt-14 flex flex-col gap-16">
        {BLOCKS.map((block, i) => {
          const reversed = i % 2 === 1;
          return (
            <Reveal key={block.title}>
              <div
                className={`flex flex-col items-center gap-8 lg:gap-14 ${
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                {/* Placeholder da imagem do bloco — troque pela foto real */}
                <div
                  role="img"
                  aria-label={`Ilustração: ${block.title}`}
                  className="h-64 w-full rounded-card border border-line bg-gradient-to-br from-accent/25 via-surface-2 to-accent-deep/35 lg:h-72 lg:w-1/2"
                />
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl font-semibold sm:text-3xl">
                    {block.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {block.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {block.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-white/[0.04] px-4 py-1.5 text-sm text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="mt-14 flex justify-center">
        <Button>Book an Appointment</Button>
      </Reveal>
    </section>
  );
}
