"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ChevronDown } from "lucide-react";
import {
  INITIAL_SOURCE_FORM_STATE,
  type SourceFormState,
} from "@/features/admin/sources/form-config";

type SourceTypeOption = {
  value: string;
  label: string;
};

type SourceFormValues = {
  title?: string;
  authors?: string;
  organization?: string;
  publisher?: string;
  year?: string;
  sourceType?: string;
  url?: string;
  pdfUrl?: string;
  citation?: string;
  notes?: string;
  isActive?: boolean;
};

type SourceFormProps = {
  mode: "create" | "edit";
  sourceId?: string;
  initialValues?: SourceFormValues;
  sourceTypeOptions: SourceTypeOption[];
  action: (
    prevState: SourceFormState,
    formData: FormData
  ) => Promise<SourceFormState>;
};

function SourceFormButtons({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();

  return (
    <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
      <div>
        <p className="text-sm font-semibold text-stone-900">
          {mode === "create" ? "Create source record" : "Update source record"}
        </p>
        <p className="text-xs leading-6 text-stone-500">
          {pending ? "Saving changes..." : "Reusable sources can be linked to multiple herbs."}
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending
          ? "Saving..."
          : mode === "create"
            ? "Create source"
            : "Save changes"}
      </button>
    </div>
  );
}

/**
 * Shared source form UI.
 */
export function SourceForm({
  mode,
  sourceId,
  initialValues = {},
  sourceTypeOptions,
  action,
}: SourceFormProps) {
  const [state, formAction] = useActionState(action, INITIAL_SOURCE_FORM_STATE);

  const fieldError = (name: string) => state.fieldErrors[name];

  return (
    <form action={formAction} className="space-y-8">
      {sourceId ? <input type="hidden" name="id" value={sourceId} /> : null}

      {state.message ? (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {state.message}
        </section>
      ) : null}

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Core Source Information
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            Identity and classification
          </h3>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            Define the source record clearly so it can be reused across multiple herb pages.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-stone-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              defaultValue={initialValues.title ?? ""}
              placeholder="Herbs at a Glance"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
            {fieldError("title") ? (
              <p className="mt-2 text-xs text-rose-600">{fieldError("title")}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="authors" className="mb-2 block text-sm font-medium text-stone-700">
              Authors
            </label>
            <input
              id="authors"
              name="authors"
              defaultValue={initialValues.authors ?? ""}
              placeholder="Optional"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="organization" className="mb-2 block text-sm font-medium text-stone-700">
              Organization
            </label>
            <input
              id="organization"
              name="organization"
              defaultValue={initialValues.organization ?? ""}
              placeholder="National Center for Complementary and Integrative Health"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="publisher" className="mb-2 block text-sm font-medium text-stone-700">
              Publisher
            </label>
            <input
              id="publisher"
              name="publisher"
              defaultValue={initialValues.publisher ?? ""}
              placeholder="NCCIH"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="year" className="mb-2 block text-sm font-medium text-stone-700">
              Year
            </label>
            <input
              id="year"
              name="year"
              type="number"
              defaultValue={initialValues.year ?? ""}
              placeholder="2023"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="sourceType" className="mb-2 block text-sm font-medium text-stone-700">
              Source type
            </label>
            <div className="relative">
              <select
                id="sourceType"
                name="sourceType"
                defaultValue={initialValues.sourceType ?? ""}
                className="w-full appearance-none rounded-2xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              >
                <option value="">Select a source type</option>
                {sourceTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            </div>
            {fieldError("sourceType") ? (
              <p className="mt-2 text-xs text-rose-600">{fieldError("sourceType")}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Reference Access
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            URLs and citation detail
          </h3>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="url" className="mb-2 block text-sm font-medium text-stone-700">
              Source URL
            </label>
            <input
              id="url"
              name="url"
              defaultValue={initialValues.url ?? ""}
              placeholder="https://..."
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="pdfUrl" className="mb-2 block text-sm font-medium text-stone-700">
              PDF URL
            </label>
            <input
              id="pdfUrl"
              name="pdfUrl"
              defaultValue={initialValues.pdfUrl ?? ""}
              placeholder="https://..."
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="citation" className="mb-2 block text-sm font-medium text-stone-700">
              Citation
            </label>
            <textarea
              id="citation"
              name="citation"
              defaultValue={initialValues.citation ?? ""}
              rows={4}
              placeholder="Full citation text"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
            {fieldError("citation") ? (
              <p className="mt-2 text-xs text-rose-600">{fieldError("citation")}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="notes" className="mb-2 block text-sm font-medium text-stone-700">
              Internal notes
            </label>
            <textarea
              id="notes"
              name="notes"
              defaultValue={initialValues.notes ?? ""}
              rows={4}
              placeholder="Why this source is useful, quality notes, or review context"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <label className="inline-flex items-center gap-3 text-sm font-medium text-stone-700">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={initialValues.isActive ?? true}
              className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-500"
            />
            Active source
          </label>
        </div>
      </section>

      <SourceFormButtons mode={mode} />
    </form>
  );
}