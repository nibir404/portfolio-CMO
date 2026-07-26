import type { FormFieldDef, ValidationError } from "@/types/forms";

export const EMAIL_PATTERN = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

export function validateEmail(value: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-ZA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim());
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
    if (field.maxLength && value.length > field.maxLength) {
      errors.push({
        field: field.name,
        message: `${field.label} must be ${field.maxLength} characters or fewer.`,
      });
      continue;
    }
    if (field.type === "textarea" && field.maxLength && value.length > field.maxLength) {
      errors.push({
        field: field.name,
        message: `${field.label} must be ${field.maxLength} characters or fewer.`,
      });
    }
  }

  return errors;
}

export function summariseErrors(errors: ValidationError[]): string {
  if (!errors.length) return "";
  if (errors.length === 1) return "Please correct the highlighted field.";
  return `Please correct the ${errors.length} highlighted fields.`;
}
