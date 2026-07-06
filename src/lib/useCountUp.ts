"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * useCountUp — tweens the textContent of `ref.current` from 0 to `target`
 * when the element enters the viewport. Honors prefers-reduced-motion.
 *
 * @param ref    React ref to the element whose text will be animated
 * @param target The number to count up to
 * @param duration  Tween length in seconds (default 1.6)
 * @param decimals  Decimal places to show (default 0)
 */
export function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  duration = 1.6,
  decimals = 0
) {
  const playedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      el.textContent = format(target, decimals);
      return;
    }

    if (playedRef.current) return;
    el.textContent = format(0, decimals);

    const proxy = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(proxy, {
          val: target,
          duration,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = format(proxy.val, decimals);
          },
          onComplete: () => {
            el.textContent = format(target, decimals);
            playedRef.current = true;
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [ref, target, duration, decimals]);
}

function format(value: number, decimals: number): string {
  if (decimals === 0) return Math.round(value).toLocaleString();
  return value.toFixed(decimals);
}