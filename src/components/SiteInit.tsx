"use client";

import { useRevealInit, useMagnetic } from "@/lib/useReveal";

export default function SiteInit() {
  useRevealInit();
  useMagnetic();
  return null;
}