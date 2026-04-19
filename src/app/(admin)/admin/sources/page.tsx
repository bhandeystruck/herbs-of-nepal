import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { getAdminSources } from "@/features/admin/sources/queries";
import { getSourceTypeLabel } from "@/lib/utils/trust";

/**
 * Admin sources list page.
 */
export default async function AdminSourcesPage() {
  const sources = await getAdminSources();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Sources"
        title="Manage source records"
        description="Create and maintain reusable references that support herb trust metadata, evidence sections, and public citations."
        actionLabel="New source"
        actionHref="/admin/sources/new"
      />

      <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 px-6 py-5">
          <h3 className="text-lg font-semibold tracking-tight text-stone-900">
            Source library
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            {sources.length} {sources.length === 1 ? "record" : "records"} in admin
          </p>
        </div>

        {sources.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <h4 className="text-lg font-semibold text-stone-900">
              No sources found
            </h4>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Create your first source to support trust-aware herb content.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/sources/new"
                className="inline-flex rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Create source
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-stone-50">
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Source
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Type
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Organization
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Year
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Links
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Usage
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Status
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {sources.map((source) => (
                  <tr key={source.id} className="align-top">
                    <td className="border-b border-stone-100 px-6 py-5">
                      <div className="space-y-1">
                        <p className="font-semibold text-stone-900">
                          {source.title}
                        </p>
                        {source.authors ? (
                          <p className="text-sm text-stone-600">{source.authors}</p>
                        ) : null}
                      </div>
                    </td>

                    <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                      {getSourceTypeLabel(source.sourceType)}
                    </td>

                    <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                      {source.organization ?? source.publisher ?? "—"}
                    </td>

                    <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                      {source.year ?? "—"}
                    </td>

                    <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                      <div className="flex flex-wrap gap-2">
                        {source.url ? <StatusBadge label="URL" tone="default" /> : null}
                        {source.pdfUrl ? <StatusBadge label="PDF" tone="neutral" /> : null}
                        {!source.url && !source.pdfUrl ? "—" : null}
                      </div>
                    </td>

                    <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                      {source._count.herbs}
                    </td>

                    <td className="border-b border-stone-100 px-6 py-5">
                      <StatusBadge
                        label={source.isActive ? "Active" : "Inactive"}
                        tone={source.isActive ? "success" : "warning"}
                      />
                    </td>

                    <td className="border-b border-stone-100 px-6 py-5 text-right">
                      <Link
                        href={`/admin/sources/${source.id}`}
                        className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                      >
                        Edit →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}