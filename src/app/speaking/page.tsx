import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SpeakingTopicCard } from "@/components/cards/SpeakingTopicCard";
import { SpeakingForm } from "@/components/forms/SpeakingForm";
import { speakingTopics, pastStages } from "@/content/speaking";
import { buildPageMetadata } from "@/lib/metadata";
import { profile } from "@/content/profile";
import { trail } from "@/lib/breadcrumbs";
import { sidePhotos } from "@/content/images";

export const metadata: Metadata = buildPageMetadata({
  title: "Keynote Speaker on AI Marketing & Brand Strategy | Abdullah Al Alamin",
  description: "Keynotes, juries, and public frameworks. Four bookable topics on the AI-first CMO, compounding brand equity, national branding, and reputation rebuilt in public.",
  path: "/speaking",
});

const logistics = [
  { label: "Bio", value: "Short, medium, and long bios available on request." },
  { label: "Photos", value: "Approved high-resolution photos for programme and press use." },
  { label: "AV", value: "Lapel microphone, clicker, confidence monitor, and 16:9 slide template." },
  { label: "Travel", value: "Based in Dhaka. Travel from Dhaka included in the engagement fee." },
];

const topicImages = sidePhotos.slice(0, 4);

export default function SpeakingPage() {
  return (
    <>
      <Breadcrumbs items={trail({ name: "Speaking", href: "/speaking" })} />
      <PageHero
        id="speaking"
        kicker="Speaking & keynotes"
        title={<>Keynotes, juries, and public <em>frameworks</em>.</>}
        lead={`${profile.shortBio} Talks, keynotes, and closed-door briefings for boards, ministries, and category-leading companies across APAC and the Commonwealth.`}
        actions={<ButtonLink href="#speaking-form">Check availability</ButtonLink>}
        image={{ src: "/images/boss-9.jpg", alt: "Abdullah on stage." }}
      />

      <Section surface="surface" ariaLabelledBy="topics-title">
        <Container>
          <EyebrowHeading eyebrow="Topics" title="Four bookable talks." id="topics-title" />
          <div className="grid grid--2">
            {speakingTopics.map((topic, i) => (
              <article key={topic.slug} className="card card--media">
                <div className="card--media__image">
                  <ImageBlock src={topicImages[i % topicImages.length]} alt={topic.title} aspect="16:9" />
                </div>
                <div className="card--media__body">
                  <SpeakingTopicCard topic={topic} />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="stages-title">
        <Container>
          <EyebrowHeading eyebrow="Past stages" title="Where the office has spoken." id="stages-title" />
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
          <EyebrowHeading eyebrow="Juror & advisory" title="Beyond the keynote." id="jury-title" />
          <p className="prose">Juror at the Bangladesh Marketing Excellence Awards, mentor at the Commonwealth Youth Programme, and a regular faculty voice across APAC. The same operating discipline that shapes the keynote work shapes the juror and mentor practice.</p>
        </Container>
      </Section>

      <Section ariaLabelledBy="logistics-title">
        <Container>
          <EyebrowHeading eyebrow="What organisers get" title="Logistics, bios, and AV." id="logistics-title" />
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
          <EyebrowHeading eyebrow="Booking enquiry" title="Six fields. No marketing list." id="form-title" />
          <div className="split">
            <div>
              <p className="prose">Fill in the form below. Your email application will open with the enquiry prepared — the office responds within two business days with availability and a draft contract.</p>
              <p className="prose mt-4">Or write directly to <a href="mailto:speaking@abdullahalamin.me">speaking@abdullahalamin.me</a>.</p>
            </div>
            <SpeakingForm />
          </div>
        </Container>
      </Section>
    </>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence, APAC = Asia-Pacific