"use client";

import Image from "next/image";
import { useHorizontalPin } from "@/lib/useHorizontalPin";

const cases = [
  {
    num: "/01",
    category: "BRAND & GTM",
    title: "Betopia — Brand Identity & GTM Platform",
    desc: "Built the brand spine and digital ecosystem for one of Bangladesh's leading tech groups.",
    metric: "+38% brand recall in 6 months",
    images: [
      { src: "/images/boss.jpg", alt: "Betopia Group leadership" },
      { src: "/images/img1.jpg", alt: "Betopia product launch" },
      { src: "/images/img2.jpg", alt: "Betopia brand campaign" },
    ],
  },
  {
    num: "/02",
    category: "CORPORATE NARRATIVE",
    title: "Bengal Group — Corporate Narrative",
    desc: "Reframed a diversified conglomerate for the next generation of investors and talent.",
    metric: "Unified narrative across 14 verticals",
    images: [
      { src: "/images/boss-2.jpg", alt: "Bengal Group portrait" },
      { src: "/images/boss.jpg", alt: "Bengal Group strategy" },
      { src: "/images/4.jpg", alt: "Bengal Group story" },
    ],
  },
  {
    num: "/03",
    category: "GROWTH CAMPAIGN",
    title: "PRAN-RFL — Nationwide Launch",
    desc: "Nationwide integrated campaign with field execution tied directly to retail sell-through.",
    metric: "350% sales lift in launch quarter",
    images: [
      { src: "/images/img1.jpg", alt: "PRAN-RFL campaign shoot" },
      { src: "/images/boss-8.jpg", alt: "PRAN-RFL retail launch" },
      { src: "/images/boss-9.jpg", alt: "PRAN-RFL field activation" },
    ],
  },
  {
    num: "/04",
    category: "DIGITAL TRANSFORMATION",
    title: "Metrocem — Industry 4.0 Pivot",
    desc: "Repositioned a 30-year industrial brand for the digital-first decade and a new buyer.",
    metric: "2.1x qualified lead volume",
    images: [
      { src: "/images/img2.jpg", alt: "Metrocem digital surface" },
      { src: "/images/6.jpg", alt: "Metrocem campaign system" },
      { src: "/images/7.jpg", alt: "Metrocem product story" },
    ],
  },
  {
    num: "/05",
    category: "NATION BRANDING",
    title: "Channel i — Bangladesh Brand Future",
    desc: "Produced and shaped a national TV feature on Bangladesh's brand and soft-power future.",
    metric: "2.4M prime-time reach",
    images: [
      { src: "/images/4.jpg", alt: "Channel i TV feature" },
      { src: "/images/10.jpg", alt: "Bangladesh brand story" },
      { src: "/images/boss-final-image.jpg", alt: "Channel i on-camera" },
    ],
  },
  {
    num: "/06",
    category: "EDUCATION ECOSYSTEM",
    title: "Daffodil — Education Platform Ecosystem",
    desc: "End-to-end design and platform build for one of South Asia's largest EdTech ecosystems.",
    metric: "180k active learners onboarded",
    images: [
      { src: "/images/6.jpg", alt: "Daffodil platform surface" },
      { src: "/images/7.jpg", alt: "Daffodil product UX" },
      { src: "/images/10.jpg", alt: "Daffodil learning community" },
    ],
  },
];

export default function CaseStudies() {
  const rootRef = useHorizontalPin();

  return (
    <>
      {/* Chapter intro — scrolls naturally above the pin */}
      <section
        id="case-studies-intro"
        className="snap-section chapter-intro case-studies"
        aria-labelledby="cases-heading"
      >
        <div className="container">
          <div className="chapter-h reveal">
            <span className="num">/04</span>
            <span className="name">Case Studies</span>
          </div>

          <h2 id="cases-heading" className="display-section reveal" style={{ color: "var(--text)", marginBottom: "var(--space-3)" }}>
            Real brands.
            <br />
            <span className="italic-serif accent">Real outcomes.</span>
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
            Six mandates I&rsquo;ve led &mdash; measured in brand recall, sales lift,
            and qualified reach. Scroll to walk through them.
          </p>
        </div>
      </section>

      {/* Pinned horizontal band — only the stage, no intro */}
      <section
        ref={rootRef}
        id="case-studies"
        className="case-studies h-pin"
        aria-label="Case study slides — scroll horizontally"
      >
        <div className="h-pin-stage">
          <div className="h-track">
            <div className="h-slide chapter-slide">
              <div className="h-slide-inner">
                <span className="h-slide-num">01 / 06</span>
                <h3 className="h-slide-display">
                  Six mandates.<br />
                  <span className="italic-serif accent">Measurable outcomes.</span>
                </h3>
                <p className="h-slide-sub">
                  Category leaders, nation brands, and legacy operators
                  &mdash; repositioned, relaunched, or rebuilt with the KPIs to prove it.
                </p>
              </div>
            </div>

            {cases.map((c, ci) => (
              <div className="h-slide" key={c.num}>
                <article className="case-card" data-cursor-hover>
                  <div className="case-card-ribbon" aria-hidden={false}>
                    {c.images.map((img, ii) => (
                      <div
                        key={ii}
                        className="case-card-tile"
                        style={{ ["--tilt" as string]: `${(ii - 1) * 4}deg` }}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          priority={ci === 0 && ii === 0}
                          sizes="(min-width: 1024px) 30vw, 60vw"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="case-card-body">
                    <div className="case-card-meta">
                      <span className="case-card-num">{c.num}</span>
                      <span className="case-card-cat">{c.category}</span>
                    </div>
                    <h3 className="case-card-title">{c.title}</h3>
                    <p className="case-card-desc">{c.desc}</p>
                    <span className="case-card-metric">{c.metric}</span>
                  </div>
                </article>
              </div>
            ))}

            <div className="h-slide-counter" aria-hidden="true">
              <span className="current">01</span>
              <span className="progress"><span className="h-progress" /></span>
              <span className="total">07</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
