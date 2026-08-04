"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reportError, reportWarning } from "@/lib/logging";

const STORAGE_PREFIX = "abdullahalamin.form:";

const DRAFT_UNAVAILABLE =
  "Your draft cannot be saved in this browser, so it will be lost if you leave this page.";

function isStringRecord(value: unknown): value is Record<string, string> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  return Object.values(value).every((entry) => typeof entry === "string");
}

export function usePreservedForm<T extends Record<string, string>>(
  key: string,
  initial: T,
) {
  const storageKey = `${STORAGE_PREFIX}${key}`;
  const [values, setValues] = useState<T>(initial);
  const [storageError, setStorageError] = useState<string | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem(storageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isStringRecord(parsed)) {
          setValues({ ...initial, ...(parsed as Partial<T>) });
        } else {
          reportWarning("usePreservedForm", "Discarded a malformed saved draft.", { storageKey });
          window.sessionStorage.removeItem(storageKey);
        }
      }
    } catch (error) {
      reportError("usePreservedForm", error, { storageKey, operation: "read" });
      setStorageError(DRAFT_UNAVAILABLE);
      discardDraft(storageKey);
    }
    hydrated.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hydrated.current) return;
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(values));
      setStorageError(null);
    } catch (error) {
      reportError("usePreservedForm", error, { storageKey, operation: "write" });
      setStorageError(DRAFT_UNAVAILABLE);
    }
  }, [storageKey, values]);

  const reset = useCallback(() => {
    setValues(initial);
    discardDraft(storageKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const setField = useCallback((name: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return { values, setField, reset, setValues, storageError };
}

function discardDraft(storageKey: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(storageKey);
  } catch (error) {
    reportError("usePreservedForm", error, { storageKey, operation: "remove" });
  }
}
