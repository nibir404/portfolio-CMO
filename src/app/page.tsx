import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import CaseStudies from "@/components/CaseStudies";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Impact from "@/components/Impact";
import DesignNotes from "@/components/DesignNotes";
import Personal from "@/components/Personal";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SiteInit from "@/components/SiteInit";

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main">
        {/* 1. HOOK — who & why */}
        <Hero />

        {/* 2. ORIGIN — the man behind the work */}
        <About />

        {/* 3. ANCHORS — years, ventures, lives impacted */}
        <Stats />

        {/* 4. MANDATES — real engagements (pinned horizontal) */}
        <CaseStudies />

        {/* 5. DISCIPLINE — how he operates */}
        <Personal />

        {/* 6. CRAFT — what he delivers (pinned horizontal) */}
        <Services />

        {/* 7. METHOD — the engagement model (pinned horizontal) */}
        <Process />

        {/* 8. REACH — outcomes, ideas, voice */}
        <Impact />
        <DesignNotes />

        {/* 9. INVITATION — book the call */}
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
      <SiteInit />
    </>
  );
}