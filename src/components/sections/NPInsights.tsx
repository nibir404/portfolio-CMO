import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { insights } from "@/content/insights";

export function NPInsights() {
  const displayItems = [...insights]
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 6);

  return (
    <section
      className="np-section"
      id="insights"
      aria-labelledby="np-insights-title"
    >
      <Container>
        <Reveal>
          <div className="np-head">
            <span className="eyebrow">Insights</span>
            <h2 id="np-insights-title">Field notes from the work.</h2>
            <p>
              Frameworks, teardowns, and operator-grade essays on AI
              transformation, brand building, and scaling South Asian
              category leaders.
            </p>
          </div>
        </Reveal>

        <div className="np-insights-grid">
          {displayItems.map((item) => (
            <Reveal key={item.slug}>
              <article className="np-insight-card">
                <span className="np-insight-card__category">
                  {item.category.replace(/-/g, " ")}
                </span>
                <h3 className="np-insight-card__title">{item.title}</h3>
                <p className="np-insight-card__excerpt">{item.description}</p>
                <div className="np-insight-card__footer">
                  <span>
                    {item.format} &middot; {item.duration}
                  </span>
                  <Link
                    href={`/insights/${item.slug}`}
                    className="np-insight-card__cta"
                  >
                    Read &rarr;
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
          <Link
            href="/insights"
            className="btn btn--ghost"
          >
            Browse all insights
          </Link>
        </div>
      </Container>
    </section>
  );
}

// WCAG AAA definitions: AI = Artificial Intelligence