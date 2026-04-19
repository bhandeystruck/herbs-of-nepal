import Link from "next/link";
import { SourceForm } from "@/components/admin/source-form";
import { createSourceAction } from "@/features/admin/sources/actions";
import { ADMIN_SOURCE_TYPE_OPTIONS } from "@/features/admin/sources/form-config";

/**
 * New source admin page.
 */
export default function NewSourcePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-3xl">
          <Link
            href="/admin/sources"
            className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
          >
            ← Back to sources
          </Link>

          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Sources
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
            Create new source
          </h2>

          <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
            Add a reusable source record that can later be linked to one or more herbs.
          </p>
        </div>
      </section>

      <SourceForm
        mode="create"
        sourceTypeOptions={[...ADMIN_SOURCE_TYPE_OPTIONS]}
        action={createSourceAction}
      />
    </div>
  );
}