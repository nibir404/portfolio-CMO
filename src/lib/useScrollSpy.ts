"use client";

import { useEffect, useState } from "react";

/**
 * useScrollSpy — observes a list of section IDs and returns the ID of the
 * one currently most visible in the viewport. Used by the navigation bar
 * to highlight the active link.
 */
export function useScrollSpy(ids: string[], options: { rootMargin?: string } = {}): string {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (ids.length === 0) return;

    const rootMargin = options.rootMargin ?? "-40% 0px -55% 0px";
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [ids.join("|"), options.rootMargin]);

  return activeId;
}