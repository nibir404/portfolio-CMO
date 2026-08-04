"use client";

import { useMemo, useRef, useState } from "react";
import { usePreservedForm } from "@/hooks/usePreservedForm";
import { buildMailto, buildPlainBody, type MailtoAddress, type MailtoOutput } from "@/lib/mailto";
import { validateForm } from "@/lib/validation";
import type { FormFieldDef, ValidationError } from "@/types/forms";

export const CONSENT_KEY = "consent";

export const CONSENT_ERROR = "Consent is required before the enquiry can be prepared.";

export type BodyLine = { label: string; value: string } | string;

type UseMailtoFormInput = {
  formKey: string;
  fields: FormFieldDef[];
  initialValues?: Record<string, string>;
  recipient: (values: Record<string, string>) => MailtoAddress;
  subject: (values: Record<string, string>) => string;
  bodyLines: (values: Record<string, string>) => BodyLine[];
  preparedVia: string;
};

export function useMailtoForm({
  formKey,
  fields,
  initialValues,
  recipient,
  subject,
  bodyLines,
  preparedVia,
}: UseMailtoFormInput) {
  const defaults = useMemo(() => {
    const base: Record<string, string> = { [CONSENT_KEY]: "" };
    for (const field of fields) base[field.name] = initialValues?.[field.name] ?? "";
    return { ...base, ...initialValues };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formKey]);

  const { values, setField, reset } = usePreservedForm(formKey, defaults);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [result, setResult] = useState<MailtoOutput | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  function fieldError(name: string) {
    return errors.find((error) => error.field === name)?.message;
  }

  function clearFieldError(name: string) {
    if (fieldError(name)) {
      setErrors((current) => current.filter((error) => error.field !== name));
    }
  }

  function changeField(name: string, value: string) {
    setField(name, value);
    clearFieldError(name);
  }

  function setConsent(checked: boolean) {
    changeField(CONSENT_KEY, checked ? "true" : "");
  }

  function submit(activeFields: FormFieldDef[]): MailtoOutput | null {
    const nextErrors = validateForm(activeFields, values);
    if (values[CONSENT_KEY] !== "true") {
      nextErrors.push({ field: CONSENT_KEY, message: CONSENT_ERROR });
    }
    setErrors(nextErrors);
    if (nextErrors.length) {
      window.requestAnimationFrame(() => errorRef.current?.focus());
      return null;
    }

    const mailto = buildMailto({
      to: recipient(values),
      subject: subject(values),
      body: buildPlainBody([
        ...bodyLines(values),
        "",
        { label: "Consent", value: "Yes — details may be used to respond to this enquiry" },
        { label: "Prepared via", value: preparedVia },
      ]),
    });
    setResult(mailto);
    if (!mailto.exceeds) {
      window.location.href = mailto.href;
    }
    return mailto;
  }

  function clearForm() {
    reset();
    setErrors([]);
    setResult(null);
  }

  return {
    values,
    errors,
    errorRef,
    result,
    consented: values[CONSENT_KEY] === "true",
    fieldError,
    changeField,
    setConsent,
    submit,
    clearForm,
  };
}
