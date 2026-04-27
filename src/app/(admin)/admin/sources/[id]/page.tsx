import Link from "next/link";
import { notFound } from "next/navigation";
import { SourceForm } from "@/components/admin/source-form";
import { updateSourceAction } from "@/features/admin/sources/actions";
import { ADMIN_SOURCE_TYPE_OPTIONS } from "@/features/admin/sources/form-config";
import { getAdminSourceById } from "@/features/admin/sources/queries";
import { DeleteSourceButton } from "@/components/admin/delete-source-button";

type EditSourcePageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

/**
 * Edit source admin page.
 */
export default async function EditSourcePage({
  params,
  searchParams,
}: EditSourcePageProps) {
  const { id } = await params;
  const { saved } = await searchParams;

  const source = await getAdminSourceById(id);

  if (!source) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {saved === "1" ? (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          Source record updates have been saved successfully.
        </section>
      ) : null}

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

          <div className="flex shrink-0">
            <DeleteSourceButton sourceId={source.id} sourceTitle={source.title} />
          </div>
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