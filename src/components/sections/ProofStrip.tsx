import type { ProofStat } from "@/types/content";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/motion/CountUp";

const stats: ProofStat[] = [
  {
    value: "350%",
    label: "Sales growth in 45 days, PRAN-RFL",
    verificationStatus: "needs-verification",
  },
  {
    value: "12",
    label: "Business units under one brand architecture",
    verificationStatus: "needs-verification",
  },
  {
    value: "1,500+",
    label: "Youth leaders trained, Camp for Life",
    verificationStatus: "needs-verification",
  },
  {
    value: "14",
    label: "Years compounding brand work",
    verificationStatus: "verified",
  },
];

export function ProofStrip() {
  return (
    <Section compact ariaLabelledBy="proof-title">
      <Container>
        <header className="section-heading">
          <span className="eyebrow">Selected outcomes</span>
          <h2 id="proof-title">The receipts.</h2>
        </header>
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat">
              <span className="stat__value">
                <CountUp value={stat.value} />
              </span>
              <span className="stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
