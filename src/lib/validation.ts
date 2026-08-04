import type { FormFieldDef, ValidationError } from "@/types/forms";

export const EMAIL_PATTERN = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

export const EMAIL_MAX_LENGTH = 254;

// Fallback cap for fields that declare no maxLength, so a single field cannot
// grow the generated mailto link without bound.
export const FIELD_MAX_LENGTH = 2000;

export function validateEmail(value: string): boolean {
  const candidate = value.trim();
  if (candidate.length > EMAIL_MAX_LENGTH) return false;
  return new RegExp(EMAIL_PATTERN).test(candidate);
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function validateMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

export function validateMaxLength(value: string, max: number): boolean {
  return value.trim().length <= max;
}

export type Validator = (
  value: string,
  form: Record<string, string>,
) => string | null;

export function validateForm(
  fields: FormFieldDef[],
  values: Record<string, string>,
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of fields) {
    const value = (values[field.name] ?? "").trim();
    if (field.required && !value.length) {
      errors.push({ field: field.name, message: `${field.label} is required.` });
      continue;
    }
    if (!field.required && !value.length) continue;
    if (field.type === "email" && !validateEmail(value)) {
      errors.push({
        field: field.name,
        message: `Enter a valid email address.`,
      });
      continue;
    }
    const maxLength = field.maxLength ?? FIELD_MAX_LENGTH;
    if (value.length > maxLength) {
      errors.push({
        field: field.name,
        message: `${field.label} must be ${maxLength} characters or fewer.`,
      });
      continue;
    }
  }

  return errors;
}

export function summariseErrors(errors: ValidationError[]): string {
  if (!errors.length) return "";
  if (errors.length === 1) return "Please correct the highlighted field.";
  return `Please correct the ${errors.length} highlighted fields.`;
}
