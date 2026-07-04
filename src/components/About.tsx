import Image from "next/image";

const focus = [
  "Entrepreneurship",
  "Digital Transformation",
  "Innovation",
  "Leadership",
  "Technology",
  "Ecosystem Building",
  "Strategic Advisory",
  "Public Speaking",
];

export default function About() {
  return (
    <section id="about" className="about snap-section" aria-labelledby="about-heading">
      <div className="container">
        <div className="chapter-h reveal">
          <span className="num">02</span>
          <span className="name">The Visionary</span>
        </div>

        <div className="about-grid">
          <div className="about-image parallax-img reveal">
            <Image
              src="/images/ab5.jpg"
              alt="Abdullah Al Amin — professional portrait"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="about-body">
            <h2 id="about-heading" className="display-section reveal">
              A Visionary Innovator &amp; Transformation Leader.
            </h2>

            <div style={{ marginTop: "var(--space-4)" }}>
              <p className="lead reveal">
                Abdullah Al Amin is a multifaceted entrepreneur, strategic
                thinker, and digital transformation leader — dedicated to
                reshaping how organizations operate in the digital age.
              </p>

              <p className="reveal" style={{ transitionDelay: "100ms" }}>
                Over the years, he has built and scaled multiple ventures —
                focusing on long-term value creation, sustainable growth, and
                meaningful impact. His work bridges traditional business models
                with emerging technologies, helping organizations and
                communities navigate the future with confidence.
              </p>

              <p className="reveal" style={{ transitionDelay: "200ms" }}>
                He believes entrepreneurship is not merely about building
                companies — it is about building ecosystems that empower people
                and create lasting change.
              </p>
            </div>

            <div className="about-signature reveal">Abdullah Al Amin</div>

            <div style={{ marginTop: "var(--space-5)" }}>
              <div className="text-eyebrow reveal" style={{ marginBottom: "var(--space-3)" }}>
                Areas of Focus
              </div>
              <div className="focus-grid reveal-stagger">
                {focus.map((f) => (
                  <button key={f} className="focus-pill" data-cursor-hover>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}