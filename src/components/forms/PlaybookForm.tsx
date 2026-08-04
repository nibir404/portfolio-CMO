"use client";

import { MailtoForm } from "@/components/forms/MailtoForm";
import { labelledLines, nameField, subjectLine, workEmailField } from "@/lib/formFields";
import type { FormFieldDef } from "@/types/forms";

const fields: FormFieldDef[] = [
  nameField,
  workEmailField,
  { name: "company", label: "Company or organisation", required: true, maxLength: 200 },
  { name: "role", label: "Your role", maxLength: 200 },
  { name: "challenge", label: "Primary challenge or reason for requesting", maxLength: 200 },
];

function subject(values: Record<string, string>) {
  return subjectLine("Playbook request", values.company, values.name);
}

function bodyLines(values: Record<string, string>) {
  return labelledLines(values, [
    ["Name", "name"],
    ["Work email", "email"],
    ["Company", "company"],
    ["Role", "role"],
    ["Primary challenge", "challenge"],
  ]);
}

export function PlaybookForm() {
  return (
    <MailtoForm
      formKey="playbook"
      enquiryKind="playbook"
      fields={fields}
      subject={subject}
      bodyLines={bodyLines}
      submitLabel="Prepare the email"
    />
  );
}
