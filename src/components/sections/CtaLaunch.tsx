import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

/** CTA intermediário: chamada + selo social "200+ Agencies Rated". */
export default function CtaLaunch() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="glow-radial absolute inset-0 rotate-180"
      />

      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          Launch Your Site with Nubien
          <br />
          <span className="text-faded">in a Minutes of Time!</span>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          Skip months of development. Our team gets your AI-powered presence
          live faster than you thought possible.
        </p>
        <div className="mt-8">
          <Button>Book an Appointment</Button>
        </div>

        {/* Selo social */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2" aria-hidden="true">
            {/* Avatares placeholder — troque por fotos reais de clientes */}
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-accent to-accent-deep"
              />
            ))}
          </div>
          <p className="text-sm text-muted">
            <span className="font-semibold text-foreground">200+</span> Agencies
            Rated
          </p>
        </div>
      </Reveal>
    </section>
  );
}
