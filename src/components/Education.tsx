"use client";

import { useActiveMarker } from "@/lib/useActiveMarker";

type Entry = {
  n: string;
  degree: string;
  school: string;
  meta: string;
  highlight?: boolean;
};

/* Education rendered as institutional affiliations — degree, institution, era. No CGPA, no courses. */
const entries: Entry[] = [
  {
    n: "/01",
    degree: "PhD, Artificial Intelligence & Modern Technological Advancement",
    school: "Carnegie Mellon University · USA",
    meta: "Ongoing · doctoral researcher",
    highlight: true,
  },
  {
    n: "/02",
    degree: "MBA, Marketing (iMBA)",
    school: "Gies College of Business · University of Illinois Urbana-Champaign, USA",
    meta: "Specialisation in marketing strategy",
    highlight: true,
  },
  {
    n: "/03",
    degree: "MBA, Human Resource Management",
    school: "Daffodil Institute of IT, Bangladesh",
    meta: "Postgraduate",
  },
  {
    n: "/04",
    degree: "BBA, Marketing",
    school: "Daffodil Institute of IT, Bangladesh",
    meta: "Undergraduate",
  },
];

export default function Education() {
  useActiveMarker(".edu-list", ".edu-row");

  return (
    <section id="education" className="education" aria-labelledby="education-heading">
      <div className="container">
        <div className="education-head">
          <span className="text-eyebrow chapter-h">
            <span className="num">/12</span>
            <span className="name">Education</span>
          </span>
          <h2 id="education-heading" className="display-section">
            Academic affiliations<span className="italic-serif accent">.</span>
          </h2>
          <p>
            The institutions that built the operator &mdash; not the
            transcript, just the rooms the work was forged in.
          </p>
        </div>

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
      </div>
    </section>
  );
}