import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { getAllServices } from "@/lib/content";

export function ServicesOverview() {
  const services = getAllServices();
  return (
    <Section surface="surface" ariaLabelledBy="services-overview-title">
      <Container>
        <SectionHeading
          eyebrow="Work with the office"
          title="How I work with organisations."
          copy="Four engagement models. One decision framework. Scoped around the work the organisation actually needs."
          id="services-overview-title"
        />
        <div className="grid grid--2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
