import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  invert,
  id,
}: SectionHeadingProps) {
  const style = align === "center" ? { textAlign: "center" as const } : undefined;
  const headingStyle = invert ? { color: "#fff" } : undefined;
  return (
    <header className="section-heading" style={style}>
      <h2 id={id} style={headingStyle}>
        {title}
      </h2>
      {copy ? <p className="section-heading__copy">{copy}</p> : null}
    </header>
  );
}
