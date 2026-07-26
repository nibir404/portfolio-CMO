"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_PREFIX = "abdullahalamin.form:";

export function usePreservedForm<T extends Record<string, string>>(
  key: string,
  initial: T,
) {
  const storageKey = `${STORAGE_PREFIX}${key}`;
  const [values, setValues] = useState<T>(initial);
  const hydrated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as T;
        setValues({ ...initial, ...parsed });
      }
    } catch {
      // Ignore storage errors — draft remains in memory.
    }
    hydrated.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hydrated.current) return;
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(values));
    } catch {
      // Ignore storage errors.
    }
  }, [storageKey, values]);

  const setField = useCallback((name: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(initial);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(storageKey);
      } catch {
        // Ignore.
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  return { values, setField, reset, setValues };
}
