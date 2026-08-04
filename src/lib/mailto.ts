import type { EnquiryKind } from "@/types/forms";

export const MAILTO_FROM = "office@abdullahalamin.me";
export const MAILTO_TO = [
  "office@abdullahalamin.me",
  "speaking@abdullahalamin.me",
  "press@abdullahalamin.me",
] as const;

export type MailtoAddress =
  | "office@abdullahalamin.me"
  | "speaking@abdullahalamin.me"
  | "press@abdullahalamin.me";

export const RECIPIENT_LABELS: Record<MailtoAddress, string> = {
  "office@abdullahalamin.me": "Board mandates · 90-day growth sprints · press · general enquiries",
  "speaking@abdullahalamin.me": "Keynotes · juries · faculty conversations",
  "press@abdullahalamin.me": "Interviews · bylines · press kit requests",
};

export const MAILTO_ROUTING: Record<
  EnquiryKind,
  { to: MailtoAddress; label: string }
> = {
  "fractional-cmo": { to: "office@abdullahalamin.me", label: "Fractional CMO mandate" },
  "board-advisory": { to: "office@abdullahalamin.me", label: "Board advisory" },
  "growth-sprint": { to: "office@abdullahalamin.me", label: "90-day growth sprint" },
  "ai-marketing-transformation": {
    to: "office@abdullahalamin.me",
    label: "AI marketing transformation",
  },
  "speaking": { to: "speaking@abdullahalamin.me", label: "Speaking enquiry" },
  "press": { to: "press@abdullahalamin.me", label: "Press enquiry" },
  "playbook": { to: "office@abdullahalamin.me", label: "Playbook request" },
  "newsletter": { to: "office@abdullahalamin.me", label: "AlaminWeekly signup" },
  "other": { to: "office@abdullahalamin.me", label: "General enquiry" },
};

export const MAILTO_LIMIT = 1800;

export type MailtoInput = {
  to: MailtoAddress;
  subject: string;
  body: string;
};

export type MailtoOutput = {
  href: string;
  subject: string;
  body: string;
  to: MailtoAddress;
  length: number;
  exceeds: boolean;
};

export function buildMailto(input: MailtoInput): MailtoOutput {
  const subject = input.subject.trim();
  const body = input.body.trim();
  const subjectEncoded = encodeSubjectComponent(subject);
  const bodyEncoded = encodeBodyComponent(body);
  const to = resolveRecipient(input.to);
  const href = `mailto:${encodeURIComponent(to)}?subject=${subjectEncoded}&body=${bodyEncoded}`;
  const length = href.length;
  return {
    href,
    subject,
    body,
    to,
    length,
    exceeds: length > MAILTO_LIMIT,
  };
}

export function encodeMailtoValue(value: string): string {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

export function buildPlainBody(lines: Array<{ label: string; value: string } | string>): string {
  return lines
    .map((line) => {
      if (typeof line === "string") return line;
      return `${line.label}: ${line.value}`;
    })
  .join("\n");
}

function encodeSubjectComponent(value: string): string {
  return encodeURIComponent(value).replace(/%E2%80%94|%E2%80%93/g, (m) => encodeURIComponent(m));
}

function encodeBodyComponent(value: string): string {
  return encodeURIComponent(value).replace(/%0A/g, "%0A");
}

function resolveRecipient(value: string): MailtoAddress {
  const candidate = value.trim();
  const allowed = MAILTO_TO.find((address) => address === candidate);
  if (!allowed) {
    throw new Error("Unknown mailto recipient.");
  }
  return allowed;
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence
