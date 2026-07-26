import Link from "next/link";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Send a brief",
    body: "Use the form to outline the work, the deadline, and the outcome. The office reads every enquiry personally.",
  },
  {
    number: "02",
    title: "First call",
    body: "A thirty-minute conversation to qualify fit, scope, and timing. If there is no fit, the office will say so.",
  },
  {
    number: "03",
    title: "Proposal",
    body: "Within five working days, a written proposal with scope, cadence, and a fixed fee &mdash; ready to sign.",
  },
];

export function HowItWorks() {
  return (
    <section className="exec-section" aria-labelledby="how-title">
      <Container>
        <div className="exec-head">
          <span className="eyebrow">How it works</span>
          <h2 id="how-title">From brief to engagement in three steps.</h2>
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
            Ready to start? The office replies within two business days.
          </p>
          <Link href="#inquiry" className="btn btn--primary">
            Discuss Opportunity
          </Link>
        </div>
      </Container>
    </section>
  );
}