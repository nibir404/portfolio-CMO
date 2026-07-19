import Image from "next/image";

/* Operating principles — not skills, not tools. Decisions an executive stakes P&L on. */
const principles = [
  {
    n: "/01",
    title: "Brand is a financial instrument.",
    desc:
      "Every campaign must answer to a balance-sheet question. Equity, retention, and preference are measured like any other line item.",
  },
  {
    n: "/02",
    title: "Compounding beats virality.",
    desc:
      "The work that wins a quarter is forgettable. The work that compounds across decades is what builds a category &mdash; and a legacy.",
  },
  {
    n: "/03",
    title: "AI is a craft tool, not a strategy.",
    desc:
      "Generative AI, predictive analytics, and marketing automation extend the operator. They do not replace the operator's taste or judgment.",
  },
  {
    n: "/04",
    title: "Reputation is rebuilt in public.",
    desc:
      "Crisis communication is not a press release. It is a long, disciplined, evidence-led narrative shift &mdash; earned in front of every stakeholder.",
  },
  {
    n: "/05",
    title: "Research and practice should talk.",
    desc:
      "The doctoral track at Carnegie Mellon exists so every AI move in market is first pressure-tested in research, then deployed with discipline.",
  },
  {
    n: "/06",
    title: "Geography is a category.",
    desc:
      "Operating across Bangladesh, South Asia, APAC, and GCC partnerships changes the strategy. The market does not flatten across borders &mdash; it thickens.",
  },
  {
    n: "/07",
    title: "Senior leaders are made in field.",
    desc:
      "Authority is not granted by title. It is built by showing up in the field, in the crisis, in the boardroom &mdash; and shipping the work every time.",
  },
];

export default function OperatingPrinciples() {
  return (
    <section id="thinking" className="expertise" aria-labelledby="thinking-heading">
      <div className="container">
        <div className="expertise-grid">
          <div className="expertise-head">
            <span className="text-eyebrow chapter-h">
              <span className="num">/08</span>
              <span className="name">Operating Principles</span>
            </span>
            <h2 id="thinking-heading" className="display-section">
              How the office
              <br />
              makes decisions<span className="italic-serif accent">.</span>
            </h2>
            <p style={{ color: "var(--ink-soft)", lineHeight: 1.65 }}>
              Seven principles an operator would stake a P&amp;L on &mdash;
              the decision framework behind every mandate.
            </p>
            <figure className="expertise-portrait fx-scale-in">
              <Image
                src="/images/10.jpg"
                alt="Abdullah Al Alamin — strategic leadership"
                fill
                sizes="(min-width: 1024px) 320px, 90vw"
              />
            </figure>
          </div>

          <div className="expertise-list fx-stagger">
            {principles.map((p) => (
              <div className="expertise-row" key={p.n}>
                <span className="expertise-row-n">{p.n}</span>
                <div>
                  <h3 className="expertise-row-title">{p.title}</h3>
                  <p className="expertise-row-desc">{p.desc}</p>
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
                Board advisory &middot; fractional CMO mandates &middot; 90-day growth sprints
              </p>
            </div>
            <div>
              <span className="text-eyebrow" style={{ display: "block", marginBottom: "var(--space-2)" }}>Sectors</span>
              <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                FMCG &middot; building materials &middot; conglomerates &middot; education &middot; technology
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