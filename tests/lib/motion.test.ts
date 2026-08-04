import { afterEach, describe, expect, it, vi } from "vitest";
import { prefersReducedMotion } from "@/lib/motion";

const stubWindow = (matches: boolean) => {
  const matchMedia = vi.fn().mockReturnValue({ matches });
  vi.stubGlobal("window", { matchMedia });
  return matchMedia;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("prefersReducedMotion", () => {
  it("returns false during server rendering", () => {
    expect(prefersReducedMotion()).toBe(false);
  });

  it("reflects the reduced-motion media query", () => {
    const matchMedia = stubWindow(true);
    expect(prefersReducedMotion()).toBe(true);
    expect(matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");

    stubWindow(false);
    expect(prefersReducedMotion()).toBe(false);
  });
});
