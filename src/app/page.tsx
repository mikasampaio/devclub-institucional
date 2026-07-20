import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Formacoes from "@/components/sections/Formacoes";
import Tecnologias from "@/components/sections/Tecnologias";
import Plataforma from "@/components/sections/Plataforma";
import Features from "@/components/sections/Features";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Support from "@/components/sections/Support";
import AboutNubien from "@/components/sections/AboutNubien";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import CtaLaunch from "@/components/sections/CtaLaunch";
import Team from "@/components/sections/Team";
import Certificados from "@/components/sections/Certificados";
import Comparison from "@/components/sections/Comparison";
import SalaryComparison from "@/components/sections/SalaryComparison";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import CtaFinal from "@/components/sections/CtaFinal";
import Footer from "@/components/sections/Footer";
import GalaxyLoader from "@/components/GalaxyLoader";
import GuaranteeSection from "@/components/sections/GuaranteeSection";
/** Home: monta todas as seções na ordem do layout de referência. */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* <GalaxyLoader/> */}
        <Hero />
        {/* <About /> */}
        <Formacoes />
        <Tecnologias />
        <Plataforma />
        <Testimonials />

        <Team />
        <Certificados />
        <SalaryComparison />
        <GuaranteeSection
          title="E se eu não curtir?"
          description="Experimente sem risco. Se nos primeiros dias você sentir que não é pra você, devolvemos 100% do seu investimento — sem burocracia e sem perguntas."
          days={15}
        />
        <Faq />

        <Features />
        <Services />
        <Portfolio />
        <Support />
        <AboutNubien />
        <Pricing />
        <Process />
        <CtaLaunch />
        <Comparison />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
