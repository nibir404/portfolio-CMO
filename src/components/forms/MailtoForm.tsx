"use client";

import { ConsentField } from "@/components/forms/ConsentField";
import { FormErrorSummary } from "@/components/forms/FormErrorSummary";
import { FormFieldGrid } from "@/components/forms/FormFieldGrid";
import { MailtoStatus } from "@/components/forms/MailtoStatus";
import { CONSENT_KEY, useMailtoForm, type BodyLine } from "@/hooks/useMailtoForm";
import { MAILTO_ROUTING } from "@/lib/mailto";
import type { EnquiryKind, FormFieldDef } from "@/types/forms";

type MailtoFormProps = {
  formKey: string;
  enquiryKind: EnquiryKind | ((values: Record<string, string>) => EnquiryKind);
  fields: FormFieldDef[];
  initialValues?: Record<string, string>;
  subject: (values: Record<string, string>) => string;
  bodyLines: (values: Record<string, string>) => BodyLine[];
  submitLabel: string;
  consentLabel?: React.ReactNode;
  conditionalFields?: (values: Record<string, string>) => FormFieldDef[];
  className?: string;
  gridClassName?: string;
};

export const DEFAULT_CONSENT_LABEL = (
  <>
    I consent to the office using these details to respond to this enquiry. See the privacy note below.
  </>
);

export function MailtoForm({
  formKey,
  enquiryKind,
  fields,
  initialValues,
  subject,
  bodyLines,
  submitLabel,
  consentLabel = DEFAULT_CONSENT_LABEL,
  conditionalFields,
  className = "",
  gridClassName = "form-grid form-grid--2",
}: MailtoFormProps) {
  function routingFor(values: Record<string, string>) {
    return MAILTO_ROUTING[typeof enquiryKind === "function" ? enquiryKind(values) : enquiryKind];
  }

  const form = useMailtoForm({
    formKey,
    fields,
    initialValues,
    recipient: (values) => routingFor(values).to,
    subject,
    bodyLines,
    preparedVia: "abdullahalamin.me",
  });

  const activeFields = [...fields, ...(conditionalFields?.(form.values) ?? [])];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.submit(activeFields);
  }

  return (
    <div className={className}>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <FormErrorSummary ref={form.errorRef} errors={form.errors} />
        <FormFieldGrid
          fields={activeFields}
          values={form.values}
          onChange={form.changeField}
          fieldError={form.fieldError}
          className={gridClassName}
        />
        <ConsentField
          name={CONSENT_KEY}
          checked={form.consented}
          onChange={form.setConsent}
          error={form.fieldError(CONSENT_KEY)}
        >
          {consentLabel}
        </ConsentField>
        <div className="actions" style={{ alignItems: "center" }}>
          <button type="submit" className="btn btn--primary">
            {submitLabel}
          </button>
          <button type="button" className="btn btn--ghost" onClick={form.clearForm}>
            Clear form
          </button>
        </div>
        <p className="form-note">
          This form does not send data to a server. On submit, it opens your email application with
          the enquiry prepared. Your draft is kept only in this browser session until you clear it.
        </p>
      </form>
      {form.result ? (
        <div className="mt-5">
          <MailtoStatus
            result={form.result}
            subject={form.result.subject}
            body={form.result.body}
            recipientLabel={routingFor(form.values).label}
          />
        </div>
      ) : null}
    </div>
  );
}
