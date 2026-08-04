"use client";

import { useState } from "react";
import { reportError } from "@/lib/logging";
import type { MailtoOutput } from "@/lib/mailto";

type MailtoStatusProps = {
  result: MailtoOutput;
  subject: string;
  body: string;
  recipientLabel: string;
};

const COPY_UNAVAILABLE =
  "Copying is blocked in this browser. Select the message above and copy it manually.";

export function MailtoStatus({ result, subject, body, recipientLabel }: MailtoStatusProps) {
  const [copied, setCopied] = useState<null | "body" | "address">(null);
  const [copyError, setCopyError] = useState<string | null>(null);

  const copy = async (value: string, which: "body" | "address") => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopyError(COPY_UNAVAILABLE);
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setCopyError(null);
      window.setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      reportError("MailtoStatus", error, { target: which });
      setCopied(null);
      setCopyError(COPY_UNAVAILABLE);
    }
  };

  return (
    <div className="mailto-status" role="status">
      {result.exceeds ? (
        <>
          <h3>This enquiry is too long to open in your email application.</h3>
          <p>
            Copy the prepared message below and email it to <strong>{result.to}</strong> (
            {recipientLabel}), or shorten the message and submit again.
          </p>
        </>
      ) : (
        <>
          <h3>Your email application should open shortly.</h3>
          <p>
            We&rsquo;ve prepared your enquiry to <strong>{result.to}</strong> ({recipientLabel}).
            Review it and press <strong>Send</strong> to complete the request.
          </p>
        </>
      )}
      <p>
        Subject:{" "}
        <code style={{ background: "#fff", padding: "0.1rem 0.35rem" }}>{subject}</code>
      </p>
      <details>
        <summary>Preview the prepared message</summary>
        <pre aria-label="Prepared email body">{body}</pre>
      </details>
      <div className="actions mt-4">
        {result.exceeds ? null : (
          <a className="btn btn--primary" href={result.href}>
            Open email again
          </a>
        )}
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
      {copyError ? (
        <p className="form-note mt-3" role="alert">
          {copyError}
        </p>
      ) : null}
      <p className="form-note mt-3">
        If nothing opened, copy the message above and email{" "}
        <a href={`mailto:${result.to}`}>{result.to}</a> directly.
      </p>
    </div>
  );
}
