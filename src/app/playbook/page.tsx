import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PlaybookForm } from "@/components/forms/PlaybookForm";
import { playbook } from "@/content/playbook";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "The 90-Day CMO Playbook | Abdullah Al Alamin",
  description:
    "The three frameworks I run on day one of every new mandate — and the one I always revisit by day sixty. Eighteen pages, free.",
  path: "/playbook",
});

export default function PlaybookPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Playbook", href: "/playbook" }]} />
      <Section compact ariaLabelledBy="playbook-title">
        <Container>
          <div className="page-hero__grid">
            <div>
              <span className="eyebrow">Free working playbook</span>
              <h1 id="playbook-title">{playbook.title}.</h1>
              <p className="page-hero__intro">{playbook.subtitle}</p>
              <div className="actions mt-5">
                <ButtonLink href="#playbook-form">Request the playbook</ButtonLink>
              </div>
            </div>
            <figure className="playbook-hero-cover" aria-hidden="true">
              <div className="playbook-hero-cover__inner">
                <div>
                  <p className="playbook-hero-cover__eyebrow">The 90-Day CMO Playbook</p>
                  <p className="playbook-hero-cover__title">
                    Three frameworks I run on day one of every mandate.
                  </p>
                </div>
              </div>
            </figure>
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="contents-title">
        <Container>
          <SectionHeading eyebrow="What's inside" title="Five chapters." id="contents-title" />
          <div className="grid grid--2">
            {playbook.chapters.map((chapter, index) => (
              <article key={chapter.title} className="card card--service">
                <span className="card__meta">Chapter {String(index + 1).padStart(2, "0")}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="audience-title">
        <Container>
          <SectionHeading
            eyebrow="Who it's for"
            title="Written for operators."
            id="audience-title"
          />
          <ul className="prose">
            {playbook.audience.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section surface="surface" id="playbook-form" ariaLabelledBy="form-title">
        <Container>
          <SectionHeading
            eyebrow="Request the playbook"
            title="Four fields. No marketing list."
            id="form-title"
          />
          <div className="split">
            <div>
              <p className="prose">
                The playbook is a working document — not a content download. Fill in the four fields
                below, and your email application will open with the request prepared. Your details
                stay with the office and are not added to any marketing list.
              </p>
              <p className="prose" style={{ marginTop: "1rem" }}>
                <strong>Read by marketing leaders</strong> across Bangladesh, South Asia, and APAC.
              </p>
            </div>
            <PlaybookForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
