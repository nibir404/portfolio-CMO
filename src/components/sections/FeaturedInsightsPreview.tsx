import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { insights } from "@/content/insights";

export function FeaturedInsightsPreview() {
  const items = insights.filter((item) => item.featured).slice(0, 2);
  const fallback = items.length === 2 ? items : insights.slice(0, 2);

  return (
    <section className="exec-section" id="insights" aria-labelledby="insights-title">
      <Container>
        <div className="exec-head">
          <span className="eyebrow">Insights</span>
          <h2 id="insights-title">The work, written down.</h2>
        </div>
        <div className="insights-preview">
          {fallback.map((item) => (
            <Link key={item.slug} href={`/insights/${item.slug}`} className="insight-card">
              <span className="insight-card__category">
                {item.category.replace(/-/g, " ")}
              </span>
              <h3 className="insight-card__title">{item.title}</h3>
              <p className="insight-card__excerpt">{item.description}</p>
              <span className="insight-card__meta">
                <span>{item.format}</span>
                <span>{item.duration}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/insights" className="meet-link">
            Read all insights →
          </Link>
        </div>
      </Container>
    </section>
  );
}