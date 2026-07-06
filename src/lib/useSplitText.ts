"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * useSplitText — wraps the text content of `selector` in <span class="word">
 * > <span class="char">…</span></span> so each character can be animated
 * independently via GSAP. Pure DOM — no paid SplitText plugin required.
 *
 * Strategy:
 *   "Abdullah Al Alamin"  →
 *     <span class="word"><span class="char">A</span>…</span>
 *     <span class="word"><span class="char">A</span>…</span>
 *     <span class="word"><span class="char">A</span>…</span>
 *
 * Whitespace between words is preserved. Punctuation is treated like a char.
 */
export function useSplitText(
  selector: string,
  options: { wordClass?: string; charClass?: string } = {}
) {
  const wordClass = options.wordClass ?? "word";
  const charClass = options.charClass ?? "char";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.querySelector<HTMLElement>(selector);
    if (!root) return;

    // Skip if already split
    if (root.querySelector(`.${wordClass}`)) return;

    const original = root.textContent ?? "";
    const words = original.split(/(\s+)/); // keep whitespace tokens

    const fragment = document.createDocumentFragment();

    words.forEach((segment) => {
      if (/^\s+$/.test(segment)) {
        fragment.appendChild(document.createTextNode(segment));
        return;
      }
      if (segment.length === 0) return;
      const wordEl = document.createElement("span");
      wordEl.className = wordClass;
      wordEl.style.display = "inline-block";
      wordEl.style.whiteSpace = "nowrap";
      for (const ch of Array.from(segment)) {
        const charEl = document.createElement("span");
        charEl.className = charClass;
        charEl.style.display = "inline-block";
        charEl.textContent = ch;
        wordEl.appendChild(charEl);
      }
      fragment.appendChild(wordEl);
      fragment.appendChild(document.createTextNode(" "));
    });

    // Remove trailing space
    if (fragment.lastChild?.nodeType === Node.TEXT_NODE) {
      fragment.removeChild(fragment.lastChild);
    }

    root.textContent = "";
    root.appendChild(fragment);
  }, [selector, wordClass, charClass]);
}

/**
 * playCharReveal — animates an element's `.char` children in via GSAP.
 * Used right after useSplitText. Idempotent.
 */
export function playCharReveal(
  selector: string,
  options: { stagger?: number; duration?: number; y?: number } = {}
) {
  const stagger = options.stagger ?? 0.04;
  const duration = options.duration ?? 0.9;
  const y = options.y ?? 110;

  if (typeof window === "undefined") return;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    gsap.set(`${selector} .char`, { y: 0, opacity: 1 });
    return;
  }

  gsap.fromTo(
    `${selector} .char`,
    { yPercent: y, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration,
      ease: "power3.out",
      stagger,
    }
  );
}