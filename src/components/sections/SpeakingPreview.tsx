import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function SpeakingPreview() {
  return (
    <Section surface="surface" ariaLabelledBy="speaking-preview-title">
      <Container>
        <div className="split">
          <figure className="image-frame image-frame--landscape">
            <Image
              src="/images/4.jpg"
              alt="Abdullah Al Alamin speaking at an executive leadership event."
              fill
              sizes="(min-width: 900px) 50vw, 100vw"
            />
          </figure>
          <div>
            <span className="eyebrow">Speaking & keynotes</span>
            <h2 id="speaking-preview-title">
              Keynotes for boards, ministries, and category leaders.
            </h2>
            <p className="section-heading__copy">
              Across APAC and the Commonwealth — on the AI-first CMO, compounding brand equity,
              national branding, and reputation rebuilt in public.
            </p>
            <div className="actions mt-5">
              <ButtonLink href="/speaking">Speaking topics & booking</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
