"use client";

import Image from "next/image";
import { useSplitText, playCharReveal } from "@/lib/useSplitText";
import { useEffect } from "react";

/* Direct channels into the Office of the CMO. Each channel names the audience it serves. */
const channels = [
  {
    n: "/01",
    label: "Boardroom & brand mandates",
    value: "office@abdullah-al-alamin.com",
    href: "mailto:office@abdullah-al-alamin.com",
    note: "Group CMO mandates · board advisory · 90-day growth sprints",
  },
  {
    n: "/02",
    label: "Speaking & faculty",
    value: "speaking@abdullah-al-alamin.com",
    href: "mailto:speaking@abdullah-al-alamin.com",
    note: "Keynotes · juries · faculty conversations",
  },
  {
    n: "/03",
    label: "Press & interviews",
    value: "press@abdullah-al-alamin.com",
    href: "mailto:press@abdullah-al-alamin.com",
    note: "Interviews · bylines · photo and fact-sheet requests",
  },
  {
    n: "/04",
    label: "Direct line",
    value: "+880 1700 000 000",
    href: "tel:+8801700000000",
    note: "Mon–Fri · 10:00–18:00 BST · WhatsApp available",
  },
];

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

          <span className="contact-eyebrow">/13 · Engage the office</span>
          <h2 id="contact-heading" className="contact-title">
            Brief the office of the CMO<span className="period">.</span>
          </h2>
          <p className="contact-sub">
            Currently engaging with growth-driven, visionary companies &mdash;
            where brand evolution, customer connection, and business
            expansion happen at scale.
          </p>

          <div className="contact-channels fx-stagger">
            {channels.map((c) => (
              <a key={c.n} href={c.href} className="contact-channel">
                <span className="contact-channel-n">{c.n}</span>
                <div className="contact-channel-body">
                  <span className="contact-channel-label">{c.label}</span>
                  <span className="contact-channel-value">{c.value}</span>
                  <span className="contact-channel-note">{c.note}</span>
                </div>
                <span className="contact-channel-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>

          <div className="contact-cta-row">
            <a
              href="https://cal.com/abdullah-al-alamin"
              className="btn-pill btn-pill--invert magnetic-btn"
            >
              <span>Book a 30-min call</span>
              <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/abdullah-al-alamin"
              className="btn-pill btn-pill--ghost"
              target="_blank"
              rel="noreferrer"
            >
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}