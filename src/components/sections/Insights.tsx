import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";
import { getAllInsights } from "@/lib/content";
import { insightCategoryLabels } from "@/lib/routes";

export function Insights() {
  const { insights: editorialInsights } = editorial;
  const realInsights = getAllInsights().slice(0, 6);

  return (
    <section className="editorial-section" id="insights" aria-labelledby="insights-title">
      <div className="wrap">
        <Reveal>
          <span className="kicker">{editorialInsights.kicker}</span>
          <h2 id="insights-title" className="section-title">
            {editorialInsights.title}
          </h2>
          <div className="posts-grid">
            {realInsights.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="post-card"
                aria-label={`Read insight: ${post.title}`}
              >
                <div className="post-card__image-wrap">
                  <Image
                    src={post.poster}
                    alt={post.posterAlt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="post-card__body">
                  <span className="post-card__meta">
                    {insightCategoryLabels[post.category]} &middot; {post.duration}
                  </span>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
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