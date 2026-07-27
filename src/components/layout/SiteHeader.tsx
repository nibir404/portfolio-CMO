import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="site-logo" href="/" aria-label="Abdullah Al Alamin — home">
          <span className="site-logo__name">Abdullah Al Alamin</span>
          <span className="site-logo__title">Group CMO · Betopia Group</span>
        </Link>
        <div className="header-actions">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer
