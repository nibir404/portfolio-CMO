type DraftClaimNoticeProps = {
  message?: string;
};

export function DraftClaimNotice({
  message = "Draft profile content. Selected titles, dates, affiliations, and performance claims require final factual verification before publication.",
}: DraftClaimNoticeProps) {
  return (
    <aside className="claim-notice" aria-label="Draft claim notice">
      <span>{message}</span>
    </aside>
  );
}
