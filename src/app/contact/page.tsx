import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Abdullah Al Alamin | Group CMO & AI Researcher",
  description: "Get in touch with the office of Abdullah Al Alamin. Submit a mandate brief or contact the office directly.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      
      <Section compact ariaLabelledBy="contact-hero-title" style={{ paddingTop: "var(--space-6)", paddingBottom: "var(--space-6)" }}>
        <Container>
          <div className="split split--center" style={{ alignItems: "end" }}>
            <div>
              <h1 id="contact-hero-title" style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", lineHeight: "1.1", fontWeight: 600, margin: 0 }}>
                Contact Us
              </h1>
            </div>
            <div>
              <p style={{ fontSize: "1.15rem", color: "var(--color-ink-soft)", lineHeight: "1.5", maxWidth: "42ch", margin: 0 }}>
                Tell us about your mandate or project, and the office will confirm availability within two business days.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="form-title" style={{ paddingTop: 0 }}>
        <Container>
          <div className="contact-layout-grid">
            <div className="contact-form-card">
              <h2 id="form-title" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--space-5)" }}>Brief the Office</h2>
              <EnquiryForm />
            </div>
            <div className="contact-image-card">
              <span className="contact-image-tag">The Office</span>
              <Image
                src="/images/boss.jpg"
                alt="Abdullah Al Alamin Presentation"
                fill
                priority
                sizes="(min-width: 900px) 35vw, 100vw"
              />
            </div>
          </div>

          <div className="contact-channels">
            <div className="channel-card">
              <div className="channel-icon-wrapper" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h3>Call & WhatsApp</h3>
              <p>{site.phone || "+880 1711-222333"}</p>
            </div>

            <div className="channel-card">
              <div className="channel-icon-wrapper" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Working Hours</h3>
              <p>Sun - Thu: 9am - 6pm</p>
              <p>Fri - Sat: Closed</p>
            </div>

            <div className="channel-card">
              <div className="channel-icon-wrapper" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3>Write to Us</h3>
              <p>
                <a href={`mailto:${site.officeEmail}`} style={{ color: "inherit", textDecoration: "underline" }}>
                  {site.officeEmail}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>

    </>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence
