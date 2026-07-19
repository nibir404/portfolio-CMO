"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAPHero } from "@/lib/useGSAPHero";

/* Executive-context imagery — stage, leadership, boardroom, conferences. */
const portraits = [
  { src: "/images/boss-9.jpg", alt: "Abdullah Al Alamin addressing an international leadership audience" },
  { src: "/images/boss-8.jpg", alt: "Abdullah Al Alamin on stage at a keynote engagement" },
  { src: "/images/boss.jpg", alt: "Abdullah Al Alamin — executive portrait" },
  { src: "/images/boss-2.jpg", alt: "Abdullah Al Alamin — strategic leadership" },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  useGSAPHero({ rootRef, portraitRef });

  return (
    <header
      ref={rootRef}
      id="hero"
      className="hero snap-section"
      data-nav-tone="dark"
      data-section-tone="dark"
      aria-labelledby="hero-title"
    >
      {/* Full-bleed executive image */}
      <div ref={portraitRef} className="hero-portrait" aria-hidden="true">
        {portraits.map((p, i) => (
          <Image
            key={p.src}
            src={p.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`hero-portrait-img ${i === 0 ? "is-active" : ""}`}
            data-hero-img={i}
          />
        ))}
        <div className="hero-shade" aria-hidden="true" />
      </div>

      {/* Two-column content — heading left, body + CTAs right, both anchored to bottom */}
      <div className="hero-content container">
        <div className="hero-eyebrow hero-eyebrow--full">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          Office of the Chief Marketing Officer · Betopia Group
        </div>

        <div className="hero-split">
          <div className="hero-split-left">
            <h1 id="hero-title" className="hero-title">
              Turning AI into {' '}
              <span className="line-through inline-block" >Brand Equity</span>
            </h1>
          </div>

          <div className="hero-split-right">
            <p className="hero-sub">
              Fourteen years building category-defining brands across FMCG and
              conglomerate portfolios &mdash; bringing generative AI into the
              boardroom as compounding advantage.
            </p>

            <div className="hero-cta-row">
              <a href="#impact" className="btn-pill btn-pill--invert magnetic-btn">
                <span>See the impact</span>
                <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a href="#contact" className="btn-pill btn-pill--ghost">
                <span>Brief my office</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}