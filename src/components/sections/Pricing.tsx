import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const PLANS = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small teams taking their first steps with AI.",
    metrics: ["2 projects", "4 revisions"],
    benefits: [
      "AI consultation calls",
      "Basic chatbot setup",
      "Email support",
      "Monthly performance report",
    ],
    featured: false,
  },
  {
    name: "Professional",
    price: "$599",
    description: "For growing agencies that need full AI power on demand.",
    metrics: ["8 projects", "Unlimited revisions"],
    benefits: [
      "Everything in Starter",
      "Custom AI model training",
      "Predictive analytics dashboard",
      "Priority 24/7 support",
      "Dedicated project manager",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$2,599",
    description: "Tailored solutions with dedicated infrastructure and SLAs.",
    metrics: ["Unlimited projects", "Unlimited revisions"],
    benefits: [
      "Everything in Professional",
      "On-premise deployment",
      "Custom integrations",
      "Security & compliance audit",
      "Quarterly strategy sessions",
    ],
    featured: false,
  },
];

/** Pricing: 3 planos, com o Professional destacado como "Most Pick". */
export default function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading
        badge="Pricing"
        title={
          <>
            Flexible Plans for Every Need—
            <br />
            <TitleContrast>Perfect for Agencies, and Startups.</TitleContrast>
          </>
        }
        description="Choose the plan that fits your stage — upgrade or downgrade anytime."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.08} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-card border p-7 transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "border-accent/60 bg-surface-2 shadow-[0_0_48px_rgba(124,58,237,0.25)]"
                  : "border-line bg-surface hover:border-line-strong"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  Most Pick
                </span>
              )}

              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted">/month</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {plan.description}
              </p>

              {/* Métricas do plano */}
              <div className="mt-5 flex gap-3">
                {plan.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-line bg-white/[0.04] px-3 py-1 text-xs text-muted"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                {plan.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2.5 text-sm text-muted"
                  >
                    <CheckIcon />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Button
                  variant={plan.featured ? "primary" : "secondary"}
                  className="w-full"
                >
                  Book an Appointment
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-accent-soft"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
