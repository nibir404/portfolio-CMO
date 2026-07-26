"use client";

import { useMemo, useRef, useState } from "react";
import { usePreservedForm } from "@/hooks/usePreservedForm";
import { FormField } from "@/components/forms/FormField";
import { ConsentField } from "@/components/forms/ConsentField";
import { MailtoStatus } from "@/components/forms/MailtoStatus";
import {
  buildMailto,
  buildPlainBody,
  MAILTO_ROUTING,
  type MailtoOutput,
} from "@/lib/mailto";
import { validateForm } from "@/lib/validation";
import type { EnquiryKind, FormFieldDef, ValidationError } from "@/types/forms";

type MailtoFormProps = {
  formKey: string;
  enquiryKind: EnquiryKind | ((values: Record<string, string>) => EnquiryKind);
  fields: FormFieldDef[];
  initialValues?: Record<string, string>;
  subject: (values: Record<string, string>) => string;
  bodyLines: (values: Record<string, string>) => Array<{ label: string; value: string } | string>;
  submitLabel: string;
  consentLabel?: React.ReactNode;
  conditionalFields?: (values: Record<string, string>) => FormFieldDef[];
  className?: string;
};

const CONSENT_KEY = "consent";

export function MailtoForm({
  formKey,
  enquiryKind,
  fields,
  initialValues = {},
  subject,
  bodyLines,
  submitLabel,
  consentLabel = (
    <>
      I consent to the office using these details to respond to this enquiry. See the privacy note below.
    </>
  ),
  conditionalFields,
  className = "",
}: MailtoFormProps) {
  const defaults = useMemo(() => {
    const base: Record<string, string> = { [CONSENT_KEY]: "" };
    for (const field of fields) base[field.name] = initialValues[field.name] ?? "";
    return { ...base, ...initialValues };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formKey]);

  const { values, setField, reset } = usePreservedForm(formKey, defaults);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [result, setResult] = useState<MailtoOutput | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  const extraFields = conditionalFields?.(values) ?? [];
  const activeFields = [...fields, ...extraFields];

  function fieldError(name: string) {
    return errors.find((error) => error.field === name)?.message;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm(activeFields, values);
    if (values[CONSENT_KEY] !== "true") {
      nextErrors.push({
        field: CONSENT_KEY,
        message: "Consent is required before the enquiry can be prepared.",
      });
    }
    setErrors(nextErrors);
    if (nextErrors.length) {
      window.requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }

    const kind = typeof enquiryKind === "function" ? enquiryKind(values) : enquiryKind;
    const routing = MAILTO_ROUTING[kind];
    const emailSubject = subject(values);
    const emailBody = buildPlainBody([
      ...bodyLines(values),
      "",
      { label: "Consent", value: "Yes — details may be used to respond to this enquiry" },
      { label: "Prepared via", value: "abdullahalamin.me" },
    ]);
    const mailto = buildMailto({
      to: routing.to,
      subject: emailSubject,
      body: emailBody,
    });
    setResult(mailto);
    if (!mailto.exceeds) {
      window.location.href = mailto.href;
    }
  }

  function clearForm() {
    reset();
    setErrors([]);
    setResult(null);
  }

  return (
    <div className={className}>
      <form className="form" noValidate onSubmit={handleSubmit}>
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
          {activeFields.map((field) => (
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
          {consentLabel}
        </ConsentField>
        <div className="actions" style={{ alignItems: "center" }}>
          <button type="submit" className="btn btn--primary">
            {submitLabel}
          </button>
          <button type="button" className="btn btn--ghost" onClick={clearForm}>
            Clear form
          </button>
        </div>
        <p className="form-note">
          This form does not send data to a server. On submit, it opens your email application with
          the enquiry prepared. Your draft is kept only in this browser session until you clear it.
        </p>
      </form>
      {result ? (
        <div className="mt-5">
          <MailtoStatus
            result={result}
            subject={result.subject}
            body={result.body}
            recipientLabel={
              MAILTO_ROUTING[typeof enquiryKind === "function" ? enquiryKind(values) : enquiryKind]
                .label
            }
          />
        </div>
      ) : null}
    </div>
  );
}
