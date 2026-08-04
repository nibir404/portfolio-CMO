import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { buildPageMetadata } from "@/lib/metadata";
import { trail } from "@/lib/breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "Training | Abdullah Al Alamin",
  description: "How the office trains marketing leaders, boards, and operators to grow the business — through cohort programmes, in-house academies, and 1-to-1 advisory.",
  path: "/training",
});

const programmes = [
  { eyebrow: "Cohort programme", title: "The 12-Week CMO Sprint", body: "A cohort-based programme for newly appointed CMOs and divisional marketing heads. Twelve weeks, one operating model, three deliverables.", audience: "CMOs and senior marketing leaders", format: "12 weeks · weekly 90-min live sessions", href: "#inquiry", image: "/images/all side photo/281c4ba9-98ef-4e55-9218-1c70669e5558.png" },
  { eyebrow: "In-house academy", title: "Operator Academy", body: "A bespoke, in-house training programme for a marketing team — built around the company's own brand, market, and operating model.", audience: "Marketing teams of 5 — 50", format: "6 — 12 weeks · in-house or hybrid", href: "#inquiry", image: "/images/all side photo/60b933f1-ce48-40db-8e69-d47caddbf9c3.png" },
  { eyebrow: "Board programme", title: "Board Marketing Literacy", body: "A programme for chairs, NEDs, and CEOs who want a working fluency in marketing — enough to challenge strategy and govern AI investment.", audience: "Boards and C-suite", format: "Half-day or two-day off-site", href: "#inquiry", image: "/images/all side photo/69ad2fc3-8a45-4119-82fe-5e94b9675ddd.png" },
];

const modules = [
  { no: "01", title: "The operating model", body: "How a marketing function is shaped — team, vendors, technology, and the board's role." },
  { no: "02", title: "Brand as a business discipline", body: "Reading brand equity as a line item on the P&L — and governing it accordingly." },
  { no: "03", title: "AI in marketing", body: "The operating-model change, the governance backbone, and the three lines on a P&L." },
  { no: "04", title: "Geographic strategy", body: "Why the market does not flatten across borders — and what boards get wrong." },
];

export default function TrainingPage() {
  return (
    <>
      <Breadcrumbs items={trail({ name: "Blog", href: "/insights" }, { name: "Training", href: "/training" })} />
      <PageHero
        id="training"
        kicker="Training"
        title={<>How the office <em>trains</em> others to grow the business.</>}
        lead="Cohort programmes, in-house academies, and board literacy sessions — built around the operator's point of view, not the content calendar."
        image={{ src: "/images/all side photo/7f48d23f-b588-426c-86b7-05ca1b3bfab5.png", alt: "Training in session." }}
      />

      <Section surface="surface" ariaLabelledBy="programmes-title">
        <Container>
          <EyebrowHeading eyebrow="Programmes" title="Three formats, one operating discipline." id="programmes-title" />
          <div className="grid grid--3">
            {programmes.map((programme) => (
              <article key={programme.title} className="card-format-pipely">
                <span className="format-meta">{programme.eyebrow}</span>
                <h3>{programme.title}</h3>
                <p className="format-body">{programme.body}</p>
                <div className="format-details">
                  <p><strong>For:</strong> {programme.audience}</p>
                  <p><strong>Format:</strong> {programme.format}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="modules-title">
        <Container>
          <EyebrowHeading eyebrow="Curriculum" title="Four modules. Built on operator work, not theory." id="modules-title" />
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
          <EyebrowHeading eyebrow="Outcomes" title="What participants ship." id="outcomes-title" />
          <div className="grid grid--2" style={{ marginTop: "var(--space-6)" }}>
            {[
              { t: "90-day operating plan", b: "A comprehensive operating plan tailored to govern and scale the marketing function.", icon: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" },
              { t: "Board pre-read template", b: "A high-fidelity reporting deck the leadership team can reuse for quarterly board updates.", icon: "M3 3v18h18" },
              { t: "AI use-case register", b: "A structured roadmap including rigorous evaluation criteria, rollout schedules, and governance.", icon: "M12 3v18" },
              { t: "Brand-equity scorecard", b: "A data-driven scorecard linking brand health directly to key commercial outcomes.", icon: "M3 3v18h18" },
            ].map((o) => (
              <div key={o.t} className="card card--service" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", height: "100%" }}>
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent)", display: "block" }}>
                  <path d={o.icon} />
                </svg>
                <h3 style={{ margin: 0 }}>{o.t}</h3>
                <p style={{ color: "var(--color-ink-soft)", margin: 0 }}>{o.b}</p>
              </div>
            ))}
          </div>
          <div className="actions mt-6" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <ButtonLink href="/contact">Talk to the office</ButtonLink>
            <ButtonLink href="/insights" variant="ghost">Read the field notes</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence