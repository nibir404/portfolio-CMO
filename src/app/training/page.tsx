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
            <div className="card card--service" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", height: "100%" }}>
              <svg className="card__icon" viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent)", display: "block" }}>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                <path d="M9 12h6" />
                <path d="M9 16h6" />
              </svg>
              <h3 style={{ margin: 0 }}>90-day operating plan</h3>
              <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>
                A comprehensive operating plan tailored to govern and scale the marketing function.
              </p>
            </div>
            <div className="card card--service" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", height: "100%" }}>
              <svg className="card__icon" viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent)", display: "block" }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="17" x2="9" y2="12" />
                <line x1="12" y1="17" x2="12" y2="9" />
                <line x1="15" y1="17" x2="15" y2="14" />
              </svg>
              <h3 style={{ margin: 0 }}>Board pre-read template</h3>
              <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>
                A high-fidelity reporting deck the leadership team can reuse for quarterly board updates.
              </p>
            </div>
            <div className="card card--service" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", height: "100%" }}>
              <svg className="card__icon" viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent)", display: "block" }}>
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
                <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z" />
                <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
              </svg>
              <h3 style={{ margin: 0 }}>AI use-case register</h3>
              <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>
                A structured roadmap including rigorous evaluation criteria, rollout schedules, and governance.
              </p>
            </div>
            <div className="card card--service" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", height: "100%" }}>
              <svg className="card__icon" viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent)", display: "block" }}>
                <path d="M3 3v18h18" />
                <path d="m18.7 8-5.1 5.2-2.8-2.7L7 14.3" />
              </svg>
              <h3 style={{ margin: 0 }}>Brand-equity scorecard</h3>
              <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>
                A data-driven scorecard linking brand health directly to key commercial outcomes.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence
