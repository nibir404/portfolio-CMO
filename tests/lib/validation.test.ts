import { describe, expect, it } from "vitest";
import type { FormFieldDef, ValidationError } from "@/types/forms";
import {
  EMAIL_PATTERN,
  summariseErrors,
  validateEmail,
  validateForm,
  validateMaxLength,
  validateMinLength,
  validateRequired,
} from "@/lib/validation";

describe("validateEmail", () => {
  it("accepts well-formed addresses, ignoring surrounding whitespace", () => {
    expect(validateEmail("office@abdullahalamin.me")).toBe(true);
    expect(validateEmail("  first.last+tag@sub.example.co.uk  ")).toBe(true);
  });

  it("rejects malformed addresses", () => {
    expect(validateEmail("office@example")).toBe(false);
    expect(validateEmail("office.example.com")).toBe(false);
    expect(validateEmail("@example.com")).toBe(false);
    expect(validateEmail("")).toBe(false);
  });

  it("agrees with the HTML pattern exposed to inputs", () => {
    const pattern = new RegExp(EMAIL_PATTERN);
    expect(pattern.test("office@abdullahalamin.me")).toBe(true);
    expect(pattern.test("office@example")).toBe(false);
  });
});

describe("length validators", () => {
  it("treats whitespace-only values as empty", () => {
    expect(validateRequired("   ")).toBe(false);
    expect(validateRequired(" a ")).toBe(true);
  });

  it("compares trimmed length against the bounds", () => {
    expect(validateMinLength("  abc  ", 3)).toBe(true);
    expect(validateMinLength("ab", 3)).toBe(false);
    expect(validateMaxLength("  abc  ", 3)).toBe(true);
    expect(validateMaxLength("abcd", 3)).toBe(false);
  });
});

describe("validateForm", () => {
  const fields: FormFieldDef[] = [
    { name: "name", label: "Full name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "company", label: "Company", maxLength: 5 },
    { name: "brief", label: "Brief", type: "textarea", maxLength: 10 },
  ];

  it("returns no errors for a valid submission", () => {
    expect(
      validateForm(fields, {
        name: "Abdullah",
        email: "office@abdullahalamin.me",
        company: "Beto",
        brief: "Short one",
      }),
    ).toEqual([]);
  });

  it("flags missing required fields with the field label", () => {
    const errors = validateForm(fields, { name: "   ", email: "" });
    expect(errors).toEqual([
      { field: "name", message: "Full name is required." },
      { field: "email", message: "Email is required." },
    ]);
  });

  it("skips optional fields left blank", () => {
    const errors = validateForm(fields, {
      name: "Abdullah",
      email: "office@abdullahalamin.me",
      company: "",
    });
    expect(errors).toEqual([]);
  });

  it("flags an invalid email once", () => {
    const errors = validateForm(fields, { name: "Abdullah", email: "nope" });
    expect(errors).toEqual([{ field: "email", message: "Enter a valid email address." }]);
  });

  it("flags values longer than maxLength", () => {
    const errors = validateForm(fields, {
      name: "Abdullah",
      email: "office@abdullahalamin.me",
      company: "Betopia",
      brief: "A far longer brief",
    });
    expect(errors).toEqual([
      { field: "company", message: "Company must be 5 characters or fewer." },
      { field: "brief", message: "Brief must be 10 characters or fewer." },
    ]);
  });

  it("returns no errors when there are no fields", () => {
    expect(validateForm([], { anything: "value" })).toEqual([]);
  });
});

describe("summariseErrors", () => {
  const error = (field: string): ValidationError => ({ field, message: "bad" });

  it("returns an empty string when there is nothing to correct", () => {
    expect(summariseErrors([])).toBe("");
  });

  it("uses singular copy for one error and a count otherwise", () => {
    expect(summariseErrors([error("name")])).toBe("Please correct the highlighted field.");
    expect(summariseErrors([error("name"), error("email")])).toBe(
      "Please correct the 2 highlighted fields.",
    );
  });
});
