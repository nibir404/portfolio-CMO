import type { Metadata } from "next";
import Image from "next/image";
import { profile } from "@/content/profile";
import { education } from "@/content/education";
import { principles } from "@/content/principles";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DraftClaimNotice } from "@/components/sections/DraftClaimNotice";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { buildPageMetadata } from "@/lib/metadata";
import { personSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "About Abdullah Al Alamin — Group CMO, Betopia Group",
  description:
    "Group Chief Marketing Officer of Betopia Group. Fourteen years building category-defining brands across FMCG, building materials, and conglomerate portfolios.",
  path: "/about",
  type: "profile",
  image: "/images/abdullah1.jpg",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <Section compact ariaLabelledBy="about-hero-title" style={{ paddingTop: "var(--space-6)", paddingBottom: "var(--space-8)" }}>
        <Container>
          <div className="page-hero__grid" style={{ alignItems: "center" }}>
            <div style={{ display: "grid", gap: "var(--space-4)" }}>
              <h1 id="about-hero-title" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: "1.1", fontWeight: 600 }}>
                Abdullah Al <em>Alamin</em>.
              </h1>
              <p className="page-hero__intro" style={{ fontSize: "1.25rem", color: "var(--color-ink-soft)", lineHeight: "1.6" }}>
                {profile.jobTitle} at {profile.worksFor}. Leading brand architecture, digital growth, and AI marketing transformation.
              </p>
            </div>
            <figure className="image-frame image-frame--portrait" style={{ maxWidth: "380px", justifySelf: "end", border: "1px solid var(--color-line)" }}>
              <Image
                src="/images/boss.jpg"
                alt="Abdullah Al Alamin — Group Chief Marketing Officer of Betopia Group."
                fill
                priority
                sizes="(min-width: 900px) 35vw, 100vw"
              />
            </figure>
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="about-bio-title">
        <Container>
          <div className="split">
            <div>
              <h2 id="about-bio-title">The short version.</h2>
              {profile.paragraphs.map((paragraph, index) => (
                <p key={index} className="prose mt-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--color-ink)", marginBottom: "var(--space-2)" }}>Credentials</h3>
              {profile.credentials.map((credential, idx) => {
                const label = ["Executive Focus", "Research Scope", "Leadership History", "Commercial Scale"][idx] || "Credential";
                return (
                  <div key={credential} className="card" style={{ padding: "var(--space-4)" }}>
                    <span style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", marginBottom: "4px" }}>
                      {label}
                    </span>
                    <p style={{ margin: 0, fontSize: "0.96rem", lineHeight: "1.5", fontWeight: 500, color: "var(--color-ink)" }}>
                      {credential}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6">
            <DraftClaimNotice />
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="career-title">
        <Container>
          <SectionHeading
            eyebrow="Career"
            title="Fourteen years. One compounding arc."
            copy="From the field to the boardroom — every step a working apprenticeship in operator practice."
            id="career-title"
          />
          <div className="timeline">
            {profile.career.map((milestone) => (
              <article className="timeline__item" key={`${milestone.year}-${milestone.role}`}>
                <span className="timeline__year">{milestone.year}</span>
                <div className="timeline__body">
                  <h3>
                    {milestone.role} · <span style={{ color: "var(--color-ink-soft)" }}>{milestone.organisation}</span>
                  </h3>
                  {milestone.note ? <p>{milestone.note}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="principles-title">
        <Container>
          <SectionHeading
            title="How the office makes decisions."
            copy="The decision framework behind every mandate."
            id="principles-title"
          />
          <div className="grid grid--3 mt-6">
            {principles.map((principle) => (
              <article className="card" key={principle.n} style={{ padding: "var(--space-5)" }}>
                <span className="timeline__year" style={{ display: "block", marginBottom: "var(--space-2)" }}>{principle.n}</span>
                <h3 style={{ fontSize: "1.25rem", lineHeight: "1.3", marginBottom: "var(--space-2)" }}>{principle.title}</h3>
                <p style={{ color: "var(--color-ink-soft)", fontSize: "0.92rem", lineHeight: "1.55", margin: 0 }}>{principle.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="education-title">
        <Container>
          <SectionHeading
            title="Where the operator studied."
            id="education-title"
          />
          <div className="grid grid--2 mt-6">
            {education.map((milestone) => (
              <article className="card" key={`${milestone.institution}-${milestone.program}`} style={{ padding: "var(--space-5)" }}>
                <span className="timeline__year" style={{ display: "block", marginBottom: "var(--space-2)" }}>{milestone.year}</span>
                <h3 style={{ fontSize: "1.25rem", lineHeight: "1.3", marginBottom: "var(--space-2)" }}>{milestone.program}</h3>
                <p style={{ fontWeight: 600, color: "var(--color-ink)", margin: 0 }}>{milestone.institution}</p>
                <p style={{ color: "var(--color-ink-soft)", fontSize: "0.92rem", margin: 0 }}>{milestone.status}.</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="beyond-title">
        <Container>
          <SectionHeading
            eyebrow="Beyond the work"
            title="Where the operator shows up."
            id="beyond-title"
          />
          <ul className="prose">
            {profile.beyond.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="split split--center">
            <div>
              <h2>Brief the office.</h2>
              <p className="section-heading__copy">
                Currently taking on a limited number of mandates with growth-driven organisations.
              </p>
            </div>
            <div className="actions">
              <ButtonLink href="/contact">Start a conversation</ButtonLink>
              <ButtonLink href="/work" variant="ghost" trailingArrow>
                See the work
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
