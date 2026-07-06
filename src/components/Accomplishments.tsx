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

const items: Item[] = [
  { value: 350, suffix: "%", caption: "Sales growth — PRAN Frozen Food's nationwide campaign, delivered in 45 days." },
  { value: 12, caption: "Business units — led branding and communication strategy across Bengal Group's full portfolio." },
  { value: 1500, suffix: "+", caption: "Youth participants — organized Bangladesh's first life-skill bootcamp, Camp for Life." },
  { value: 14, suffix: "+", caption: "Years leading brand, communication, and now AI-driven marketing strategy across FMCG, building materials, education, and technology." },
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

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
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

export default function Accomplishments() {
  return (
    <section id="results" className="accomplishments" aria-labelledby="results-heading">
      <div className="container">
        <div className="accomplishments-grid">
          <div className="accomplishments-head">
            <span className="text-eyebrow chapter-h">
              <span className="num">/03</span>
              <span className="name">Results That Speak</span>
            </span>
            <h2 id="results-heading" className="display-section">
              The proof<span className="italic-serif accent">.</span>
            </h2>
            <p>
              Numbers over adjectives &mdash; growth, reach, and rebuilt trust,
              measured.
            </p>
          </div>

          <div className="accomplishments-list">
            {items.slice(0, 2).map((it, i) => (
              <div className="accomplishment fx-fade-up" key={`top-${i}`}>
                <Counter item={it} />
                <p className="accomplishment-caption">{it.caption}</p>
              </div>
            ))}

            <ParallaxImage
              src="/images/boss-2.jpg"
              alt="Abdullah Al Alamin — on assignment"
            />

            {items.slice(2, 4).map((it, i) => (
              <div className="accomplishment fx-fade-up" key={`mid-${i}`}>
                <Counter item={it} />
                <p className="accomplishment-caption">{it.caption}</p>
              </div>
            ))}

            <ParallaxImage
              src="/images/boss-8.jpg"
              alt="Abdullah Al Alamin — speaking engagement"
            />

            {items.slice(4).map((it, i) => (
              <div className="accomplishment fx-fade-up" key={`bot-${i}`}>
                <Counter item={it} />
                <p className="accomplishment-caption">{it.caption}</p>
              </div>
            ))}

            <div className="accomplishment fx-fade-up">
              <span className="accomplishment-value">National</span>
              <p className="accomplishment-caption">
                Television — created and managed <em>Metrocem To The Point</em>,
                one of Channel i&rsquo;s highest-rated talk shows.
              </p>
            </div>

            <div className="accomplishment fx-fade-up">
              <span className="accomplishment-value">Crisis → Trust</span>
              <p className="accomplishment-caption">
                Led Bengal Cement&rsquo;s branding transformation and crisis
                communication strategy, rebuilding stakeholder confidence
                through a turnaround narrative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}