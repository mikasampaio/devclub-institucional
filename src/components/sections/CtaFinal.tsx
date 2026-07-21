import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

/** CTA final: chamada para virar parte do time/cliente. */
export default function CtaFinal() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-24 sm:py-32"
    >
      {/* Glow radial roxo de fundo */}
      <div aria-hidden="true" className="glow-radial absolute inset-0" />

      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          Pronto para transformar
          <br />
          <span className="text-faded">sua carreira em tecnologia?</span>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          Junte-se a mais de 25 mil alunos que já mudaram de vida com o DevClub.
          Comece hoje sua jornada do zero ao profissional.
        </p>
        <div className="mt-8">
          <Button>Quero ser aluno</Button>
        </div>
      </Reveal>
    </section>
  );
}
