import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { TitleContrast } from "@/components/ui/SectionHeading";
import { AccordionItem } from "@/components/ui/Accordion";
import BottomFade from "@/components/ui/BottomFade";

const FAQS = [
  {
    question: "Qual é o tempo de acesso à plataforma",
    answer:
      "Você terá acesso por 12 meses completos a todo o conteúdo da Formação DevClub, incluindo as atualizações e novos módulos que forem sendo liberados durante esse período.",
  },
  {
    question: "Preciso ter algum conhecimento prévio sobre programação",
    answer:
      "Não! O DevClub foi criado para iniciantes. Começamos do zero absoluto e vamos avançando gradualmente, sempre com didática clara e prática.",
  },
  {
    question: "Qual sistema de pagamento utilizado? É seguro?",
    answer:
      "Utilizamos a Hotmart, uma das maiores plataformas de produtos digitais do Brasil. É 100% seguro e você pode pagar via cartão de crédito, boleto, PIX ou PayPal.",
  },
  {
    question: "Como funciona a garantia?",
    answer:
      "Você tem 7 dias de garantia incondicional. Se por qualquer motivo você não gostar do curso, basta solicitar o reembolso que devolvemos 100% do seu investimento.",
  },
  {
    question: "Como eu assisto às aulas?",
    answer:
      "As aulas ficam disponíveis na nossa área de membros, que você pode acessar de qualquer dispositivo com internet. Assista quando e onde quiser.",
  },
];

/** FAQ: lista de perguntas em accordion acessível. */
export default function Faq() {
  return (
    <section
      id="faq"
      className="relative mx-auto max-w-[80%] overflow-hidden px-12 my-24 py-24 rounded-2xl border border-line border-b-0 sm:py-32"
    >
      {/* Raios de luz — mesma imagem estática usada em Team */}
      <Image
        src="/light_rays.avif"
        alt=""
        fill
        className="pointer-events-none object-cover object-top mix-blend-screen"
      />

      <BottomFade />

      <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:justify-start lg:gap-16">
        <SectionHeading
          align="left"
          className="lg:sticky lg:top-32"
          badge="FAQ"
          title={
            <>
              Perguntas <TitleContrast>Frequentes</TitleContrast>
            </>
          }
          description="Tudo o que você precisa saber antes de começar sua jornada conosco."
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
