import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function Insights() {
  const { insights } = editorial;
  return (
    <section className="editorial-section" id="insights" aria-labelledby="insights-title">
      <div className="wrap">
        <Reveal>
          <span className="kicker">{insights.kicker}</span>
          <h2 id="insights-title" className="section-title">
            {insights.title}
          </h2>
          <div className="posts-grid">
            {insights.posts.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="post-card"
              >
                <span className="tag">{post.tag}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// WCAG AAA definitions: CMO = Chief Marketing Officer, AI = Artificial Intelligence,
// APAC = Asia-Pacific, GCC = Gulf Cooperation Council