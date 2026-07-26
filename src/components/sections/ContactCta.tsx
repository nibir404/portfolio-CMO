import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ContactCta() {
  return (
    <Section ariaLabelledBy="contact-cta-title">
      <Container>
        <div className="split split--center">
          <div>
            <span className="eyebrow">Brief the office</span>
            <h2 id="contact-cta-title">Brief the office.</h2>
            <p className="section-heading__copy">
              Currently taking on a limited number of mandates with growth-driven organisations.
            </p>
          </div>
          <div className="actions">
            <ButtonLink href="/contact">Start a conversation</ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
