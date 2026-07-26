import Link from "next/link";
import Image from "next/image";
import type { Insight } from "@/types/content";
import { insightCategoryLabels } from "@/lib/routes";

export function InsightCard({ insight, priority }: { insight: Insight; priority?: boolean }) {
  return (
    <article className="card card--link" aria-labelledby={`insight-${insight.slug}-title`}>
      <Link className="card--link" href={`/insights/${insight.slug}`}>
        <div className="card__image">
          <Image
            src={insight.poster}
            alt={insight.posterAlt}
            fill
            sizes="(min-width: 900px) 33vw, 100vw"
          />
        </div>
        <div className="card__body">
          <p className="card__meta">
            <span>{insightCategoryLabels[insight.category]}</span>
            <span>{insight.format}</span>
            <span>{insight.duration}</span>
          </p>
          <h3 id={`insight-${insight.slug}-title`}>{insight.title}</h3>
          <p>{insight.description}</p>
          <div className="card__footer">
            <span className="text-link">Read insight →</span>
          </div>
        </div>
      </Link>
      {priority ? <span className="sr-only">Featured insight.</span> : null}
    </article>
  );
}
