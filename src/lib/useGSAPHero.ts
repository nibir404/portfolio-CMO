"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitText, playCharReveal } from "@/lib/useSplitText";

interface UseGSAPHeroOpts {
  rootRef: RefObject<HTMLElement | null>;
  portraitRef: RefObject<HTMLDivElement | null>;
}

function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Hero composition timeline (always-dark, portrait bg cover):
 *   1. Portrait clip-path wipe (diagonal) — opener
 *   2. Portrait scale + grayscale settle
 *   3. Eyebrow roll-in
 *   4. Display headline — character-by-character reveal
 *   5. Body copy fade-up
 *   6. CTA pop
 *   7. Portrait parallax on scroll
 *   8. Subtle scale drift on scroll (capped so portrait never crops badly)
 *   9. Magnetic primary CTA
 */
export function useGSAPHero({ rootRef, portraitRef }: UseGSAPHeroOpts) {
  /* Split the headline text into chars for the reveal animation. */
  useSplitText("#hero-title");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    if (reducedMotion()) {
      gsap.set(root.querySelectorAll(".hero-title .char, .hero-sub, .hero-cta-row, .hero-eyebrow"), {
        opacity: 1,
        y: 0,
      });
      gsap.set(".hero-portrait-img", { scale: 1 });
      return;
    }

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // ① Portrait clip-path wipe — diagonal from top-left
      if (portraitRef.current) {
        tl.from(
          portraitRef.current,
          {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            duration: 1.4,
            ease: "power3.inOut",
          },
          0
        );
      }

      // ② Portrait — scale 1.08 → 1, with grayscale settling
      tl.from(
        ".hero-portrait-img",
        {
          scale: 1.08,
          filter: "grayscale(100%) contrast(1.25)",
          duration: 1.6,
          ease: "power2.out",
        },
        0
      ).to(
        ".hero-portrait-img",
        {
          filter: "grayscale(100%) contrast(1.04)",
          duration: 0.8,
          ease: "sine.inOut",
        },
        "-=0.4"
      );

      // ③ Eyebrow roll-in
      tl.from(".hero-eyebrow", {
        x: 40,
        opacity: 0,
        duration: 0.7,
      });

      // ④ Headline — character-by-character reveal
      tl.add(() => playCharReveal("#hero-title", { stagger: 0.045, duration: 0.9 }), "-=0.3");

      // ⑤ Subhead fade-up
      tl.from(
        ".hero-sub",
        {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // ⑥ CTAs pop
      tl.from(
        ".hero-cta-row",
        {
          opacity: 0,
          scale: 0.92,
          y: 20,
          duration: 0.6,
          ease: "back.out(1.5)",
        },
        "-=0.4"
      );

      // ⑦ Portrait parallax on scroll
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      // ⑧ Gentle zoom — capped at 1.03 (only on the active portrait)
      gsap.to(".hero-portrait-img.is-active", {
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // ⑨ Magnetic primary CTA
      const cta = root.querySelector<HTMLElement>(".hero-cta-row .btn-pill--invert");
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

      // ⑩ Portrait gallery crossfade — auto-rotate every 6s + manual thumb clicks
      const imgs = Array.from(
        root.querySelectorAll<HTMLImageElement>(".hero-portrait-img")
      );
      const thumbs = Array.from(
        root.querySelectorAll<HTMLElement>(".hero-portrait-thumb")
      );
      if (imgs.length > 1) {
        let active = 0;
        const ROTATE_MS = 6000;

        const setActive = (idx: number) => {
          active = ((idx % imgs.length) + imgs.length) % imgs.length;
          imgs.forEach((img, i) => {
            img.classList.toggle("is-active", i === active);
          });
          thumbs.forEach((t, i) => {
            t.classList.toggle("is-active", i === active);
          });
          // Re-apply zoom to the now-active image (kill any existing tween first)
          ScrollTrigger.getAll()
            .filter((t) => t.trigger === imgs[active] && t.animation)
            .forEach((t) => t.kill());
          gsap.fromTo(
            imgs[active],
            { scale: 1.0 },
            {
              scale: 1.03,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        };

        const interval = window.setInterval(() => {
          setActive(active + 1);
        }, ROTATE_MS);
        cleanups.push(() => window.clearInterval(interval));

        thumbs.forEach((thumb, i) => {
          const onClick = (e: MouseEvent) => {
            e.preventDefault();
            setActive(i);
          };
          thumb.addEventListener("click", onClick);
          cleanups.push(() => thumb.removeEventListener("click", onClick));
        });

        thumbs[0]?.classList.add("is-active");
      }
    }, root);

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, [rootRef, portraitRef]);
}