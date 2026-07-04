"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Origin", href: "#about" },
  { label: "Mandates", href: "#case-studies-intro" },
  { label: "Craft", href: "#services-intro" },
  { label: "Method", href: "#process-intro" },
  { label: "Reach", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`} aria-label="Primary">
      <a href="#main" className="nav-logo" aria-label="Abdullah Al Amin home">
        <span className="nav-logo-mark">A·A</span>
        <span className="nav-logo-tag">/CMO_001</span>
      </a>

      <div className="nav-links" role="list">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="nav-link">
            {l.label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="nav-cta"
        data-cursor-hover
        aria-label="Book a strategy call with Abdullah"
      >
        Book a call /Abdullah
      </a>
    </nav>
  );
}
