import Link from "next/link";
import type { HerbSort } from "@/features/herbs/types";

type ActiveFiltersProps = {
  query?: string;
  categoryName?: string;
  featured?: boolean;
  sort?: HerbSort;
  total: number;
};

function getSortLabel(sort: HerbSort | undefined) {
  switch (sort) {
    case "newest":
      return "Newest first";
    case "name-asc":
      return "Name A–Z";
    case "name-desc":
      return "Name Z–A";
    case "featured":
    default:
      return "Featured first";
  }
}

/**
 * Shows the current filter summary and result count for the herb directory.
 */
export function ActiveFilters({
  query,
  categoryName,
  featured,
  sort,
  total,
}: ActiveFiltersProps) {
  const hasFilters = Boolean(
    query || categoryName || featured || (sort && sort !== "featured")
  );

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-stone-900">
          {total} {total === 1 ? "herb" : "herbs"} found
        </p>

        {hasFilters ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {query ? (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700">
                Search: {query}
              </span>
            ) : null}

            {categoryName ? (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700">
                Category: {categoryName}
              </span>
            ) : null}

            {featured ? (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700">
                Featured only
              </span>
            ) : null}

            {sort && sort !== "featured" ? (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700">
                Sort: {getSortLabel(sort)}
              </span>
            ) : null}
          </div>
        ) : (
          <p className="mt-2 text-sm text-stone-600">
            Showing all published herbs in the library.
          </p>
        )}
      </div>

      {hasFilters ? (
        <Link
          href="/herbs"
          className="inline-flex rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
        >
          Clear all filters
        </Link>
      ) : null}
    </div>
  );
}