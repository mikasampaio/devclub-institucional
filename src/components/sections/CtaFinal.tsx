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
          Ready to Elevate Your Brand
          <br />
          <span className="text-faded">with Next-Gen Innovation?</span>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          Become a part of us — join hundreds of businesses already building the
          future with Nubien&apos;s AI expertise.
        </p>
        <div className="mt-8">
          <Button>Book an Appointment</Button>
        </div>
      </Reveal>
    </section>
  );
}
