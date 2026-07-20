import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const SUPPORT_ITEMS = [
  {
    title: "Fast Responses",
    description:
      "Get answers within minutes, not days — our team is always online.",
    icon: <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />,
  },
  {
    title: "Expert Guidance",
    description:
      "Talk directly with AI specialists who know your project inside out.",
    icon: (
      <path d="M12 2a7 7 0 00-7 7c0 2.4 1.2 4.5 3 5.7V17a2 2 0 002 2h4a2 2 0 002-2v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 00-7-7zM9 21h6" />
    ),
  },
  {
    title: "Continuous Help",
    description:
      "Ongoing support and monitoring long after your product ships.",
    icon: <path d="M12 22a10 10 0 110-20 10 10 0 010 20zm0-14v4l3 3" />,
  },
];

/** Support 24/7: três diferenciais com ícone + título + descrição. */
export default function Support() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        badge="24/7 Support"
        title={
          <>
            Here When You
            <br />
            <TitleContrast>Need Us Most Important.</TitleContrast>
          </>
        }
        description="Around-the-clock assistance so your business never stops moving forward."
      />

      <Reveal delay={0.15} className="mt-8 flex justify-center">
        <Button variant="secondary">View About Reboot</Button>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {SUPPORT_ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <Card className="h-full text-center">
              <span
                aria-hidden="true"
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-line bg-accent/15 text-accent-soft"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
