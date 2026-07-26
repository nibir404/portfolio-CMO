type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // The data is built from a single helper and is always serializable.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
