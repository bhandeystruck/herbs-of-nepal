import Link from "next/link";

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

/**
 * Shared page intro/header for admin screens.
 */
export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          {eyebrow}
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
          {title}
        </h2>

        <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
          {description}
        </p>
      </div>

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="inline-flex rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}