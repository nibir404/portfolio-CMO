import type { ReactNode } from "react";

export type EnquiryKind =
  | "fractional-cmo"
  | "board-advisory"
  | "growth-sprint"
  | "ai-marketing-transformation"
  | "speaking"
  | "press"
  | "playbook"
  | "newsletter"
  | "other";

export type FormFieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "textarea" | "select" | "date";
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  maxLength?: number;
  pattern?: string;
  inputMode?: ReactNode;
};

export type ValidationError = {
  field: string;
  message: string;
};

export type FormDraft<T> = {
  values: T;
  savedAt: string;
};
