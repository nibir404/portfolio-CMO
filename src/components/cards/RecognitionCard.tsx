import type { RecognitionItem } from "@/types/content";

export function RecognitionCard({ item }: { item: RecognitionItem }) {
  return (
    <article className="card" aria-labelledby={`award-${item.title}`}>
      <div className="card__body">
        <p className="card__meta">
          <span>{item.year}</span>
          {item.verificationStatus !== "verified" ? <span>Draft · pending verification</span> : null}
        </p>
        <h3 id={`award-${item.title}`}>{item.title}</h3>
        <p>{item.issuer}</p>
        {item.context ? <p>{item.context}</p> : null}
      </div>
    </article>
  );
}
