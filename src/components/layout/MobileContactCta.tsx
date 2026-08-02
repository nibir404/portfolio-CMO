"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function MobileContactCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("top");
    if (!heroEl) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button when hero is NOT in view (scrolled past)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      className="mobile-cta"
      href="#contact"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.35s ease, opacity 0.35s ease",
      }}
    >
      Book a 30-minute call →
    </Link>
  );
}
