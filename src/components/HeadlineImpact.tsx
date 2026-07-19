"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useCountUp } from "@/lib/useCountUp";

type Item = {
  value: number;
  suffix?: string;
  caption: string;
  decimals?: number;
};

/* Numbers over adjectives. Each metric names the company, the scope, and the timeframe. */
const items: Item[] = [
  {
    value: 350,
    suffix: "%",
    caption:
      "Sales growth for PRAN Frozen Food — a nationwide campaign, delivered in forty-five days under field constraints.",
  },
  {
    value: 12,
    caption:
      "Business units under a single brand architecture — Bengal Group's portfolio rebuilt under one operating discipline.",
  },
  {
    value: 1500,
    suffix: "+",
    caption:
      "Youth leaders trained through Camp for Life, Bangladesh's first life-skill bootcamp at national scale.",
  },
  {
    value: 14,
    suffix: "+",
    caption:
      "Years compounding brand work across FMCG, building materials, conglomerates, and the AI frontier.",
  },
];

function Counter({ item }: { item: Item }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, item.value, 1.6, item.decimals ?? 0);
  return (
    <span ref={ref} className="accomplishment-value">
      0
      {item.suffix && <span className="accomplishment-suffix">{item.suffix}</span>}
    </span>
  );
}

function ParallaxBreak({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const img = wrapRef.current?.querySelector("img");
    if (!img) return;

    const tween = gsap.to(img, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: wrapRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} className="accomplishment-break">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
      />
    </div>
  );
}

export default function HeadlineImpact() {
  return (
    <section id="impact" className="accomplishments" aria-labelledby="impact-heading">
      <div className="container">
        <div className="accomplishments-grid">
          <div className="accomplishments-head">
            <span className="text-eyebrow chapter-h">
              <span className="num">/04</span>
              <span className="name">Headline Impact</span>
            </span>
            <h2 id="impact-heading" className="display-section">
              The proof<span className="italic-serif accent">.</span>
            </h2>
            <p>
              Numbers over adjectives &mdash; growth, reach, and rebuilt
              trust, measured across the mandates that built the operator.
            </p>
          </div>

          <div className="accomplishments-list">
            {items.slice(0, 2).map((it, i) => (
              <div className="accomplishment fx-fade-up" key={`top-${i}`}>
                <Counter item={it} />
                <p className="accomplishment-caption">{it.caption}</p>
              </div>
            ))}

            <ParallaxBreak
              src="/images/boss-2.jpg"
              alt="Abdullah Al Alamin — on assignment"
            />

            {items.slice(2, 4).map((it, i) => (
              <div className="accomplishment fx-fade-up" key={`mid-${i}`}>
                <Counter item={it} />
                <p className="accomplishment-caption">{it.caption}</p>
              </div>
            ))}

            <ParallaxBreak
              src="/images/boss-8.jpg"
              alt="Abdullah Al Alamin — keynote address"
            />

            <div className="accomplishment fx-fade-up">
              <span className="accomplishment-value">National&nbsp;TV</span>
              <p className="accomplishment-caption">
                Created and managed <em>Metrocem To The Point</em>, one of
                Channel i&rsquo;s highest-rated talk shows &mdash; turning an
                industrial cement brand into a national thought-leadership
                platform.
              </p>
            </div>

            <div className="accomplishment fx-fade-up">
              <span className="accomplishment-value">Crisis&nbsp;&rarr;&nbsp;Trust</span>
              <p className="accomplishment-caption">
                Led Bengal Cement&rsquo;s branding transformation and crisis
                communication strategy &mdash; a turnaround narrative that
                rebuilt stakeholder confidence under public scrutiny.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}