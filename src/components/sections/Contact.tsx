"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";
import { validateEmail, validateRequired } from "@/lib/validation";

const NAME_MAX = 120;
const MESSAGE_MAX = 1200;

export function Contact() {
  const { contact } = editorial;
  const [area, setArea] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const isAllowedArea = (contact.areaOptions as readonly string[]).includes(get("f-area"));

    if (
      !validateRequired(get("f-name")) ||
      !validateRequired(get("f-company")) ||
      !validateRequired(get("f-message")) ||
      !isAllowedArea
    ) {
      setError("Please complete every field before sending the enquiry.");
      return;
    }
    if (!validateEmail(get("f-email"))) {
      setError("Enter a valid business email address.");
      return;
    }
    if (get("f-message").length > MESSAGE_MAX) {
      setError(`Keep the message to ${MESSAGE_MAX} characters or fewer.`);
      return;
    }
    setError(null);

    const subject = `Enquiry: ${get("f-area") || "General"} | ${get("f-company")}`;
    const body =
      `Name: ${get("f-name")}\n` +
      `Company: ${get("f-company")}\n` +
      `Email: ${get("f-email")}\n` +
      `Area: ${get("f-area")}\n\n` +
      `${get("f-message")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="editorial-section editorial-section--surface" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <Reveal>
          <span className="kicker">{contact.kicker}</span>
          <div className="contact-grid">
            <div className="contact-copy">
              <h2 id="contact-title" className="section-title">
                {contact.title}
              </h2>
              <p className="big">{contact.big}</p>
              <p className="direct">
                Prefer email? Write to me directly:
                <br />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </div>
            <form id="enquiry" onSubmit={handleSubmit} noValidate>
              {error ? (
                <div className="error-summary" role="alert">
                  {error}
                </div>
              ) : null}
              <div className="field-row">
                <div className="field">
                  <label htmlFor="f-name">Full name</label>
                  <input id="f-name" name="f-name" type="text" maxLength={NAME_MAX} required />
                </div>
                <div className="field">
                  <label htmlFor="f-company">Company</label>
                  <input id="f-company" name="f-company" type="text" maxLength={NAME_MAX} required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-email">Business email</label>
                <input id="f-email" name="f-email" type="email" maxLength={254} required />
              </div>
              <div className="field">
                <label htmlFor="f-area">Area of discussion</label>
                <select
                  id="f-area"
                  name="f-area"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {contact.areaOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-message">Message</label>
                <textarea
                  id="f-message"
                  name="f-message"
                  maxLength={MESSAGE_MAX}
                  required
                  placeholder="The problem, the deadline, and the outcome you need."
                />
              </div>
              <button className="btn btn--primary" type="submit">
                Send the enquiry
              </button>
              <p className="form-note">{contact.formNote}</p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, SDG = Sustainable Development Goals