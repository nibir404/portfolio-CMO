import { Container } from "@/components/ui/Container";

const challenges = [
  {
    title: "Growth has plateaued or slowed",
    description: "I build predictable customer acquisition systems, optimize customer acquisition costs (CAC), and structure commercial pipelines to sustain long-term expansion.",
  },
  {
    title: "AI feels overwhelming or disconnected",
    description: "I design practical AI integrations that automate repetitive manual tasks, restructure team operating models, and improve decision velocity.",
  },
  {
    title: "Brand positioning is outdated or weak",
    description: "I reposition brand equity as a commercial instrument to drive pricing power, protect gross margins, and command category leadership.",
  },
  {
    title: "International expansion feels complex or risky",
    description: "I prepare regional category leaders to translate their value proposition, build credibility, and secure cross-border partnerships in South Asia, APAC, and the GCC.",
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
          </div>
          <div style={{ display: "grid", gap: "var(--space-4)" }}>
            {challenges.map((challenge, idx) => (
              <div key={challenge.title} className="card" style={{ padding: "var(--space-5)" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-accent)" }}>
                  0{idx + 1}
                </span>
                <h3 style={{ fontSize: "1.25rem", margin: "var(--space-1) 0 var(--space-2) 0", fontWeight: 600 }}>
                  {challenge.title}
                </h3>
                <p style={{ margin: 0, color: "var(--color-ink-soft)", fontSize: "0.96rem", lineHeight: "1.6" }}>
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// WCAG AAA definitions: AI = Artificial Intelligence, APAC = Asia-Pacific, GCC = Gulf Cooperation Council

