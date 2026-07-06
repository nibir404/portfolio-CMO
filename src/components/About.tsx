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
            <span className="text-eyebrow">/01 · Origin</span>
            <h2 id="about-heading" className="display-section">
              A Brand Architect at the Intersection of
              <br />
              Marketing &amp; AI<span className="italic-serif accent">.</span>
            </h2>
            <p className="lead">
              Bangladesh-based Chief Marketing Officer and brand architect
              with 14+ years engineering category-defining brands across
              FMCG, building materials, education, and technology.
            </p>
            <p className="about-tagline">
              &ldquo;Legacy is Greater than Currency.&rdquo;
            </p>
            <p>
              That principle shapes every campaign, crisis response, and
              strategy &mdash; from stadium-scale FMCG activations to national
              television and government speaking. As <strong>Group CMO of
              Betopia</strong> and a <strong>doctoral researcher in AI at
              Carnegie Mellon</strong>, he sits where research becomes
              practice: generative AI, predictive analytics, and marketing
              automation, shipped.
            </p>
          </div>

          <figure className="about-portrait fx-scale-in">
            <Image
              src="/images/abdullah1.jpg"
              alt="Abdullah Al Alamin — editorial portrait"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <figcaption className="about-portrait-cap">
              Abdullah Al Alamin · Dhaka, BD
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}