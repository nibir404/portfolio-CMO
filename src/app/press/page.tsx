import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PressCard } from "@/components/cards/PressCard";
import { PressForm } from "@/components/forms/PressForm";
import { pressCoverage, pressKit, interviewTopics } from "@/content/press";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Press & Media | Abdullah Al Alamin",
  description:
    "Bylines, interviews, and the press kit. Approved bios in three lengths and high-resolution headshots are available on request.",
  path: "/press",
});

export default function PressPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Press", href: "/press" }]} />
      <Section compact ariaLabelledBy="press-hero-title">
        <Container>
          <span className="eyebrow">Press & media</span>
          <h1 id="press-hero-title">Press & media.</h1>
          <p className="page-hero__intro">
            Bylines, interviews, and the full press kit. Write to{" "}
            <a href={`mailto:${pressKit.contactEmail}`}>{pressKit.contactEmail}</a> for interview
            requests, photo requests, or fact-sheet requests.
          </p>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="coverage-title">
        <Container>
          <SectionHeading eyebrow="Media coverage" title="Recent features." id="coverage-title" />
          <div className="grid grid--3">
            {pressCoverage.map((item) => (
              <PressCard key={`${item.outlet}-${item.title}`} item={item} />
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="kit-title">
        <Container>
          <SectionHeading eyebrow="Press kit" title="Available on request." id="kit-title" />
          <div className="grid grid--2">
            {pressKit.assets.map((asset) => (
              <article key={asset.label} className="card card--service">
                <span className="card__meta">Asset</span>
                <h3>{asset.label}</h3>
                <p>{asset.status}.</p>
                <p className="card__footer">
                  <a className="text-link" href={`mailto:${pressKit.contactEmail}`}>
                    Request from the office →
                  </a>
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="bios-title">
        <Container>
          <SectionHeading eyebrow="Approved bios" title="Three lengths." id="bios-title" />
          <div className="grid grid--3">
            <article className="card card--service">
              <span className="card__meta">Short</span>
              <p>{pressKit.bios.short}</p>
            </article>
            <article className="card card--service">
              <span className="card__meta">Medium</span>
              <p>{pressKit.bios.medium}</p>
            </article>
            <article className="card card--service">
              <span className="card__meta">Long</span>
              <p>{pressKit.bios.long}</p>
            </article>
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="topics-title">
        <Container>
          <SectionHeading
            eyebrow="Interview topics"
            title="What the office speaks to."
            id="topics-title"
          />
          <ul className="prose">
            {interviewTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section surface="surface" id="press-form" ariaLabelledBy="form-title">
        <Container>
          <SectionHeading
            eyebrow="Press enquiry"
            title="Tell the office the outlet and the deadline."
            id="form-title"
          />
          <div className="split">
            <div>
              <p className="prose">
                For interview requests, bylines, and fact-sheet requests, write to{" "}
                <a href={`mailto:${pressKit.contactEmail}`}>{pressKit.contactEmail}</a> or use the
                form below. The office responds within two business days.
              </p>
            </div>
            <PressForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
