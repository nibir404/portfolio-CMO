"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initially
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="container site-header__inner">
        <Link className="site-logo" href="/" aria-label="Abdullah Al Alamin — home">
          <span className="site-logo__name">Abdullah Al Alamin</span>
          <span className="site-logo__title">Group CMO · Betopia Group</span>
        </Link>
        <div className="header-actions">
          <Link href="/contact" className="btn btn--primary">
            Discuss Opportunity
          </Link>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer
