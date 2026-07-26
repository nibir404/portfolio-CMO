import Link from "next/link";
import type { Service } from "@/types/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card card--service">
      <p className="card__meta">
        <span>{service.engagementModels[0] ?? "Engagement"}</span>
      </p>
      <h3>
        <Link className="card--link" href={`/services/${service.slug}`}>
          {service.name}
        </Link>
      </h3>
      <p>{service.shortDescription}</p>
      <ul>
        {service.deliverables.slice(0, 3).map((deliverable) => (
          <li key={deliverable}>{deliverable}</li>
        ))}
      </ul>
      <p className="card__footer">
        <Link className="text-link" href={`/services/${service.slug}`}>
          Learn more →
        </Link>
      </p>
    </article>
  );
}
