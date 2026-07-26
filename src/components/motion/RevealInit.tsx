"use client";

import { useEffect } from "react";

/**
 * Ensure the JS-enabled reveal helper has its first paint state set before the
 * IntersectionObserver attaches. This avoids a flash where content is hidden
 * if the first reveal target is already in the viewport.
 */
export function RevealInit() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const targets = document.querySelectorAll<HTMLElement>(".reveal");
    targets.forEach((target) => {
      if (!target.dataset.revealReady) {
        const rect = target.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        target.dataset.revealReady = inView ? "true" : "false";
      }
    });
  }, []);
  return null;
}
