import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

/**
 * Reusable empty state component for sections with no content yet.
 */
export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
      <h2 className="text-lg font-semibold text-stone-900">{title}</h2>

      <p className="mt-2 text-sm leading-7 text-stone-600">
        {description}
      </p>

      {actionLabel && actionHref ? (
        <div className="mt-5">
          <Link
            href={actionHref}
            className="inline-flex rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            {actionLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}