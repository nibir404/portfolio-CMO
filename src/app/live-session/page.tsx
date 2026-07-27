import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Live Sessions | Abdullah Al Alamin",
  description:
    "Live, working sessions with the office — CMO roundtables, brand sprints, and AI marketing clinics for boards and senior leadership teams.",
  path: "/live-session",
});

const upcoming = [
  {
    date: "Quarterly",
    title: "CMO Roundtable (closed-door)",
    audience: "Group CMOs and divisional marketing heads",
    format: "90 minutes · 12 seats",
    note: "Operator-led discussion on one board-grade question, no recordings.",
  },
  {
    date: "Monthly",
    title: "AI Marketing Clinic",
    audience: "Senior marketing and product leadership",
    format: "60 minutes · open",
    note: "A working session on one AI use case submitted by a participant.",
  },
  {
    date: "On request",
    title: "Board Off-site Day",
    audience: "Chairs and CEOs of mid-market companies",
    format: "Full day · in person",
    note: "A working off-site built around the board's actual decision calendar.",
  },
];

export default function LiveSessionPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/insights" },
          { name: "Live Sessions", href: "/live-session" },
        ]}
      />
      <Section compact ariaLabelledBy="live-title">
        <Container>
          <span className="eyebrow">Live Sessions</span>
          <h1 id="live-title">Working sessions with the office.</h1>
          <p className="page-hero__intro">
            Live, small-room conversations with operators and senior leadership &mdash; the kind the
            office normally has behind closed doors. Three formats. Limited seats.
          </p>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="formats-title">
        <Container>
          <h2 id="formats-title" className="section-heading">
            <span className="eyebrow">Formats</span>
            <span className="section-heading__title">Three ways to work with the office live.</span>
          </h2>
          <div className="grid grid--3">
            {upcoming.map((session) => (
              <article key={session.title} className="card card--service">
                <span className="card__meta">{session.date}</span>
                <h3>{session.title}</h3>
                <p>
                  <strong>For:</strong> {session.audience}
                </p>
                <p>
                  <strong>Format:</strong> {session.format}
                </p>
                <p>{session.note}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="how-title">
        <Container>
          <h2 id="how-title" className="section-heading">
            <span className="eyebrow">How it runs</span>
            <span className="section-heading__title">A session, not a webinar.</span>
          </h2>
          <ol className="prose">
            <li>
              <strong>One question, submitted in advance.</strong> The host sets the question a week
              before &mdash; a board-grade problem, not a content topic.
            </li>
            <li>
              <strong>Operators in the room.</strong> Twelve seats, all senior. No observers, no
              vendor pitches.
            </li>
            <li>
              <strong>Working output.</strong> Each session produces a one-page write-up shared
              with attendees only.
            </li>
          </ol>
        </Container>
      </Section>

      <Section id="inquiry" ariaLabelledBy="join-title">
        <Container>
          <div
            className="card"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-line)",
              padding: "var(--space-8) var(--space-6)",
              borderRadius: "var(--radius-lg)",
              textAlign: "center",
              maxWidth: "760px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-4)",
            }}
          >
            <h2 id="join-title" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", margin: 0 }}>
              Available slots.
            </h2>
            <p
              style={{
                color: "var(--color-ink-soft)",
                fontSize: "1.05rem",
                lineHeight: "1.6",
                maxWidth: "52ch",
                margin: 0,
                textWrap: "balance",
              }}
            >
              Two seats remaining for the upcoming Closed-Door CMO Roundtable. The office reviews
              every request personally. Sessions are not recorded.
            </p>
            <div style={{ marginTop: "var(--space-2)" }}>
              <ButtonLink href="/contact">Request a seat</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence
