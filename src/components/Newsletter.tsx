"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="newsletter snap-section" aria-labelledby="newsletter-heading">
      <div className="container">
        <div className="reveal">
          <div className="text-eyebrow" style={{ color: "var(--text-muted)", marginBottom: "var(--space-3)" }}>
            AlaminWeekly · Newsletter
          </div>
          <h2 id="newsletter-heading" className="display-section" style={{ marginBottom: "var(--space-3)" }}>
            Subscribe to{" "}
            <span className="newsletter-brand" style={{ fontStyle: "italic", fontFamily: "var(--font-quote)" }}>
              Alamin Weekly
            </span>
          </h2>
          <p
            className="reading-width reveal"
            style={{
              margin: "0 auto",
              fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)",
              color: "var(--text-muted)",
              lineHeight: 1.7,
            }}
          >
            Insights on entrepreneurship, leadership, innovation, and the
            future of business. One curated letter. Every Sunday.
          </p>
        </div>

        {!submitted ? (
          <form className="newsletter-form" onSubmit={onSubmit} noValidate>
            <label htmlFor="newsletter-email" className="sr-only" style={{ position: "absolute", left: "-9999px" }}>
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="your@email.com"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? "newsletter-error" : undefined}
              autoComplete="email"
            />
            <button type="submit" className="magnetic-btn cta-slash" data-cursor-hover>
              <span>Subscribe</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        ) : (
          <div
            className="reveal"
            role="status"
            style={{
              marginTop: "var(--space-5)",
              padding: "var(--space-3) var(--space-4)",
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              fontWeight: 500,
              maxWidth: "560px",
              margin: "var(--space-5) auto 0",
            }}
          >
            ✓ Welcome to ALAMIN WEEKLY. Check your inbox.
          </div>
        )}
        {error && (
          <p id="newsletter-error" role="alert" style={{ color: "#0A0A0A", marginTop: "var(--space-2)", fontSize: "0.9rem", fontWeight: 600 }}>
            {error}
          </p>
        )}
      </div>
    </section>
  );
}