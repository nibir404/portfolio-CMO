import Link from "next/link";
import { Container } from "@/components/ui/Container";

const capabilities = [
  {
    number: "01",
    title: "AI Business Transformation",
    body: "Build AI-powered operating models, automate operational workflows, and implement secure data frameworks that drive productivity and P&L results.",
    href: "/services/ai-business-transformation",
  },
  {
    number: "02",
    title: "Brand Transformation",
    body: "Reposition brand equity as a commercial instrument to command premium pricing, drive customer acquisition, and defend margins.",
    href: "/services/brand-transformation",
  },
  {
    number: "03",
    title: "Business Growth & Scaling",
    body: "Construct predictable customer acquisition engines, optimize unit economics (CAC/LTV), and eliminate scaling bottlenecks.",
    href: "/services/growth-scaling",
  },
  {
    number: "04",
    title: "International Expansion",
    body: "Translate competitive advantages and value propositions to expand footprint and secure partners in South Asia, APAC, and the GCC.",
    href: "/services/international-expansion",
  },
];

export function WhatIDo() {
  return (
    <section className="exec-section" id="capabilities" aria-labelledby="capabilities-heading">
      <Container>
        <div className="exec-head">
          <span className="eyebrow">Transformation Areas</span>
          <h2 id="capabilities-heading">Four capabilities that create business value.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((item) => (
            <article key={item.title} className="cap-card">
              <span className="cap-card__num">{item.number}</span>
              <h3 className="cap-card__title" style={{ fontSize: "1.25rem", fontWeight: 600 }}>{item.title}</h3>
              <p
                className="cap-card__body text-ink-soft text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
              <Link
                href={item.href}
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-soft transition-colors duration-200"
              >
                Explore Capability <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

// WCAG AAA definitions: AI = Artificial Intelligence, APAC = Asia-Pacific, GCC = Gulf Cooperation Council

