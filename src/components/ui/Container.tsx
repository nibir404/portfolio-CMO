import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav" | "article";
};

export function Container({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return <Tag className={`container ${className}`.trim()}>{children}</Tag>;
}
