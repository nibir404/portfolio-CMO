"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { insights } from "@/content/insights";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturedInsights() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Prioritize featured insights first, then slice the first 6
  const displayItems = [...insights]
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 6);

  useGSAP(() => {
    if (!triggerRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Calculate scroll distance
      const getScrollAmount = () => {
        if (!trackRef.current) return 0;
        return trackRef.current.scrollWidth - window.innerWidth + 120;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 0.5,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      });

      // Animate track translation
      tl.to(trackRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      // Animate progress bar fill
      if (progressRef.current) {
        tl.to(
          progressRef.current,
          {
            width: "100%",
            ease: "none",
          },
          0
        );
      }
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: triggerRef });

  return (
    <section
      ref={triggerRef}
      className="featured-insights-wrapper"
      aria-labelledby="featured-insights-title"
    >
      <div className="featured-insights-pin">
        <div className="featured-insights-inner">
          <div className="featured-insights-header">
            <span className="eyebrow">Insights</span>
            <h2 id="featured-insights-title">Featured articles & roundups.</h2>
          </div>

          <div ref={trackRef} className="featured-insights-track">
            {displayItems.map((item) => (
              <article key={item.slug} className="featured-insights-card">
                <div>
                  <div className="featured-insights-card__meta">
                    <span>{item.category.replace(/-/g, " ")}</span>
                    <span>{item.format} &middot; {item.duration}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="featured-insights-card__footer">
                  <span style={{ fontSize: "0.85rem", color: "var(--color-ink-mute)" }}>
                    {item.publishedAt}
                  </span>
                  <Link
                    href={`/insights/${item.slug}`}
                    className="featured-insights-card__read-more"
                  >
                    Read article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="featured-insights-progress-bar" aria-hidden="true">
            <div ref={progressRef} className="featured-insights-progress-fill" />
          </div>
        </div>
      </div>
    </section>
  );
}
