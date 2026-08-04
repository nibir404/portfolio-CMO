"use client";

import { useEffect, useState } from "react";
import { reportError } from "@/lib/logging";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.dataset.theme;
  return attr === "dark" ? "dark" : "light";
}

function applyTheme(next: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = next;
  document.documentElement.style.colorScheme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (error) {
    reportError("ThemeToggle", error, { operation: "persist", theme: next });
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      aria-pressed={theme === "dark"}
      onClick={toggle}
      disabled={!mounted}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        focusable="false"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {theme === "dark" ? (
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        ) : (
          <g>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </g>
        )}
      </svg>
    </button>
  );
}
