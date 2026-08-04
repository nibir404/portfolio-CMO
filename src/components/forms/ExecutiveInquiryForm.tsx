"use client";

import { useMemo, useRef, useState } from "react";
import { FormField } from "@/components/forms/FormField";
import { ConsentField } from "@/components/forms/ConsentField";
import { MailtoStatus } from "@/components/forms/MailtoStatus";
import { usePreservedForm } from "@/hooks/usePreservedForm";
import {
  buildMailto,
  buildPlainBody,
  type MailtoOutput,
} from "@/lib/mailto";
import { reportError } from "@/lib/logging";
import { validateForm } from "@/lib/validation";
import type { FormFieldDef, ValidationError } from "@/types/forms";

const CONSENT_KEY = "consent";

const discussionOptions: Array<{ value: string; label: string }> = [
  { value: "ai-business-transformation", label: "AI Business Transformation" },
  { value: "brand-transformation", label: "Brand Transformation" },
  { value: "growth-scaling", label: "Business Growth & Scaling" },
  { value: "international-expansion", label: "International Expansion" },
  { value: "speaking", label: "Speaking or event" },
  { value: "other", label: "Something else" },
];

const timelineOptions: Array<{ value: string; label: string }> = [
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
  {
    name: "discussion",
    label: "Area of discussion",
    type: "select",
    required: true,
    options: discussionOptions,
  },
  {
    name: "timeline",
    label: "Expected timeline",
    type: "select",
    required: true,
    options: timelineOptions,
  },
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
  const discussionLabel =
    discussionOptions.find((opt) => opt.value === values.discussion)?.label ?? "Executive enquiry";
  const company = values.company?.trim();
  const name = values.fullName?.trim();
  return `${discussionLabel} — ${company ?? "—"} — ${name ?? ""}`.trim();
}

function bodyLines(values: Record<string, string>) {
  const discussionLabel =
    discussionOptions.find((opt) => opt.value === values.discussion)?.label ?? values.discussion;
  const timelineLabel =
    timelineOptions.find((opt) => opt.value === values.timeline)?.label ?? values.timeline;

  return [
    { label: "Discussion", value: discussionLabel ?? "" },
    { label: "Name", value: values.fullName ?? "" },
    { label: "Company", value: values.company ?? "" },
    { label: "Designation", value: values.designation ?? "" },
    { label: "Business email", value: values.email ?? "" },
    { label: "Organisation website", value: values.organisationWebsite ?? "" },
    { label: "Timeline", value: timelineLabel ?? "" },
    "",
    "Message:",
    values.message ?? "",
  ];
}

export function ExecutiveInquiryForm() {
  const defaults = useMemo(() => {
    const base: Record<string, string> = { [CONSENT_KEY]: "" };
    for (const field of fields) base[field.name] = "";
    return base;
  }, []);

  const { values, setField, reset, storageError } = usePreservedForm("executive-inquiry", defaults);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [result, setResult] = useState<MailtoOutput | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const errorRef = useRef<HTMLDivElement | null>(null);

  function fieldError(name: string) {
    return errors.find((error) => error.field === name)?.message;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm(fields, values);
    if (values[CONSENT_KEY] !== "true") {
      nextErrors.push({
        field: CONSENT_KEY,
        message: "Consent is required before the enquiry can be prepared.",
      });
    }
    setErrors(nextErrors);
    if (nextErrors.length) {
      setSubmitError(null);
      window.requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }

    try {
      const emailSubject = subject(values);
      const emailBody = buildPlainBody([
        ...bodyLines(values),
        "",
        { label: "Consent", value: "Yes — details may be used to respond to this enquiry" },
        { label: "Prepared via", value: "abdullahalamin.me / Discuss Opportunity" },
      ]);
      const mailto = buildMailto({
        to: "office@abdullahalamin.me",
        subject: emailSubject,
        body: emailBody,
      });
      setSubmitError(null);
      setResult(mailto);
      setSubmitted(true);
      if (!mailto.exceeds) {
        window.location.href = mailto.href;
      }
    } catch (error) {
      reportError("ExecutiveInquiryForm", error);
      setResult(null);
      setSubmitted(false);
      setSubmitError(
        "The enquiry could not be prepared. Email office@abdullahalamin.me directly and we will pick it up from there.",
      );
      window.requestAnimationFrame(() => errorRef.current?.focus());
    }
  }

  function clearForm() {
    reset();
    setErrors([]);
    setResult(null);
    setSubmitError(null);
    setSubmitted(false);
  }

  if (submitted && result) {
    return (
      <div className="inquiry__confirmation" role="status" aria-live="polite">
        <span className="eyebrow">Prepared</span>
        <h3>Your enquiry is ready to send.</h3>
        <p>
          {result.exceeds
            ? "The enquiry is too long for an email link, so your email application was not opened. Copy the prepared message below and send it to the office."
            : "Your email application has opened with the enquiry prepared and addressed to the office. If it did not open automatically, the prepared mailto link is below — copy it into your client to send."}
        </p>
        <MailtoStatus
          result={result}
          subject={result.subject}
          body={result.body}
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
        {submitError ? (
          <div ref={errorRef} className="error-summary" role="alert" tabIndex={-1}>
            <h3>{submitError}</h3>
          </div>
        ) : null}
        {errors.length ? (
          <div ref={errorRef} className="error-summary" role="alert" tabIndex={-1}>
            <h3>Please correct the highlighted fields.</h3>
            <ul>
              {errors.map((error) => (
                <li key={`${error.field}-${error.message}`}>
                  <a href={`#field-${error.field}`}>{error.message}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="form-grid form-grid--2">
          {fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={values[field.name] ?? ""}
              onChange={(value) => {
                setField(field.name, value);
                if (fieldError(field.name)) {
                  setErrors((current) => current.filter((error) => error.field !== field.name));
                }
              }}
              error={fieldError(field.name)}
            />
          ))}
        </div>
        <ConsentField
          name={CONSENT_KEY}
          checked={values[CONSENT_KEY] === "true"}
          onChange={(checked) => {
            setField(CONSENT_KEY, checked ? "true" : "");
            if (fieldError(CONSENT_KEY)) {
              setErrors((current) => current.filter((error) => error.field !== CONSENT_KEY));
            }
          }}
          error={fieldError(CONSENT_KEY)}
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
        {storageError ? (
          <p className="form-note" role="status">
            {storageError}
          </p>
        ) : null}
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
