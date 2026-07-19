"use client";

import Image from "next/image";

/* Premium press strip — newspapers, business publications, awards bodies, government ministries. */
const pressTokens = [
  "The Daily Star",
  "Channel i",
  "Dhaka Tribune",
  "Prothom Alo",
  "BDNews24",
  "The Business Standard",
  "World Brand Congress",
  "Asia Marketing Federation",
  "Asia MarTech Conference",
  "Commonwealth Business Council",
  "ICT Division · Bangladesh",
  "Ministry of Commerce · Bangladesh",
];

/* Three signature placements — featured in the press, by outcome. */
const placements = [
  {
    num: "/01 · 03",
    outlet: "World Brand Congress · Mumbai",
    title: "Global Brand Leadership Award, 2024",
    desc:
      "Recognised for the strategic repositioning of Betopia Group into an AI-first conglomerate brand across twelve business units.",
    image: "/images/boss-9.jpg",
  },
  {
    num: "/02 · 03",
    outlet: "Channel i · national television",
    title: "Metrocem To The Point",
    desc:
      "Created and hosted a national television talk show that repositioned an industrial cement brand as a thought leader for infrastructure policy.",
    image: "/images/img2.jpg",
  },
  {
    num: "/03 · 03",
    outlet: "Asia Marketing Federation",
    title: "Asia Pacific Marketing Excellence, 2023",
    desc:
      "Honoured for category-defining brand work across Bangladesh and South Asia &mdash; including the Camp for Life youth initiative.",
    image: "/images/4.jpg",
  },
];

export default function FeaturedIn() {
  return (
    <section id="featured" className="featured" aria-labelledby="featured-heading">
      <div className="container">
        <div className="featured-head">
          <span className="text-eyebrow chapter-h">
            <span className="num">/02</span>
            <span className="name">Featured In</span>
          </span>
          <h2 id="featured-heading" className="display-section">
            The press of record<span className="italic-serif accent">.</span>
          </h2>
          <p>
            National newspapers, business publications, international
            awards bodies, and a national television footprint &mdash; the
            work made visible in the rooms that matter.
          </p>
        </div>
      </div>

      {/* Marquee — full bleed, premium press strip */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...pressTokens, ...pressTokens].map((t, i) => (
            <span className="marquee-item" key={`${t}-${i}`}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="featured-tiles fx-stagger">
          {placements.map((p) => (
            <article className="featured-tile" key={p.num}>
              <div className="featured-tile-img">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <span className="featured-tile-outlet">{p.outlet}</span>
              <h3 className="featured-tile-title">{p.title}</h3>
              <p className="featured-tile-desc">{p.desc}</p>
              <span className="featured-tile-num">{p.num}</span>
            </article>
          ))}
        </div>

        <div className="featured-byline fx-fade-up">
          <span className="text-eyebrow" style={{ display: "block", marginBottom: "var(--space-3)" }}>
            Byline &amp; keynote circuits
          </span>
          <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.7 }}>
            Op-eds in
            <strong style={{ color: "var(--ink)" }}> The Daily Star</strong> and
            <strong style={{ color: "var(--ink)" }}> Dhaka Tribune</strong>;
            keynote voice at the
            <strong style={{ color: "var(--ink)" }}> Bangladesh AI &amp; Marketing Summit</strong> and
            <strong style={{ color: "var(--ink)" }}> Asia MarTech Conference</strong>.
            Full press kit available on request.
          </p>
        </div>
      </div>
    </section>
  );
}