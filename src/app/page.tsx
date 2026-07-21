"use client";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Formacoes from "@/components/sections/Formacoes";
import Tecnologias from "@/components/sections/Tecnologias";
import Plataforma from "@/components/sections/Plataforma";
import Team from "@/components/sections/Team";
import Bonus from "@/components/sections/Bonus";
import Certificados from "@/components/sections/Certificados";
import SalaryComparison from "@/components/sections/SalaryComparison";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import CtaFinal from "@/components/sections/CtaFinal";
import Footer from "@/components/sections/Footer";
import GalaxyLoader from "@/components/GalaxyLoader";
import GuaranteeSection from "@/components/sections/GuaranteeSection";
import Diferencials from "@/components/sections/Diferencials";
import Projects from "@/components/sections/Projects";
import { ParallaxProvider } from "react-scroll-parallax";
/** Home: monta todas as seções na ordem do layout de referência. */
export default function Home() {
  return (
    <ParallaxProvider>
      <Header />
      <main>
        <Hero />
        <Formacoes />
        <Tecnologias />
        <Diferencials />
        <Plataforma />
        <Projects />
        <Testimonials />
        <Team />
        <Bonus />
        <Certificados />
        <SalaryComparison />
        <GuaranteeSection
          title="E se eu não curtir?"
          description="Experimente sem risco. Se nos primeiros dias você sentir que não é pra você, devolvemos 100% do seu investimento — sem burocracia e sem perguntas."
          days={7}
        />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </ParallaxProvider>
  );
}
