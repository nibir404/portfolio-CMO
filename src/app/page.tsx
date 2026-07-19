import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedIn from "@/components/FeaturedIn";
import About from "@/components/About";
import HeadlineImpact from "@/components/HeadlineImpact";
import Transformations from "@/components/Transformations";
import Initiatives from "@/components/Initiatives";
import LeadershipGallery from "@/components/LeadershipGallery";
import OperatingPrinciples from "@/components/OperatingPrinciples";
import Insights from "@/components/Insights";
import OnStage from "@/components/OnStage";
import Recognition from "@/components/Recognition";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SiteInit from "@/components/SiteInit";

export default function Page() {
  return (
    <>
      <Navigation />
      <main id="main">
        {/* 1. Hero — Who is he? Executive opening. */}
        <Hero />

        {/* 2. Featured In — Should I trust him? Press, publications, podcasts. */}
        <FeaturedIn />

        {/* 3. Letter from the CMO — What's his point of view? */}
        <About />

        {/* 4. Headline Impact — What has he achieved? The proof. */}
        <HeadlineImpact />

        {/* 5. Business Transformations — What businesses has he rebuilt? */}
        <Transformations />

        {/* 6. Strategic Initiatives — What's he building now? */}
        <Initiatives />

        {/* 7. Leadership Gallery — What's it like working with him? */}
        <LeadershipGallery />

        {/* 8. Operating Principles — How does he think? */}
        <OperatingPrinciples />

        {/* 9. Content Hub — What does he publish? */}
        <Insights />

        {/* 10. On Stage — Where does he speak? */}
        <OnStage />

        {/* 11. Recognition — What has he won? */}
        <Recognition />

        {/* 12. Education in Brief — Where did he study? */}
        <Education />

        {/* 13. Engage — How do I reach the Office of the CMO? */}
        <Contact />
      </main>
      <Footer />
      <SiteInit />
    </>
  );
}