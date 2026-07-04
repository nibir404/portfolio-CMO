"use client";

import { useHorizontalPin } from "@/lib/useHorizontalPin";

const steps = [
  {
    num: "01",
    title: "Audit & Brief",
    desc: "A 2-week immersion into brand, market, funnel, and team — surfacing the real constraint on growth.",
  },
  {
    num: "02",
    title: "Brand & Growth Strategy",
    desc: "Positioning, narrative architecture, ICP definition, and a 12-month growth thesis signed by leadership.",
  },
  {
    num: "03",
    title: "Build the System",
    desc: "Identity, martech stack, content engine, attribution, and the operating cadence your team will run on.",
  },
  {
    num: "04",
    title: "Launch & Measure",
    desc: "Campaigns, product surfaces, and sales enablement go live with clear leading indicators — not vanity.",
  },
  {
    num: "05",
    title: "Scale & Optimize",
    desc: "Quarterly business reviews, experimentation, and org coaching as we compound the gains.",
  },
];

export default function Process() {
  const rootRef = useHorizontalPin();

  return (
    <>
      <section
        id="process-intro"
        className="snap-section chapter-intro section-dark"
        aria-labelledby="process-heading"
      >
        <div className="container">
          <div className="chapter-h reveal">
            <span className="num">/07</span>
            <span className="name">The Engagement Model</span>
          </div>

          <h2 id="process-heading" className="display-section reveal" style={{ color: "var(--text)", marginBottom: "var(--space-3)" }}>
            5 Steps to a{" "}
            <span className="italic-serif accent">Compounding Brand.</span>
          </h2>

          <p
            className="reveal"
            style={{
              maxWidth: "640px",
              color: "var(--text-muted)",
              fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
              lineHeight: 1.7,
            }}
          >
            The engagement arc I run with every CMO mandate &mdash; from a
            founder&rsquo;s first call to a category&rsquo;s full operating cadence.
          </p>
        </div>
      </section>

      <section
        ref={rootRef}
        id="process"
        className="process section-dark h-pin"
        aria-label="Engagement model — scroll horizontally"
      >
        <div className="h-pin-stage">
          <div className="h-track">
            <div className="h-slide chapter-slide">
              <div className="h-slide-inner">
                <span className="h-slide-num">01 / 05</span>
                <h3 className="h-slide-display">
                  The arc.
                  <br />
                  <span className="italic-serif accent">Five moves.</span>
                </h3>
                <p className="h-slide-sub">
                  Every CMO engagement follows the same five moves. Each one
                  compounds the next &mdash; nothing is rebuilt twice.
                </p>
              </div>
            </div>

            {steps.map((s) => (
              <div className="h-slide" key={s.num}>
                <div className="h-slide-inner process-step-stack">
                  <span className="process-step-num">{s.num}</span>
                  <h3 className="process-step-title">{s.title}</h3>
                  <p className="process-step-desc">{s.desc}</p>
                </div>
              </div>
            ))}

            <div className="h-slide-counter" aria-hidden="true">
              <span className="current">01</span>
              <span className="progress"><span className="h-progress" /></span>
              <span className="total">06</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}