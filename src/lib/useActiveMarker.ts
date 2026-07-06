"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * useActiveMarker — tracks which `.edu-row` (or similar) is currently in
 * the viewport center, and toggles `.is-active` on it. Pairs with CSS that
 * styles the active state (e.g. fills the marker dot).
 */
export function useActiveMarker(
  rootSelector: string,
  rowSelector: string,
  options: { start?: string; end?: string } = {}
) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.querySelector<HTMLElement>(rootSelector);
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const rows = root.querySelectorAll<HTMLElement>(rowSelector);
    if (rows.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    rows.forEach((row) => {
      const t = ScrollTrigger.create({
        trigger: row,
        start: options.start ?? "top center",
        end: options.end ?? "bottom center",
        onEnter: () => row.classList.add("is-active"),
        onEnterBack: () => row.classList.add("is-active"),
        onLeave: () => row.classList.remove("is-active"),
        onLeaveBack: () => row.classList.remove("is-active"),
      });
      triggers.push(t);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [rootSelector, rowSelector, options.start, options.end]);
}