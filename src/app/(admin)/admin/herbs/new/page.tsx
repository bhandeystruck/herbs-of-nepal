import Link from "next/link";
import { HerbForm } from "@/components/admin/herb-form";
import { createHerbAction } from "@/features/admin/herbs/actions";
import { ADMIN_HERB_EVIDENCE_OPTIONS } from "@/features/admin/herbs/form-config";
import { getAdminHerbCategories } from "@/features/admin/herbs/queries";

type NewHerbPageProps = {
  searchParams: Promise<{
    saved?: string;
    created?: string;
  }>;
};

/**
 * New herb admin page with real create action.
 */
export default async function NewHerbPage({
  searchParams,
}: NewHerbPageProps) {
  const { saved, created } = await searchParams;
  const categories = await getAdminHerbCategories();

  return (
    <div className="space-y-8">
      {saved === "1" && created === "1" ? (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          Herb record has been created successfully.
        </section>
      ) : null}

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
        evidenceOptions={[...ADMIN_HERB_EVIDENCE_OPTIONS]}
        action={createHerbAction}
      />
    </div>
  );
}