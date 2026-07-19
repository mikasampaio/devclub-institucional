import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Support from "@/components/sections/Support";
import AboutNubien from "@/components/sections/AboutNubien";
import Integrations from "@/components/sections/Integrations";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import CtaLaunch from "@/components/sections/CtaLaunch";
import Team from "@/components/sections/Team";
import Comparison from "@/components/sections/Comparison";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import CtaFinal from "@/components/sections/CtaFinal";
import Footer from "@/components/sections/Footer";
import GalaxyLoader from "@/components/GalaxyLoader"
/** Home: monta todas as seções na ordem do layout de referência. */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* <GalaxyLoader/> */}
        <Hero />
        <About />
        <Features />
        <Services />
        <Portfolio />
        <Support />
        <AboutNubien />
        <Integrations />
        <Pricing />
        <Process />
        <CtaLaunch />
        <Team />
        <Comparison />
        <Testimonials />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
