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
  { name: "organisation", label: "Organisation or event", required: true, maxLength: 200 },
  { name: "eventDate", label: "Event date", type: "date", required: true },
  { name: "eventLocation", label: "Location or online", required: true, maxLength: 200 },
  selectField("audienceSize", "Approximate audience", [
    { value: "under-100", label: "Under 100" },
    { value: "100-300", label: "100 — 300" },
    { value: "300-1000", label: "300 — 1,000" },
    { value: "above-1000", label: "Above 1,000" },
  ]),
  selectField("topic", "Topic of interest", [
    { value: "the-ai-first-cmo", label: "The AI-First CMO" },
    { value: "compounding-brand-equity", label: "Compounding Brand Equity" },
    { value: "branding-a-nation", label: "Branding a Nation on the Global Stage" },
    { value: "reputation-rebuilt-in-public", label: "Reputation Rebuilt in Public" },
  ]),
  selectField("budget", "Budget range", [
    { value: "under-5k", label: "Under $5,000" },
    { value: "5k-15k", label: "$5,000 — $15,000" },
    { value: "15k-30k", label: "$15,000 — $30,000" },
    { value: "above-30k", label: "Above $30,000" },
  ]),
  { name: "notes", label: "Anything else?", type: "textarea", rows: 4, maxLength: 800 },
];

function subject(values: Record<string, string>) {
  return subjectLine("Speaking enquiry", values.organisation, values.name);
}

function bodyLines(values: Record<string, string>) {
  return [
    ...labelledLines(values, [
      ["Name", "name"],
      ["Work email", "email"],
      ["Organisation", "organisation"],
      ["Event date", "eventDate"],
      ["Location", "eventLocation"],
      ["Audience", "audienceSize"],
      ["Topic", "topic"],
      ["Budget", "budget"],
    ]),
    ...textBlock("Notes", values.notes),
  ];
}

export function SpeakingForm() {
  return (
    <MailtoForm
      formKey="speaking"
      enquiryKind="speaking"
      fields={fields}
      subject={subject}
      bodyLines={bodyLines}
      submitLabel="Prepare the email"
    />
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence
