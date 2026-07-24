import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Formations from "@/components/sections/Formations";
import Technologies from "@/components/sections/Technologies";
import Plataforma from "@/components/sections/Plataforma";
import Team from "@/components/sections/Team";
import Bonus from "@/components/sections/Bonus";
import Certificates from "@/components/sections/Certificates";
import SalaryComparison from "@/components/sections/SalaryComparison";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import CtaFinal from "@/components/sections/CtaFinal";
import Footer from "@/components/sections/Footer";
import GuaranteeSection from "@/components/sections/GuaranteeSection";
import Differentials from "@/components/sections/Differentials";
import Projects from "@/components/sections/Projects";
import ParallaxRoot from "@/components/providers/ParallaxRoot";
/** Home: monta todas as seções na ordem do layout de referência. */
export default function Home() {
  return (
    <ParallaxRoot>
      <Header />
      <main>
        <Hero />
        <Formations />
        <Technologies />
        <Differentials />
        <Plataforma />
        <Projects />
        <Testimonials />
        <Team />
        <Bonus />
        <Certificates />
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
    </ParallaxRoot>
  );
}
