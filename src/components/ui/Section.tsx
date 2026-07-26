import type { ReactNode, CSSProperties } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  surface?: "default" | "surface" | "accent" | "dark";
  compact?: boolean;
  id?: string;
  ariaLabelledBy?: string;
  style?: CSSProperties;
};

const surfaceClass: Record<NonNullable<SectionProps["surface"]>, string> = {
  default: "",
  surface: "section--surface",
  accent: "section--accent",
  dark: "section--dark",
};

export function Section({
  children,
  className = "",
  surface = "default",
  compact,
  id,
  ariaLabelledBy,
  style,
}: SectionProps) {
  const classes = [
    "section",
    compact ? "section--compact" : "",
    surfaceClass[surface],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <section className={classes} id={id} aria-labelledby={ariaLabelledBy} style={style}>
      {children}
    </section>
  );
}
