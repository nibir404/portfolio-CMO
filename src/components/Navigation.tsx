"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useScrollSpy } from "@/lib/useScrollSpy";

const links = [
  { label: "Origin", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Results", href: "#results" },
  { label: "Awards", href: "#awards" },
  { label: "Craft", href: "#expertise" },
  { label: "Learn", href: "#education" },
  { label: "Media", href: "#media" },
  { label: "Beyond", href: "#beyond" },
];

/**
 * Top-fixed transparent nav.
 *
 * • Tone (dark/light) flips based on `[data-nav-tone="dark"]` overlap.
 * • Scroll-spy highlights the link matching the section in viewport center.
 * • Theme toggle (sun/moon) calls `toggleTheme` from ThemeProvider.
 * • Mobile (≤1024px): links collapse into a slide-down drawer.
 * • Background stays transparent at all times — only color + 1px hairline swap.
 */
export default function Navigation() {
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeId = useScrollSpy([
    "hero",
    "about",
    "journey",
    "results",
    "awards",
    "expertise",
    "education",
    "media",
    "beyond",
    "contact",
  ]);

  /* Tone tracking via IntersectionObserver */
  useEffect(() => {
    const darkEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-tone='dark']")
    );
    if (darkEls.length === 0) {
      setTone(theme === "dark" ? "dark" : "light");
      return;
    }

    const updateTone = () => {
      const navH = 64;
      const navRect = { top: 0, bottom: navH };
      for (const el of darkEls) {
        const r = el.getBoundingClientRect();
        if (r.bottom > navRect.top && r.top < navRect.bottom) {
          setTone("dark");
          return;
        }
      }
      setTone("light");
    };

    const io = new IntersectionObserver(updateTone, {
      threshold: [0, 0.0001, 0.5, 1],
    });
    darkEls.forEach((el) => io.observe(el));

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        updateTone();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateTone();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [theme]);

  /* Scrolled state for hairline */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  /* Close drawer when clicking a link */
  const handleLinkClick = () => setDrawerOpen(false);

  const navClass = [
    "nav",
    `nav--${tone}`,
    scrolled ? "is-scrolled" : "",
    drawerOpen ? "is-drawer-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav className={navClass} aria-label="Primary">
        <a href="#main" className="nav-logo" aria-label="Abdullah Al Alamin home">
          <span className="nav-logo-mark">A·A</span>
          <span className="nav-logo-tag">/CMO_001</span>
        </a>

        <div className="nav-links" role="list">
          {links.map((l) => {
            const id = l.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link${isActive ? " is-active" : ""}`}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "light"}
          >
            <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="3" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </button>

          <a
            href="#contact"
            className="nav-cta"
            aria-label="Get in touch with Abdullah"
          >
            Get in touch
          </a>

          <button
            type="button"
            className="nav-burger"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            aria-controls="nav-drawer"
          >
            <span className={`burger-line ${drawerOpen ? "is-open" : ""}`} />
            <span className={`burger-line ${drawerOpen ? "is-open" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="nav-drawer"
        className={`nav-drawer ${drawerOpen ? "is-open" : ""}`}
        aria-hidden={!drawerOpen}
      >
        <div className="nav-drawer-inner">
          {links.map((l) => {
            const id = l.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`nav-drawer-link${isActive ? " is-active" : ""}`}
                onClick={handleLinkClick}
              >
                <span className="nav-drawer-num">
                  /{String(links.findIndex((x) => x.href === l.href) + 1).padStart(2, "0")}
                </span>
                {l.label}
              </a>
            );
          })}
          <a
            href="#contact"
            className="btn-pill btn-pill--invert nav-drawer-cta"
            onClick={handleLinkClick}
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}