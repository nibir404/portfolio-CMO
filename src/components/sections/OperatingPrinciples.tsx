import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { principles } from "@/content/principles";

export function OperatingPrinciples() {
  return (
    <Section surface="surface" ariaLabelledBy="operating-principles-title">
      <Container>
        <SectionHeading
          eyebrow="Operating principles"
          title="How the office makes decisions."
          copy="Seven principles an operator would stake a P&L on — the decision framework behind every mandate."
          id="operating-principles-title"
        />
        <div className="timeline">
          {principles.map((principle) => (
            <article className="timeline__item" key={principle.n}>
              <span className="timeline__year">{principle.n}</span>
              <div className="timeline__body">
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
