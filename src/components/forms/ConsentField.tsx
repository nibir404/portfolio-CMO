"use client";

type ConsentFieldProps = {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: React.ReactNode;
};

export function ConsentField({ name, checked, onChange, error, children }: ConsentFieldProps) {
  const id = `consent-${name}`;
  return (
    <div className="consent">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.checked)}
      />
      <label htmlFor={id}>
        {children}
        {error ? (
          <span id={`${id}-error`} className="field__error" role="alert" style={{ display: "block" }}>
            {error}
          </span>
        ) : null}
      </label>
    </div>
  );
}
