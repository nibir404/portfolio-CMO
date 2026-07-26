import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { BreadcrumbItem } from "@/types/seo";

type PageShellProps = {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
};

export function PageShell({ children, breadcrumbs }: PageShellProps) {
  return (
    <>
      {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      {children}
    </>
  );
}
