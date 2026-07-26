import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InsightCard } from "@/components/cards/InsightCard";
import { getFeaturedInsights } from "@/lib/content";

export function FeaturedInsights() {
  const insights = getFeaturedInsights().slice(0, 3);
  return (
    <Section ariaLabelledBy="featured-insights-title">
      <Container>
        <SectionHeading
          eyebrow="Latest insights"
          title="Field notes from the operator's desk."
          copy="Frameworks, reversals, and the principle that earned its keep."
          id="featured-insights-title"
        />
        <div className="grid grid--3">
          {insights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} priority={insight.featured} />
          ))}
        </div>
        <p className="mt-6">
          <Link className="text-link" href="/insights">
            Read all insights →
          </Link>
        </p>
      </Container>
    </Section>
  );
}
