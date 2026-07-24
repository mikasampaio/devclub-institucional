"use client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PurpleGlow from "@/components/ui/PurpleGlow";
import BottomFade from "@/components/ui/BottomFade";
import CodeEnvironment from "@/components/sections/CodeEnvironment";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";

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

const students = [
  "/professionals/1.jpg",
  "/professionals/2.jpg",
  "/professionals/3.jpg",
  "/professionals/4.jpg",
  "/professionals/5.jpg",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-26 pb-20 sm:pt-32"
    >
      {/* Glow radial roxo de fundo */}
      <div aria-hidden="true" className="glow-radial absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 text-center">
        <div className="animate-hero-in">
          <Badge>A Escola das Profissões do Futuro</Badge>
        </div>

        <h1 className="mt-6 animate-hero-in text-3xl font-medium leading-[1.1] tracking-tight [animation-delay:100ms] sm:text-6xl lg:text-7xl">
          Do zero à primeira vaga
          <br />
          <span className="text-faded">em tecnologia.</span>
        </h1>

        <p className="mt-6 max-w-lg animate-hero-in text-base leading-relaxed text-muted [animation-delay:200ms] sm:text-lg">
          Aprenda a programar com uma metodologia prática, projetos reais e
          mentoria de quem já vive o mercado de tecnologia.
        </p>

        <div className="flex items-center gap-4">
          <div className="mt-8 flex animate-hero-in flex-col gap-3 [animation-delay:300ms] sm:flex-row">
            <Button
              variant="secondary"
              className="bg-white! text-black!"
              icon={<ChevronsRight size={16} />}
              onClick={() =>
                document
                  .getElementById("formacoes")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Saiba mais
            </Button>
          </div>

          <div className="mt-10 flex animate-hero-in items-center gap-3 [animation-delay:400ms]">
            <div className="flex -space-x-3">
              {students.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={36}
                  height={36}
                  className="size-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <p className="text-left text-sm leading-tight">
              <span className="font-semibold text-foreground">
                +25 mil alunos
              </span>
              <br />
              <span className="text-white">já passaram por aqui</span>
            </p>
          </div>
        </div>

        {/* Ambiente de código com rotação 3D no scroll + brilho roxo acima */}
        <div className="relative w-full">
          <PurpleGlow className="bottom-auto top-0 -translate-y-1/2" animate />
          <div className="relative z-10">
            <CodeEnvironment />
          </div>
        </div>

        {/* Faixa de logos com glow roxo */}
        <div className="relative mt-20 w-full animate-hero-fade [animation-delay:500ms]">
          <div className="flex flex-col gap-5 relative overflow-hidden border-t border-line py-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <p className="text-xl">Alunos nas maiores empresas do Brasil e do mundo:</p>

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
        </div>
      </div>
    </section>
  );
}
