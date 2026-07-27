import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { getAllServices } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Fractional CMO, Board Advisory & Growth Sprints | Abdullah Al Alamin",
  description:
    "Engagement models for organisations that need senior marketing leadership: fractional CMO mandates, board advisory, 90-day growth sprints, and AI marketing transformation.",
  path: "/services",
});

const overviewFaqs = [
  {
    question: "What is a fractional CMO and when does a company need one?",
    answer:
      "A fractional CMO is a senior marketing executive who serves an organisation on a part-time, contracted basis — typically a fixed number of days per month — with full accountability to the CEO or board. Companies usually need one when marketing decisions are made in silos across business units, when the founder has become the de facto CMO, or when a group-level marketing function is being stood up and needs a credible leader before a permanent hire makes sense.",
  },
  {
    question: "How long is a typical mandate?",
    answer:
      "The standard mandate is six months at three days per week or twelve months at two days per week. Shorter mandates are possible for transitional situations, but the work that compounds — brand architecture, operating model, team shape — usually needs at least six months to land.",
  },
  {
    question: "Do you work with companies outside Bangladesh?",
    answer:
      "Yes. The office serves organisations across South Asia, APAC, and the GCC, with regular travel from Dhaka. Cross-border mandates are run on a hybrid cadence with remote work and short in-country sprints.",
  },
  {
    question: "What does a 90-day growth sprint actually deliver?",
    answer:
      "A sprint delivers a focused brand or campaign outcome that ships within ninety days. Typical deliverables include a brand strategy or repositioning, a campaign or product launch, a communications plan, and an internal activation plan so the team can carry the work forward. The exact scope is fixed in the proposal.",
  },
  {
    question: "How is AI used in your marketing work?",
    answer:
      "AI is used as a craft tool inside the operator's workflow — for research synthesis, creative iteration, predictive segmentation, content production, and measurement. It does not replace the operator's judgment. Every AI move in market is first pressure-tested against governance, evaluation, and reproducibility criteria, then deployed with discipline in the field.",
  },
  {
    question: "What size of organisation do you typically work with?",
    answer:
      "In practice, the model fits organisations between roughly fifty million and one billion US dollars in annual revenue, with multiple business units or brands. Above that range, a full-time Group CMO is usually the right answer; below it, a fractional Head of Marketing or a 90-day growth sprint is more proportionate.",
  },
];

const steps = [
  { number: "01", title: "Discovery call", copy: "A 30-minute call to understand the work, the deadline, and the outcome." },
  { number: "02", title: "Scope & diagnostic", copy: "A two-to-four-week diagnostic that confirms the brief and the success criteria." },
  { number: "03", title: "Proposal & mandate", copy: "A written proposal with scope, fee, timeline, and reporting cadence." },
  { number: "04", title: "Kickoff", copy: "A working kickoff with the team, the leadership, and the first measurable wave of work." },
];

export default function ServicesPage() {
  const services = getAllServices();
  return (
    <>
      <JsonLd
        data={[
          faqSchema(overviewFaqs),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
      <Section compact ariaLabelledBy="services-hero-title">
        <Container>
          <div className="page-hero__grid">
            <div>
              <span className="eyebrow">Engagement models</span>
              <h1 id="services-hero-title">Four ways to work with the office.</h1>
              <p className="page-hero__intro">
                Whether you need a marketing leader in the chair, a voice in the boardroom, a
                quarter of focused transformation, or a defensible AI strategy.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="service-blocks-title">
        <Container>
          <SectionHeading
            eyebrow="Engagement models"
            title="Four ways to work with the office."
            id="service-blocks-title"
          />
          <div className="grid grid--2">
            {services.map((service) => (
              <article key={service.slug} className="card card--service" id={service.slug}>
                <p className="card__meta">
                  <span>{service.engagementModels[0] ?? "Engagement"}</span>
                </p>
                <h3>{service.name}</h3>
                <p>{service.intro}</p>
                <p>
                  <strong>Who it&rsquo;s for:</strong> {service.audience.join(" · ")}
                </p>
                <p>
                  <strong>What&rsquo;s included:</strong>
                </p>
                <ul>
                  {service.deliverables.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="card__footer">
                  <a className="text-link" href={`/services/${service.slug}`}>
                    Learn more →
                  </a>
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="how-title">
        <Container>
          <SectionHeading
            eyebrow="How engagements start"
            title="Four steps to a working mandate."
            id="how-title"
          />
          <div className="step-grid">
            {steps.map((step) => (
              <article key={step.number} className="step">
                <span className="step__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="sectors-title">
        <Container>
          <div className="split">
            <div>
              <h2 id="sectors-title">Sectors served.</h2>
              <p className="section-heading__copy">
                FMCG · Building materials · Conglomerates · Education · Technology · Government &
                policy
              </p>
            </div>
            <div>
              <h2>Geography.</h2>
              <p className="section-heading__copy">
                Bangladesh · South Asia · APAC · GCC partnerships
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="faq-title">
        <Container>
          <SectionHeading
            eyebrow="Frequently asked"
            title="Answers to common questions."
            id="faq-title"
          />
          <Accordion items={overviewFaqs} />
        </Container>
      </Section>

      <Section surface="accent" ariaLabelledBy="services-cta-title">
        <Container>
          <div className="split split--center">
            <div>
              <h2 id="services-cta-title">Start a conversation.</h2>
              <p style={{ color: "rgba(255,255,255,0.84)" }}>
                Currently taking on a limited number of mandates with growth-driven organisations.
              </p>
            </div>
            <div className="actions">
              <ButtonLink href="/contact" variant="white">
                Book a 30-min call
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid--2">
            {services.slice(0, 2).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence, FMCG = Fast-Moving Consumer Goods, APAC = Asia-Pacific, GCC = Gulf Cooperation Council
