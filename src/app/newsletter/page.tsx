import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHero } from "@/components/ui/PageHero";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { newsletter } from "@/content/newsletter";
import { buildPageMetadata } from "@/lib/metadata";
import { trail } from "@/lib/breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "AlaminWeekly | Abdullah Al Alamin",
  description: "One brand-strategy insight a week, in your inbox. Frameworks from the operator's desk, with the receipts.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <>
      <Breadcrumbs items={trail({ name: "AlaminWeekly", href: "/newsletter" })} />
      <PageHero
        id="newsletter"
        kicker="AlaminWeekly"
        title={<>{newsletter.title}.</>}
        lead={newsletter.subtitle}
        meta={`${newsletter.cadence} · ${newsletter.topics.join(" · ")}`}
        image={{ src: "/images/all side photo/bf36be97-595f-4f03-b208-7f93513e1080 (1).png", alt: "Weekly field notes." }}
      />

      <Section surface="surface" ariaLabelledBy="form-title">
        <Container>
          <div className="split">
            <div>
              <EyebrowHeading eyebrow="Join the list" title="Three fields. No marketing list." id="form-title" />
              <p className="prose">The signup does not use an automated email service. Fill in the form below and your email application will open with the request prepared. The office adds you by hand to the next Monday&rsquo;s send.</p>
              <p className="form-note mt-4">No spam. No shared lists. Unsubscribe with one click in any issue.</p>
              <div className="actions mt-5">
                <ButtonLink href="/insights" variant="ghost">Read past issues</ButtonLink>
              </div>
            </div>
            <div>
              <ImageBlock src="/images/all side photo/c5307815-15e9-4005-addb-f5450988e31e.png" alt="Reading on Monday morning." aspect="4:5" />
              <div style={{ marginTop: "var(--space-5)" }}>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}