import Link from "next/link";
import { HerbForm } from "@/components/admin/herb-form";
import { getAdminHerbCategories } from "@/features/admin/herbs/queries";

const EVIDENCE_OPTIONS = [
  { value: "TRADITIONAL_USE", label: "Traditional use documented" },
  { value: "LIMITED_EVIDENCE", label: "Limited evidence" },
  { value: "EMERGING_EVIDENCE", label: "Emerging evidence" },
  { value: "MODERATE_EVIDENCE", label: "Moderate evidence" },
  { value: "STRONG_EVIDENCE", label: "Strong evidence" },
  { value: "SAFETY_DATA_LIMITED", label: "Safety data limited" },
] as const;

/**
 * New herb admin page.
 * Form structure only for now.
 */
export default async function NewHerbPage() {
  const categories = await getAdminHerbCategories();

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
              Create new herb
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Build a new herb record with content, trust metadata, media details,
              and SEO structure.
            </p>
          </div>
        </div>
      </section>

      <HerbForm
        mode="create"
        categories={categories}
        evidenceOptions={[...EVIDENCE_OPTIONS]}
      />
    </div>
  );
}