import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const capabilities = [
  {
    number: "01",
    title: "Grow the business",
    body: "Sharpen the commercial agenda, unlock new geographies, and accelerate growth where it actually moves the P&L.",
    href: "/services/fractional-cmo",
  },
  {
    number: "02",
    title: "Lead the brand",
    body: "Reposition, architect, and govern brand across business units so it compounds &mdash; not just campaigns.",
    href: "/services/growth-sprint",
  },
  {
    number: "03",
    title: "Run AI in marketing",
    body: "Build the operating model, governance, and capability for AI in marketing &mdash; with the rigour an operator demands.",
    href: "/services/ai-marketing-transformation",
  },
];

export function WhatIDo() {
  return (
    <section className="exec-section" id="services" aria-labelledby="what-title">
      <Container>
        <div className="exec-head">
          <span className="eyebrow">What I do</span>
          <h2 id="what-title">Three ways the office helps.</h2>
        </div>
        <div className="cap-grid">
          {capabilities.map((item) => (
            <article key={item.title} className="cap-card">
              <span className="cap-card__num">{item.number}</span>
              <h3 className="cap-card__title">{item.title}</h3>
              <p
                className="cap-card__body"
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
              <Link href={item.href} className="cap-card__link">
                Explore →
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}