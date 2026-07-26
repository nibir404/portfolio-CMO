import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SpeakingTopicCard } from "@/components/cards/SpeakingTopicCard";
import { SpeakingForm } from "@/components/forms/SpeakingForm";
import { speakingTopics, pastStages } from "@/content/speaking";
import { buildPageMetadata } from "@/lib/metadata";
import { profile } from "@/content/profile";

export const metadata: Metadata = buildPageMetadata({
  title: "Keynote Speaker on AI Marketing & Brand Strategy | Abdullah Al Alamin",
  description:
    "Keynotes, juries, and public frameworks. Four bookable topics on the AI-first CMO, compounding brand equity, national branding, and reputation rebuilt in public.",
  path: "/speaking",
});

const logistics = [
  { label: "Bio", value: "Short, medium, and long bios available on request." },
  { label: "Photos", value: "Approved high-resolution photos for programme and press use." },
  { label: "AV", value: "Lapel microphone, clicker, confidence monitor, and 16:9 slide template." },
  { label: "Travel", value: "Based in Dhaka. Travel from Dhaka included in the engagement fee." },
];

export default function SpeakingPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Speaking", href: "/speaking" }]}
      />
      <Section compact ariaLabelledBy="speaking-hero-title">
        <Container>
          <span className="eyebrow">Speaking & keynotes</span>
          <h1 id="speaking-hero-title">Keynotes, juries, and public frameworks.</h1>
          <p className="page-hero__intro">
            {profile.shortBio} Talks, keynotes, and closed-door briefings for boards, ministries, and
            category-leading companies across APAC and the Commonwealth.
          </p>
          <div className="actions mt-5">
            <ButtonLink href="#speaking-form">Check availability</ButtonLink>
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="topics-title">
        <Container>
          <SectionHeading eyebrow="Topics" title="Four bookable talks." id="topics-title" />
          <div className="grid grid--2">
            {speakingTopics.map((topic) => (
              <SpeakingTopicCard topic={topic} key={topic.slug} />
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="stages-title">
        <Container>
          <SectionHeading eyebrow="Past stages" title="Where the office has spoken." id="stages-title" />
          <div className="timeline">
            {pastStages.map((stage) => (
              <article key={stage.name} className="timeline__item">
                <span className="timeline__year">{stage.year}</span>
                <div className="timeline__body">
                  <h3>{stage.name}</h3>
                  <p>{stage.location}</p>
                  <p>{stage.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="jury-title">
        <Container>
          <SectionHeading
            eyebrow="Juror & advisory"
            title="Beyond the keynote."
            id="jury-title"
          />
          <p className="prose">
            Juror at the Bangladesh Marketing Excellence Awards, mentor at the Commonwealth Youth
            Programme, and a regular faculty voice across APAC. The same operating discipline that
            shapes the keynote work shapes the juror and mentor practice.
          </p>
        </Container>
      </Section>

      <Section ariaLabelledBy="logistics-title">
        <Container>
          <SectionHeading
            eyebrow="What organisers get"
            title="Logistics, bios, and AV."
            id="logistics-title"
          />
          <div className="grid grid--2">
            {logistics.map((item) => (
              <article key={item.label} className="card card--service">
                <span className="card__meta">{item.label}</span>
                <p>{item.value}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="surface" id="speaking-form" ariaLabelledBy="form-title">
        <Container>
          <SectionHeading
            eyebrow="Booking enquiry"
            title="Six fields. No marketing list."
            id="form-title"
          />
          <div className="split">
            <div>
              <p className="prose">
                Fill in the form below. Your email application will open with the enquiry prepared —
                the office responds within two business days with availability and a draft contract.
              </p>
              <p className="prose mt-4">
                Or write directly to{" "}
                <a href="mailto:speaking@abdullahalamin.me">speaking@abdullahalamin.me</a>.
              </p>
            </div>
            <SpeakingForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
