import Image from "next/image";

const services = [
  {
    n: "/01",
    title: "AI & MarTech Integration",
    desc: "Embedding generative AI, predictive analytics, and marketing automation into brand and growth strategy — turning the research track at Carnegie Mellon into shipped work.",
  },
  {
    n: "/02",
    title: "Brand Strategy & Architecture",
    desc: "Building brand systems that scale across multiple business units, geographies, and product lines — designed to compound over the next decade.",
  },
  {
    n: "/03",
    title: "Corporate & Crisis Communication",
    desc: "Protecting and rebuilding reputation under pressure — from product recalls to industry-wide narrative shifts.",
  },
  {
    n: "/04",
    title: "Digital Transformation",
    desc: "Modernizing legacy marketing operations for FMCG, industrial, and education brands — without losing the brand equity that took years to build.",
  },
  {
    n: "/05",
    title: "Public & Media Relations",
    desc: "National press, television, and government/ambassador-level engagement — opening doors that closed campaigns can't.",
  },
  {
    n: "/06",
    title: "Market Intelligence & Analytics",
    desc: "14+ years of on-ground FMCG and building-materials research paired with data-driven consumer insight — GA4, Looker, Meta Marketing Analytics.",
  },
  {
    n: "/07",
    title: "International Brand Positioning",
    desc: "Expanding partnerships and reputation on the global stage — including the 'Branding Bangladesh' address to government dignitaries and ambassadors.",
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="expertise" aria-labelledby="expertise-heading">
      <div className="container">
        <div className="expertise-grid">
          <div className="expertise-head">
            <span className="text-eyebrow chapter-h">
              <span className="num">/05</span>
              <span className="name">What I Do</span>
            </span>
            <h2 id="expertise-heading" className="display-section">
              Capabilities<span className="italic-serif accent">.</span>
            </h2>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.65 }}>
              Capabilities a company would actually buy.
            </p>
            <figure className="expertise-portrait fx-scale-in">
              <Image
                src="/images/10.jpg"
                alt="Abdullah Al Alamin — boardroom"
                fill
                sizes="(min-width: 1024px) 320px, 90vw"
              />
            </figure>
          </div>

          <div className="expertise-list fx-stagger">
            {services.map((s) => (
              <div className="expertise-row" key={s.n}>
                <span className="expertise-row-n">{s.n}</span>
                <div>
                  <h3 className="expertise-row-title">{s.title}</h3>
                  <p className="expertise-row-desc">{s.desc}</p>
                </div>
                <span className="expertise-row-arrow" aria-hidden="true">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="expertise-approach fx-fade-up" style={{ marginTop: "var(--space-5)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--line)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-3)" }}>
            <div>
              <span className="text-eyebrow" style={{ display: "block", marginBottom: "var(--space-2)" }}>Engagement</span>
              <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                Fractional CMO mandates &middot; board advisory &middot; 90-day growth sprints
              </p>
            </div>
            <div>
              <span className="text-eyebrow" style={{ display: "block", marginBottom: "var(--space-2)" }}>Sectors</span>
              <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                FMCG &middot; building materials &middot; education &middot; technology &middot; conglomerates
              </p>
            </div>
            <div>
              <span className="text-eyebrow" style={{ display: "block", marginBottom: "var(--space-2)" }}>Geography</span>
              <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                Bangladesh &middot; South Asia &middot; APAC &middot; GCC partnerships
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}