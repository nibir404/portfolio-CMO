import Link from "next/link";
import { Container } from "@/components/ui/Container";

const AIIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-accent)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const BrandIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-accent)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const GrowthIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-accent)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--color-accent)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const capabilities = [
  {
    number: "01",
    title: "AI Business Transformation",
    body: "Build AI-powered operating models, automate operational workflows, and implement secure data frameworks that drive productivity and P&L results.",
    href: "/services/ai-business-transformation",
    icon: AIIcon,
  },
  {
    number: "02",
    title: "Brand Transformation",
    body: "Reposition brand equity as a commercial instrument to command premium pricing, drive customer acquisition, and defend margins.",
    href: "/services/brand-transformation",
    icon: BrandIcon,
  },
  {
    number: "03",
    title: "Business Growth & Scaling",
    body: "Construct predictable customer acquisition engines, optimize unit economics (CAC/LTV), and eliminate scaling bottlenecks.",
    href: "/services/growth-scaling",
    icon: GrowthIcon,
  },
  {
    number: "04",
    title: "International Expansion",
    body: "Translate competitive advantages and value propositions to expand footprint and secure partners in South Asia, APAC, and the GCC.",
    href: "/services/international-expansion",
    icon: GlobeIcon,
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
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="cap-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="cap-card__num">{item.number}</span>
                  <Icon />
                </div>
                <h3 className="cap-card__title" style={{ fontSize: "1.25rem", fontWeight: 600, marginTop: "var(--space-2)" }}>
                  {item.title}
                </h3>
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
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// WCAG AAA definitions: AI = Artificial Intelligence, APAC = Asia-Pacific, GCC = Gulf Cooperation Council
