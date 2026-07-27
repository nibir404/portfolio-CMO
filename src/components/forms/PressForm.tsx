"use client";

import { MailtoForm } from "@/components/forms/MailtoForm";
import type { FormFieldDef } from "@/types/forms";

const fields: FormFieldDef[] = [
  { name: "name", label: "Your name", required: true, maxLength: 120 },
  { name: "email", label: "Work email", type: "email", required: true, maxLength: 160 },
  { name: "outlet", label: "Outlet", required: true, maxLength: 200 },
  { name: "deadline", label: "Deadline", type: "date" },
  {
    name: "topic",
    label: "Topic or angle",
    type: "select",
    required: true,
    options: [
      { value: "ai-cmo", label: "The AI-first CMO and the board's question" },
      { value: "compounding", label: "Compounding brand equity in emerging markets" },
      { value: "crisis", label: "Reputation rebuilt in public — crisis communication" },
      { value: "ai-operating-model", label: "AI marketing operating models" },
    ],
  },
  { name: "notes", label: "Brief", type: "textarea", rows: 4, maxLength: 1200 },
];

function subject(values: Record<string, string>) {
  return `Press request — ${values.outlet ?? "—"} — ${values.name ?? ""}`.trim();
}

function bodyLines(values: Record<string, string>) {
  return [
    { label: "Name", value: values.name ?? "" },
    { label: "Work email", value: values.email ?? "" },
    { label: "Outlet", value: values.outlet ?? "" },
    { label: "Deadline", value: values.deadline ?? "" },
    { label: "Topic", value: values.topic ?? "" },
    "",
    "Brief:",
    values.notes ?? "",
  ];
}

export function PressForm() {
  return (
    <MailtoForm
      formKey="press"
      enquiryKind="press"
      fields={fields}
      subject={subject}
      bodyLines={bodyLines}
      submitLabel="Prepare the email"
    />
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence
