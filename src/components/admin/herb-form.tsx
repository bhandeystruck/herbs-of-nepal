"use client";

import { ChevronDown } from "lucide-react";

type CategoryOption = {
  id: string;
  name: string;
};

type EvidenceOption = {
  value: string;
  label: string;
};

type HerbFormValues = {
  name?: string;
  nepaliName?: string;
  scientificName?: string;
  slug?: string;
  categoryId?: string;
  featured?: boolean;
  isPublished?: boolean;

  shortDescription?: string;
  description?: string;
  benefits?: string;
  uses?: string;
  precautions?: string;
  sideEffects?: string;
  dosageNotes?: string;
  region?: string;

  evidenceLevel?: string;
  editorialSummary?: string;
  reviewedByName?: string;
  reviewedByRole?: string;
  lastReviewedAt?: string;

  imagePath?: string;
  imageAlt?: string;
  imageSourceName?: string;
  imageSourceUrl?: string;
  imageLicense?: string;
  imagePhotographer?: string;
  imageVerifiedAt?: string;

  seoTitle?: string;
  seoDescription?: string;
};

type HerbFormProps = {
  mode: "create" | "edit";
  initialValues?: HerbFormValues;
  categories: CategoryOption[];
  evidenceOptions: EvidenceOption[];
};

/**
 * Shared herb form UI.
 * This step builds real edit/create structure with proper select fields.
 * Submission logic comes next.
 */
export function HerbForm({
  mode,
  initialValues = {},
  categories,
  evidenceOptions,
}: HerbFormProps) {
  return (
    <form className="space-y-8">
      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Basic Information
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            Identity and status
          </h3>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            Define the core identity of the herb and how it should appear in the system.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-stone-700">
              Herb name
            </label>
            <input
              id="name"
              name="name"
              defaultValue={initialValues.name ?? ""}
              placeholder="Tulsi"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="nepaliName" className="mb-2 block text-sm font-medium text-stone-700">
              Nepali name
            </label>
            <input
              id="nepaliName"
              name="nepaliName"
              defaultValue={initialValues.nepaliName ?? ""}
              placeholder="तुलसी"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="scientificName" className="mb-2 block text-sm font-medium text-stone-700">
              Scientific name
            </label>
            <input
              id="scientificName"
              name="scientificName"
              defaultValue={initialValues.scientificName ?? ""}
              placeholder="Ocimum tenuiflorum"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="slug" className="mb-2 block text-sm font-medium text-stone-700">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              defaultValue={initialValues.slug ?? ""}
              placeholder="tulsi"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="categoryId" className="mb-2 block text-sm font-medium text-stone-700">
              Category
            </label>
            <div className="relative">
              <select
                id="categoryId"
                name="categoryId"
                defaultValue={initialValues.categoryId ?? ""}
                className="w-full appearance-none rounded-2xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            </div>
          </div>

          <div>
            <label htmlFor="region" className="mb-2 block text-sm font-medium text-stone-700">
              Region
            </label>
            <input
              id="region"
              name="region"
              defaultValue={initialValues.region ?? ""}
              placeholder="Across Nepal"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-6">
          <label className="inline-flex items-center gap-3 text-sm font-medium text-stone-700">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initialValues.featured ?? false}
              className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-500"
            />
            Featured herb
          </label>

          <label className="inline-flex items-center gap-3 text-sm font-medium text-stone-700">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={initialValues.isPublished ?? false}
              className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-500"
            />
            Published
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Content
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            Herb description and guidance
          </h3>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            These fields shape the public-facing herb profile.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="shortDescription" className="mb-2 block text-sm font-medium text-stone-700">
              Short description
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              defaultValue={initialValues.shortDescription ?? ""}
              rows={3}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-stone-700">
              Full description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={initialValues.description ?? ""}
              rows={6}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="benefits" className="mb-2 block text-sm font-medium text-stone-700">
                Benefits
              </label>
              <textarea
                id="benefits"
                name="benefits"
                defaultValue={initialValues.benefits ?? ""}
                rows={6}
                placeholder="One item per line"
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="uses" className="mb-2 block text-sm font-medium text-stone-700">
                Uses
              </label>
              <textarea
                id="uses"
                name="uses"
                defaultValue={initialValues.uses ?? ""}
                rows={6}
                placeholder="One item per line"
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="precautions" className="mb-2 block text-sm font-medium text-stone-700">
              Precautions
            </label>
            <textarea
              id="precautions"
              name="precautions"
              defaultValue={initialValues.precautions ?? ""}
              rows={5}
              placeholder="One item per line"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="sideEffects" className="mb-2 block text-sm font-medium text-stone-700">
                Side effects
              </label>
              <textarea
                id="sideEffects"
                name="sideEffects"
                defaultValue={initialValues.sideEffects ?? ""}
                rows={4}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="dosageNotes" className="mb-2 block text-sm font-medium text-stone-700">
                Dosage notes
              </label>
              <textarea
                id="dosageNotes"
                name="dosageNotes"
                defaultValue={initialValues.dosageNotes ?? ""}
                rows={4}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Trust and Review
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            Evidence and editorial review
          </h3>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            This section supports the trust architecture shown on the public herb pages.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="evidenceLevel" className="mb-2 block text-sm font-medium text-stone-700">
              Evidence level
            </label>
            <div className="relative">
              <select
                id="evidenceLevel"
                name="evidenceLevel"
                defaultValue={initialValues.evidenceLevel ?? ""}
                className="w-full appearance-none rounded-2xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              >
                <option value="">Select evidence level</option>
                {evidenceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            </div>
          </div>

          <div>
            <label htmlFor="lastReviewedAt" className="mb-2 block text-sm font-medium text-stone-700">
              Last reviewed date
            </label>
            <input
              id="lastReviewedAt"
              name="lastReviewedAt"
              type="date"
              defaultValue={initialValues.lastReviewedAt ?? ""}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="reviewedByName" className="mb-2 block text-sm font-medium text-stone-700">
              Reviewed by name
            </label>
            <input
              id="reviewedByName"
              name="reviewedByName"
              defaultValue={initialValues.reviewedByName ?? ""}
              placeholder="Herbs of Nepal Editorial Team"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="reviewedByRole" className="mb-2 block text-sm font-medium text-stone-700">
              Reviewed by role
            </label>
            <input
              id="reviewedByRole"
              name="reviewedByRole"
              defaultValue={initialValues.reviewedByRole ?? ""}
              placeholder="Editorial Review"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="editorialSummary" className="mb-2 block text-sm font-medium text-stone-700">
            Editorial summary
          </label>
          <textarea
            id="editorialSummary"
            name="editorialSummary"
            defaultValue={initialValues.editorialSummary ?? ""}
            rows={4}
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
          />
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Media
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            Herb image and attribution
          </h3>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            This section prepares the record for real herb media and trust-aware attribution.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="imagePath" className="mb-2 block text-sm font-medium text-stone-700">
              Image path
            </label>
            <input
              id="imagePath"
              name="imagePath"
              defaultValue={initialValues.imagePath ?? ""}
              placeholder="herbs/tulsi/primary.jpg"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="imageAlt" className="mb-2 block text-sm font-medium text-stone-700">
              Image alt text
            </label>
            <input
              id="imageAlt"
              name="imageAlt"
              defaultValue={initialValues.imageAlt ?? ""}
              placeholder="Tulsi plant used in Nepalese herbal traditions"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="imageSourceName" className="mb-2 block text-sm font-medium text-stone-700">
              Image source name
            </label>
            <input
              id="imageSourceName"
              name="imageSourceName"
              defaultValue={initialValues.imageSourceName ?? ""}
              placeholder="Verified botanical image source"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="imageSourceUrl" className="mb-2 block text-sm font-medium text-stone-700">
              Image source URL
            </label>
            <input
              id="imageSourceUrl"
              name="imageSourceUrl"
              defaultValue={initialValues.imageSourceUrl ?? ""}
              placeholder="https://..."
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="imageLicense" className="mb-2 block text-sm font-medium text-stone-700">
              Image license
            </label>
            <input
              id="imageLicense"
              name="imageLicense"
              defaultValue={initialValues.imageLicense ?? ""}
              placeholder="Usage verified by project owner"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="imagePhotographer" className="mb-2 block text-sm font-medium text-stone-700">
              Photographer / creator
            </label>
            <input
              id="imagePhotographer"
              name="imagePhotographer"
              defaultValue={initialValues.imagePhotographer ?? ""}
              placeholder="Optional"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="imageVerifiedAt" className="mb-2 block text-sm font-medium text-stone-700">
              Image verified date
            </label>
            <input
              id="imageVerifiedAt"
              name="imageVerifiedAt"
              type="date"
              defaultValue={initialValues.imageVerifiedAt ?? ""}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            SEO
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            Search metadata
          </h3>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="seoTitle" className="mb-2 block text-sm font-medium text-stone-700">
              SEO title
            </label>
            <input
              id="seoTitle"
              name="seoTitle"
              defaultValue={initialValues.seoTitle ?? ""}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="seoDescription" className="mb-2 block text-sm font-medium text-stone-700">
              SEO description
            </label>
            <textarea
              id="seoDescription"
              name="seoDescription"
              defaultValue={initialValues.seoDescription ?? ""}
              rows={4}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
        <div>
          <p className="text-sm font-semibold text-stone-900">
            {mode === "create" ? "Create herb draft" : "Update herb record"}
          </p>
          <p className="text-xs leading-6 text-stone-500">
            Submission logic will be connected in the next step.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            Save draft
          </button>

          <button
            type="submit"
            className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            {mode === "create" ? "Create herb" : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}