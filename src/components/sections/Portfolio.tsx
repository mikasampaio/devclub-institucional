import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const PROJECTS = [
  {
    year: "2025",
    name: "Aurora Commerce",
    tags: ["AI Integration", "E-Commerce"],
  },
  {
    year: "2024",
    name: "Sentinel Dashboard",
    tags: ["AI Integration", "Responsive Design"],
  },
  {
    year: "2024",
    name: "Vox Assistant",
    tags: ["Responsive Design", "E-Commerce"],
  },
];

/** Portfolio: cards de projeto com ano, nome e tags de categoria. */
export default function Portfolio() {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        badge="Portfolio"
        title={
          <>
            Showcasing Your Best Work
            <br />
            <TitleContrast>with Pure Precision.</TitleContrast>
          </>
        }
        description="A selection of projects where AI met design and delivered measurable results."
      />

      <Reveal delay={0.15} className="mt-8 flex justify-center">
        <Button variant="secondary">View More Works</Button>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08}>
            <Card className="group h-full overflow-hidden p-0">
              {/* Placeholder do screenshot do projeto — troque pela imagem real */}
              <div
                role="img"
                aria-label={`Prévia do projeto ${project.name}`}
                className="h-56 bg-gradient-to-br from-accent/30 via-surface-2 to-accent-deep/40 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <span className="text-xs text-faded">{project.year}</span>
                <h3 className="mt-1 text-lg font-semibold">{project.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
