"use client";

import { useState } from "react";
import type { MailtoOutput } from "@/lib/mailto";

type MailtoStatusProps = {
  result: MailtoOutput;
  subject: string;
  body: string;
  recipientLabel: string;
};

export function MailtoStatus({ result, subject, body, recipientLabel }: MailtoStatusProps) {
  const [copied, setCopied] = useState<null | "body" | "address">(null);

  const copy = async (value: string, which: "body" | "address") => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard may be blocked. The textarea is still selectable.
    }
  };

  return (
    <div className="mailto-status" role="status">
      <h3>Your email application should open shortly.</h3>
      <p>
        We&rsquo;ve prepared your enquiry to <strong>{result.to}</strong> ({recipientLabel}).
        Review it and press <strong>Send</strong> to complete the request.
      </p>
      <p>
        Subject:{" "}
        <code style={{ background: "#fff", padding: "0.1rem 0.35rem" }}>{subject}</code>
      </p>
      <details>
        <summary>Preview the prepared message</summary>
        <pre aria-label="Prepared email body">{body}</pre>
      </details>
      <div className="actions mt-4">
        <a className="btn btn--primary" href={result.href}>
          Open email again
        </a>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => copy(body, "body")}
        >
          {copied === "body" ? "Copied" : "Copy prepared message"}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => copy(result.to, "address")}
        >
          {copied === "address" ? "Copied" : "Copy email address"}
        </button>
      </div>
      <p className="form-note mt-3">
        If nothing opened, copy the message above and email{" "}
        <a href={`mailto:${result.to}`}>{result.to}</a> directly.
      </p>
    </div>
  );
}
