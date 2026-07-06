"use client";

import Image from "next/image";
import { useActiveMarker } from "@/lib/useActiveMarker";

type Entry = {
  n: string;
  degree: string;
  school: string;
  meta: string;
  highlight?: boolean;
};

const entries: Entry[] = [
  {
    n: "/01",
    degree: "PhD, Artificial Intelligence & Modern Technological Advancement",
    school: "Carnegie Mellon University · School of Computer Science, USA",
    meta: "2023 – Present · In progress",
    highlight: true,
  },
  {
    n: "/02",
    degree: "MBA, Marketing (iMBA)",
    school: "Gies College of Business · University of Illinois Urbana-Champaign, USA",
    meta: "GPA 3.85 / 4.0",
    highlight: true,
  },
  {
    n: "/03",
    degree: "MBA, Human Resource Management",
    school: "Daffodil Institute of IT (DIIT), Bangladesh",
    meta: "Postgraduate",
  },
  {
    n: "/04",
    degree: "BBA, Marketing",
    school: "Daffodil Institute of IT (DIIT), Bangladesh",
    meta: "Undergraduate",
  },
  {
    n: "/05",
    degree: "HSC, Commerce",
    school: "Dhaka Commerce College, Bangladesh",
    meta: "Higher Secondary",
  },
  {
    n: "/06",
    degree: "SSC, Commerce",
    school: "BN School Dhaka, Bangladesh",
    meta: "Secondary",
  },
];

export default function Education() {
  useActiveMarker(".edu-list", ".edu-row");

  return (
    <section id="education" className="education" aria-labelledby="education-heading">
      <div className="container">
        <div className="education-head">
          <span className="text-eyebrow chapter-h">
            <span className="num">/06</span>
            <span className="name">Education &amp; Continuous Learning</span>
          </span>
          <h2 id="education-heading" className="display-section">
            The foundation<span className="italic-serif accent">.</span>
          </h2>
          <p>
            Formal study stacked on 14+ years of practice &mdash; now anchored
            by an ongoing doctoral research track at Carnegie Mellon.
          </p>
        </div>

        <figure className="education-portrait fx-slide-left">
          <Image
            src="/images/boss-8.jpg"
            alt="Abdullah Al Alamin — speaking at academic forum"
            fill
            sizes="(min-width: 768px) 360px, 90vw"
          />
        </figure>

        <div className="edu-list">
          {entries.map((e) => (
            <div className={`edu-row${e.highlight ? " is-highlight" : ""}`} key={e.n}>
              <div className="edu-marker">
                <span className="edu-dot" aria-hidden="true" />
                <span className="edu-row-num">{e.n}</span>
              </div>
              <div className="edu-body">
                <h3 className="edu-degree">{e.degree}</h3>
                <p className="edu-school">{e.school}</p>
                <span className="edu-meta">{e.meta}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="edu-continuous fx-fade-up"
          style={{
            marginTop: "var(--space-5)",
            padding: "var(--space-5)",
            background: "var(--bg-elev)",
            border: "1px solid var(--line)",
          }}
        >
          <span className="text-eyebrow" style={{ display: "block", marginBottom: "var(--space-3)" }}>
            Continuous Learning
          </span>
          <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--ink)" }}>1,000+ completed courses</strong>{" "}
            in AI, machine learning, and marketing analytics from Carnegie Mellon,
            Google, Meta, HubSpot Academy, Coursera, and MIT Sloan
            &mdash; 2013 to present.
          </p>
        </div>
      </div>
    </section>
  );
}