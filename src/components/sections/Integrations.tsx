import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

/* Ferramentas integradas — troque as iniciais pelos SVGs/logos reais */
const TOOLS = [
  "Slack",
  "Notion",
  "Figma",
  "GitHub",
  "Zapier",
  "Stripe",
  "HubSpot",
  "Linear",
  "Drive",
  "Discord",
  "Shopify",
  "OpenAI",
];

/** Integrations: grid de ícones/logos de ferramentas. */
export default function Integrations() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        badge="Integrations"
        title={
          <>
            Seamless Integrations for
            <br />
            <TitleContrast>Maximum Efficiency.</TitleContrast>
          </>
        }
        description="Nubien connects natively with the tools your team already uses every day."
      />

      <Reveal delay={0.15} className="mt-8 flex justify-center">
        <Button variant="secondary">View About Reboot</Button>
      </Reveal>

      <Reveal delay={0.2} className="mt-14">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {TOOLS.map((tool) => (
            <div
              key={tool}
              className="group flex flex-col items-center gap-3 rounded-card border border-line bg-surface py-8 transition-all duration-300 hover:border-line-strong hover:bg-surface-2 hover:-translate-y-1"
            >
              {/* Placeholder do logo — troque pelo SVG oficial da ferramenta */}
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-lg font-bold text-accent-soft"
              >
                {tool[0]}
              </span>
              <span className="text-xs text-muted group-hover:text-foreground">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
