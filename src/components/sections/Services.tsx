import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function Services() {
  const { services } = editorial;

  return (
    <section className="section-card" id="services" aria-labelledby="services-title">
      {/* Top Split Header */}
      <Reveal>
        <div className="services-header-pipely">
          <div className="services-header-left">
            <span className="kicker" style={{ marginBottom: "12px" }}>{services.kicker}</span>
            <h2 id="services-title">Explore our service offerings</h2>
            <p>
              Focused on corporate growth, deep commercial scaling, and applied AI governance models to ensure long-term, sustainable market leadership.
            </p>
          </div>
          <div className="services-header-right">
            <Link className="btn btn--lime" href="#contact">
              Get Started
            </Link>
          </div>
        </div>
      </Reveal>

      {/* 3-Column Service Card Deck */}
      <Reveal>
        <div className="services-deck-pipely services-deck-pipely--2x2">
          {services.items.map((svc) => (
            <article key={svc.num} className="service-card-pipely" style={{ minHeight: "220px" }}>
              <span className="svc-kicker-pipely">Framework {svc.num}</span>
              <h3 style={{ margin: "0 0 12px 0" }}>{svc.title}</h3>
              <p className="desc" style={{ fontSize: "14px", color: "var(--color-ink-soft)", lineHeight: "1.6", margin: 0 }}>
                {svc.what}
              </p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <p className="svc-footnote" style={{ marginTop: "40px", fontSize: "13px", color: "var(--color-ink-soft)", borderTop: "1px solid var(--color-line)", paddingTop: "24px" }}>
          {services.footnote}
        </p>
      </Reveal>
    </section>
  );
}

// WCAG AAA definitions: P&L = Profit and Loss, AI = Artificial Intelligence,
// APAC = Asia-Pacific, GCC = Gulf Cooperation Council, SDG = Sustainable Development Goals,
// CMO = Chief Marketing Officer