"use client";

import { ChevronDown, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type SelectOption = {
  value: string;
  label: string;
};

type AdminListFiltersProps = {
  searchPlaceholder?: string;
  categoryOptions?: SelectOption[];
  statusOptions?: SelectOption[];
  featuredOptions?: SelectOption[];
  evidenceOptions?: SelectOption[];
  extraOptions?: SelectOption[];
  extraLabel?: string;
  extraParamKey?: string;
};

/**
 * Reusable admin list filter toolbar.
 * Updates URL search params so server-rendered list pages can filter results.
 */
export function AdminListFilters({
  searchPlaceholder = "Search...",
  categoryOptions = [],
  statusOptions = [],
  featuredOptions = [],
  extraOptions = [],
  extraLabel = "Extra",
  extraParamKey = "extra",
}: AdminListFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchDraft, setSearchDraft] = useState(searchParams.get("q") ?? "");

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const next = params.toString();
    router.push(next ? `${pathname}?${next}` : pathname);
  };

  const runSearch = () => {
    updateParam("q", searchDraft);
  };

  const currentCategory = searchParams.get("categoryId") ?? "";
  const currentStatus = searchParams.get("status") ?? "all";
  const currentFeatured = searchParams.get("featured") ?? "all";
  const currentExtra = searchParams.get(extraParamKey) ?? "all";

  const resetFilters = () => {
    setSearchDraft("");
    router.push(pathname);
  };

  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <label
            htmlFor="admin-search"
            className="mb-2 block text-sm font-medium text-stone-700"
          >
            Search
          </label>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                id="admin-search"
                value={searchDraft}
                placeholder={searchPlaceholder}
                onChange={(event) => setSearchDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    runSearch();
                  }
                }}
                className="w-full rounded-2xl border border-stone-300 bg-white py-3 pl-11 pr-4 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              />
            </div>

            <button
              type="button"
              onClick={runSearch}
              className="rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Search
            </button>
          </div>
        </div>

        {categoryOptions.length > 0 ? (
          <div>
            <label
              htmlFor="admin-category"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="admin-category"
                value={currentCategory}
                onChange={(event) => updateParam("categoryId", event.target.value)}
                className="w-full appearance-none rounded-2xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              >
                <option value="">All categories</option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            </div>
          </div>
        ) : null}

        {statusOptions.length > 0 ? (
          <div>
            <label
              htmlFor="admin-status"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="admin-status"
                value={currentStatus}
                onChange={(event) => updateParam("status", event.target.value)}
                className="w-full appearance-none rounded-2xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            </div>
          </div>
        ) : null}

        {featuredOptions.length > 0 ? (
          <div>
            <label
              htmlFor="admin-featured"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Featured
            </label>
            <div className="relative">
              <select
                id="admin-featured"
                value={currentFeatured}
                onChange={(event) => updateParam("featured", event.target.value)}
                className="w-full appearance-none rounded-2xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              >
                {featuredOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            </div>
          </div>
        ) : null}

        {extraOptions.length > 0 ? (
          <div>
            <label
              htmlFor="admin-extra"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              {extraLabel}
            </label>
            <div className="relative">
              <select
                id="admin-extra"
                value={currentExtra}
                onChange={(event) => updateParam(extraParamKey, event.target.value)}
                className="w-full appearance-none rounded-2xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              >
                {extraOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={resetFilters}
          className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
        >
          Reset filters
        </button>
      </div>
    </section>
  );
}