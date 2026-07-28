import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { editorial } from "@/content/editorial";

export function EditorialHero() {
  const { hero } = editorial;
  return (
    <header className="hero-block" id="top">
      <div className="wrap">
        <Reveal>
          <span className="kicker">{hero.kicker}</span>
          <h1 dangerouslySetInnerHTML={{ __html: hero.titleHtml }} />
          <p className="lead">{hero.lead}</p>
          <div className="cta-row">
            <Link className="btn btn--primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Link>
            <Link className="btn btn--ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Link>
          </div>
          <p className="role">{hero.role}</p>
        </Reveal>
      </div>
    </header>
  );
}