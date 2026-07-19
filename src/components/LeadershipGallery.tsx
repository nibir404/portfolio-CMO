"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Curated executive-context imagery. Each frame names the room, not the selfie. */
const frames = [
  {
    image: "/images/boss-9.jpg",
    caption: "On stage · international keynote",
    meta: "World Brand Congress · Mumbai",
  },
  {
    image: "/images/4.jpg",
    caption: "Brand architecture workshop",
    meta: "Betopia Group · strategy offsite",
  },
  {
    image: "/images/boss-8.jpg",
    caption: "Press conference",
    meta: "Asia Marketing Federation",
  },
  {
    image: "/images/10.jpg",
    caption: "Boardroom strategy session",
    meta: "Group leadership review",
  },
  {
    image: "/images/img2.jpg",
    caption: "On air · national television",
    meta: "Metrocem To The Point · Channel i",
  },
  {
    image: "/images/boss-final-image.jpg",
    caption: "Executive portrait",
    meta: "Office of the CMO",
  },
  {
    image: "/images/6.jpg",
    caption: "Singapore · regional summit",
    meta: "Asia MarTech Conference",
  },
  {
    image: "/images/abdullah1.jpg",
    caption: "Editorial portrait",
    meta: "Featured · The Daily Star",
  },
  {
    image: "/images/ab4.jpg",
    caption: "Strategic review",
    meta: "Bengal Group · portfolio turnaround",
  },
];

function GalleryFrame({
  image,
  caption,
  meta,
}: {
  image: string;
  caption: string;
  meta: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  /* Reveal only — no parallax translate that would blur a static editorial layout. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <figure ref={ref} className="leadership-gallery-frame">
      <div className="leadership-gallery-img">
        <Image src={image} alt={caption} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <figcaption className="leadership-gallery-cap">
        <span className="leadership-gallery-cap-title">{caption}</span>
        <span className="leadership-gallery-cap-meta">{meta}</span>
      </figcaption>
    </figure>
  );
}

export default function LeadershipGallery() {
  return (
    <section id="leadership-gallery" className="leadership-gallery" aria-labelledby="leadership-gallery-heading">
      <div className="container">
        <div className="leadership-gallery-head">
          <span className="text-eyebrow chapter-h">
            <span className="num">/07</span>
            <span className="name">Leadership Gallery</span>
          </span>
          <h2 id="leadership-gallery-heading" className="display-section">
            In the rooms where the
            <br />
            work happens<span className="italic-serif accent">.</span>
          </h2>
          <p>
            On stage, in the boardroom, in the field &mdash; the work is
            visible, and the rooms it happens in are the rooms that matter.
          </p>
        </div>

        <div className="leadership-gallery-grid">
          {frames.map((f) => (
            <GalleryFrame
              key={f.image + f.caption}
              image={f.image}
              caption={f.caption}
              meta={f.meta}
            />
          ))}
        </div>
      </div>
    </section>
  );
}