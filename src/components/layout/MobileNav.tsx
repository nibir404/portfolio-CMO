"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";

type NavItem = { label: string; href: string };
type NavGroup = { label: string; href?: string; children: NavItem[] };

const navItems: Array<NavGroup | NavItem> = [
  { label: "About Us", href: "/about" },
  {
    label: "Blog",
    children: [
      { label: "All Posts", href: "/insights" },
      { label: "Live Sessions", href: "/live-session" },
      { label: "Training", href: "/training" },
      { label: "Resources", href: "/resources" },
    ],
  },
  { label: "Insights", href: "/newsletter" },
  { label: "Contact", href: "/contact" },
];

function isGroup(item: NavGroup | NavItem): item is NavGroup {
  return "children" in item;
}

function DrawerPanel({
  open,
  expanded,
  setExpanded,
  close,
}: {
  open: boolean;
  expanded: string | null;
  setExpanded: (value: string | null) => void;
  close: () => void;
}) {
  return (
    <>
      <div
        className="mobile-nav__backdrop"
        data-open={open}
        aria-hidden="true"
        onClick={close}
      />
      <div
        id="mobile-nav-drawer"
        className="mobile-nav__drawer"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="mobile-nav__inner">
          <span className="eyebrow mobile-nav__eyebrow" style={{ color: "var(--color-accent)" }}>
            Navigate
          </span>
          <ul className="mobile-nav__list">
            {navItems.map((item) => {
              if (!isGroup(item)) {
                return (
                  <li key={item.href}>
                    <Link href={item.href} onClick={close} tabIndex={open ? 0 : -1}>
                      <span>{item.label}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                );
              }
              const isOpen = expanded === item.label;
              return (
                <li key={item.label} className="mobile-nav__group">
                  <button
                    type="button"
                    className="mobile-nav__group-toggle"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    tabIndex={open ? 0 : -1}
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className="mobile-nav__chevron"
                      data-open={isOpen}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen ? (
                    <ul className="mobile-nav__sublist">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} onClick={close} tabIndex={open ? 0 : -1}>
                            <span>{child.label}</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div className="mobile-nav__contact">
            <span className="eyebrow">Office</span>
            <a href={`mailto:${site.officeEmail}`} tabIndex={open ? 0 : -1}>
              {site.officeEmail}
            </a>
            <a href={`mailto:${site.speakingEmail}`} tabIndex={open ? 0 : -1}>
              {site.speakingEmail}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    setExpanded(null);
  }

  const drawer = (
    <DrawerPanel
      open={open}
      expanded={expanded}
      setExpanded={setExpanded}
      close={close}
    />
  );

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav__toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="mobile-nav__toggle-icon" aria-hidden="true" />
      </button>
      {mounted && typeof document !== "undefined"
        ? createPortal(drawer, document.body)
        : null}
    </div>
  );
}