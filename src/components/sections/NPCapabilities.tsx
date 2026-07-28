import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

const AIIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const BrandIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const GrowthIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

type Capability = {
  number: string;
  title: string;
  body: string;
  href: string;
  icon: () => ReactNode;
};

const capabilities: Capability[] = [
  {
    number: "01",
    title: "AI Business Transformation",
    body:
      "Design AI-powered operating models, automate operational workflows, and ship data frameworks that move P&L.",
    href: "/services/ai-business-transformation",
    icon: AIIcon,
  },
  {
    number: "02",
    title: "Brand Transformation",
    body:
      "Reposition brand equity as a commercial instrument — to command premium pricing and defend margin.",
    href: "/services/brand-transformation",
    icon: BrandIcon,
  },
  {
    number: "03",
    title: "Growth & Scaling",
    body:
      "Build predictable customer acquisition engines, tighten unit economics, and remove the bottlenecks that stall expansion.",
    href: "/services/growth-scaling",
    icon: GrowthIcon,
  },
  {
    number: "04",
    title: "International Expansion",
    body:
      "Translate your competitive edge for South Asia, APAC, and the GCC — and secure the partners that move you in.",
    href: "/services/international-expansion",
    icon: GlobeIcon,
  },
];

export function NPCapabilities() {
  return (
    <section className="np-section" id="capabilities" aria-labelledby="capabilities-heading">
      <Container>
        <Reveal>
          <div className="np-head">
            <span className="eyebrow">Transformation areas</span>
            <h2 id="capabilities-heading">Four ways I move the needle.</h2>
            <p>
              I work as an operator-first advisor to CEOs, founders, and
              chairmen. Each engagement is structured around one of four
              mandates — chosen by where the business actually needs leverage.
            </p>
          </div>
        </Reveal>

        <div className="np-cap-grid">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title}>
                <article className="np-cap-card">
                  <div className="np-cap-card__top">
                    <span className="np-cap-card__num">{item.number}</span>
                    <span className="np-cap-card__icon">
                      <Icon />
                    </span>
                  </div>
                  <h3 className="np-cap-card__title">{item.title}</h3>
                  <p className="np-cap-card__body">{item.body}</p>
                  <Link href={item.href} className="np-cap-card__link">
                    Explore capability <span aria-hidden="true">→</span>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// WCAG AAA definitions: AI = Artificial Intelligence, APAC = Asia-Pacific, GCC = Gulf Cooperation Council, P&L = Profit and Loss