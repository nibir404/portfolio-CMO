"use client";

import { useRevealInit, useMagnetic } from "@/lib/useReveal";
import { useScrollFx } from "@/lib/useScrollFx";

export default function SiteInit() {
  useRevealInit();
  useMagnetic();
  useScrollFx();
  return null;
}