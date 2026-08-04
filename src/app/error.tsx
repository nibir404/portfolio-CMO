"use client";

import { useEffect } from "react";
import Link from "next/link";
import { reportError } from "@/lib/logging";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError("app", error, { digest: error.digest });
  }, [error]);

  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">Something went wrong</span>
        <h1>This page could not be displayed.</h1>
        <p className="page-hero__intro mt-4">
          An unexpected error interrupted the page. Try again, or return to the homepage. If the
          problem persists, email{" "}
          <a className="text-link" href="mailto:office@abdullahalamin.me">
            office@abdullahalamin.me
          </a>
          .
        </p>
        {error.digest ? (
          <p className="form-note mt-3">Reference: {error.digest}</p>
        ) : null}
        <div className="actions mt-5">
          <button type="button" className="btn btn--primary" onClick={reset}>
            Try again
          </button>
          <Link className="btn btn--ghost" href="/">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
