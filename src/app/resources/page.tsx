import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources | Abdullah Al Alamin",
  description:
    "Print media, data analytics R&D, articles, and templates — the working tools the office uses with boards and operators.",
  path: "/resources",
});

type Resource = {
  kind: string;
  title: string;
  format: string;
  note: string;
  href: string;
};

const groups: Array<{ eyebrow: string; title: string; items: Resource[] }> = [
  {
    eyebrow: "Print Media",
    title: "Print media and long-form.",
    items: [
      {
        kind: "Print · Article",
        title: "The CMO's First Ninety Days",
        format: "Essay · 12 pages",
        note: "Three frameworks the office runs on day one of every mandate.",
        href: "/insights/the-cmos-first-90-days",
      },
      {
        kind: "Print · Article",
        title: "Geography is a Category",
        format: "Essay · 8 pages",
        note: "Why the market does not flatten across borders — and what boards get wrong.",
        href: "/insights/geography-is-a-category",
      },
      {
        kind: "Print · Feature",
        title: "Twelve Brands, One Operating Discipline",
        format: "Case study · 14 pages",
        note: "A walkthrough of the Bengal Group brand architecture work.",
        href: "/insights/twelve-brands-one-discipline",
      },
    ],
  },
  {
    eyebrow: "Data & Analytics R&D",
    title: "Working tools from the office.",
    items: [
      {
        kind: "Tool · R&D",
        title: "Brand Equity Scorecard",
        format: "Template · spreadsheet",
        note: "A 12-metric scorecard tied to the P&L — for boards and CMOs.",
        href: "#inquiry",
      },
      {
        kind: "Tool · R&D",
        title: "AI Use-Case Register",
        format: "Template · spreadsheet",
        note: "Use-case prioritisation with evaluation, governance, and rollout criteria.",
        href: "#inquiry",
      },
      {
        kind: "Tool · R&D",
        title: "90-Day Operating Plan",
        format: "Template · document",
        note: "A working 90-day plan template for newly appointed CMOs and divisional heads.",
        href: "#inquiry",
      },
    ],
  },
  {
    eyebrow: "Articles",
    title: "Short-form essays and notes.",
    items: [
      {
        kind: "Article",
        title: "Compounding Beats Virality",
        format: "Short · 2 minutes",
        note: "The single principle that decides whether brand work wins a quarter or compounds across a decade.",
        href: "/insights/compounding-beats-virality",
      },
      {
        kind: "Article",
        title: "How to Read a P&L Like a CMO",
        format: "Short · 90 seconds",
        note: "Three lines on a P&L a marketing executive actually needs to read.",
        href: "/insights/how-to-read-a-pl-like-a-cmo",
      },
      {
        kind: "Article",
        title: "Senior Leaders Are Made in Field",
        format: "Short · 2 minutes",
        note: "Authority is not granted by title. It is built by showing up.",
        href: "/insights/senior-leaders-are-made-in-the-field",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/insights" },
          { name: "Resources", href: "/resources" },
        ]}
      />
      <Section compact ariaLabelledBy="resources-title">
        <Container>
          <span className="eyebrow">Resources</span>
          <h1 id="resources-title">Print media, data &amp; analytics R&amp;D, and articles.</h1>
          <p className="page-hero__intro">
            The working tools the office uses with boards and operators &mdash; long-form essays,
            templates, and short-form notes.
          </p>
          <div className="actions mt-5">
            <ButtonLink href="#inquiry">Request the library</ButtonLink>
          </div>
        </Container>
      </Section>

      {groups.map((group, groupIndex) => (
        <Section
          key={group.title}
          surface={groupIndex % 2 === 0 ? "default" : "surface"}
          ariaLabelledBy={`group-${groupIndex}-title`}
        >
          <Container>
            <h2 id={`group-${groupIndex}-title`} className="section-heading">
              <span className="eyebrow">{group.eyebrow}</span>
              <span className="section-heading__title">{group.title}</span>
            </h2>
            <div className="grid grid--3">
              {group.items.map((item) => (
                <article key={item.title} className="card card--service">
                  <span className="card__meta">{item.kind}</span>
                  <h3>{item.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-ink-mute)" }}>
                    {item.format}
                  </p>
                  <p>{item.note}</p>
                  <div className="actions mt-4">
                    <ButtonLink href={item.href} variant="ghost">
                      Open →
                    </ButtonLink>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <Section id="inquiry" ariaLabelledBy="library-title">
        <Container>
          <div className="split" style={{ alignItems: "center" }}>
            <div>
              <span className="eyebrow">The library</span>
              <h2 id="library-title">Get the full library by email.</h2>
              <p>
                The office maintains a working library of print media, R&amp;D templates, and short
                articles. Send a one-line request and the office will reply within two business
                days.
              </p>
            </div>
            <div className="actions">
              <ButtonLink href="/contact" variant="primary">
                Email the office
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}