import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const FEATURES = [
  {
    title: "Seamless API Integrations",
    description:
      "Connect your favorite tools and platforms without friction or extra code.",
  },
  {
    title: "Trusted Authentication",
    description:
      "Enterprise-grade security keeping your data and users protected at all times.",
  },
  {
    title: "AI-Speech Recognition",
    description:
      "Turn voice into insight with accurate, real-time speech processing.",
  },
  {
    title: "Real-Time Data",
    description:
      "Live dashboards and instant updates so you never work with stale numbers.",
  },
  {
    title: "Vision Capabilities",
    description:
      "Computer vision that reads, detects and understands images at scale.",
  },
  {
    title: "Optimized UX/UI",
    description:
      "Interfaces designed for clarity, speed and delightful interaction.",
  },
  {
    title: "Predictive Analytics",
    description:
      "Anticipate trends and make smarter decisions with AI-driven forecasts.",
  },
];

/* Tags flutuantes do marquee de palavras-chave */
const FLOATING_TAGS = [
  "Data Analysis",
  "Chatbots",
  "Capabilities",
  "Infrastructure",
  "Intelligent",
  "Cognitive",
];

/** Features: grid de recursos + marquee infinito de tags. */
export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        badge="Features"
        title={
          <>
            Packed with <TitleContrast>Innovation.</TitleContrast>
          </>
        }
        description="Every tool you need to build, launch and scale AI-powered products — in one place."
      />

      {/* Marquee de tags flutuantes */}
      <Reveal delay={0.15} className="mt-14">
        <div className="overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-4">
            {/* Duplicado para o loop infinito */}
            {[...FLOATING_TAGS, ...FLOATING_TAGS].map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="rounded-full border border-line bg-surface px-5 py-2 text-sm text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Grid de recursos */}
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 0.06}>
            <Card className="h-full">
              <FeatureIcon />
              <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeatureIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-accent/15 text-accent-soft"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
      </svg>
    </span>
  );
}
