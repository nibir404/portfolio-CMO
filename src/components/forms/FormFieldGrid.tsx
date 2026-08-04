"use client";

import { FormField } from "@/components/forms/FormField";
import type { FormFieldDef } from "@/types/forms";

type FormFieldGridProps = {
  fields: FormFieldDef[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  fieldError: (name: string) => string | undefined;
  className?: string;
};

export function FormFieldGrid({
  fields,
  values,
  onChange,
  fieldError,
  className = "form-grid form-grid--2",
}: FormFieldGridProps) {
  return (
    <div className={className}>
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={values[field.name] ?? ""}
          onChange={(value) => onChange(field.name, value)}
          error={fieldError(field.name)}
        />
      ))}
    </div>
  );
}
