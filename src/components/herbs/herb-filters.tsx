"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

type HerbFiltersProps = {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

/**
 * Client-side herb filter bar.
 * Writes filter state into the URL query string.
 */
export function HerbFilters({ categories }: HerbFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentFeatured = searchParams.get("featured") ?? "";
  const currentSort = searchParams.get("sort") ?? "featured";

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      currentQuery ||
        currentCategory ||
        currentFeatured ||
        (currentSort && currentSort !== "featured")
    );
  }, [currentCategory, currentFeatured, currentQuery, currentSort]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    router.push(pathname);
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
        <div>
          <label
            htmlFor="herb-search"
            className="mb-2 block text-sm font-medium text-stone-700"
          >
            Search herbs
          </label>
          <input
            id="herb-search"
            type="text"
            defaultValue={currentQuery}
            placeholder="Search by herb name, Nepali name, or scientific name"
            onChange={(event) => updateParam("q", event.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500"
          />
        </div>

      <div>
        <label
          htmlFor="herb-category"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Category
        </label>

        <div className="relative">
          <select
            id="herb-category"
            value={currentCategory}
            onChange={(event) => updateParam("category", event.target.value)}
            className="w-full appearance-none rounded-xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
        </div>
      </div>

      <div>
        <label
          htmlFor="featured-only"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Featured
        </label>

        <div className="relative">
          <select
            id="featured-only"
            value={currentFeatured}
            onChange={(event) => updateParam("featured", event.target.value)}
            className="w-full appearance-none rounded-xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
          >
            <option value="">All herbs</option>
            <option value="true">Featured only</option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
        </div>
      </div>

      <div>
        <label
          htmlFor="sort-by"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Sort by
        </label>

        <div className="relative">
          <select
            id="sort-by"
            value={currentSort}
            onChange={(event) => updateParam("sort", event.target.value)}
            className="w-full appearance-none rounded-xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
          >
            <option value="featured">Featured first</option>
            <option value="newest">Newest first</option>
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
        </div>
      </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}