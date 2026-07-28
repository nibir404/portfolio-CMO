import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type Variant = "warm" | "surface" | "dark";

type PageHeroProps = {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  image?: { src: string; alt: string };
  imagePosition?: "right" | "below";
  variant?: Variant;
  id?: string;
};

export function PageHero({
  kicker,
  title,
  lead,
  meta,
  actions,
  image,
  imagePosition = "right",
  variant = "warm",
  id,
}: PageHeroProps) {
  const variantClass = `page-hero--${variant}`;
  const layoutModifier = imagePosition === "below" ? "page-hero__layout--below" : "";
  return (
    <section className={`page-hero ${variantClass}`} id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <Container>
        <div className={`page-hero__layout ${layoutModifier}`}>
          <div className="page-hero__copy">
            {kicker ? <span className="kicker">{kicker}</span> : null}
            <h1 id={id ? `${id}-title` : undefined}>{title}</h1>
            {lead ? <p className="lead">{lead}</p> : null}
            {actions ? <div className="actions" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>{actions}</div> : null}
            {meta ? <p className="meta" style={{ marginTop: 28, fontSize: 13, letterSpacing: ".04em", color: "var(--color-ink-soft)" }}>{meta}</p> : null}
          </div>
          {image ? (
            <figure className={`page-hero__media ${imagePosition === "below" ? "page-hero__media--below" : ""}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes={imagePosition === "below" ? "(min-width: 1200px) 1080px, 100vw" : "(min-width: 900px) 35vw, 100vw"}
              />
            </figure>
          ) : null}
        </div>
      </Container>
    </section>
  );
}