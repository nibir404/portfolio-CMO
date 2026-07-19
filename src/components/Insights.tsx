"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Format = "Reel" | "Short" | "Essay" | "LinkedIn" | "Podcast";
type Topic = "Marketing" | "AI" | "Leadership" | "Business" | "Growth" | "Branding" | "Innovation";

type Insight = {
  id: string;
  n: string;
  format: Format;
  title: string;
  desc: string;
  duration: string;
  topic: Topic;
  poster: string;
  video?: string;
  href: string;
};

/* Featured insight — operator's most visible piece this cycle. */
const featured: Insight = {
  id: "featured-01",
  n: "/00",
  format: "Reel",
  title: "The CMO's first 90 days",
  desc:
    "Three frameworks I run on day one of every new mandate — and the one I always revisit by day 60. A four-minute reel pulled from fourteen years of operator playbooks.",
  duration: "4:12",
  topic: "Leadership",
  poster: "/images/boss-final-image.jpg",
  video: "/media/insights/cmo-first-90-days.mp4",
  href: "/media/insights/cmo-first-90-days.mp4",
};

const reels: Insight[] = [
  {
    id: "r-01", n: "/01", format: "Reel",
    title: "AI in marketing is a craft tool",
    desc:
      "Why the doctoral track at Carnegie Mellon exists — and why generative AI does not replace operator taste.",
    duration: "2:48", topic: "AI",
    poster: "/images/boss-8.jpg",
    video: "/media/insights/ai-craft-tool.mp4",
    href: "/media/insights/ai-craft-tool.mp4",
  },
  {
    id: "r-02", n: "/02", format: "Short",
    title: "Compounding beats virality",
    desc:
      "The single principle that decides whether brand work wins a quarter or compounds across a decade.",
    duration: "1:55", topic: "Branding",
    poster: "/images/boss-9.jpg",
    video: "/media/insights/compounding-beats-virality.mp4",
    href: "/media/insights/compounding-beats-virality.mp4",
  },
  {
    id: "r-03", n: "/03", format: "Reel",
    title: "Reputation is rebuilt in public",
    desc:
      "What the Bengal Cement turnaround taught me about narrative discipline in crisis communication.",
    duration: "5:20", topic: "Leadership",
    poster: "/images/img1.jpg",
    video: "/media/insights/reputation-rebuilt-in-public.mp4",
    href: "/media/insights/reputation-rebuilt-in-public.mp4",
  },
  {
    id: "r-04", n: "/04", format: "Essay",
    title: "Geography is a category",
    desc:
      "Operating across Bangladesh, South Asia, APAC, and GCC — and why the market does not flatten across borders.",
    duration: "8 min read", topic: "Business",
    poster: "/images/6.jpg",
    href: "/media/insights/geography-is-a-category.pdf",
  },
  {
    id: "r-05", n: "/05", format: "Short",
    title: "Senior leaders are made in field",
    desc:
      "Authority is not granted by title. It is built by showing up in the field, in the crisis, in the boardroom.",
    duration: "1:42", topic: "Leadership",
    poster: "/images/10.jpg",
    video: "/media/insights/senior-leaders-in-field.mp4",
    href: "/media/insights/senior-leaders-in-field.mp4",
  },
  {
    id: "r-06", n: "/06", format: "Reel",
    title: "The conglomerate as a queryable brand",
    desc:
      "Inside Project Atlas — turning twelve business units into a single brand surface for AI-powered intelligence.",
    duration: "3:30", topic: "AI",
    poster: "/images/boss-final-image.jpg",
    video: "/media/insights/queryable-conglomerate.mp4",
    href: "/media/insights/queryable-conglomerate.mp4",
  },
  {
    id: "r-07", n: "/07", format: "LinkedIn",
    title: "Why I left operational marketing for the CMO chair",
    desc:
      "A long-form post on the move from operator to executive — and what changes when the room is the boardroom.",
    duration: "6 min read", topic: "Growth",
    poster: "/images/abdullah1.jpg",
    href: "https://www.linkedin.com/in/abdullah-al-alamin",
  },
  {
    id: "r-08", n: "/08", format: "Podcast",
    title: "AI in the boardroom — where the CMO sits in 2026",
    desc:
      "Featured guest on the Asia MarTech Podcast. A conversation on how marketing leaders are restructuring for AI-first operating models.",
    duration: "42 min listen", topic: "Innovation",
    poster: "/images/4.jpg",
    href: "/media/insights/ai-in-the-boardroom.mp3",
  },
  {
    id: "r-09", n: "/09", format: "Reel",
    title: "The brand–product boundary is collapsing",
    desc:
      "Three signals that brand strategy is now product strategy — and what that means for the next decade of marketing leadership.",
    duration: "3:08", topic: "Marketing",
    poster: "/images/img2.jpg",
    video: "/media/insights/brand-product-boundary.mp4",
    href: "/media/insights/brand-product-boundary.mp4",
  },
  {
    id: "r-10", n: "/10", format: "Short",
    title: "How to read a P&L like a CMO",
    desc:
      "Five minutes on the only three lines on a P&L a marketing executive actually needs to read.",
    duration: "1:24", topic: "Business",
    poster: "/images/6.jpg",
    video: "/media/insights/read-a-pl-like-a-cmo.mp4",
    href: "/media/insights/read-a-pl-like-a-cmo.mp4",
  },
  {
    id: "r-11", n: "/11", format: "Essay",
    title: "What AI will not replace",
    desc:
      "A long-form essay on the boundary between the work AI can ship and the work that still requires an operator's judgment.",
    duration: "11 min read", topic: "AI",
    poster: "/images/boss-8.jpg",
    href: "/media/insights/what-ai-will-not-replace.pdf",
  },
  {
    id: "r-12", n: "/12", format: "Reel",
    title: "Twelve brands, one operating discipline",
    desc:
      "A walkthrough of the brand architecture work at Bengal Group — and the operating discipline that holds a conglomerate together.",
    duration: "6:50", topic: "Branding",
    poster: "/images/ab4.jpg",
    video: "/media/insights/twelve-brands.mp4",
    href: "/media/insights/twelve-brands.mp4",
  },
];

const ALL_TOPICS: ("All" | Topic)[] = [
  "All",
  "Marketing",
  "AI",
  "Leadership",
  "Business",
  "Growth",
  "Branding",
  "Innovation",
];

const formatBadge: Record<Format, string> = {
  Reel: "REEL",
  Short: "SHORT",
  Essay: "ESSAY",
  LinkedIn: "POST",
  Podcast: "PODCAST",
};

function ReelCard({ insight }: { insight: Insight }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isVideo = !!insight.video;

  const playPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.currentTime = 0;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };
  const stopPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <article
      className="reel-card"
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      onFocus={playPreview}
      onBlur={stopPreview}
    >
      <a
        href={insight.href}
        className="reel-card-link"
        aria-label={`Open: ${insight.title}`}
        {...(insight.format === "LinkedIn" ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        <div className="reel-card-poster">
          <Image
            src={insight.poster}
            alt={insight.title}
            fill
            sizes="(min-width: 1024px) 320px, 280px"
          />

          {isVideo && (
            <video
              ref={videoRef}
              className="reel-card-video"
              src={insight.video}
              muted
              playsInline
              loop
              preload="metadata"
              aria-hidden="true"
            />
          )}

          <div className="reel-card-overlay" aria-hidden="true" />

          <span className="reel-card-format">{formatBadge[insight.format]}</span>
          <span className="reel-card-topic">{insight.topic}</span>
          <span className="reel-card-duration">{insight.duration}</span>
          <span className="reel-card-play" aria-hidden="true">
            {isVideo ? "▶" : "→"}
          </span>
        </div>

        <div className="reel-card-body">
          <span className="reel-card-n">{insight.n}</span>
          <h3 className="reel-card-title">{insight.title}</h3>
          <p className="reel-card-desc">{insight.desc}</p>
          <span className="reel-card-cta">
            {insight.format === "Essay"
              ? "Read essay →"
              : insight.format === "Podcast"
              ? "Listen →"
              : insight.format === "LinkedIn"
              ? "Open on LinkedIn →"
              : "Watch →"}
          </span>
        </div>
      </a>
    </article>
  );
}

/* ── Horizontal-pinned reels band ────────────────────────────── */
function HorizontalReels({
  filtered,
  total,
}: {
  filtered: Insight[];
  total: number;
}) {
  const pinRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = pinRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = root.querySelector<HTMLElement>(".reel-pin-track");
      if (!track) return;

      // Refresh after images settle so scrollWidth is accurate.
      const imgs = Array.from(root.querySelectorAll("img"));
      imgs.forEach((img) => {
        if (!img.complete) {
          const onLoad = () => ScrollTrigger.refresh();
          img.addEventListener("load", onLoad, { once: true });
          img.addEventListener("error", onLoad, { once: true });
        }
      });

      const computeDistance = () => {
        const w = track.scrollWidth - window.innerWidth;
        return w > 0 ? w : 0;
      };

      // Build snap points: each slide center → progress 0–1 across pin distance.
      const buildSnap = () => {
        const slides = Array.from(
          root.querySelectorAll<HTMLElement>(".reel-pin-slide")
        );
        if (!slides.length) return undefined;
        const slideWidth = slides[0].offsetWidth;
        const viewport = window.innerWidth;
        return slides.map((slide) => {
          const slideLeft = slide.offsetLeft - track.offsetLeft;
          const targetX = -(slideLeft - (viewport - slideWidth) / 2);
          const total = computeDistance();
          return total > 0 ? Math.max(0, Math.min(1, -targetX / total)) : 0;
        });
      };

      const tween = gsap.to(track, {
        x: () => -computeDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + computeDistance(),
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: buildSnap(),
            duration: 0.45,
            ease: "power2.inOut",
          },
        },
      });

      // Progress counter (01 / total).
      const counter = root.querySelector<HTMLElement>(
        ".reel-pin-counter .current"
      );
      const totalEl = root.querySelector<HTMLElement>(".reel-pin-counter .total");
      const progress = root.querySelector<HTMLElement>(".reel-pin-progress");
      if (counter && totalEl) {
        totalEl.textContent = String(total).padStart(2, "0");
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: () => "+=" + computeDistance(),
          onUpdate: (self) => {
            const idx = Math.min(
              total,
              Math.ceil(self.progress * total)
            );
            counter.textContent = String(Math.max(1, idx)).padStart(2, "0");
            if (progress) progress.style.setProperty("--p", String(self.progress));
          },
        });
      }

      return () => tween.kill();
    }, root);

    return () => ctx.revert();
  }, [filtered.length, total]);

  return (
    <section
      ref={pinRef}
      className="reel-pin"
      aria-label="Reels horizontal scroll"
    >
      <div className="reel-pin-stage">
        <div className="reel-pin-track">
          <div className="reel-pin-slide reel-pin-slide--intro">
            <div className="reel-pin-intro-inner">
              <span className="text-eyebrow">The reel library</span>
              <h3 className="reel-pin-intro-title">
                {filtered.length} pieces of
                <br />
                short-form thinking<span className="italic-serif accent">.</span>
              </h3>
              <p className="reel-pin-intro-sub">
                Hover to preview. Scroll horizontally to walk the library.
                Filter by topic or open the full archive.
              </p>
              <span className="reel-pin-intro-hint">
                <span>Scroll →</span>
              </span>
            </div>
          </div>

          {filtered.map((it) => (
            <div className="reel-pin-slide" key={it.id}>
              <ReelCard insight={it} />
            </div>
          ))}
        </div>
      </div>

      <div className="reel-pin-counter" aria-hidden="true">
        <span className="current">01</span>
        <span className="progress">
          <span className="reel-pin-progress" />
        </span>
        <span className="total">01</span>
      </div>
    </section>
  );
}

export default function Insights() {
  const [topic, setTopic] = useState<"All" | Topic>("All");
  const filtered = useMemo(
    () => (topic === "All" ? reels : reels.filter((r) => r.topic === topic)),
    [topic]
  );

  return (
    <section id="insights" className="insights" aria-labelledby="insights-heading">
      <div className="container">
        <div className="insights-head">
          <span className="text-eyebrow chapter-h">
            <span className="num">/09</span>
            <span className="name">The Content Hub</span>
          </span>
          <h2 id="insights-heading" className="display-section">
            Reels, essays, and the
            <br />
            operator&rsquo;s playbook<span className="italic-serif accent">.</span>
          </h2>
          <p>
            Short-form thinking from the field &mdash; frameworks, reversals,
            and the principle that earned its keep. New work drops every week.
          </p>
        </div>

        {/* Featured reel */}
        <article className="insight-feature" aria-label="Featured insight">
          <div className="insight-feature-poster">
            <Image
              src={featured.poster}
              alt={featured.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority={false}
            />
            <a
              href={featured.href}
              className="insight-feature-play"
              aria-label={`Play: ${featured.title}`}
            >
              <span className="insight-feature-play-icon" aria-hidden="true">
                ▶
              </span>
              <span className="insight-feature-play-label">Play reel</span>
            </a>
            <span className="insight-feature-duration">{featured.duration}</span>
          </div>

          <div className="insight-feature-body">
            <span className="text-eyebrow">{featured.topic} · {featured.format}</span>
            <h3 className="insight-feature-title">{featured.title}</h3>
            <p className="insight-feature-desc">{featured.desc}</p>
            <a href={featured.href} className="btn-pill btn-pill--invert">
              <span>Watch the reel</span>
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </article>

        {/* Topic filter */}
        <div className="reel-filter" role="tablist" aria-label="Filter content by topic">
          {ALL_TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={topic === t}
              className={`reel-filter-chip${topic === t ? " is-active" : ""}`}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal-pinned reels — lives outside the container on purpose */}
      <HorizontalReels filtered={filtered} total={filtered.length} />

      <div className="container">
        {/* View-all + subscribe row */}
        <div className="reel-actions">
          <a
            href="https://www.linkedin.com/in/abdullah-al-alamin"
            target="_blank"
            rel="noreferrer"
            className="btn-pill btn-pill--invert"
          >
            <span>View all reels</span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
          <p className="reel-actions-note">
            The full library lives on LinkedIn, YouTube, and Substack &mdash;
            updated weekly.
          </p>
        </div>

        {/* Subscribe strip */}
        <div className="insights-subscribe fx-fade-up">
          <div>
            <h3 className="insights-subscribe-title">
              <span className="italic-serif">AlaminWeekly</span>
              <span className="italic-serif accent">.</span>
            </h3>
            <p className="insights-subscribe-desc">
              One brand-strategy insight a week &mdash; in your inbox, in your
              shorts feed, and on the operator&rsquo;s desk every Monday.
            </p>
          </div>
          <a
            href="mailto:office@abdullah-al-alamin.com?subject=Subscribe%20to%20AlaminWeekly"
            className="btn-pill btn-pill--invert"
          >
            <span>Subscribe</span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}