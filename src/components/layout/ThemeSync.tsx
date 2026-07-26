"use client";

import { useEffect } from "react";

/**
 * Sync the data-theme attribute across browser tabs when one tab toggles
 * its theme. The storage event fires only in *other* tabs, which is exactly
 * what we want.
 */
export function ThemeSync() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    function onStorage(event: StorageEvent) {
      if (event.key !== "theme") return;
      const next = event.newValue === "dark" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return null;
}
