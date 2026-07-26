import type { SpeakingTopic } from "@/types/content";

export function SpeakingTopicCard({ topic }: { topic: SpeakingTopic }) {
  return (
    <article className="card card--service" aria-labelledby={`topic-${topic.slug}-title`}>
      <h3 id={`topic-${topic.slug}-title`}>{topic.title}</h3>
      <p>{topic.shortAbstract}</p>
      <p>
        <strong>Audiences:</strong> {topic.audiences.join(" · ")}
      </p>
      <p>
        <strong>Formats:</strong> {topic.formats.join(" · ")}
      </p>
      <ul>
        {topic.takeaways.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
