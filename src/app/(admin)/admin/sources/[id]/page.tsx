import Link from "next/link";
import { notFound } from "next/navigation";
import { SourceForm } from "@/components/admin/source-form";
import { updateSourceAction } from "@/features/admin/sources/actions";
import { ADMIN_SOURCE_TYPE_OPTIONS } from "@/features/admin/sources/form-config";
import { getAdminSourceById } from "@/features/admin/sources/queries";

type EditSourcePageProps = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * Edit source admin page.
 */
export default async function EditSourcePage({
  params,
}: EditSourcePageProps) {
  const { id } = await params;
  const source = await getAdminSourceById(id);

  if (!source) {
    notFound();
  }

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
            Edit source
          </h2>

          <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
            Update source identity, citation detail, and reference access fields.
          </p>
        </div>
      </section>

      <SourceForm
        mode="edit"
        sourceId={source.id}
        sourceTypeOptions={[...ADMIN_SOURCE_TYPE_OPTIONS]}
        action={updateSourceAction}
        initialValues={{
          title: source.title,
          authors: source.authors ?? "",
          organization: source.organization ?? "",
          publisher: source.publisher ?? "",
          year: source.year?.toString() ?? "",
          sourceType: source.sourceType,
          url: source.url ?? "",
          pdfUrl: source.pdfUrl ?? "",
          citation: source.citation ?? "",
          notes: source.notes ?? "",
          isActive: source.isActive,
        }}
      />
    </div>
  );
}