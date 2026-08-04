"use client";

import { MailtoForm } from "@/components/forms/MailtoForm";
import { labelledLines, nameField, workEmailField } from "@/lib/formFields";
import type { FormFieldDef } from "@/types/forms";

const fields: FormFieldDef[] = [
  nameField,
  workEmailField,
  { name: "company", label: "Company or organisation", maxLength: 200 },
  {
    name: "topics",
    label: "Topics of interest",
    helpText: "One per request — we may follow up to confirm.",
  },
];

function subject(values: Record<string, string>) {
  return `AlaminWeekly signup — ${values.email ?? ""}`.trim();
}

function bodyLines(values: Record<string, string>) {
  return labelledLines(values, [
    ["Name", "name"],
    ["Email", "email"],
    ["Company", "company"],
    ["Topics", "topics"],
  ]);
}

export function NewsletterForm() {
  return (
    <MailtoForm
      formKey="newsletter"
      enquiryKind="newsletter"
      fields={fields}
      subject={subject}
      bodyLines={bodyLines}
      submitLabel="Prepare the email"
    />
  );
}
