"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface HorizontalPinOptions {
  trackSelector?: string;   // default ".h-track"
  pinSelector?: string;     // default ".h-pin"
  scrub?: number | boolean; // default 1
  start?: string;           // default "top top"
  anticipatePin?: number;   // default 1
  snap?: boolean;           // default true — snap to each slide
  speed?: number;           // multiplier on scroll distance (default 1)
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
 *
 * Snap-to-slide is enabled by default. Each `.h-slide` is snapped into the
 * viewport center as the user scrolls vertically through the pin.
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

      // Reload after images settle — next/image fill returns 0×0 until
      // layout settles, so scrollWidth can be wrong on first paint.
      const imgs = Array.from(root.querySelectorAll("img"));
      imgs.forEach((img) => {
        if (!img.complete) {
          const onLoad = () => ScrollTrigger.refresh();
          img.addEventListener("load", onLoad, { once: true });
          img.addEventListener("error", onLoad, { once: true });
        }
      });

      const computeDistance = () => {
        // Travel distance = track.scrollWidth - viewport width.
        const w = track.scrollWidth - window.innerWidth;
        return w > 0 ? w : 0;
      };

      const speed = opts.speed ?? 1;

      // Build a snap-to-slide array: each slide's snap position is its
      // left offset within the track (relative to the track's center).
      const buildSnap = () => {
        const slides = Array.from(
          root.querySelectorAll<HTMLElement>(".h-slide")
        );
        if (!slides.length) return undefined;
        const slideWidth = slides[0].offsetWidth;
        const viewport = window.innerWidth;
        // Center each slide in the viewport.
        return slides.map((slide) => {
          const slideLeft = slide.offsetLeft - track.offsetLeft;
          const targetX = -(slideLeft - (viewport - slideWidth) / 2);
          // Convert to scroll progress (0–1) across the pin distance.
          const total = computeDistance();
          return total > 0 ? Math.max(0, Math.min(1, -targetX / total)) : 0;
        });
      };

      const tween = gsap.to(track, {
        x: () => -computeDistance() * speed,
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          start: opts.start ?? "top top",
          end: () => "+=" + computeDistance() * speed,
          pin: true,
          pinSpacing: true,
          scrub: opts.scrub ?? 0.8,
          anticipatePin: opts.anticipatePin ?? 1,
          invalidateOnRefresh: true,
          snap: opts.snap === false
            ? { snapTo: [0, 1] }
            : {
                snapTo: buildSnap(),
                duration: 0.45,
                ease: "power2.inOut",
              },
        },
      });

      return () => {
        tween.kill();
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
    opts.speed,
  ]);

  return rootRef;
}