import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function Services() {
  const { services } = editorial;
  return (
    <section className="editorial-section" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <Reveal>
          <span className="kicker">{services.kicker}</span>
          <h2 id="services-title" className="section-title" style={{ marginBottom: "44px" }}>
            {services.title}
          </h2>
        </Reveal>

        <Reveal>
          <div className="svc-list">
            {services.items.map((svc) => (
              <article key={svc.num} className="svc-block">
                <div className="side">
                  <span className="num">{svc.num}</span>
                  <h3>{svc.title}</h3>
                  <p className="tagline">{svc.tagline}</p>
                </div>
                <div className="body">
                  <dl>
                    <dt>Who this is for</dt>
                    <dd>{svc.who}</dd>
                    <dt>What I do</dt>
                    <dd>{svc.what}</dd>
                    <dt>What you get</dt>
                    <dd>{svc.get}</dd>
                    <dt>Engagement</dt>
                    <dd>{svc.engagement}</dd>
                  </dl>
                  <Link className="btn btn--ghost" href="#contact">
                    {svc.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="svc-footnote">{services.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}

// WCAG AAA definitions: P&L = Profit and Loss, AI = Artificial Intelligence,
// APAC = Asia-Pacific, GCC = Gulf Cooperation Council, SDG = Sustainable Development Goals,
// CMO = Chief Marketing Officer