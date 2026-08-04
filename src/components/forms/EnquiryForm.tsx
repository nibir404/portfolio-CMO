"use client";

import { MailtoForm } from "@/components/forms/MailtoForm";
import { labelledLines, nameField, subjectLine, textBlock, workEmailField } from "@/lib/formFields";
import type { FormFieldDef } from "@/types/forms";

const fields: FormFieldDef[] = [
  { ...nameField, placeholder: "Full name" },
  { ...workEmailField, placeholder: "you@company.com" },
  {
    name: "company",
    label: "Company",
    required: true,
    maxLength: 160,
    placeholder: "Company or organisation",
  },
  {
    name: "message",
    label: "Brief",
    type: "textarea",
    required: true,
    rows: 6,
    maxLength: 1800,
    placeholder:
      "What is the work, the deadline, and the outcome you need? A few lines is enough.",
  },
];

function subject(values: Record<string, string>) {
  return subjectLine(`Brief from ${values.name?.trim() || "—"}`, values.company?.trim() || "—");
}

function bodyLines(values: Record<string, string>) {
  return [
    ...labelledLines(values, [
      ["Name", "name"],
      ["Work email", "email"],
      ["Company", "company"],
    ]),
    ...textBlock("Brief", values.message),
  ];
}

export function EnquiryForm() {
  return (
    <MailtoForm
      formKey="contact"
      enquiryKind="other"
      fields={fields}
      subject={subject}
      bodyLines={bodyLines}
      submitLabel="Send to the office"
      gridClassName="form-grid"
    />
  );
}
