"use client";

import { MailtoForm } from "@/components/forms/MailtoForm";
import {
  labelledLines,
  nameField,
  selectField,
  subjectLine,
  textBlock,
  workEmailField,
} from "@/lib/formFields";
import type { FormFieldDef } from "@/types/forms";

const fields: FormFieldDef[] = [
  nameField,
  workEmailField,
  { name: "outlet", label: "Outlet", required: true, maxLength: 200 },
  { name: "deadline", label: "Deadline", type: "date" },
  selectField("topic", "Topic or angle", [
    { value: "ai-cmo", label: "The AI-first CMO and the board's question" },
    { value: "compounding", label: "Compounding brand equity in emerging markets" },
    { value: "crisis", label: "Reputation rebuilt in public — crisis communication" },
    { value: "ai-operating-model", label: "AI marketing operating models" },
  ]),
  { name: "notes", label: "Brief", type: "textarea", rows: 4, maxLength: 1200 },
];

function subject(values: Record<string, string>) {
  return subjectLine("Press request", values.outlet, values.name);
}

function bodyLines(values: Record<string, string>) {
  return [
    ...labelledLines(values, [
      ["Name", "name"],
      ["Work email", "email"],
      ["Outlet", "outlet"],
      ["Deadline", "deadline"],
      ["Topic", "topic"],
    ]),
    ...textBlock("Brief", values.notes),
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
