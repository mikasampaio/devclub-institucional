import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const SERVICES = [
  {
    category: "Development",
    title: "AI-Powered Development",
    description:
      "Custom software built with intelligence at its core, from MVP to enterprise.",
  },
  {
    category: "Conversational",
    title: "AI Chatbots",
    description:
      "24/7 assistants that understand context and speak your brand's language.",
  },
  {
    category: "Data",
    title: "Predictive Analytics",
    description:
      "Forecast demand, churn and revenue with models trained on your data.",
  },
  {
    category: "Vision",
    title: "Computer Vision Solutions",
    description:
      "Detection, classification and OCR pipelines ready for production.",
  },
  {
    category: "Audio",
    title: "Speech Recognition",
    description:
      "Transcription and voice interfaces with best-in-class accuracy.",
  },
  {
    category: "Automation",
    title: "AI-Driven Automation",
    description:
      "Automate repetitive workflows and free your team for what matters.",
  },
];

const SPECIALTIES = [
  "AI Content Generation",
  "Cybersecurity",
  "UX/UI Optimization",
  "Data Insight",
  "Analytics",
  "Personalization",
  "Data Analysis",
  "Lead Generation",
];

/** Services: grid de cards de serviço + tags de especialidades. */
export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        badge="Services"
        title={
          <>
            AI-Powered Services for
            <br />
            <TitleContrast>Future-Driven Businesses</TitleContrast>
          </>
        }
        description="Our cutting-edge AI solutions are designed to transform businesses across every industry."
      />

      <Reveal delay={0.15} className="mt-8 flex justify-center">
        <Button variant="secondary">Book a 15-min call</Button>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.06}>
            <Card className="h-full">
              {/* Placeholder visual do serviço — troque pela imagem/ilustração real */}
              <div
                aria-hidden="true"
                className="mb-5 h-36 rounded-xl border border-line bg-gradient-to-br from-accent/25 via-surface-2 to-accent-deep/30"
              />
              <span className="text-xs font-medium uppercase tracking-widest text-accent-soft">
                {service.category}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Tags de especialidades */}
      <Reveal delay={0.2} className="mt-12 flex flex-wrap justify-center gap-3">
        {SPECIALTIES.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line bg-white/[0.04] px-4 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-foreground"
          >
            {tag}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
