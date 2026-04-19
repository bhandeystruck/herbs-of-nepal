"use client";

import { useActionState } from "react";
import { ChevronDown } from "lucide-react";
import {
  linkSourceToHerbAction,
  unlinkSourceFromHerbAction,
} from "@/features/admin/herb-sources/actions";
import { INITIAL_HERB_SOURCE_LINK_STATE } from "@/features/admin/herb-sources/form-config";
import { getHerbSourceSectionLabel, getSourceTypeLabel } from "@/lib/utils/trust";

type SourceOption = {
  id: string;
  title: string;
  sourceType: string;
  organization: string | null;
};

type LinkedSource = {
  id: string;
  section: string;
  displayOrder: number;
  note: string | null;
  source: {
    id: string;
    title: string;
    sourceType: string;
    organization: string | null;
    url: string | null;
    pdfUrl: string | null;
  };
};

type HerbSourceLinkManagerProps = {
  herbId: string;
  sourceOptions: SourceOption[];
  linkedSources: LinkedSource[];
};

const SECTION_OPTIONS = [
  { value: "GENERAL", label: "General" },
  { value: "OVERVIEW", label: "Overview" },
  { value: "TRADITIONAL_USE", label: "Traditional Use" },
  { value: "SCIENCE", label: "What the Science Says" },
  { value: "SAFETY", label: "Safety" },
  { value: "PREPARATION", label: "Preparation" },
  { value: "INTERACTIONS", label: "Interactions" },
] as const;

/**
 * Admin UI for linking reusable source records to a herb.
 */
export function HerbSourceLinkManager({
  herbId,
  sourceOptions,
  linkedSources,
}: HerbSourceLinkManagerProps) {
  const [state, formAction] = useActionState(
    linkSourceToHerbAction,
    INITIAL_HERB_SOURCE_LINK_STATE
  );

  return (
    <section className="space-y-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Sources
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-900">
          Link sources to this herb
        </h3>
        <p className="mt-2 text-sm leading-7 text-stone-600">
          Attach reusable source records to the exact herb sections they support.
        </p>
      </div>

      <form action={formAction} className="grid gap-5 rounded-2xl border border-stone-200 bg-stone-50 p-5 md:grid-cols-2">
        <input type="hidden" name="herbId" value={herbId} />

        <div className="md:col-span-2">
          <label htmlFor="sourceId" className="mb-2 block text-sm font-medium text-stone-700">
            Source
          </label>
          <div className="relative">
            <select
              id="sourceId"
              name="sourceId"
              defaultValue=""
              className="w-full appearance-none rounded-2xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            >
              <option value="">Select a source</option>
              {sourceOptions.map((source) => (
                <option key={source.id} value={source.id}>
                  {source.title}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
          </div>
        </div>

        <div>
          <label htmlFor="section" className="mb-2 block text-sm font-medium text-stone-700">
            Herb section
          </label>
          <div className="relative">
            <select
              id="section"
              name="section"
              defaultValue="GENERAL"
              className="w-full appearance-none rounded-2xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            >
              {SECTION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
          </div>
        </div>

        <div>
          <label htmlFor="displayOrder" className="mb-2 block text-sm font-medium text-stone-700">
            Display order
          </label>
          <input
            id="displayOrder"
            name="displayOrder"
            type="number"
            defaultValue="0"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="note" className="mb-2 block text-sm font-medium text-stone-700">
            Internal note
          </label>
          <textarea
            id="note"
            name="note"
            rows={3}
            placeholder="Why this source is linked to this section"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
          />
        </div>

        {(state.error || state.message) ? (
          <div className="md:col-span-2">
            {state.error ? (
              <p className="text-sm text-rose-600">{state.error}</p>
            ) : (
              <p className="text-sm text-emerald-700">{state.message}</p>
            )}
          </div>
        ) : null}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Link source
          </button>
        </div>
      </form>

      <div>
        <h4 className="text-base font-semibold text-stone-900">
          Linked sources
        </h4>

        {linkedSources.length === 0 ? (
          <p className="mt-3 text-sm leading-7 text-stone-600">
            No sources are linked to this herb yet.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {linkedSources.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-stone-200 bg-white p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                        {getHerbSourceSectionLabel(item.section as never)}
                      </span>
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                        {getSourceTypeLabel(item.source.sourceType as never)}
                      </span>
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                        Order: {item.displayOrder}
                      </span>
                    </div>

                    <h5 className="mt-3 text-base font-semibold text-stone-900">
                      {item.source.title}
                    </h5>

                    {item.source.organization ? (
                      <p className="mt-1 text-sm text-stone-600">
                        {item.source.organization}
                      </p>
                    ) : null}

                    {item.note ? (
                      <p className="mt-3 text-sm leading-7 text-stone-700">
                        {item.note}
                      </p>
                    ) : null}

                    <div className="mt-3 flex flex-wrap gap-4">
                      {item.source.url ? (
                        <a
                          href={item.source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                        >
                          View source →
                        </a>
                      ) : null}

                      {item.source.pdfUrl ? (
                        <a
                          href={item.source.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-stone-700 transition hover:text-emerald-700"
                        >
                          Open PDF →
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <form action={unlinkSourceFromHerbAction}>
                    <input type="hidden" name="herbSourceId" value={item.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}