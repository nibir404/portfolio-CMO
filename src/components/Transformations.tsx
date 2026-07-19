"use client";

import Image from "next/image";
import { useHorizontalPin } from "@/lib/useHorizontalPin";

/* Each chapter = a business transformation, not a job. Scope, decision, outcome. */
const transformations = [
  {
    chapter: "01",
    title: "Building a national field force",
    company: "PRAN-RFL Group",
    scope: "FMCG · 45-day nationwide campaign",
    decision:
      "Built the 'KotiPoti Offer' field programme and a youth-led activations team from zero — translating a mass-market offer into a measurable sales surge.",
    outcome: "350% sales growth in forty-five days.",
    image: "/images/boss-9.jpg",
  },
  {
    chapter: "02",
    title: "Opening the Gen-Z category",
    company: "Akij Foods · Lovello Ice Cream",
    scope: "FMCG · youth segment, nationwide",
    decision:
      "Repositioned Lovello for first-time buyers through university activations and digital-native creative — a category the legacy brands had written off.",
    outcome: "Defined the youth ice-cream segment in Bangladesh.",
    image: "/images/img1.jpg",
  },
  {
    chapter: "03",
    title: "Digital transformation, end to end",
    company: "Daffodil Group",
    scope: "Group · 360° brand & digital",
    decision:
      "Led branding, digital transformation, and the launch of Camp for Life — Bangladesh's first large-scale life-skill bootcamp.",
    outcome: "1,500+ youth leaders trained across districts.",
    image: "/images/7.jpg",
  },
  {
    chapter: "04",
    title: "Industrial brand, national stage",
    company: "Metrocem Group",
    scope: "Building materials · national TV",
    decision:
      "Created and produced the Channel i talk show Metrocem To The Point, repositioning a cement brand as a public-policy thought leader.",
    outcome: "One of Channel i's highest-rated properties.",
    image: "/images/img2.jpg",
  },
  {
    chapter: "05",
    title: "Twelve brands, one operating discipline",
    company: "Bengal Group of Industries",
    scope: "Conglomerate · 12 business units",
    decision:
      "Designed brand, communication, and crisis strategy across the group portfolio — including Bengal Cement's public turnaround.",
    outcome: "Reputation rebuilt across a conglomerate under public scrutiny.",
    image: "/images/ab4.jpg",
  },
  {
    chapter: "06",
    title: "Founding the marketing function",
    company: "Betopia Group",
    scope: "Conglomerate · operating model",
    decision:
      "Built the operating model, team, and pipeline for Betopia's group-level brand and marketing function — ahead of the CMO mandate.",
    outcome: "Function stood up in under twelve months.",
    image: "/images/ab5.jpg",
  },
  {
    chapter: "07",
    title: "AI-powered marketing transformation",
    company: "Betopia Group · Office of the CMO",
    scope: "Group · generative AI · predictive analytics",
    decision:
      "Mandated to integrate generative AI, predictive analytics, and marketing automation into brand and growth strategy across the group.",
    outcome: "An AI-first conglomerate marketing operation.",
    image: "/images/boss-final-image.jpg",
  },
];

export default function Transformations() {
  const rootRef = useHorizontalPin({ scrub: 0.8, snap: true, speed: 1 });

  return (
    <section id="transformations" aria-label="Business Transformations" className="journey">
      {/* Intro — sets up the transformation framing, not the resume framing */}
      <div className="journey-intro container">
        <span className="text-eyebrow chapter-h">
          <span className="num">/03</span>
          <span className="name">Business Transformations</span>
        </span>
        <h2 className="display-section fx-fade-up" style={{ marginTop: "var(--space-3)" }}>
          Seven businesses rebuilt<span className="italic-serif accent">.</span>
          <br />
          One compounding arc.
        </h2>
        <p
          className="fx-fade-up"
          style={{
            maxWidth: "640px",
            color: "var(--ink-soft)",
            marginTop: "var(--space-3)",
            fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
            lineHeight: 1.65,
          }}
        >
          From FMCG field to the Group CMO chair &mdash; each chapter is a
          business, a scope, a decision, and the measurable outcome it produced.
        </p>
      </div>

      {/* Pinned horizontal band — desktop only */}
      <section ref={rootRef as React.RefObject<HTMLElement>} className="journey-pin h-pin" aria-hidden="false">
        <div className="journey-stage">
          <div className="journey-track h-track">
            <div className="journey-slide chapter-slide h-slide">
              <div className="chapter-slide-inner">
                <span className="chapter-slide-num">/02 · 07</span>
                <h3 className="chapter-slide-display">
                  Business Transformations<span className="italic-serif accent">.</span>
                </h3>
                <p className="chapter-slide-sub">
                  Each chapter is a business, a scope, a decision, and the
                  measurable outcome it produced. Scroll horizontally to
                  walk through fourteen years of mandate work.
                </p>
                <span className="chapter-slide-scroll-hint">
                  <span>Scroll →</span>
                </span>
              </div>
            </div>

            {transformations.map((t) => (
              <article
                key={t.chapter}
                className="journey-slide h-slide"
                aria-label={`${t.title} — ${t.company}`}
              >
                <div className="journey-card">
                  <div className="journey-card-img">
                    <Image
                      src={t.image}
                      alt={`${t.title} — ${t.company}`}
                      fill
                      sizes="(min-width: 1024px) 38vw, 90vw"
                    />
                  </div>
                  <span className="journey-card-year">
                    Chapter {t.chapter} · {t.scope}
                  </span>
                  <h3 className="journey-card-role">{t.title}</h3>
                  <p className="journey-card-company">{t.company}</p>
                  <p className="journey-card-desc">{t.decision}</p>
                  <p className="journey-card-outcome">
                    <strong>Outcome.</strong> {t.outcome}
                  </p>
                  <div className="journey-card-line" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="h-slide-counter" aria-hidden="true">
          <span className="current">01</span>
          <span className="progress">
            <span className="h-progress" />
          </span>
          <span className="total">07</span>
        </div>
      </section>

      {/* Mobile fallback — vertical stack (visible only on small screens) */}
      <div className="journey-mobile container">
        {transformations.map((t) => (
          <article className="journey-mobile-card" key={t.chapter}>
            <div className="journey-mobile-img">
              <Image
                src={t.image}
                alt={`${t.title} — ${t.company}`}
                fill
                sizes="(min-width: 768px) 50vw, 90vw"
              />
            </div>
            <span className="journey-card-year">
              Chapter {t.chapter} · {t.scope}
            </span>
            <h3 className="journey-card-role">{t.title}</h3>
            <p className="journey-card-company">{t.company}</p>
            <p className="journey-card-desc">{t.decision}</p>
            <p className="journey-card-outcome">
              <strong>Outcome.</strong> {t.outcome}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}