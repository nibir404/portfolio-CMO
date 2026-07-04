"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAPHero } from "@/lib/useGSAPHero";

const heroStats = [
  { value: "15+", label: "Years building brands & growth engines" },
  { value: "55+", label: "Strategic mandates led end-to-end" },
  { value: "11M+", label: "Lifetime impressions engineered" },
  { value: "38%", label: "Avg. brand recall lift in 6 months" },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  useGSAPHero({ rootRef, imageWrapRef });

  return (
    <header ref={rootRef} className="hero hero-neo" aria-labelledby="hero-heading">
      {/* Full-bleed dark image — single pane, fills the viewport */}
      <div ref={imageWrapRef} className="hero-image-wrap">
        <Image
          src="/images/all side photo/281c4ba9-98ef-4e55-9218-1c70669e5558.png"
          alt="Abdullah Al Amin — full-bleed portrait"
          fill
          priority
          sizes="100vw"
          className="hero-image"
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
        <div className="hero-image-shade" aria-hidden="true" />
      </div>

      {/* Overlaid content — eyebrow + headline + body + CTA, right-aligned */}
      <div className="hero-overlay">
        <div className="hero-overlay-inner">
          <div className="hero-eyebrow">
            Fractional CMO · Brand Architect · Dhaka · BD
          </div>

          <h1 id="hero-heading" className="hero-display">
            Compounding brands<span className="accent">.</span>
          </h1>

          <p className="hero-body-copy">
            I partner with founders and leadership teams to engineer brand
            ecosystems that compound over the next decade.
          </p>

          <div className="hero-cta-row">
            <a
              href="#contact"
              className="hero-cta hero-cta--primary magnetic-btn"
              data-cursor-hover
            >
              <span>Book a strategy call</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip — plain metrics row */}
      <div className="hero-stats-chrome" aria-label="Key metrics">
        {heroStats.map((s, i) => (
          <div key={i} className="hero-stat-chrome">
            <span className="hero-stat-value">{s.value}</span>
            <span className="hero-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </header>
  );
}