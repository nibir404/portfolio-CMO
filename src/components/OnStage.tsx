"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const venues = [
  "World Brand Congress",
  "Asia Marketing Federation",
  "Asia MarTech Conference",
  "Bangladesh AI & Marketing Summit",
  "Commonwealth Youth Programme",
  "Digital Bangladesh Forum",
  "FMCG & Consumer Goods Summit",
  "PR Society of Bangladesh",
];

/* Keynote engagements — by scope and audience, not by buzzword. */
const engagements = [
  {
    num: "/01 · 03",
    title: "Branding Bangladesh on the global stage",
    venue: "World Brand Congress · Mumbai",
    audience: "Government ministers · ambassadors · international business leaders",
    desc:
      "Opening keynote on positioning Bangladesh as an investment and innovation hub — translated to a cross-border investment narrative.",
    image: "/images/4.jpg",
  },
  {
    num: "/02 · 03",
    title: "The AI-first CMO",
    venue: "Asia MarTech Conference · Singapore",
    audience: "Regional CMOs · marketing leaders · agencies",
    desc:
      "Talk on integrating generative AI and predictive analytics into conglomerate marketing operations &mdash; without losing brand equity.",
    image: "/images/6.jpg",
  },
  {
    num: "/03 · 03",
    title: "Compounding brand equity",
    venue: "Bangladesh AI & Marketing Summit",
    audience: "National industry leaders · policy · enterprise",
    desc:
      "Opening keynote on the long-horizon brand work required to take Bangladeshi brands into regional category leadership.",
    image: "/images/boss-9.jpg",
  },
];

function ParallaxTile({
  image,
  title,
  num,
  desc,
  venue,
  audience,
}: {
  image: string;
  title: string;
  num: string;
  desc: string;
  venue: string;
  audience: string;
}) {
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
    <article ref={ref} className="speaking-tile">
      <div className="speaking-tile-img">
        <Image src={image} alt={title} fill sizes="(min-width: 1024px) 33vw, 100vw" />
      </div>
      <span className="speaking-tile-num">{num}</span>
      <span className="speaking-tile-venue">{venue}</span>
      <h3 className="speaking-tile-title">{title}</h3>
      <p className="speaking-tile-desc">{desc}</p>
      <p className="speaking-tile-audience">
        <span className="text-eyebrow">Audience ·</span> {audience}
      </p>
    </article>
  );
}

export default function OnStage() {
  return (
    <section id="speaking" className="media" aria-labelledby="speaking-heading">
      <div className="container">
        <div className="media-head">
          <span className="text-eyebrow chapter-h">
            <span className="num">/10</span>
            <span className="name">On Stage</span>
          </span>
          <h2 id="speaking-heading" className="display-section">
            Keynotes, juries, and
            <br />
            public frameworks<span className="italic-serif accent">.</span>
          </h2>
          <p>
            Translating the operator&rsquo;s playbook into public frameworks
            for boards, ministers, and category leaders across APAC and the
            Commonwealth.
          </p>
        </div>

        <figure className="media-portrait fx-scale-in">
          <Image
            src="/images/4.jpg"
            alt="Abdullah Al Alamin — keynote address"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </figure>
      </div>

      {/* Marquee — venues */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...venues, ...venues].map((t, i) => (
            <span className="marquee-item" key={`${t}-${i}`}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="media-tiles fx-stagger">
          {engagements.map((t) => (
            <ParallaxTile
              key={t.num}
              image={t.image}
              title={t.title}
              num={t.num}
              desc={t.desc}
              venue={t.venue}
              audience={t.audience}
            />
          ))}
        </div>

        <div className="speaking-quote fx-fade-up" style={{ marginTop: "var(--space-5)" }}>
          <span className="text-eyebrow" style={{ display: "block", marginBottom: "var(--space-3)" }}>
            Juror &amp; advisory
          </span>
          <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.7 }}>
            Juror at the
            <strong style={{ color: "var(--ink)" }}> Bangladesh Marketing Excellence Awards</strong>,
            mentor at the
            <strong style={{ color: "var(--ink)" }}> Commonwealth Youth Programme</strong>,
            and faculty voice at the
            <strong style={{ color: "var(--ink)" }}> Asia MarTech Conference</strong>.
            Booking inquiries: <a href="mailto:speaking@abdullah-al-alamin.com" style={{ color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: 4 }}>speaking@abdullah-al-alamin.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
}