"use client";

import type { FormFieldDef } from "@/types/forms";

type FormFieldProps = {
  field: FormFieldDef;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  describedBy?: string;
};

export function FormField({ field, value, onChange, error, describedBy }: FormFieldProps) {
  const id = `field-${field.name}`;
  const errorId = error ? `${id}-error` : undefined;
  const helpId = field.helpText ? `${id}-help` : undefined;
  const ariaDescribedBy = [describedBy, errorId, helpId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="field">
      <label htmlFor={id}>
        {field.label}
        {field.required ? (
          <span className="field__required" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          value={value}
          required={field.required}
          rows={field.rows ?? 5}
          maxLength={field.maxLength}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={ariaDescribedBy}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : field.type === "select" ? (
        <select
          id={id}
          name={field.name}
          value={value}
          required={field.required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={ariaDescribedBy}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">{field.placeholder ?? "Select…"}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type ?? "text"}
          value={value}
          required={field.required}
          maxLength={field.maxLength}
          pattern={field.pattern}
          inputMode={field.inputMode as never}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={ariaDescribedBy}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {field.helpText ? (
        <span id={helpId} className="field__help">
          {field.helpText}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="field__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
