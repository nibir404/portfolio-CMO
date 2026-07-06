"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Adds cinematic GSAP scroll-triggered animations across the page.
 *
 *   .fx-fade-up        → fade + translateY(24 → 0)
 *   .fx-fade-in        → opacity 0 → 1
 *   .fx-slide-left     → fade + translateX(40 → 0)
 *   .fx-slide-right    → fade + translateX(-40 → 0)
 *   .fx-scale-in       → fade + scale(0.94 → 1)
 *   .fx-stagger        → child elements fade-up with 0.08s stagger
 *   .fx-parallax       → translateY on scroll (decorative depth)
 *
 * All animations respect `prefers-reduced-motion`.
 */
export function useScrollFx() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          ".fx-fade-up, .fx-fade-in, .fx-slide-left, .fx-slide-right, .fx-scale-in",
          { opacity: 1, x: 0, y: 0, scale: 1 }
        );
        return;
      }

      // ── Fade-up ──────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".fx-fade-up").forEach((el) => {
        gsap.fromTo(
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
      });

      // ── Fade-in (opacity only) ───────────────────────────────
      gsap.utils.toArray<HTMLElement>(".fx-fade-in").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Slide-in-left ────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".fx-slide-left").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -48 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Slide-in-right ───────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".fx-slide-right").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 48 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Scale-in ─────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".fx-scale-in").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Stagger (children fade-up) ───────────────────────────
      gsap.utils.toArray<HTMLElement>(".fx-stagger").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(":scope > *"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Parallax (decorative depth) ──────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-fx-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.fxParallax ?? "0.15");
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}