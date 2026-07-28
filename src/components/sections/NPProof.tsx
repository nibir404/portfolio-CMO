import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

const stats = [
  { value: "14+", label: "Years operating inside category leaders" },
  { value: "12", label: "Business units architected & governed" },
  { value: "350%", label: "Peak sales growth delivered in 45 days" },
  { value: "3", label: "International awards for commercial research" },
];

export function NPProof() {
  return (
    <section className="np-section np-section--surface" id="proof" aria-labelledby="proof-title">
      <Container>
        <Reveal>
          <div className="np-head np-head--center">
            <span className="eyebrow">Proof</span>
            <h2 id="proof-title">Numbers, not adjectives.</h2>
            <p>
              Fourteen years of operator experience — from field operations to
              group-level boardroom governance — building systems that scale,
              automation that drives margin, and brand equity that defends
              market share.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="np-stats" aria-label="Commercial outcomes">
            {stats.map((stat) => (
              <div key={stat.label} className="np-stat">
                <span className="np-stat__value">
                  <CountUp value={stat.value} />
                </span>
                <span className="np-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
          <ButtonLink href="/work" variant="ghost">
            View case studies & proof
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence