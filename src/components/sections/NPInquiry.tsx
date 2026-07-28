import { Container } from "@/components/ui/Container";
import { ExecutiveInquiryForm } from "@/components/forms/ExecutiveInquiryForm";
import { Reveal } from "@/components/motion/Reveal";

export function NPInquiry() {
  return (
    <section className="np-section np-section--surface" id="inquiry" aria-labelledby="np-inquiry-title">
      <Container>
        <Reveal>
          <div className="np-head">
            <span className="eyebrow">Start a conversation</span>
            <h2 id="np-inquiry-title">Brief the office of the CMO.</h2>
            <p>
              Eight fields. The form opens your email application with the
              enquiry prepared and addressed to the office. Replies within two
              business days.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="np-inquiry__card">
            <ExecutiveInquiryForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer