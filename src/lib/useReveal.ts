"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let globalLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return globalLenis;
}

export function useRevealInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cleanups: Array<() => void> = [];

    if (!globalLenis) {
      gsap.registerPlugin(ScrollTrigger);
      globalLenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.1,
      });
      globalLenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => globalLenis?.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    /* Intercept anchor clicks for ultra-smooth Lenis scrolling */
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const targetEl = document.querySelector<HTMLElement>(href);
      if (targetEl && globalLenis) {
        e.preventDefault();
        globalLenis.scrollTo(targetEl, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    cleanups.push(() => document.removeEventListener("click", handleAnchorClick));



    const ctx = gsap.context(() => {
      // ── Reveal on enter (restrained fade — no translate) ───────
      const reveals = gsap.utils.toArray<HTMLElement>(".reveal");
      reveals.forEach((el) => {
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

      const staggers = gsap.utils.toArray<HTMLElement>(".reveal-stagger");
      staggers.forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(":scope > *"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Active section marker ─────────────────────────────────
      // Toggle 'is-active' on snap-section / h-pin
      // when the section's mid-line crosses 50% of viewport.
      // Pure visual highlight on chapter eyebrow.
      const activeSections = gsap.utils.toArray<HTMLElement>(
        ".snap-section, .h-pin"
      );
      activeSections.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          toggleClass: { className: "is-active", targets: el },
        });
      });

      // ── Horizontal-band progress counter (e.g. "01 / 06") ─────
      const bands = gsap.utils.toArray<HTMLElement>(".h-pin");
      bands.forEach((band) => {
        const counter = band.querySelector<HTMLElement>(
          ".h-slide-counter .current"
        );
        const total = band.querySelector<HTMLElement>(".h-slide-counter .total");
        const progress = band.querySelector<HTMLElement>(".h-progress");
        if (!counter || !total) return;
        const slides = band.querySelectorAll<HTMLElement>(".h-slide");
        total.textContent = String(slides.length).padStart(2, "0");
        ScrollTrigger.create({
          trigger: band,
          start: "top top",
          end: "+=100%",
          onUpdate: (self) => {
            const idx = Math.min(
              slides.length,
              Math.ceil(self.progress * slides.length)
            );
            counter.textContent = String(Math.max(1, idx)).padStart(2, "0");
            if (progress)
              progress.style.setProperty("--h-progress", String(self.progress));
          },
        });
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);
}

export function useMagnetic() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const buttons = document.querySelectorAll<HTMLElement>(".magnetic-btn");
    const cleanups: Array<() => void> = [];

    buttons.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const strength = 0.3;
        btn.style.setProperty("--mx", `${x * strength}px`);
        btn.style.setProperty("--my", `${y * strength}px`);
      };
      const onLeave = () => {
        btn.style.setProperty("--mx", `0px`);
        btn.style.setProperty("--my", `0px`);
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}