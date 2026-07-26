export type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedAt?: string;
  updatedAt?: string;
  noIndex?: boolean;
};

export type BreadcrumbItem = {
  name: string;
  href: string;
};
