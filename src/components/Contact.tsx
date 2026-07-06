"use client";

import { useEffect, type FormEvent } from "react";
import Image from "next/image";
import { useSplitText, playCharReveal } from "@/lib/useSplitText";

export default function Contact() {
  useSplitText(".contact-title");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          playCharReveal(".contact-title", { stagger: 0.05, duration: 0.9 });
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    const el = document.querySelector(".contact-title");
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* placeholder — no backend yet */
  };

  return (
    <section
      id="contact"
      className="contact snap-section"
      data-nav-tone="dark"
      data-section-tone="dark"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="contact-content">
          <figure className="contact-portrait fx-scale-in">
            <Image
              src="/images/boss-final-image.jpg"
              alt="Abdullah Al Alamin"
              fill
              sizes="(min-width: 768px) 200px, 140px"
            />
          </figure>

          <span className="contact-eyebrow">/10 · Contact</span>
          <h2 id="contact-heading" className="contact-title">
            Let&rsquo;s build something that lasts<span className="period">.</span>
          </h2>
          <p className="contact-sub">
            Currently open to collaborating with growth-driven, visionary
            companies &mdash; where brand evolution, customer connection, and
            business expansion happen at scale.
          </p>

          <div className="contact-cta-row">
            <a href="mailto:hello@abdullah-al-alamin.com" className="btn-pill btn-pill--invert magnetic-btn">
              <span>Get in Touch</span>
              <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="/cv.pdf" className="btn-pill btn-pill--ghost">
              <span>Download CV</span>
            </a>
          </div>

          <div className="newsletter">
            <h3 className="newsletter-label">
              AlaminWeekly<span className="italic-serif accent">.</span>
            </h3>
            <p className="newsletter-sub">
              One brand-strategy insight a week, straight from 14+ years in
              the field &mdash; now with applied AI research in the mix.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="you@company.com"
                aria-label="Email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit">
                Subscribe →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}