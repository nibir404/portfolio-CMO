import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { PressCard } from "@/components/cards/PressCard";
import { PressForm } from "@/components/forms/PressForm";
import { pressCoverage, pressKit, interviewTopics } from "@/content/press";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Press & Media | Abdullah Al Alamin",
  description: "Bylines, interviews, and the press kit. Approved bios in three lengths and high-resolution headshots are available on request.",
  path: "/press",
});

const pressImages = ["/images/all side photo/281c4ba9-98ef-4e55-9218-1c70669e5558.png", "/images/all side photo/60b933f1-ce48-40db-8e69-d47caddbf9c3.png", "/images/all side photo/69ad2fc3-8a45-4119-82fe-5e94b9675ddd.png"];

export default function PressPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Press", href: "/press" }]} />
      <PageHero
        id="press"
        kicker="Press & media"
        title={<>Press & <em>media</em>.</>}
        lead={`Bylines, interviews, and the full press kit. Write to ${pressKit.contactEmail} for interview requests, photo requests, or fact-sheet requests.`}
        image={{ src: "/images/boss-8.jpg", alt: "Press moments." }}
      />

      <Section surface="surface" ariaLabelledBy="coverage-title">
        <Container>
          <EyebrowHeading eyebrow="Media coverage" title="Recent features." id="coverage-title" />
          <div className="grid grid--3">
            {pressCoverage.map((item, i) => (
              <div key={`${item.outlet}-${item.title}`}>
                <figure className="card__thumb" style={{ borderRadius: "var(--radius) var(--radius) 0 0" }}>
                  <Image src={pressImages[i % pressImages.length]} alt="" fill sizes="(min-width: 900px) 33vw, 100vw" />
                </figure>
                <PressCard item={item} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ImageBlock src="/images/all side photo/7f48d23f-b588-426c-86b7-05ca1b3bfab5.png" alt="Press working session." aspect="21:9" />

      <Section ariaLabelledBy="kit-title">
        <Container>
          <EyebrowHeading eyebrow="Press kit" title="Available on request." id="kit-title" />
          <div className="grid grid--2">
            {pressKit.assets.map((asset) => (
              <article key={asset.label} className="card card--service">
                <span className="card__meta">Asset</span>
                <h3>{asset.label}</h3>
                <p>{asset.status}.</p>
                <p className="card__footer">
                  <a className="text-link" href={`mailto:${pressKit.contactEmail}`}>Request from the office →</a>
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="bios-title">
        <Container>
          <EyebrowHeading eyebrow="Approved bios" title="Three lengths." id="bios-title" />
          <div className="grid grid--3">
            <article className="card card--service"><span className="card__meta">Short</span><p>{pressKit.bios.short}</p></article>
            <article className="card card--service"><span className="card__meta">Medium</span><p>{pressKit.bios.medium}</p></article>
            <article className="card card--service"><span className="card__meta">Long</span><p>{pressKit.bios.long}</p></article>
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="topics-title">
        <Container>
          <EyebrowHeading eyebrow="Interview topics" title="What the office speaks to." id="topics-title" />
          <ul className="prose">
            {interviewTopics.map((topic) => (<li key={topic}>{topic}</li>))}
          </ul>
        </Container>
      </Section>

      <Section surface="surface" id="press-form" ariaLabelledBy="form-title">
        <Container>
          <EyebrowHeading eyebrow="Press enquiry" title="Tell the office the outlet and the deadline." id="form-title" />
          <div className="split">
            <div>
              <p className="prose">For interview requests, bylines, and fact-sheet requests, write to <a href={`mailto:${pressKit.contactEmail}`}>{pressKit.contactEmail}</a> or use the form below. The office responds within two business days.</p>
            </div>
            <PressForm />
          </div>
        </Container>
      </Section>
    </>
  );
}