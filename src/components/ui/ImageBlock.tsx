import Image from "next/image";

type ImageBlockProps = {
  src: string;
  alt: string;
  aspect?: "16:9" | "16:10" | "4:5" | "1:1" | "21:9";
  caption?: string;
  priority?: boolean;
};

const aspectClass: Record<NonNullable<ImageBlockProps["aspect"]>, string> = {
  "16:9": "image-block",
  "16:10": "image-block",
  "4:5": "image-block image-block--portrait",
  "1:1": "image-block image-block--portrait",
  "21:9": "image-block image-block--wide",
};

export function ImageBlock({ src, alt, aspect = "16:9", caption, priority }: ImageBlockProps) {
  return (
    <figure className={aspectClass[aspect]} style={{ position: "relative" }}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1100px) 1080px, 100vw" />
      {caption ? <figcaption className="image-block__caption" style={{ position: "static", marginTop: 12, fontSize: 13, color: "var(--color-ink-soft)" }}>{caption}</figcaption> : null}
    </figure>
  );
}