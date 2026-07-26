import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { newsletter } from "@/content/newsletter";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "AlaminWeekly | Abdullah Al Alamin",
  description:
    "One brand-strategy insight a week, in your inbox. Frameworks from the operator's desk, with the receipts.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "AlaminWeekly", href: "/newsletter" }]}
      />
      <Section compact ariaLabelledBy="newsletter-title">
        <Container>
          <span className="eyebrow">AlaminWeekly</span>
          <h1 id="newsletter-title">{newsletter.title}.</h1>
          <p className="page-hero__intro">{newsletter.subtitle}</p>
          <p className="page-hero__meta mt-4">
            {newsletter.cadence} · {newsletter.topics.join(" · ")}
          </p>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="form-title">
        <Container>
          <SectionHeading
            eyebrow="Join the list"
            title="Three fields. No marketing list."
            id="form-title"
          />
          <div className="split">
            <div>
              <p className="prose">
                The signup does not use an automated email service. Fill in the form below and your
                email application will open with the request prepared. The office adds you by hand
                to the next Monday&rsquo;s send.
              </p>
              <p className="form-note mt-4">
                No spam. No shared lists. Unsubscribe with one click in any issue.
              </p>
              <div className="actions mt-5">
                <ButtonLink href="/insights" variant="ghost">Read past issues</ButtonLink>
              </div>
            </div>
            <NewsletterForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
