import type { ReactNode } from "react";

export type HeadingBlockProps = {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  id?: string;
};

type HeadingBlockConfig = {
  /** Base BEM block, e.g. `section-heading`. */
  block: string;
  /** `section` renders the title and copy only; `eyebrow` also renders the kicker. */
  showEyebrow: boolean;
  /** Centred variants use a modifier class; the section variant uses an inline style. */
  centerWith: "modifier" | "style";
};

export function HeadingBlock({
  eyebrow,
  title,
  copy,
  align = "left",
  invert,
  id,
  block,
  showEyebrow,
  centerWith,
}: HeadingBlockProps & HeadingBlockConfig) {
  const centered = align === "center";
  const className = [block, centered && centerWith === "modifier" ? `${block}--center` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={className}
      style={centered && centerWith === "style" ? { textAlign: "center" } : undefined}
    >
      {showEyebrow && eyebrow ? (
        <span className="kicker" style={invert ? { color: "#d9a06b" } : undefined}>
          {eyebrow}
        </span>
      ) : null}
      <h2 id={id} style={invert ? { color: "#fff" } : undefined}>
        {title}
      </h2>
      {copy ? <p className={`${block}__copy`}>{copy}</p> : null}
    </header>
  );
}
