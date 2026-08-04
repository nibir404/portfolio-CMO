import { routes } from "@/lib/routes";
import type { BreadcrumbItem } from "@/types/seo";

const home: BreadcrumbItem = { name: "Home", href: routes.home };

/** Builds a breadcrumb trail rooted at Home. */
export function trail(...items: BreadcrumbItem[]): BreadcrumbItem[] {
  return [home, ...items];
}
