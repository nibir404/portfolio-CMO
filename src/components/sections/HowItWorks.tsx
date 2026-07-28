import Link from "next/link";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Diagnostic Brief",
    body: "Use the inquiry form to outline your current operational blockers, growth targets, and transformation timeline. I read and evaluate every brief personally.",
  },
  {
    number: "02",
    title: "Qualification & Fit",
    body: "A structured 30-minute commercial alignment call to evaluate organizational readiness. If I am not the right advisor to solve your specific challenge, I will say so immediately.",
  },
  {
    number: "03",
    title: "Transformation Proposal",
    body: "Within five working days, I deliver a detailed proposal outlining the operational roadmap, engagement milestones, KPI metrics, and a transparent fixed fee.",
  },
];

export function HowItWorks() {
  return (
    <section className="exec-section" aria-labelledby="how-title">
      <Container>
        <div className="exec-head">
          <span className="eyebrow">Transformation Process</span>
          <h2 id="how-title">From initial diagnostic to active engagement in three stages.</h2>
        </div>
        <ol className="how-grid">
          {steps.map((step) => (
            <li key={step.number} className="how-step">
              <span className="how-step__num">{step.number}</span>
              <h3 className="how-step__title">{step.title}</h3>
              <p className="how-step__body">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="how-cta">
          <p>
            Ready to scale? I respond to qualifying briefs within two business days.
          </p>
          <Link href="#inquiry" className="btn btn--primary">
            Discuss Opportunity
          </Link>
        </div>
      </Container>
    </section>
  );
}