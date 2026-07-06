"use client";

import Image from "next/image";
import { useHorizontalPin } from "@/lib/useHorizontalPin";

const steps = [
  {
    year: "Feb 2012 – Jul 2014",
    role: "Event Supervisor",
    company: "PRAN-RFL Group",
    desc:
      "Foundations in FMCG field execution and market intelligence; the nationwide 'KotiPoti Offer' campaign delivered 350% sales growth in 45 days.",
    image: "/images/boss-9.jpg",
  },
  {
    year: "Jul 2014 – Feb 2016",
    role: "Event Supervisor / Event Management Specialist",
    company: "Akij Foods & Beverage · Lovello Ice Cream",
    desc:
      "Led nationwide youth and university engagement campaigns across Bangladesh, building affinity with first-time buyers in the emerging Gen-Z segment.",
    image: "/images/img1.jpg",
  },
  {
    year: "Feb 2016 – Aug 2020",
    role: "Group Brand Manager & Head of eMedia",
    company: "Daffodil Group",
    desc:
      "Drove 360° branding and digital transformation; launched Bangladesh's first large-scale leadership bootcamp, Camp for Life, reaching 1,500+ youth participants.",
    image: "/images/7.jpg",
  },
  {
    year: "Aug 2020 – Jun 2024",
    role: "Brand Developer & Media Lead",
    company: "Metrocem Group",
    desc:
      "Produced the Channel i talk show Metrocem To The Point, positioning the brand as an industry thought leader on national television.",
    image: "/images/img2.jpg",
  },
  {
    year: "Jun 2024 – Jun 2025",
    role: "Head of Brand & Communication",
    company: "Bengal Group of Industries",
    desc:
      "Led strategic marketing and crisis communication across 12 business units, including Bengal Cement's reputation-rebuild.",
    image: "/images/ab4.jpg",
  },
  {
    year: "Jul 2025 – Jan 2026",
    role: "Head of Marketing",
    company: "Betopia Group",
    desc:
      "Built the foundation for Betopia's brand and marketing function ahead of the group-level CMO mandate — operating model, team, and pipeline.",
    image: "/images/ab5.jpg",
  },
  {
    year: "Feb 2026 – Present",
    role: "Chief Marketing Officer",
    company: "Betopia Group",
    desc:
      "Leading AI-powered marketing transformation across the group — integrating generative AI, predictive analytics, and marketing automation into brand and growth strategy.",
    image: "/images/boss-final-image.jpg",
  },
];

export default function Journey() {
  const rootRef = useHorizontalPin({ scrub: 0.8, snap: true, speed: 1 });

  return (
    <section id="journey" aria-label="The Journey" className="journey">
      {/* Intro — scrolls naturally above the pin */}
      <div className="journey-intro container">
        <span className="text-eyebrow chapter-h">
          <span className="num">/02</span>
          <span className="name">The Journey</span>
        </span>
        <h2 className="display-section fx-fade-up" style={{ marginTop: "var(--space-3)" }}>
          Seven mandates<span className="italic-serif accent">.</span>
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
          From FMCG field to Group CMO &mdash; thirteen years of compounding
          brand work, scroll horizontally.
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
                  The Journey<span className="italic-serif accent">.</span>
                </h3>
                <p className="chapter-slide-sub">
                  Each step a category, a company, a continent of work &mdash;
                  stitched together by a single guiding principle. Scroll
                  horizontally to walk through thirteen years of brand
                  building.
                </p>
                <span className="chapter-slide-scroll-hint">
                  <span>Scroll →</span>
                </span>
              </div>
            </div>

            {steps.map((s, i) => (
              <article
                key={s.year}
                className="journey-slide h-slide"
                aria-label={`${s.role} at ${s.company}`}
              >
                <div className="journey-card">
                  <div className="journey-card-img">
                    <Image
                      src={s.image}
                      alt={`${s.role} at ${s.company}`}
                      fill
                      sizes="(min-width: 1024px) 38vw, 90vw"
                    />
                  </div>
                  <span className="journey-card-year">
                    {String(i + 1).padStart(2, "0")} · {s.year}
                  </span>
                  <h3 className="journey-card-role">{s.role}</h3>
                  <p className="journey-card-company">{s.company}</p>
                  <p className="journey-card-desc">{s.desc}</p>
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
        {steps.map((s, i) => (
          <article className="journey-mobile-card" key={s.year}>
            <div className="journey-mobile-img">
              <Image
                src={s.image}
                alt={`${s.role} at ${s.company}`}
                fill
                sizes="(min-width: 768px) 50vw, 90vw"
              />
            </div>
            <span className="journey-card-year">
              {String(i + 1).padStart(2, "0")} · {s.year}
            </span>
            <h3 className="journey-card-role">{s.role}</h3>
            <p className="journey-card-company">{s.company}</p>
            <p className="journey-card-desc">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}