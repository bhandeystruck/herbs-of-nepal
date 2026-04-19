import Link from "next/link";
import { notFound } from "next/navigation";
import { HerbForm } from "@/components/admin/herb-form";
import { HerbSourceLinkManager } from "@/components/admin/herb-source-link-manager";
import { updateHerbAction } from "@/features/admin/herbs/actions";
import { ADMIN_HERB_EVIDENCE_OPTIONS } from "@/features/admin/herbs/form-config";
import {
  getAdminHerbById,
  getAdminHerbCategories,
} from "@/features/admin/herbs/queries";
import { getAdminSources } from "@/features/admin/sources/queries";
import { jsonToStringArray } from "@/lib/utils/json";

type EditHerbPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function toDateInputValue(value: Date | null | undefined) {
  if (!value) {
    return "";
  }

  return value.toISOString().split("T")[0];
}

/**
 * Edit herb admin page with real database loading and source-linking UI.
 */
export default async function EditHerbPage({
  params,
}: EditHerbPageProps) {
  const { id } = await params;

  const [herb, categories, sources] = await Promise.all([
    getAdminHerbById(id),
    getAdminHerbCategories(),
    getAdminSources(),
  ]);

  if (!herb) {
    notFound();
  }

  const sourceOptions = sources.map((source) => ({
    id: source.id,
    title: source.title,
    sourceType: source.sourceType,
    organization: source.organization,
  }));

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <Link
              href="/admin/herbs"
              className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
            >
              ← Back to herbs
            </Link>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Herbs
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
              Edit herb record
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Update the herb profile, trust metadata, media details, source links,
              and SEO configuration.
            </p>
          </div>
        </div>
      </section>

      <HerbForm
        mode="edit"
        herbId={herb.id}
        categories={categories}
        evidenceOptions={[...ADMIN_HERB_EVIDENCE_OPTIONS]}
        action={updateHerbAction}
        initialValues={{
          name: herb.name,
          nepaliName: herb.nepaliName ?? "",
          scientificName: herb.scientificName ?? "",
          slug: herb.slug,
          categoryId: herb.categoryId,
          featured: herb.featured,
          isPublished: herb.isPublished,

          shortDescription: herb.shortDescription,
          description: herb.description,
          benefits: jsonToStringArray(herb.benefits).join("\n"),
          uses: jsonToStringArray(herb.uses).join("\n"),
          precautions: jsonToStringArray(herb.precautions).join("\n"),
          sideEffects: herb.sideEffects ?? "",
          dosageNotes: herb.dosageNotes ?? "",
          region: herb.region ?? "",

          evidenceLevel: herb.evidenceLevel ?? "",
          editorialSummary: herb.editorialSummary ?? "",
          reviewedByName: herb.reviewedByName ?? "",
          reviewedByRole: herb.reviewedByRole ?? "",
          lastReviewedAt: toDateInputValue(herb.lastReviewedAt),

          imagePath: herb.imagePath ?? "",
          imageAlt: herb.imageAlt ?? "",
          imageSourceName: herb.imageSourceName ?? "",
          imageSourceUrl: herb.imageSourceUrl ?? "",
          imageLicense: herb.imageLicense ?? "",
          imagePhotographer: herb.imagePhotographer ?? "",
          imageVerifiedAt: toDateInputValue(herb.imageVerifiedAt),

          seoTitle: herb.seoTitle ?? "",
          seoDescription: herb.seoDescription ?? "",
        }}
      />

      <HerbSourceLinkManager
        herbId={herb.id}
        sourceOptions={sourceOptions}
        linkedSources={herb.sources.map((item) => ({
          id: item.id,
          section: item.section,
          displayOrder: item.displayOrder,
          note: item.note,
          source: {
            id: item.source.id,
            title: item.source.title,
            sourceType: item.source.sourceType,
            organization: item.source.organization,
            url: item.source.url,
            pdfUrl: item.source.pdfUrl,
          },
        }))}
      />
    </div>
  );
}