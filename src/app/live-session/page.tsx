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
  title: "Live Sessions | Abdullah Al Alamin",
  description: "Live, working sessions with the office — CMO roundtables, brand sprints, and AI marketing clinics for boards and senior leadership teams.",
  path: "/live-session",
});

const upcoming = [
  { date: "Quarterly", title: "CMO Roundtable (closed-door)", audience: "Group CMOs and divisional marketing heads", format: "90 minutes · 12 seats", note: "Operator-led discussion on one board-grade question, no recordings.", image: "/images/all side photo/281c4ba9-98ef-4e55-9218-1c70669e5558.png" },
  { date: "Monthly", title: "AI Marketing Clinic", audience: "Senior marketing and product leadership", format: "60 minutes · open", note: "A working session on one AI use case submitted by a participant.", image: "/images/all side photo/60b933f1-ce48-40db-8e69-d47caddbf9c3.png" },
  { date: "On request", title: "Board Off-site Day", audience: "Chairs and CEOs of mid-market companies", format: "Full day · in person", note: "A working off-site built around the board's actual decision calendar.", image: "/images/all side photo/69ad2fc3-8a45-4119-82fe-5e94b9675ddd.png" },
];

export default function LiveSessionPage() {
  return (
    <>
      <Breadcrumbs items={trail({ name: "Blog", href: "/insights" }, { name: "Live Sessions", href: "/live-session" })} />
      <PageHero
        id="live-session"
        kicker="Live Sessions"
        title={<>Working sessions <em>with the office</em>.</>}
        lead="Live, small-room conversations with operators and senior leadership — the kind the office normally has behind closed doors. Three formats. Limited seats."
        image={{ src: "/images/10.jpg", alt: "Live session setting." }}
      />

      <Section surface="surface" ariaLabelledBy="formats-title">
        <Container>
          <EyebrowHeading eyebrow="Formats" title="Three ways to work with the office live." id="formats-title" />
          <div className="grid grid--3">
            {upcoming.map((session) => (
              <article key={session.title} className="card-format-pipely">
                <span className="format-meta">{session.date}</span>
                <h3>{session.title}</h3>
                <p className="format-body">{session.note}</p>
                <div className="format-details">
                  <p><strong>For:</strong> {session.audience}</p>
                  <p><strong>Format:</strong> {session.format}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="how-title">
        <Container>
          <EyebrowHeading eyebrow="How it runs" title="A session, not a webinar." id="how-title" />
          <ol className="prose">
            <li><strong>One question, submitted in advance.</strong> The host sets the question a week before — a board-grade problem, not a content topic.</li>
            <li><strong>Operators in the room.</strong> Twelve seats, all senior. No observers, no vendor pitches.</li>
            <li><strong>Working output.</strong> Each session produces a one-page write-up shared with attendees only.</li>
          </ol>
        </Container>
      </Section>

      <Section id="inquiry" ariaLabelledBy="join-title">
        <Container>
          <div className="card" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", padding: "var(--space-8) var(--space-6)", borderRadius: "var(--radius-lg)", textAlign: "center", maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)" }}>
            <h2 id="join-title" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", margin: 0 }}>Available slots.</h2>
            <p style={{ color: "var(--color-ink-soft)", fontSize: "1.05rem", lineHeight: "1.6", maxWidth: "52ch", margin: 0, textWrap: "balance" }}>Two seats remaining for the upcoming Closed-Door CMO Roundtable. The office reviews every request personally. Sessions are not recorded.</p>
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