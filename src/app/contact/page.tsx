import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/lib/metadata";
import { sidePhotos } from "@/content/images";
import { trail } from "@/lib/breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Abdullah Al Alamin | Group CMO & AI Researcher",
  description: "Get in touch with the office of Abdullah Al Alamin. Submit a mandate brief or contact the office directly.",
  path: "/contact",
});

const channelImages = sidePhotos.slice(0, 3);

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={trail({ name: "Contact", href: "/contact" })} />
      <PageHero
        id="contact"
        kicker="Contact"
        title={<>Tell me about the <em>work</em>.</>}
        lead="Tell us about your mandate or project, and the office will confirm availability within two business days."
        image={{ src: "/images/boss-8.jpg", alt: "Abdullah Al Alamin at work." }}
      />

      <Section ariaLabelledBy="form-title" style={{ paddingTop: 0 }}>
        <Container>
          <div className="contact-layout-grid">
            <div className="contact-form-card">
              <EyebrowHeading eyebrow="Diagnostic brief" title="Brief the office." id="form-title" />
              <EnquiryForm />
            </div>
            <div className="contact-image-card">
              <span className="contact-image-tag">The Office</span>
              <Image src="/images/boss.jpg" alt="Abdullah Al Alamin presentation." fill priority sizes="(min-width: 900px) 35vw, 100vw" />
            </div>
          </div>

          <div className="contact-channels">
            <div className="channel-card">
              <ImageBlock src={channelImages[0]} alt="Working conversation." aspect="1:1" />
              <h3>Call & WhatsApp</h3>
              <p>{site.phone || "+880 1711-222333"}</p>
            </div>
            <div className="channel-card">
              <ImageBlock src={channelImages[1]} alt="Working hours at the office." aspect="1:1" />
              <h3>Working Hours</h3>
              <p>Sun - Thu: 9am - 6pm</p>
              <p>Fri - Sat: Closed</p>
            </div>
            <div className="channel-card">
              <ImageBlock src={channelImages[2]} alt="Contact the office by email." aspect="1:1" />
              <h3>Write to Us</h3>
              <p><a href={`mailto:${site.officeEmail}`}>{site.officeEmail}</a></p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence