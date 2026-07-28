import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

const GrowthIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-accent)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const AIIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-accent)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const BrandIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-accent)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-accent)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const challenges = [
  {
    title: "Growth has plateaued or slowed",
    description: "I build predictable customer acquisition systems, optimize customer acquisition costs (CAC), and structure commercial pipelines to sustain long-term expansion.",
    icon: GrowthIcon,
  },
  {
    title: "AI feels overwhelming or disconnected",
    description: "I design practical AI integrations that automate repetitive manual tasks, restructure team operating models, and improve decision velocity.",
    icon: AIIcon,
  },
  {
    title: "Brand positioning is outdated or weak",
    description: "I reposition brand equity as a commercial instrument to drive pricing power, protect gross margins, and command category leadership.",
    icon: BrandIcon,
  },
  {
    title: "International expansion feels complex or risky",
    description: "I prepare regional category leaders to translate their value proposition, build credibility, and secure cross-border partnerships in South Asia, APAC, and the GCC.",
    icon: GlobeIcon,
  },
];

export function Challenges() {
  return (
    <section
      className="exec-section exec-section--surface"
      id="challenges"
      aria-labelledby="challenges-title"
    >
      <Container>
        <div className="split">
          <div style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
            <span className="eyebrow">Challenges & Client Fit</span>
            <h2
              id="challenges-title"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", lineHeight: "1.15", fontWeight: 600 }}
            >
              The structural friction standing between you and market leadership.
            </h2>
            <div className="card" style={{ padding: "var(--space-5)", marginTop: "var(--space-4)" }}>
              <span
                className="eyebrow"
                style={{ color: "var(--color-accent)", marginBottom: "var(--space-2)", display: "block" }}
              >
                Who I Help
              </span>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: "1.6",
                  color: "var(--color-ink-soft)",
                  margin: 0,
                }}
              >
                I partner with <strong>CEOs, founders, chairmen, managing directors, and investors</strong> of mid-market companies and conglomerates who are ready to transform their business and prepare for the next decade of digital-first, AI-driven competition.
              </p>
            </div>
            <div style={{ marginTop: "var(--space-4)" }}>
              <ButtonLink href="/contact" variant="primary">
                Resolve Your Bottlenecks
              </ButtonLink>
            </div>
          </div>
          <div style={{ display: "grid", gap: "var(--space-4)" }}>
            {challenges.map((challenge, idx) => {
              const Icon = challenge.icon;
              return (
                <div key={challenge.title} className="card" style={{ padding: "var(--space-5)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-accent)" }}>
                      0{idx + 1}
                    </span>
                    <Icon />
                  </div>
                  <h3 style={{ fontSize: "1.25rem", margin: "var(--space-2) 0 var(--space-2) 0", fontWeight: 600 }}>
                    {challenge.title}
                  </h3>
                  <p style={{ margin: 0, color: "var(--color-ink-soft)", fontSize: "0.96rem", lineHeight: "1.6" }}>
                    {challenge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

// WCAG AAA definitions: AI = Artificial Intelligence, APAC = Asia-Pacific, GCC = Gulf Cooperation Council
