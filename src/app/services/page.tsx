import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { PageHero } from "@/components/ui/PageHero";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { getAllServices } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Business Transformation & AI Strategy Capabilities | Abdullah Al Alamin",
  description:
    "Pragmatic transformation areas for ambitious organisations: AI Business Transformation, Brand Transformation, Business Growth & Scaling, and International Expansion.",
  path: "/services",
});

const overviewFaqs = [
  { question: "What is your approach to AI transformation?", answer: "I don't recommend AI as a generic tool; I build AI-powered businesses. I work with leadership teams to design operating models, automate manual operations, construct data ingestion pipelines, and integrate predictive analytics directly into business operations." },
  { question: "How is brand repositioning measured as a commercial strategy?", answer: "Branding is a balance-sheet asset. I measure success by tracking metrics like customer acquisition cost (CAC) reduction, customer lifetime value (LTV) improvement, pricing elasticity, and search volume share. We establish baseline numbers on day one and measure progress against them." },
  { question: "Do you advise companies outside Bangladesh?", answer: "Yes. I help category leaders scale and partner across South Asia, APAC, and the GCC. Cross-border mandates are run on a hybrid cadence with strategic remote work and intensive on-site field visits." },
  { question: "What does a typical business transformation engagement cost and look like?", answer: "Engagements are run either as fixed-scope 90-day sprints or long-term embedded advisory mandates. Every engagement begins with a diagnostic audit to identify operational bottlenecks and align on KPIs, followed by a formal roadmap proposal with fixed pricing." },
  { question: "What size of organization do you typically work with?", answer: "My advisory practice fits mid-market businesses and conglomerates with annual revenues between roughly ten million and five hundred million US dollars. I work directly with the CEOs, founders, chairmen, and investors who hold the mandate for organizational change." },
];

const steps = [
  { number: "01", title: "Diagnostic Brief", copy: "Submit your business parameters, operational bottlenecks, and growth targets." },
  { number: "02", title: "Commercial Alignment", copy: "A structured 30-minute qualification call to evaluate fit and organizational readiness." },
  { number: "03", title: "Roadmap Proposal", copy: "Within five working days, I deliver a detailed execution proposal with KPIs, timeline, and fee." },
  { number: "04", title: "Active Mandate", copy: "A collaborative kickoff working directly alongside your team to ship the first wave of transformation." },
];

const serviceImages = ["/images/img1.jpg", "/images/ab4.jpg", "/images/img2.jpg", "/images/ab5.jpg"];

export default function ServicesPage() {
  const services = getAllServices();
  return (
    <>
      <JsonLd data={[faqSchema(overviewFaqs), breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Capabilities", href: "/services" }])]} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Capabilities", href: "/services" }]} />
      <PageHero
        id="services"
        kicker="Transformation areas"
        title={<>Four capabilities that move the <em>needle</em>.</>}
        lead="Pragmatic, operator-led transformation to help your business automate operations, command pricing power, scale systems, and expand globally."
        image={{ src: "/images/hero.webp", alt: "Working field session." }}
        imagePosition="below"
      />

      <Section surface="surface" ariaLabelledBy="service-blocks-title">
        <Container>
          <EyebrowHeading eyebrow="Capabilities" title="Four capabilities that create business value." id="service-blocks-title" />
          <div className="grid grid--2">
            {services.map((service, idx) => (
              <article key={service.slug} className="card card--media" id={service.slug}>
                <div className="card--media__image">
                  <ImageBlock src={serviceImages[idx] ?? serviceImages[0]} alt={`${service.name} visual.`} aspect="16:9" />
                </div>
                <div className="card--media__body">
                  <p className="card__meta"><span>{service.engagementModels[0] ?? "Engagement"}</span></p>
                  <h3>{service.name}</h3>
                  <p>{service.intro}</p>
                  <p><strong>Who it&rsquo;s for:</strong> {service.audience.join(" · ")}</p>
                  <p><strong>What&rsquo;s included:</strong></p>
                  <ul>
                    {service.deliverables.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                  <p className="card__footer"><a className="text-link" href={`/services/${service.slug}`}>Learn more →</a></p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="how-title">
        <Container>
          <EyebrowHeading eyebrow="How engagements start" title="Four steps to a working mandate." id="how-title" />
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
              <p className="section-heading__copy">FMCG · Building materials · Conglomerates · Education · Technology · Government & policy</p>
            </div>
            <div>
              <h2>Geography.</h2>
              <p className="section-heading__copy">Bangladesh · South Asia · APAC · GCC partnerships</p>
            </div>
          </div>
        </Container>
      </Section>

      <ImageBlock src="/images/all side photo/7f48d23f-b588-426c-86b7-05ca1b3bfab5.png" alt="Working session with leadership team." aspect="21:9" caption="Every mandate starts in the room, not on a slide." />

      <Section ariaLabelledBy="faq-title">
        <Container>
          <EyebrowHeading eyebrow="Frequently asked" title="Answers to common questions." id="faq-title" />
          <Accordion items={overviewFaqs} />
        </Container>
      </Section>

      <Section surface="accent" ariaLabelledBy="services-cta-title">
        <Container>
          <div className="split split--center">
            <div>
              <h2 id="services-cta-title">Start the transformation.</h2>
              <p style={{ color: "rgba(255,255,255,0.84)" }}>I partner with a limited number of organizations per quarter. Let&rsquo;s discuss your targets.</p>
            </div>
            <div className="actions">
              <ButtonLink href="/contact" variant="white">Submit Diagnostic Brief</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid--2">
            {services.slice(0, 2).map((service) => (<ServiceCard key={service.slug} service={service} />))}
          </div>
        </Container>
      </Section>
    </>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence, FMCG = Fast-Moving Consumer Goods, APAC = Asia-Pacific, GCC = Gulf Cooperation Council