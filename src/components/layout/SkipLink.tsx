type SkipLinkProps = {
  href: string;
  label?: string;
};

export function SkipLink({ href, label = "Skip to main content" }: SkipLinkProps) {
  return (
    <a className="skip-link" href={href}>
      {label}
    </a>
  );
}
