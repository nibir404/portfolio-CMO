import { describe, expect, it } from "vitest";
import type { EnquiryKind } from "@/types/forms";
import {
  buildMailto,
  buildPlainBody,
  encodeMailtoValue,
  MAILTO_LIMIT,
  MAILTO_ROUTING,
  MAILTO_TO,
  RECIPIENT_LABELS,
} from "@/lib/mailto";

describe("buildMailto", () => {
  it("builds an encoded mailto href from trimmed input", () => {
    const result = buildMailto({
      to: "office@abdullahalamin.me",
      subject: "  Board advisory  ",
      body: "  Line one\nLine two  ",
    });

    expect(result.subject).toBe("Board advisory");
    expect(result.body).toBe("Line one\nLine two");
    expect(result.href).toBe(
      "mailto:office@abdullahalamin.me?subject=Board%20advisory&body=Line%20one%0ALine%20two",
    );
    expect(result.to).toBe("office@abdullahalamin.me");
    expect(result.length).toBe(result.href.length);
    expect(result.exceeds).toBe(false);
  });

  it("flags hrefs longer than the mailto limit", () => {
    const result = buildMailto({
      to: "press@abdullahalamin.me",
      subject: "Press",
      body: "x".repeat(MAILTO_LIMIT),
    });

    expect(result.length).toBeGreaterThan(MAILTO_LIMIT);
    expect(result.exceeds).toBe(true);
  });

  it("encodes characters that would break the href", () => {
    const { href } = buildMailto({
      to: "speaking@abdullahalamin.me",
      subject: "Keynote & panel",
      body: "Budget? 50%",
    });

    expect(href).toContain("subject=Keynote%20%26%20panel");
    expect(href).toContain("body=Budget%3F%2050%25");
  });
});

describe("encodeMailtoValue", () => {
  it("encodes spaces as plus signs", () => {
    expect(encodeMailtoValue("board advisory")).toBe("board+advisory");
    expect(encodeMailtoValue("a&b")).toBe("a%26b");
  });
});

describe("buildPlainBody", () => {
  it("joins labelled pairs and raw strings with newlines", () => {
    expect(
      buildPlainBody([
        "Enquiry",
        { label: "Name", value: "Abdullah" },
        { label: "Company", value: "Betopia" },
      ]),
    ).toBe("Enquiry\nName: Abdullah\nCompany: Betopia");
  });

  it("returns an empty string for no lines", () => {
    expect(buildPlainBody([])).toBe("");
  });
});

describe("routing tables", () => {
  const kinds: EnquiryKind[] = [
    "fractional-cmo",
    "board-advisory",
    "growth-sprint",
    "ai-marketing-transformation",
    "speaking",
    "press",
    "playbook",
    "newsletter",
    "other",
  ];

  it("routes every enquiry kind to a known recipient", () => {
    for (const kind of kinds) {
      const route = MAILTO_ROUTING[kind];
      expect(route, kind).toBeDefined();
      expect(MAILTO_TO).toContain(route.to);
      expect(route.label.length).toBeGreaterThan(0);
    }
  });

  it("routes speaking and press to their dedicated inboxes", () => {
    expect(MAILTO_ROUTING.speaking.to).toBe("speaking@abdullahalamin.me");
    expect(MAILTO_ROUTING.press.to).toBe("press@abdullahalamin.me");
    expect(MAILTO_ROUTING["board-advisory"].to).toBe("office@abdullahalamin.me");
  });

  it("labels every recipient address", () => {
    for (const address of MAILTO_TO) {
      expect(RECIPIENT_LABELS[address]).toBeTruthy();
    }
  });
});
