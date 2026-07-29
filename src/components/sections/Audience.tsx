import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function Audience() {
  const { audience } = editorial;

  // Custom vector illustrations representing Canvas (01), Studio (02), and IQ (03) in neon lime style
  const illustrations = [
    // Card 1: Canvas (Green grid style)
    <svg key="0" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="12" y="16" width="28" height="36" rx="2" />
      <rect x="24" y="8" width="28" height="36" rx="2" strokeDasharray="3 3" />
      <line x1="18" y1="26" x2="34" y2="26" />
      <line x1="18" y1="36" x2="30" y2="36" />
      <circle cx="40" cy="40" r="1.5" fill="currentColor" />
    </svg>,

    // Card 2: Studio (Pink grid style)
    <svg key="1" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="8" y="24" width="16" height="16" rx="1" />
      <polygon points="36,24 44,40 28,40" />
      <rect x="44" y="12" width="12" height="12" rx="1" />
      <path d="M24 32 H 28" />
      <path d="M36 32 H 44" />
      <path d="M50 24 V 40" strokeDasharray="2 2" />
    </svg>,

    // Card 3: IQ (Blue grid style)
    <svg key="2" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.25">
      <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(30 32 32)" />
      <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(-30 32 32)" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  ];

  return (
    <section className="section-card" id="audience" aria-labelledby="audience-title">
      <Reveal>
        {/* Header Section */}
        <div className="services-header-pipely">
          <div className="services-header-left">
            <span className="kicker" style={{ marginBottom: "12px" }}>{audience.kicker}</span>
            <h2 id="audience-title">For those who aspire</h2>
            <p>Empowering executive brand building, strategic scalability audits, and deep market capture campaigns.</p>
          </div>
          <div className="services-header-right">
            <Link className="btn btn--outline-pipely" href="#contact">
              Join briefing
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Cards Grid */}
      <Reveal>
        <div className="services-deck-pipely">
          {audience.cards.map((card, index) => (
            <article key={card.num} className="service-card-pipely">
              <span className="svc-kicker-pipely">Focus {card.num}</span>
              <h3>{card.title.split(" that ")[0]}</h3>
              <p className="desc">{card.body}</p>
              
              <div className="card-makro-icon">
                {illustrations[index]}
              </div>

              <div className="card-makro-footer" style={{ borderTop: "1px solid var(--color-line)", paddingTop: "20px", marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--color-ink)" }}>Explore {card.num}</span>
                <svg className="arrow-icon-makro" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-accent)" }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// WCAG AAA definitions: SDG = Sustainable Development Goals