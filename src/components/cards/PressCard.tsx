import Link from "next/link";
import type { PressItem } from "@/types/content";
import { formatDate } from "@/lib/format";

export function PressCard({ item }: { item: PressItem }) {
  const inner = (
    <article className="card" aria-labelledby={`press-${item.title}`}>
      <div className="card__body">
        <p className="card__meta">
          <span>{item.outlet}</span>
          {item.date ? <span>{formatDate(item.date)}</span> : null}
        </p>
        <h3 id={`press-${item.title}`}>{item.title}</h3>
        <p>{item.summary}</p>
      </div>
    </article>
  );

  if (item.url && !item.url.startsWith("http")) {
    return (
      <Link className="card--link" href={item.url} aria-label={`Read: ${item.title}`}>
        {inner}
      </Link>
    );
  }
  if (item.url?.startsWith("http")) {
    return (
      <a
        className="card--link"
        href={item.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Read: ${item.title}`}
      >
        {inner}
      </a>
    );
  }
  return inner;
}
