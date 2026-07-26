"use client";

import { MailtoForm } from "@/components/forms/MailtoForm";
import type { FormFieldDef } from "@/types/forms";

const fields: FormFieldDef[] = [
  { name: "name", label: "Your name", required: true, maxLength: 120 },
  { name: "email", label: "Work email", type: "email", required: true, maxLength: 160 },
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
  return [
    { label: "Name", value: values.name ?? "" },
    { label: "Email", value: values.email ?? "" },
    { label: "Company", value: values.company ?? "" },
    { label: "Topics", value: values.topics ?? "" },
  ];
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
