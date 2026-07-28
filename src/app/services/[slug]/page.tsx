import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { EyebrowHeading } from "@/components/ui/EyebrowHeading";
import { PageHero } from "@/components/ui/PageHero";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WorkCard } from "@/components/cards/WorkCard";
import { InsightCard } from "@/components/cards/InsightCard";
import { getServiceBySlug, getAllServices, getRelatedInsights, getRelatedWork } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

type Params = { slug: string };

const serviceBanners: Record<string, string> = {
  "ai-business-transformation": "/images/img1.jpg",
  "brand-transformation": "/images/ab4.jpg",
  "growth-scaling": "/images/img2.jpg",
  "international-expansion": "/images/ab5.jpg",
};

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return buildPageMetadata({ title: service.seo.title, description: service.seo.description, path: service.seo.path });
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();
  const relatedWork = getRelatedWork(service.relatedWorkSlugs).slice(0, 3);
  const relatedInsights = getRelatedInsights(service.relatedInsightSlugs).slice(0, 3);
  const banner = serviceBanners[service.slug] ?? "/images/hero.webp";

  return (
    <>
      <JsonLd data={[serviceSchema(service), faqSchema(service.faqs), breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.name, href: service.seo.path }])]} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.name, href: service.seo.path }]} />
      <PageHero
        id="service"
        kicker={service.keywords.primary}
        title={<>{service.name}.</>}
        lead={service.intro}
        meta={`Typical engagements — ${service.engagementModels.join(" · ")}`}
        image={{ src: banner, alt: `${service.name} banner.` }}
        imagePosition="below"
      />

      <Section surface="surface" ariaLabelledBy="for-title">
        <Container>
          <EyebrowHeading eyebrow="Who this is for" title="When the engagement fits." id="for-title" />
          <div className="grid grid--3">
            {service.audience.map((line, index) => (
              <article key={line} className="card card--service">
                <span className="card__meta">Profile {String(index + 1).padStart(2, "0")}</span>
                <h3>{line}</h3>
                <p>{service.problems[index] ?? service.problems[0]}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <ImageBlock src={banner} alt={`${service.name} visual.`} aspect="21:9" caption={`The ${service.name.toLowerCase()} engagement — what gets shipped.`} />

      <Section ariaLabelledBy="included-title">
        <Container>
          <EyebrowHeading eyebrow="What's included" title="Concrete deliverables, not adjectives." id="included-title" />
          <div className="grid grid--2">
            {service.deliverables.map((deliverable, index) => (
              <article key={deliverable} className="card card--service">
                <span className="card__meta">Deliverable {String(index + 1).padStart(2, "0")}</span>
                <h3>{deliverable}</h3>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="surface" ariaLabelledBy="runs-title">
        <Container>
          <EyebrowHeading eyebrow="How it runs" title="A clear operating rhythm." id="runs-title" />
          <div className="step-grid">
            {service.process.map((step, index) => (
              <article className="step" key={step}>
                <span className="step__number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section ariaLabelledBy="outcomes-title">
        <Container>
          <EyebrowHeading eyebrow="Outcomes" title="What the organisation can expect." id="outcomes-title" />
          <div className="grid grid--3">
            {service.outcomes.map((outcome, index) => (
              <article key={outcome} className="card card--service">
                <span className="card__meta">Outcome {String(index + 1).padStart(2, "0")}</span>
                <h3>{outcome}</h3>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {relatedWork.length ? (
        <Section surface="surface" ariaLabelledBy="proof-title">
          <Container>
            <EyebrowHeading eyebrow="Proof" title="The work behind the model." id="proof-title" />
            <div className="grid grid--3">
              {relatedWork.map((item, index) => (<WorkCard item={item} key={item.slug} index={index} />))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section ariaLabelledBy="faq-title">
        <Container>
          <EyebrowHeading eyebrow="FAQ" title="Answers to common questions." id="faq-title" />
          <Accordion items={service.faqs} />
        </Container>
      </Section>

      {relatedInsights.length ? (
        <Section surface="surface" ariaLabelledBy="insights-title">
          <Container>
            <EyebrowHeading eyebrow="Related insights" title="Field notes on the work." id="insights-title" />
            <div className="grid grid--3">
              {relatedInsights.map((insight) => (<InsightCard insight={insight} key={insight.slug} />))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section surface="accent" ariaLabelledBy="service-cta-title">
        <Container>
          <div className="split split--center">
            <div>
              <h2 id="service-cta-title">Discuss a {service.name.toLowerCase()}.</h2>
              <p style={{ color: "rgba(255,255,255,0.84)" }}>Tell the office what you are working on. A response arrives within two business days.</p>
            </div>
            <div className="actions">
              <ButtonLink href="/contact" variant="white">Discuss a mandate</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}