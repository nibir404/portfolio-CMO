"use client";

import { forwardRef } from "react";
import type { ValidationError } from "@/types/forms";

type FormErrorSummaryProps = {
  errors: ValidationError[];
};

export const FormErrorSummary = forwardRef<HTMLDivElement, FormErrorSummaryProps>(
  function FormErrorSummary({ errors }, ref) {
    if (!errors.length) return null;
    return (
      <div ref={ref} className="error-summary" role="alert" tabIndex={-1}>
        <h3>Please correct the highlighted fields.</h3>
        <ul>
          {errors.map((error) => (
            <li key={`${error.field}-${error.message}`}>
              <a href={`#field-${error.field}`}>{error.message}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
