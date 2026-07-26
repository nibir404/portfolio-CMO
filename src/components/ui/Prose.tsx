import type { ReactNode } from "react";

type ProseProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
};

export function Prose({ children, className = "", as: Tag = "div" }: ProseProps) {
  return <Tag className={`prose ${className}`.trim()}>{children}</Tag>;
}
