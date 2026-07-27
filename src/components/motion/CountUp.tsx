"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CountUpProps = {
  value: string;
};

/**
 * Renders the final value in HTML by default. If the user has not requested
 * reduced motion, animates from 0 to the final value on enter.
 *
 * The animation only animates the leading number when the input begins with
 * a numeric value. Otherwise, the value is rendered as-is.
 */
export function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const match = /^(\d[\d,.]*)(.*)$/.exec(value);
    if (!match) {
      setDisplay(value);
      return;
    }
    const numeric = Number.parseFloat(match[1].replace(/,/g, ""));
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    const suffix = match[2] ?? "";
    const el = ref.current;
    if (!el) {
      setDisplay(value);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          const start = performance.now();
          const duration = 1200;
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = numeric * eased;
            const formatted = formatNumber(current, match[1]);
            setDisplay(`${formatted}${suffix}`);
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, value]);

  return (
    <span ref={ref} aria-label={value}>
      {display}
    </span>
  );
}

function formatNumber(value: number, source: string): string {
  if (source.includes(".")) {
    return value.toFixed(1);
  }
  if (source.includes(",")) {
    return Math.round(value).toLocaleString("en-GB");
  }
  return Math.round(value).toString();
}

// WCAG AAA definitions: HTML = HyperText Markup Language
