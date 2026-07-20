import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import { AccordionItem } from "@/components/ui/Accordion";

const FAQS = [
  {
    question: "What do I need to get started?",
    answer:
      "Just a conversation. Book a call, tell us about your goals, and we'll map the best AI approach for your business — no technical background required.",
  },
  {
    question: "What kind of AI solutions does Nubien build?",
    answer:
      "Chatbots, predictive analytics, computer vision, speech recognition, automation pipelines and custom AI-powered products, from prototype to production.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects launch within 4 to 8 weeks. Complex enterprise solutions can take longer, but we always ship in incremental milestones so you see progress weekly.",
  },
  {
    question: "Do I need my own data to use AI?",
    answer:
      "Not necessarily. We can start with pre-trained models and public datasets, then improve accuracy over time as your own data accumulates.",
  },
  {
    question: "Can Nubien integrate with my existing tools?",
    answer:
      "Yes. We integrate natively with CRMs, ERPs, communication platforms and any tool with an API — your workflow stays intact.",
  },
  {
    question: "What happens after the project launches?",
    answer:
      "Every plan includes post-launch monitoring and support. We track performance, retrain models when needed, and keep everything running smoothly 24/7.",
  },
];

/** FAQ: lista de perguntas em accordion acessível. */
export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <SectionHeading
          align="left"
          className="lg:sticky lg:top-32"
          badge="FAQ"
          title={
            <>
              Perguntas <TitleContrast>Frequentes</TitleContrast>
            </>
          }
          description="Everything you need to know before starting your AI journey with us."
        />

        <Reveal delay={0.15} className="flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={i === 0}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
