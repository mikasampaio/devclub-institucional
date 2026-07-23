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

/** Card de suporte: avatar da equipe + CTA verde para o WhatsApp. */
function SupportCard() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-surface-2/90 p-6 backdrop-blur-sm sm:p-7">
      <Image
        src="/professionals/1.jpg"
        alt="Atendente da equipe de suporte"
        width={56}
        height={56}
        className="size-14 rounded-full object-cover ring-2 ring-line-strong"
      />
      <p className="text-lg font-semibold text-foreground">
        Se ainda estiver com dúvidas <br /> nossa equipe está a disposição:
      </p>

      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 self-start rounded-full bg-secondary px-6 py-3 font-display text-base font-semibold text-background transition-all duration-300 hover:bg-secondary-soft hover:-translate-y-0.5"
      >
        Falar com o suporte
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="size-5"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.358.101 11.94c0 2.096.549 4.142 1.595 5.945L0 24l6.304-1.654a11.94 11.94 0 005.71 1.454h.005c6.582 0 11.94-5.358 11.944-11.94a11.86 11.86 0 00-3.443-8.411" />
        </svg>
      </a>
    </div>
  );
}

export default function Faq() {
  return (
    <section
      id="faq"
      className="relative mx-6 max-w-360 overflow-hidden px-5 py-16 sm:px-8 sm:py-20  my-24 rounded-2xl border border-line border-b-0 xl:mx-auto"
    >
      <Image
        src="/light_rays.avif"
        alt=""
        fill
        className="pointer-events-none object-cover object-top mix-blend-screen"
      />

      <BottomFade />

      <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:justify-start lg:gap-16">
        <div className="flex justify-between items-start flex-col gap-8 lg:sticky lg:top-32">
          <SectionHeading
            align="left"
            badge="FAQ"
            title={
              <>
                Perguntas <TitleContrast>Frequentes</TitleContrast>
              </>
            }
            description="Tudo o que você precisa saber antes de começar sua jornada conosco."
          />

          <SupportCard />
        </div>

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
