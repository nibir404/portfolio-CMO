import Link from "next/link";
import { Container } from "@/components/ui/Container";

const advisory = [
  {
    eyebrow: "01",
    title: "Executive Marketing Leadership",
    body: "Group-level leadership in the chair — strategy, operating model, team shape — without a full-time hire.",
    href: "/services/fractional-cmo",
  },
  {
    eyebrow: "02",
    title: "Business Growth Strategy",
    body: "Diagnose the constraint, set the commercial agenda, and govern the next quarter of growth.",
    href: "/services/growth-sprint",
  },
  {
    eyebrow: "03",
    title: "Brand Transformation",
    body: "Repositioning and editorial practice that compounds brand equity across a decade.",
    href: "/services/growth-sprint",
  },
  {
    eyebrow: "04",
    title: "AI Transformation",
    body: "An operating model for AI in marketing — use-case prioritisation, governance, capability build.",
    href: "/services/ai-marketing-transformation",
  },
  {
    eyebrow: "05",
    title: "International Expansion",
    body: "Geographic strategy designed market-by-market, not a single international plan.",
    href: "/services/growth-sprint",
  },
  {
    eyebrow: "06",
    title: "Board Advisory",
    body: "A senior marketing and AI voice in the boardroom, fixed cadence, narrow scope.",
    href: "/services/board-advisory",
  },
];

export function StrategicAdvisory() {
  return (
    <section className="exec-section" id="services" aria-labelledby="advisory-title">
      <Container>
        <div className="exec-head">
          <span className="eyebrow">Advisory</span>
          <h2 id="advisory-title">Where the office gets the call.</h2>
        </div>
        <div className="advisory-grid">
          {advisory.map((item) => (
            <article key={item.title} className="advisory-card">
              <span className="advisory-card__eyebrow">{item.eyebrow}</span>
              <h3 className="advisory-card__title">{item.title}</h3>
              <p className="advisory-card__body">{item.body}</p>
              <Link href={item.href} className="advisory-card__link">
                Explore →
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}