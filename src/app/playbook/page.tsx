import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { PageHero } from "@/components/ui/PageHero";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PlaybookForm } from "@/components/forms/PlaybookForm";
import { playbook } from "@/content/playbook";
import { buildPageMetadata } from "@/lib/metadata";
import { trail } from "@/lib/breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "The 90-Day CMO Playbook | Abdullah Al Alamin",
  description: "The three frameworks I run on day one of every new mandate — and the one I always revisit by day sixty. Eighteen pages, free.",
  path: "/playbook",
});

export default function PlaybookPage() {
  return (
    <>
      <Breadcrumbs items={trail({ name: "Playbook", href: "/playbook" })} />
      <PageHero
        id="playbook"
        kicker="Free working playbook"
        title={<>{playbook.title}.</>}
        lead={playbook.subtitle}
        actions={<ButtonLink href="#playbook-form">Request the playbook</ButtonLink>}
        image={{ src: "/images/hero-bg.jpeg", alt: "Playbook cover texture." }}
        imagePosition="below"
      />

      <Section surface="surface" ariaLabelledBy="contents-title">
        <Container>
          <EyebrowHeading eyebrow="What's inside" title="Five chapters." id="contents-title" />
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

      <ImageBlock src="/images/all side photo/bf36be97-595f-4f03-b208-7f93513e1080 (1).png" alt="Working playbook — opening spread." aspect="21:9" />

      <Section ariaLabelledBy="audience-title">
        <Container>
          <EyebrowHeading eyebrow="Who it's for" title="Written for operators." id="audience-title" />
          <ul className="prose">
            {playbook.audience.map((line) => (<li key={line}>{line}</li>))}
          </ul>
        </Container>
      </Section>

      <Section surface="surface" id="playbook-form" ariaLabelledBy="form-title">
        <Container>
          <EyebrowHeading eyebrow="Request the playbook" title="Four fields. No marketing list." id="form-title" />
          <div className="split">
            <div>
              <p className="prose">The playbook is a working document — not a content download. Fill in the four fields below, and your email application will open with the request prepared. Your details stay with the office and are not added to any marketing list.</p>
              <p className="prose" style={{ marginTop: "1rem" }}><strong>Read by marketing leaders</strong> across Bangladesh, South Asia, and APAC.</p>
            </div>
            <PlaybookForm />
          </div>
        </Container>
      </Section>
    </>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, APAC = Asia-Pacific