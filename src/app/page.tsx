import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Accomplishments from "@/components/Accomplishments";
import Awards from "@/components/Awards";
import Expertise from "@/components/Expertise";
import Education from "@/components/Education";
import Media from "@/components/Media";
import BeyondWork from "@/components/BeyondWork";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SiteInit from "@/components/SiteInit";

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Accomplishments />
        <Awards />
        <Expertise />
        <Education />
        <Media />
        <BeyondWork />
        <Contact />
      </main>
      <Footer />
      <SiteInit />
    </>
  );
}