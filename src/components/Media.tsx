"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pressTokens = [
  "The Daily Star",
  "Channel i",
  "Dhaka Tribune",
  "Prothom Alo",
  "BDNews24",
  "The Business Standard",
  "Daily Observer",
  "The Financial Express",
  "Bangladesh Today",
  "TBS News",
];

const tiles = [
  {
    num: "/07 · 01",
    title: "Branding Bangladesh on the Global Stage",
    desc: "An address to government representatives, foreign ambassadors, and international business leaders on positioning Bangladesh as an investment and innovation hub.",
    image: "/images/4.jpg",
  },
  {
    num: "/07 · 02",
    title: "Metrocem To The Point",
    desc: "Channel i talk show created and hosted during his tenure at Metrocem Group — positioning an industrial brand as a national thought leader.",
    image: "/images/img2.jpg",
  },
  {
    num: "/07 · 03",
    title: "AI-powered marketing commentary",
    desc: "Ongoing commentary and keynote speaking on AI-powered marketing transformation, brand strategy, and ethical AI adoption at national marketing forums and AI conferences.",
    image: "/images/6.jpg",
  },
];

function ParallaxTile({ image, title, num, desc }: { image: string; title: string; num: string; desc: string }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const img = ref.current?.querySelector("img");
    if (!img) return;

    const tween = gsap.fromTo(
      img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <article ref={ref} className="media-tile">
      <div className="media-tile-img">
        <Image src={image} alt={title} fill sizes="(min-width: 1024px) 33vw, 100vw" />
      </div>
      <span className="media-tile-num">{num}</span>
      <h3 className="media-tile-title">{title}</h3>
      <p className="media-tile-desc">{desc}</p>
    </article>
  );
}

export default function Media() {
  return (
    <section id="media" className="media" aria-labelledby="media-heading">
      <div className="container">
        <div className="media-head">
          <span className="text-eyebrow chapter-h">
            <span className="num">/07</span>
            <span className="name">In the Media</span>
          </span>
          <h2 id="media-heading" className="display-section">
            Featured<span className="italic-serif accent">.</span>
          </h2>
          <p>
            Across national press, television, and government forums &mdash;
            building a media footprint that backs the work.
          </p>
        </div>

        <figure className="media-portrait fx-scale-in">
          <Image
            src="/images/4.jpg"
            alt="Abdullah Al Alamin — on national television"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </figure>
      </div>

      {/* Marquee — full bleed */}
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
        <div className="media-tiles fx-stagger">
          {tiles.map((t) => (
            <ParallaxTile
              key={t.num}
              image={t.image}
              title={t.title}
              num={t.num}
              desc={t.desc}
            />
          ))}
        </div>

        <div className="media-quote fx-fade-up" style={{ marginTop: "var(--space-5)" }}>
          <span className="text-eyebrow" style={{ display: "block", marginBottom: "var(--space-3)" }}>
            Byline &amp; keynote circuits
          </span>
          <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.7 }}>
            Op-eds in
            <strong style={{ color: "var(--ink)" }}> The Daily Star</strong> and
            <strong style={{ color: "var(--ink)" }}> Dhaka Tribune</strong>;
            keynote speaker at the
            <strong style={{ color: "var(--ink)" }}> Bangladesh AI &amp; Marketing Summit</strong> and
            <strong style={{ color: "var(--ink)" }}> Asia MarTech Conference</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}