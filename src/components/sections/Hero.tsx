"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Image from "next/image";

const companies = [
  { name: "Microsoft", logo: "/microsoft.png" },
  { name: "IBM", logo: "/ibm.png" },
  { name: "Bradesco", logo: "/bradesco.png" },
  { name: "BTG Pactual", logo: "/btg_.png" },
  { name: "Nubank", logo: "/nubank-logo-0-1.png" },
  { name: "Stone", logo: "/stone.png" },
  { name: "TOTVS", logo: "/totvs-logo.png" },
  { name: "Vivo", logo: "/vivo.png" },
  { name: "XP", logo: "/xp.png" },

  // Ainda sem imagem
  // { name: "Oracle" },
  // { name: "Accenture" },
  // { name: "Itaú" },
  // { name: "Unimed" },
  // { name: "Avanade" },
  // { name: "Wipro" },
  // { name: "GFT" },
  // { name: "Stefanini" },
  // { name: "Algar" },
  // { name: "Ebanx" },
  // { name: "PagBank" },
  // { name: "Raia Drogasil" },
];
/** Hero: badge, título grande com contraste, subtítulo, CTAs e faixa de logos. */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-36 pb-20 sm:pt-44"
    >
      {/* Glow radial roxo de fundo */}
      <div aria-hidden="true" className="glow-radial absolute inset-0" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge>2025 Next-Gen AI Studio</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
        >
          AI-Driven Success
          <br />
          <span className="text-faded">Redefining the Future.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
        >
          Creating latest solutions that redefine innovation. Stay ahead with
          AI-powered technology for the future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Button>Connect With Us</Button>
          <Button variant="secondary">What is Nubien?</Button>
        </motion.div>

        {/* Faixa de logos com glow roxo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-20 w-full"
        >
          <div
            aria-hidden="true"
            className="absolute -top-16 left-1/2 h-40 w-[120%] -translate-x-1/2 rounded-[100%] bg-accent/25 blur-3xl"
          />
          <div className="relative overflow-hidden border-t border-line py-8 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-20">
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex h-10 items-center justify-center shrink-0"
                >
                  {company.logo ? (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={160}
                      height={50}
                      className="h-10 w-auto object-contain opacity-70 transition duration-300 hover:opacity-100 brightness-0 invert"
                    />
                  ) : (
                    <span className="text-faded text-lg font-semibold uppercase tracking-widest">
                      {company.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
