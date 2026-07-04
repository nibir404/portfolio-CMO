"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface HorizontalPinOptions {
  trackSelector?: string; // default ".h-track"
  pinSelector?: string; // default ".h-pin"
  scrub?: number | boolean; // default 1
  start?: string; // default "top top"
  anticipatePin?: number; // default 1
  snap?: boolean; // default false — set true to also add a snap proxy
}

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Pins a section at the top of the viewport and translates its inner
 * `.h-track` horizontally based on scroll progress.
 *
 * Markup contract:
 *   <section class="h-pin">          ← attach rootRef here
 *     <div class="h-pin-stage">      ← overflow-hidden viewport-sized stage
 *       <div class="h-track">        ← flex track GSAP animates with x
 *         <div class="h-slide">…</div>×N
 *       </div>
 *     </div>
 *   </section>
 */
export function useHorizontalPin(opts: HorizontalPinOptions = {}) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reducedMotion()) return;

    const ctx = gsap.context(() => {
      const pinEl = (opts.pinSelector
        ? root.querySelector<HTMLElement>(opts.pinSelector)
        : root) as HTMLElement | null;
      const track = root.querySelector<HTMLElement>(
        opts.trackSelector ?? ".h-track"
      );
      if (!pinEl || !track) return;

      const computeDistance = () => {
        // Travel distance = track.scrollWidth - viewport width.
        const w = track.scrollWidth - window.innerWidth;
        return w > 0 ? w : 0;
      };

      const tween = gsap.to(track, {
        x: () => -computeDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          start: opts.start ?? "top top",
          end: () => "+=" + computeDistance(),
          pin: true,
          pinSpacing: true,
          scrub: opts.scrub ?? 1,
          anticipatePin: opts.anticipatePin ?? 1,
          invalidateOnRefresh: true,
        },
      });

      // Refresh pin math once images load — next/image fill returns 0×0
      // until layout settles, so scrollWidth can be wrong on first paint.
      const imgs = Array.from(root.querySelectorAll("img"));
      const cleanups: Array<() => void> = [];
      imgs.forEach((img) => {
        if (!img.complete) {
          const onLoad = () => ScrollTrigger.refresh();
          img.addEventListener("load", onLoad, { once: true });
          img.addEventListener("error", onLoad, { once: true });
          cleanups.push(() => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onLoad);
          });
        }
      });

      return () => {
        tween.kill();
        cleanups.forEach((fn) => fn());
      };
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    opts.trackSelector,
    opts.pinSelector,
    opts.scrub,
    opts.start,
    opts.anticipatePin,
    opts.snap,
  ]);

  return rootRef;
}
