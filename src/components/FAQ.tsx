"use client";

import { useState } from "react";

const items = [
  {
    q: "What do you actually do for me?",
    a: "I act as a long-term design partner — strategy, visual identity, web design, and front-end build. For larger programs I lead cross-functional teams.",
  },
  {
    q: "How long does a typical project take?",
    a: "A website takes 2–6 weeks depending on depth. A brand identity runs 4–8 weeks. Ecosystem programs run on quarterly cycles.",
  },
  {
    q: "Do you build the site, or just design it?",
    a: "Both. I ship production-ready builds in Framer, Webflow, or React/Next.js — the choice depends on your growth plan.",
  },
  {
    q: "Will my website be SEO-ready?",
    a: "Yes. Every site ships with semantic markup, performance tuning, structured data, and a content model your team can run.",
  },
  {
    q: "Do you only work with large brands?",
    a: "No. I take on a mix of founders, mid-stage companies, and enterprise groups. Long-term fit matters more than size.",
  },
  {
    q: "How do we get started?",
    a: "Book a 30-minute intro call. If we're a fit, I'll send a proposal within five business days.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="faq section-dark snap-section" aria-labelledby="faq-heading">
      <div className="container">
        <div className="chapter-h reveal">
          <span className="num">/10</span>
          <span className="name">Quick Answers</span>
        </div>

        <h2 id="faq-heading" className="display-section reveal" style={{ marginBottom: "var(--space-5)", color: "var(--text)" }}>
          Quick{" "}
          <span className="italic-serif accent">answers.</span>
        </h2>

        <div className="faq-list reveal-stagger">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                className={`faq-row${isOpen ? " open" : ""}`}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                data-cursor-hover
              >
                <span className="faq-row-marker" aria-hidden="true">
                  <span className="faq-row-bar faq-row-bar-h" />
                  <span className="faq-row-bar faq-row-bar-v" />
                </span>
                <span className="faq-row-q">{it.q}</span>
                <span className="faq-row-a">{it.a}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}