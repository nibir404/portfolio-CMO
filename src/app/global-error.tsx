"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/logging";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError("app:global", error, { digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main style={{ margin: "0 auto", maxWidth: "40rem", padding: "4rem 1.5rem" }}>
          <h1>This page could not be displayed.</h1>
          <p>
            An unexpected error interrupted the site. Reload the page, or email{" "}
            <a href="mailto:office@abdullahalamin.me">office@abdullahalamin.me</a> if it keeps
            happening.
          </p>
          {error.digest ? <p>Reference: {error.digest}</p> : null}
          <button type="button" onClick={reset}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
