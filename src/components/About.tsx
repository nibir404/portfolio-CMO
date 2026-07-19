import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="about"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="about-grid">
          <div className="about-content fx-stagger">
            <span className="text-eyebrow">A note from the office of the CMO</span>
            <h2 id="about-heading" className="display-section">
              The operator behind the
              <br />
              category-defining work<span className="italic-serif accent">.</span>
            </h2>
            <p className="lead">
              Abdullah Al Alamin is the Chief Marketing Officer of Betopia
              Group and a doctoral AI researcher at Carnegie Mellon. The
              rare combination of an operator who ships and a researcher who
              publishes.
            </p>
            <p>
              Fourteen years across FMCG, building materials, education, and
              conglomerate portfolios have produced a consistent pattern:
              turn ambiguous category positions into compounding brand
              systems, then measure the equity they generate. From a 350%
              growth campaign in forty-five days to a twelve-unit portfolio
              rebuild under public scrutiny, the work is the credential.
            </p>
            <p>
              The doctoral track at Carnegie Mellon exists for a reason.
              Every AI move in market is first pressure-tested in research,
              then deployed with discipline. Generative AI, predictive
              analytics, marketing automation &mdash; shipped, not theorized.
            </p>
            <p className="about-tagline">
              <em>Legacy is Greater than Currency.</em>
              &nbsp;The operating principle behind every mandate the office takes.
            </p>
          </div>

          <figure className="about-portrait fx-scale-in">
            <Image
              src="/images/abdullah1.jpg"
              alt="Abdullah Al Alamin — Group CMO, Betopia Group"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <figcaption className="about-portrait-cap">
              Abdullah Al Alamin · Group CMO, Betopia Group · Dhaka, BD
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}