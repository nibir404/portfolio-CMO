import type { BodyLine } from "@/hooks/useMailtoForm";
import type { FormFieldDef } from "@/types/forms";

export type SelectOption = { value: string; label: string };

export const nameField: FormFieldDef = {
  name: "name",
  label: "Your name",
  required: true,
  maxLength: 120,
};

export const workEmailField: FormFieldDef = {
  name: "email",
  label: "Work email",
  type: "email",
  required: true,
  maxLength: 160,
};

export function selectField(
  name: string,
  label: string,
  options: SelectOption[],
  overrides: Partial<FormFieldDef> = {},
): FormFieldDef {
  return { name, label, type: "select", required: true, options, ...overrides };
}

export function optionLabel(options: SelectOption[], value: string | undefined, fallback = "") {
  return options.find((option) => option.value === value)?.label ?? fallback;
}

/** Joins non-empty parts with an em dash, e.g. `Press request — Outlet — Name`. */
export function subjectLine(...parts: Array<string | undefined>): string {
  return parts
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
    .join(" — ");
}

/** Maps `[label, fieldName]` pairs to `Label: value` body lines. */
export function labelledLines(
  values: Record<string, string>,
  pairs: Array<[label: string, field: string]>,
): BodyLine[] {
  return pairs.map(([label, field]) => ({ label, value: values[field] ?? "" }));
}

/** A free-text block rendered under its own heading, e.g. `Brief:`. */
export function textBlock(heading: string, value: string | undefined): BodyLine[] {
  return ["", `${heading}:`, value ?? ""];
}
