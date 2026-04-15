import { getEvidenceLevelLabel } from "@/lib/utils/trust";

type HerbTrustPanelProps = {
  evidenceLevel: string | null;
  lastReviewedAt: Date | null;
  reviewedByName: string | null;
  reviewedByRole: string | null;
  editorialSummary: string | null;
  sourceCount: number;
};

/**
 * Trust summary panel shown near the top of the herb detail page.
 */
export function HerbTrustPanel({
  evidenceLevel,
  lastReviewedAt,
  reviewedByName,
  reviewedByRole,
  editorialSummary,
  sourceCount,
}: HerbTrustPanelProps) {
  const formattedDate = lastReviewedAt
    ? new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(lastReviewedAt)
    : null;

  return (
    <section className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8">
      <div className="flex flex-wrap gap-3">
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800">
          {getEvidenceLevelLabel(evidenceLevel as never)}
        </span>

        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-700">
          {sourceCount} {sourceCount === 1 ? "source" : "sources"} cited
        </span>

        {formattedDate ? (
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-700">
            Last reviewed: {formattedDate}
          </span>
        ) : null}
      </div>

      {(reviewedByName || reviewedByRole) ? (
        <p className="mt-4 text-sm font-medium text-stone-800">
          Reviewed by {reviewedByName ?? "Editorial reviewer"}
          {reviewedByRole ? ` • ${reviewedByRole}` : ""}
        </p>
      ) : null}

      {editorialSummary ? (
        <p className="mt-4 text-sm leading-7 text-stone-700">
          {editorialSummary}
        </p>
      ) : null}
    </section>
  );
}