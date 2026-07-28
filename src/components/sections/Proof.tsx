import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

const stats = [
  { value: "14+", label: "Years operating inside category leaders" },
  { value: "12", label: "Business units architected & governed" },
  { value: "350%", label: "Peak sales growth delivered in 45 days" },
  { value: "3", label: "International awards for commercial research" },
];

export function Proof() {
  return (
    <section
      className="exec-section exec-section--surface"
      aria-labelledby="proof-title"
    >
      <Container>
        <div
          className="proof-copy"
          style={{
            maxWidth: "44rem",
            margin: "0 auto 3rem auto",
            textAlign: "center",
          }}
        >
          <h2 id="proof-title">Track record and outcomes.</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--color-ink-soft)", lineHeight: "1.6" }}>
            Fourteen years of operator experience — from field operations to group-level boardroom
            governance — structuring systems that scale, automation that drives margin, and brand
            equity that secures market share.
          </p>
        </div>
        <div className="exec-metrics" aria-label="Commercial outcomes">
          {stats.map((stat) => (
            <div key={stat.label} className="exec-metric">
              <span className="exec-metric__value">{stat.value}</span>
              <span className="exec-metric__label">{stat.label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "var(--space-6)", textAlign: "center" }}>
          <ButtonLink href="/work" variant="ghost" trailingArrow>
            View Case Studies & Proof
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}