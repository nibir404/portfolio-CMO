"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAPHero } from "@/lib/useGSAPHero";

const portraits = [
  { src: "/images/boss.jpg",       alt: "Abdullah Al Alamin — editorial portrait" },
  { src: "/images/boss-8.jpg",     alt: "Abdullah Al Alamin — speaking engagement" },
  { src: "/images/boss-9.jpg",     alt: "Abdullah Al Alamin — leadership event" },
  { src: "/images/boss-2.jpg",     alt: "Abdullah Al Alamin — on assignment" },
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
      {/* Full-bleed portrait — crossfading gallery of 4 shots */}
      <div ref={portraitRef} className="hero-portrait">
        {portraits.map((p, i) => (
          <Image
            key={p.src}
            src={p.src}
            alt={p.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`hero-portrait-img ${i === 0 ? "is-active" : ""}`}
            data-hero-img={i}
          />
        ))}
        <div className="hero-shade" aria-hidden="true" />
      </div>

      {/* Content overlay */}
      <div className="hero-content container">
        <div className="hero-eyebrow">
          Chief Marketing Officer · Brand Architect · AI-Driven Growth Strategist
        </div>

        <div className="hero-grid">
          <h1 id="hero-title" className="hero-title">
            Abdullah Al Alamin<span className="period">.</span>
          </h1>

          <div className="hero-side">
            <p className="hero-sub">
              Group CMO at Betopia, engineering category-defining brands while
              researching the AI that will build the next ones.
            </p>

            <div className="hero-cta-row">
              <a href="#journey" className="btn-pill btn-pill--invert magnetic-btn">
                <span>View My Work</span>
                <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a href="#contact" className="btn-pill btn-pill--ghost">
                <span>Let&rsquo;s Connect</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Portrait strip — small thumbnails at bottom-right */}
      <div className="hero-portrait-strip" aria-hidden="true">
        {portraits.map((p, i) => (
          <div className="hero-portrait-thumb" key={p.src} data-thumb={i}>
            <Image src={p.src} alt="" fill sizes="80px" />
          </div>
        ))}
      </div>

      <div className="hero-scroll" aria-hidden="true">
        Scroll
      </div>
    </header>
  );
}