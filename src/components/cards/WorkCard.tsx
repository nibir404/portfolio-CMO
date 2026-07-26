import Link from "next/link";
import Image from "next/image";
import type { WorkCaseStudy } from "@/types/content";
import { formatSector } from "@/lib/format";

export function WorkCard({ item, index }: { item: WorkCaseStudy; index?: number }) {
  return (
    <article className="card card--link" aria-labelledby={`work-${item.slug}-title`}>
      <Link href={`/work/${item.slug}`} className="card--link">
        <div className="card__image">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(min-width: 900px) 33vw, 100vw"
          />
        </div>
        <div className="card__body">
          <p className="card__meta">
            <span>Chapter {item.chapter}</span>
            <span>{formatSector(item.sector)}</span>
            <span>{item.timeframe}</span>
          </p>
          <h3 id={`work-${item.slug}-title`}>{item.title}</h3>
          <p>{item.summary}</p>
          <div className="card__footer">
            <span className="text-link">Read the case →</span>
          </div>
        </div>
      </Link>
      {typeof index === "number" ? <span className="sr-only">Case study {index + 1}.</span> : null}
    </article>
  );
}
