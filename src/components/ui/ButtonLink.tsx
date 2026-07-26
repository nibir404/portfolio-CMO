import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  trailingArrow?: boolean;
  "aria-label"?: string;
};

type AsLinkProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
};

type AsButtonProps = CommonProps & {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const variantClass: Record<Variant, string> = {
  primary: "btn btn--primary",
  secondary: "btn btn--secondary",
  ghost: "btn btn--ghost",
  white: "btn btn--white",
};

export function ButtonLink(props: AsLinkProps | AsButtonProps) {
  const { children, className = "", variant = "primary", trailingArrow = true, ...rest } = props;
  const baseClass = `${variantClass[variant]} ${className}`.trim();
  const showTrailingArrow =
    trailingArrow && variant !== "primary" && variant !== "white";
  const content = (
    <>
      <span>{children}</span>
      {showTrailingArrow ? <span aria-hidden="true">→</span> : null}
    </>
  );

  if ("href" in rest && rest.href) {
    const isExternal = props.external ?? /^https?:/.test(rest.href);
    if (isExternal) {
      return (
        <a
          className={baseClass}
          href={rest.href}
          target="_blank"
          rel="noreferrer"
          aria-label={props["aria-label"]}
        >
          {content}
        </a>
      );
    }
    return (
      <Link className={baseClass} href={rest.href} aria-label={props["aria-label"]}>
        {content}
      </Link>
    );
  }

  const { onClick, type = "button" } = rest as AsButtonProps;
  return (
    <button className={baseClass} type={type} onClick={onClick} aria-label={props["aria-label"]}>
      {content}
    </button>
  );
}
