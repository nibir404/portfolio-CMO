"use client";

import { useState } from "react";
import { ConsentField } from "@/components/forms/ConsentField";
import { FormErrorSummary } from "@/components/forms/FormErrorSummary";
import { FormFieldGrid } from "@/components/forms/FormFieldGrid";
import { MailtoStatus } from "@/components/forms/MailtoStatus";
import { CONSENT_KEY, useMailtoForm } from "@/hooks/useMailtoForm";
import { labelledLines, optionLabel, selectField, subjectLine } from "@/lib/formFields";
import type { SelectOption } from "@/lib/formFields";
import type { FormFieldDef } from "@/types/forms";

const discussionOptions: SelectOption[] = [
  { value: "ai-business-transformation", label: "AI Business Transformation" },
  { value: "brand-transformation", label: "Brand Transformation" },
  { value: "growth-scaling", label: "Business Growth & Scaling" },
  { value: "international-expansion", label: "International Expansion" },
  { value: "speaking", label: "Speaking or event" },
  { value: "other", label: "Something else" },
];

const timelineOptions: SelectOption[] = [
  { value: "this-month", label: "This month" },
  { value: "this-quarter", label: "This quarter" },
  { value: "next-6-months", label: "Next 6 months" },
  { value: "exploring", label: "Exploring options" },
];

const fields: FormFieldDef[] = [
  { name: "fullName", label: "Full name", required: true, maxLength: 120 },
  { name: "company", label: "Company", required: true, maxLength: 160 },
  { name: "designation", label: "Designation", required: true, maxLength: 160 },
  { name: "email", label: "Business email", type: "email", required: true, maxLength: 160 },
  {
    name: "organisationWebsite",
    label: "Organisation website",
    type: "url",
    required: false,
    placeholder: "https://",
    maxLength: 200,
  },
  selectField("discussion", "Area of discussion", discussionOptions),
  selectField("timeline", "Expected timeline", timelineOptions),
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    rows: 6,
    maxLength: 1800,
    helpText: "A few sentences on the work, the deadline, and the outcome you need.",
  },
];

function subject(values: Record<string, string>) {
  return subjectLine(
    optionLabel(discussionOptions, values.discussion, "Executive enquiry"),
    values.company?.trim() || "—",
    values.fullName,
  );
}

function bodyLines(values: Record<string, string>) {
  return [
    {
      label: "Discussion",
      value: optionLabel(discussionOptions, values.discussion, values.discussion ?? ""),
    },
    ...labelledLines(values, [
      ["Name", "fullName"],
      ["Company", "company"],
      ["Designation", "designation"],
      ["Business email", "email"],
      ["Organisation website", "organisationWebsite"],
    ]),
    { label: "Timeline", value: optionLabel(timelineOptions, values.timeline, values.timeline ?? "") },
    "",
    "Message:",
    values.message ?? "",
  ];
}

export function ExecutiveInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useMailtoForm({
    formKey: "executive-inquiry",
    fields,
    recipient: () => "office@abdullahalamin.me",
    subject,
    bodyLines,
    preparedVia: "abdullahalamin.me / Discuss Opportunity",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.submit(fields)) setSubmitted(true);
  }

  function clearForm() {
    form.clearForm();
    setSubmitted(false);
  }

  if (submitted && form.result) {
    return (
      <div className="inquiry__confirmation" role="status" aria-live="polite">
        <span className="eyebrow">Prepared</span>
        <h3>Your enquiry is ready to send.</h3>
        <p>
          Your email application has opened with the enquiry prepared and addressed to the office.
          If it did not open automatically, the prepared mailto link is below — copy it into your
          client to send.
        </p>
        <MailtoStatus
          result={form.result}
          subject={form.result.subject}
          body={form.result.body}
          recipientLabel="Office · board mandates, growth sprints, advisory"
        />
        <div className="inquiry__confirmation-actions">
          <button type="button" className="btn btn--ghost" onClick={clearForm}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <FormErrorSummary ref={form.errorRef} errors={form.errors} />
        <FormFieldGrid
          fields={fields}
          values={form.values}
          onChange={form.changeField}
          fieldError={form.fieldError}
        />
        <ConsentField
          name={CONSENT_KEY}
          checked={form.consented}
          onChange={form.setConsent}
          error={form.fieldError(CONSENT_KEY)}
        >
          I consent to the office using these details to respond to this enquiry. See the privacy
          note below.
        </ConsentField>
        <div className="actions" style={{ alignItems: "center" }}>
          <button type="submit" className="btn btn--primary">
            Prepare the email
          </button>
          <button type="button" className="btn btn--ghost" onClick={clearForm}>
            Clear form
          </button>
        </div>
        <p className="form-note">
          This form does not send data to a server. On submit, it opens your email application with
          the enquiry prepared and addressed to office@abdullahalamin.me. Your draft stays in this
          browser session until you clear it.
        </p>
      </form>
    </div>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence
