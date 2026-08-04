import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { RecognitionCard } from "@/components/cards/RecognitionCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { recognition, recognitionSummary } from "@/content/recognition";
import { buildPageMetadata } from "@/lib/metadata";
import { trail } from "@/lib/breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "Recognition & Awards | Abdullah Al Alamin",
  description: "Twelve awards across international, government, and industry categories — the credential is the work; these are the footnotes.",
  path: "/recognition",
});

export default function RecognitionPage() {
  return (
    <>
      <Breadcrumbs items={trail({ name: "Recognition", href: "/recognition" })} />
      <PageHero
        id="recognition"
        kicker="Recognition"
        title={<>Twelve awards across <em>three categories</em>.</>}
        lead="The credential is the work; these are the footnotes."
        image={{ src: "/images/all side photo/c5307815-15e9-4005-addb-f5450988e31e.png", alt: "Recognition visual." }}
      />

      <Section surface="surface" ariaLabelledBy="summary-title">
        <Container>
          <EyebrowHeading eyebrow="Summary" title="The numbers." id="summary-title" />
          <div className="stats-grid">
            <div className="stat"><span className="stat__value">{recognitionSummary.total}</span><span className="stat__label">Total awards</span></div>
            <div className="stat"><span className="stat__value">{recognitionSummary.international}</span><span className="stat__label">International</span></div>
            <div className="stat"><span className="stat__value">{recognitionSummary.government}</span><span className="stat__label">Government &amp; National</span></div>
            <div className="stat"><span className="stat__value">{recognitionSummary.industry}</span><span className="stat__label">Industry &amp; Institutional</span></div>
          </div>
          <p className="form-note mt-4">Selected entries are flagged as <em>draft · pending verification</em> until issuer, recipient, and year are confirmed against public records.</p>
        </Container>
      </Section>

      <ImageBlock src="/images/all side photo/e0c1ea85-745c-46e4-9b2c-121171f2d09c.png" alt="Award — credential detail." aspect="21:9" />

      <Section ariaLabelledBy="awards-title">
        <Container>
          <EyebrowHeading eyebrow="Awards" title="The full list." id="awards-title" />
          <div className="grid grid--3">
            {recognition.map((group) =>
              group.items.map((item) => (<RecognitionCard key={`${group.category}-${item.title}`} item={item} />)),
            )}
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="beyond-title">
        <Container>
          <EyebrowHeading eyebrow="Beyond the trophies" title="Juror and mentor roles." id="beyond-title" />
          <p className="prose">Juror at the Bangladesh Marketing Excellence Awards, mentor at the Commonwealth Youth Programme, and a regular faculty voice across APAC — giving back to the industry that built the operator.</p>
          <div className="actions mt-5">
            <ButtonLink href="/contact">Book a speaking engagement</ButtonLink>
            <ButtonLink href="/press" variant="ghost">Press kit</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

// WCAG AAA definitions: APAC = Asia-Pacific