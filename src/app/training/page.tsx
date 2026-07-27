import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Training | Abdullah Al Alamin",
  description:
    "How the office trains marketing leaders, boards, and operators to grow the business — through cohort programmes, in-house academies, and 1-to-1 advisory.",
  path: "/training",
});

const programmes = [
  {
    eyebrow: "Cohort programme",
    title: "The 12-Week CMO Sprint",
    body: "A cohort-based programme for newly appointed CMOs and divisional marketing heads. Twelve weeks, one operating model, three deliverables.",
    audience: "CMOs and senior marketing leaders",
    format: "12 weeks · weekly 90-min live sessions",
    href: "#inquiry",
  },
  {
    eyebrow: "In-house academy",
    title: "Operator Academy",
    body: "A bespoke, in-house training programme for a marketing team — built around the company's own brand, market, and operating model.",
    audience: "Marketing teams of 5 — 50",
    format: "6 — 12 weeks · in-house or hybrid",
    href: "#inquiry",
  },
  {
    eyebrow: "Board programme",
    title: "Board Marketing Literacy",
    body: "A programme for chairs, NEDs, and CEOs who want a working fluency in marketing — enough to challenge strategy and govern AI investment.",
    audience: "Boards and C-suite",
    format: "Half-day or two-day off-site",
    href: "#inquiry",
  },
];

const modules = [
  {
    no: "01",
    title: "The operating model",
    body: "How a marketing function is shaped — team, vendors, technology, and the board's role.",
  },
  {
    no: "02",
    title: "Brand as a business discipline",
    body: "Reading brand equity as a line item on the P&L — and governing it accordingly.",
  },
  {
    no: "03",
    title: "AI in marketing",
    body: "The operating-model change, the governance backbone, and the three lines on a P&L.",
  },
  {
    no: "04",
    title: "Geographic strategy",
    body: "Why the market does not flatten across borders — and what boards get wrong.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/insights" },
          { name: "Training", href: "/training" },
        ]}
      />
      <Section compact ariaLabelledBy="training-title">
        <Container>
          <span className="eyebrow">Training</span>
          <h1 id="training-title">How the office trains others to grow the business.</h1>
          <p className="page-hero__intro">
            Cohort programmes, in-house academies, and board literacy sessions &mdash; built around
            the operator&rsquo;s point of view, not the content calendar.
          </p>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="programmes-title">
        <Container>
          <h2 id="programmes-title" className="section-heading">
            <span className="eyebrow">Programmes</span>
            <span className="section-heading__title">Three formats, one operating discipline.</span>
          </h2>
          <div className="grid grid--3">
            {programmes.map((programme) => (
              <article key={programme.title} className="card card--service">
                <span className="card__meta">{programme.eyebrow}</span>
                <h3>{programme.title}</h3>
                <p>{programme.body}</p>
                <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--color-ink-mute)" }}>
                  <strong style={{ color: "var(--color-ink)" }}>For:</strong> {programme.audience}
                  <br />
                  <strong style={{ color: "var(--color-ink)" }}>Format:</strong> {programme.format}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="modules-title">
        <Container>
          <h2 id="modules-title" className="section-heading">
            <span className="eyebrow">Curriculum</span>
            <span className="section-heading__title">
              Four modules. Built on operator work, not theory.
            </span>
          </h2>
          <div className="grid grid--2">
            {modules.map((module) => (
              <article key={module.title} className="card card--service">
                <span className="card__meta">Module {module.no}</span>
                <h3>{module.title}</h3>
                <p>{module.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="outcomes-title">
        <Container>
          <h2 id="outcomes-title" className="section-heading">
            <span className="eyebrow">Outcomes</span>
            <span className="section-heading__title">What participants ship.</span>
          </h2>
          <div className="grid grid--2" style={{ marginTop: "var(--space-6)" }}>
            <div className="card card--service" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", height: "100%" }}>
              <span style={{ fontSize: "1.5rem" }} aria-hidden="true">📋</span>
              <h3 style={{ margin: 0 }}>90-day operating plan</h3>
              <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>
                A comprehensive operating plan tailored to govern and scale the marketing function.
              </p>
            </div>
            <div className="card card--service" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", height: "100%" }}>
              <span style={{ fontSize: "1.5rem" }} aria-hidden="true">📊</span>
              <h3 style={{ margin: 0 }}>Board pre-read template</h3>
              <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>
                A high-fidelity reporting deck the leadership team can reuse for quarterly board updates.
              </p>
            </div>
            <div className="card card--service" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", height: "100%" }}>
              <span style={{ fontSize: "1.5rem" }} aria-hidden="true">⚙️</span>
              <h3 style={{ margin: 0 }}>AI use-case register</h3>
              <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>
                A structured roadmap including rigorous evaluation criteria, rollout schedules, and governance.
              </p>
            </div>
            <div className="card card--service" style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", height: "100%" }}>
              <span style={{ fontSize: "1.5rem" }} aria-hidden="true">📈</span>
              <h3 style={{ margin: 0 }}>Brand-equity scorecard</h3>
              <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>
                A data-driven scorecard linking brand health directly to key commercial outcomes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="inquiry" ariaLabelledBy="enquire-title" surface="default">
        <Container>
          <div
            className="cta-banner"
            style={{
              marginBlock: "var(--space-5) var(--space-6)",
              ["--cta-banner-image" as string]: "url('/images/10.jpg')",
            }}
          >
            <div className="cta-banner__media" aria-hidden="true" />
            <div className="cta-banner__overlay" aria-hidden="true" />
            <div className="cta-banner__inner">
              <div className="cta-banner__copy">
                <span className="eyebrow">Discuss a programme</span>
                <h2 id="enquire-title" className="cta-banner__title">
                  Build the next cohort with the office.
                </h2>
                <p className="cta-banner__body">
                  Programmes are scoped against the team, the market, and the board&rsquo;s
                  decision calendar. The office replies within two business days.
                </p>
              </div>
              <div className="cta-banner__actions">
                <ButtonLink href="/contact" variant="white">
                  Email the office
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence
