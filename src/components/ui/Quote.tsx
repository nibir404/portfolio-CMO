import type { ReactNode } from "react";

export function Quote({ children }: { children: ReactNode }) {
  return <blockquote>{children}</blockquote>;
}
