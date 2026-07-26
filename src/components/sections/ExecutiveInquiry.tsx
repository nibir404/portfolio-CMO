import { Container } from "@/components/ui/Container";
import { ExecutiveInquiryForm } from "@/components/forms/ExecutiveInquiryForm";

export function ExecutiveInquiry() {
  return (
    <section className="exec-section exec-section--surface" id="inquiry" aria-labelledby="inquiry-title">
      <Container>
        <div className="inquiry">
          <div className="inquiry__head">
            <h2 id="inquiry-title">Start a conversation.</h2>
            <p>
              Eight fields. The form opens your email application with the enquiry prepared and
              addressed to the office. Replies within two business days.
            </p>
          </div>
          <ExecutiveInquiryForm />
        </div>
      </Container>
    </section>
  );
}