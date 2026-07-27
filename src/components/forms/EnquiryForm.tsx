"use client";

import { MailtoForm } from "@/components/forms/MailtoForm";
import type { FormFieldDef } from "@/types/forms";

const fields: FormFieldDef[] = [
  {
    name: "name",
    label: "Your name",
    required: true,
    maxLength: 120,
    placeholder: "Full name",
  },
  {
    name: "email",
    label: "Work email",
    type: "email",
    required: true,
    maxLength: 160,
    placeholder: "you@company.com",
  },
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
  const name = values.name?.trim() || "—";
  const company = values.company?.trim() || "—";
  return `Brief from ${name} — ${company}`;
}

function bodyLines(values: Record<string, string>) {
  return [
    { label: "Name", value: values.name ?? "" },
    { label: "Work email", value: values.email ?? "" },
    { label: "Company", value: values.company ?? "" },
    "",
    "Brief:",
    values.message ?? "",
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
