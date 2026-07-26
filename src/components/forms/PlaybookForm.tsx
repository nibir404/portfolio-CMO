"use client";

import { MailtoForm } from "@/components/forms/MailtoForm";
import type { FormFieldDef } from "@/types/forms";

const fields: FormFieldDef[] = [
  { name: "name", label: "Your name", required: true, maxLength: 120 },
  { name: "email", label: "Work email", type: "email", required: true, maxLength: 160 },
  { name: "company", label: "Company or organisation", required: true, maxLength: 200 },
  { name: "role", label: "Your role", maxLength: 200 },
  { name: "challenge", label: "Primary challenge or reason for requesting", maxLength: 200 },
];

function subject(values: Record<string, string>) {
  return `Playbook request — ${values.company ?? "—"} — ${values.name ?? ""}`.trim();
}

function bodyLines(values: Record<string, string>) {
  return [
    { label: "Name", value: values.name ?? "" },
    { label: "Work email", value: values.email ?? "" },
    { label: "Company", value: values.company ?? "" },
    { label: "Role", value: values.role ?? "" },
    { label: "Primary challenge", value: values.challenge ?? "" },
  ];
}

export function PlaybookForm() {
  return (
    <MailtoForm
      formKey="playbook"
      enquiryKind="playbook"
      fields={fields}
      subject={(values) => subject(values)}
      bodyLines={(values) => bodyLines(values as never)}
      submitLabel="Prepare the email"
    />
  );
}
