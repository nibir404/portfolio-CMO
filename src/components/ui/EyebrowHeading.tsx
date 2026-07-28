import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  id?: string;
};

export function EyebrowHeading({ eyebrow, title, copy, align = "left", invert, id }: Props) {
  const cls = ["eyebrow-heading", align === "center" ? "eyebrow-heading--center" : ""].filter(Boolean).join(" ");
  const eyebrowStyle = invert ? { color: "#d9a06b" } : undefined;
  const titleStyle = invert ? { color: "#fff" } : undefined;
  return (
    <header className={cls}>
      {eyebrow ? <span className="kicker" style={eyebrowStyle}>{eyebrow}</span> : null}
      <h2 id={id} style={titleStyle}>{title}</h2>
      {copy ? <p className="eyebrow-heading__copy">{copy}</p> : null}
    </header>
  );
}