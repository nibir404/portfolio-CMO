"use client";

import { useHorizontalPin } from "@/lib/useHorizontalPin";

const services = [
  {
    num: "/01",
    name: "Brand Strategy",
    desc: "Positioning, narrative, and identity systems that earn category ownership and price premium.",
  },
  {
    num: "/02",
    name: "Growth Marketing",
    desc: "Full-funnel demand, lifecycle, and performance engines built for compounding revenue.",
  },
  {
    num: "/03",
    name: "Digital Transformation",
    desc: "Roadmaps, platforms, and operating models that take legacy businesses to digital-first.",
  },
  {
    num: "/04",
    name: "MarTech & Org Design",
    desc: "Stack selection, attribution, and the high-performing marketing org that scales past the founder.",
  },
];

export default function Services() {
  const rootRef = useHorizontalPin();

  return (
    <>
      <section
        id="services-intro"
        className="snap-section chapter-intro"
        aria-labelledby="services-heading"
      >
        <div className="container">
          <div className="chapter-h reveal">
            <span className="num">/06</span>
            <span className="name">CMO Deliverables</span>
          </div>

          <h2
            id="services-heading"
            className="display-section reveal"
            style={{ marginBottom: "var(--space-3)" }}
          >
            Services built for{" "}
            <span className="italic-serif accent">legacy.</span>
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
            Four chapters of CMO work &mdash; each a different lever on the same
            machine: compounding brand equity and revenue.
          </p>
        </div>
      </section>

      <section
        ref={rootRef}
        id="services"
        className="services h-pin"
        aria-label="Service deliverables — scroll horizontally"
      >
        <div className="h-pin-stage">
          <div className="h-track">
            <div className="h-slide chapter-slide">
              <div className="h-slide-inner">
                <span className="h-slide-num">01 / 04</span>
                <h3 className="h-slide-display">
                  Four levers.
                  <br />
                  <span className="italic-serif accent">One machine.</span>
                </h3>
                <p className="h-slide-sub">
                  The CMO is a generalist with a clear set of levers. Each is
                  a different way to move the same needle: brand equity and
                  revenue compounding together.
                </p>
              </div>
            </div>

            {services.map((s) => (
              <div className="h-slide" key={s.num}>
                <div className="h-slide-inner services-row-wrap">
                  <div className="services-row-stack">
                    <span className="services-row-num-large">{s.num}</span>
                    <h3 className="services-row-name-large">{s.name}</h3>
                    <p className="services-row-desc-large">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="h-slide-counter" aria-hidden="true">
              <span className="current">01</span>
              <span className="progress"><span className="h-progress" /></span>
              <span className="total">05</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}