"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseGSAPHeroOpts {
  rootRef: RefObject<HTMLElement | null>;
  imageWrapRef: RefObject<HTMLDivElement | null>;
}

function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useGSAPHero({ rootRef, imageWrapRef }: UseGSAPHeroOpts) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reducedMotion()) {
      // Set everything to final state immediately
      gsap.set(root.querySelectorAll(".hero-display, .hero-body-copy"), {
        opacity: 1,
        y: 0,
      });
      return;
    }

    // ScrollTrigger plugin is needed for scroll-driven tweens below
    gsap.registerPlugin(ScrollTrigger);

    // Local cleanup array — the gsap.context() callback can't reference
    // `ctx` itself (TDZ). All non-GSAP listeners are torn down manually.
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      // ① Image clip-path wipe — diagonal from top-left
      if (imageWrapRef.current) {
        tl.from(
          imageWrapRef.current,
          {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            duration: 1.4,
            ease: "power3.inOut",
          },
          0
        );
      }

      // ② Image — start scaled up + heavy grayscale, then snap to neutral
      tl.from(
        ".hero-image",
        {
          scale: 1.3,
          filter: "grayscale(100%) contrast(1.4)",
          duration: 1.6,
          ease: "power2.out",
        },
        0
      ).to(
        ".hero-image",
        {
          filter: "grayscale(100%) contrast(1.05)",
          duration: 0.8,
          ease: "sine.inOut",
        },
        "-=0.4"
      );

      // ③ Eyebrow rolls in
      tl.from(".hero-eyebrow", {
        x: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      // ④ Display headline — soft fade-up
      tl.from(
        ".hero-display",
        {
          opacity: 0,
          y: 36,
          duration: 1.1,
          ease: "expo.out",
        },
        "-=0.5"
      );

      // ⑤ Body copy
      tl.from(
        ".hero-body-copy",
        {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // ⑥ CTA pop
      tl.from(
        ".hero-cta",
        {
          opacity: 0,
          scale: 0.85,
          y: 20,
          duration: 0.6,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      );

      // ⑦ Stats strip wipes up
      tl.from(
        ".hero-stat-chrome",
        {
          opacity: 0,
          yPercent: 100,
          stagger: 0.06,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // ⑧ Image parallax on scroll
      if (imageWrapRef.current) {
        gsap.to(imageWrapRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      // ⑨ Image gentle zoom on scroll
      gsap.to(".hero-image", {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // ⑩ Magnetic primary CTA
      const cta = root.querySelector<HTMLElement>(".hero-cta--primary");
      if (cta) {
        const onMv = (e: MouseEvent) => {
          const r = cta.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          gsap.to(cta, {
            x: dx * 0.18,
            y: dy * 0.18,
            duration: 0.4,
            ease: "power2.out",
          });
        };
        const onLv = () => {
          gsap.to(cta, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          });
        };
        cta.addEventListener("mousemove", onMv);
        cta.addEventListener("mouseleave", onLv);
        cleanups.push(() => {
          cta.removeEventListener("mousemove", onMv);
          cta.removeEventListener("mouseleave", onLv);
        });
      }
    }, root);

    return () => {
      // Tear down GSAP tweens + ScrollTriggers created inside ctx
      ctx.revert();
      // Then tear down manual DOM listeners
      cleanups.forEach((fn) => fn());
    };
  }, [rootRef, imageWrapRef]);
}