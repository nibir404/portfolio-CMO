import { describe, expect, it } from "vitest";
import { formatDate, formatSector, truncate } from "@/lib/format";

describe("formatDate", () => {
  it("formats an ISO date as a long en-GB date", () => {
    expect(formatDate("2024-09-12")).toBe("12 September 2024");
  });

  it("returns the original value when the date cannot be parsed", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
    expect(formatDate("")).toBe("");
  });
});

describe("formatSector", () => {
  it("replaces hyphens with spaces and title-cases each word", () => {
    expect(formatSector("ai-in-marketing")).toBe("Ai In Marketing");
    expect(formatSector("growth")).toBe("Growth");
  });

  it("leaves an empty string untouched", () => {
    expect(formatSector("")).toBe("");
  });
});

describe("truncate", () => {
  it("returns the value unchanged when it fits the limit", () => {
    expect(truncate("abcde", 5)).toBe("abcde");
    expect(truncate("abc", 10)).toBe("abc");
  });

  it("truncates to max characters including the ellipsis", () => {
    const result = truncate("abcdefghij", 5);
    expect(result).toBe("abcd…");
    expect(result).toHaveLength(5);
  });

  it("trims trailing whitespace before the ellipsis", () => {
    expect(truncate("abcd efgh", 6)).toBe("abcd…");
  });
});
