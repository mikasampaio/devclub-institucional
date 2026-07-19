import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const TESTIMONIALS = [
  {
    quote:
      "Nubien transformed our data chaos into a predictive engine. Revenue forecasting is finally something we trust.",
    name: "Julia Mendes",
    role: "COO",
    company: "Brightline Retail",
  },
  {
    quote:
      "The chatbot they built handles 80% of our support tickets. Our team now focuses on what actually matters.",
    name: "Carlos Nunes",
    role: "Head of CX",
    company: "Portico Bank",
  },
  {
    quote:
      "From kickoff to launch in six weeks. The speed and quality of delivery genuinely surprised us.",
    name: "Renata Lopes",
    role: "Founder",
    company: "Kavia Studio",
  },
  {
    quote:
      "Their computer vision pipeline cut our quality-control costs in half. The ROI was visible in the first quarter.",
    name: "Diego Martins",
    role: "Operations Director",
    company: "Altura Manufacturing",
  },
  {
    quote:
      "Working with Nubien feels like having an in-house AI team — responsive, sharp and always one step ahead.",
    name: "Fernanda Rocha",
    role: "CMO",
    company: "Vela Travel",
  },
  {
    quote:
      "They didn't just deliver a product; they taught our team how to think about AI strategically.",
    name: "André Silveira",
    role: "CTO",
    company: "Nexo Health",
  },
];

/** Testimonial: glow tipo holofote + grid de depoimentos. */
export default function Testimonials() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-32">
      {/* Glow roxo forte tipo holofote */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-96 w-[80%] -translate-x-1/2 rounded-[100%] bg-accent/25 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          badge="Testimonial"
          title={
            <>
              What Our Clients Say
              <br />
              <TitleContrast>About Reboot&apos;s Excellence</TitleContrast>
            </>
          }
          description="Real stories from teams that trusted us with their AI journey."
        />

        <Reveal delay={0.15} className="mt-8 flex justify-center">
          <Button>Book An Appointment</Button>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 0.06}>
              <Card className="flex h-full flex-col">
                <Stars />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  {/* Avatar placeholder — troque pela foto real */}
                  <span
                    aria-hidden="true"
                    className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-deep"
                  />
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted">
                      {testimonial.role} — {testimonial.company}
                    </p>
                  </div>
                </footer>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex gap-1" aria-label="Avaliação: 5 de 5 estrelas">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-accent-soft"
        >
          <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
        </svg>
      ))}
    </div>
  );
}
