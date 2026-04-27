import Link from "next/link";
import { SourceType } from "@prisma/client";
import { AdminListFilters } from "@/components/admin/admin-list-filters";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { getAdminSources } from "@/features/admin/sources/queries";
import { getSourceTypeLabel } from "@/lib/utils/trust";

type AdminSourcesPageProps = {
  searchParams: Promise<{
    q?: string;
    sourceType?: "all" | SourceType;
    status?: "all" | "active" | "inactive";
    deleted?:string;
  }>;
};

/**
 * Admin sources list page with search and filters.
 */
export default async function AdminSourcesPage({
  searchParams,
}: AdminSourcesPageProps) {
  const params = await searchParams;

  const sources = await getAdminSources({
    query: params.q,
    sourceType: params.sourceType ?? "all",
    status: params.status ?? "all",
  });

  return (
    <div className="space-y-8">
        {params.deleted === "1" ? (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          Source record has been deleted successfully.
        </section>
      ) : null}
      <AdminPageHeader
        eyebrow="Sources"
        title="Manage source records"
        description="Create and maintain reusable references that support herb trust metadata, evidence sections, and public citations."
        actionLabel="New source"
        actionHref="/admin/sources/new"
      />

      <AdminListFilters
        searchPlaceholder="Search by title, authors, organization, publisher, or citation"
        statusOptions={[
          { value: "all", label: "All statuses" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        extraLabel="Source type"
        extraParamKey="sourceType"
        extraOptions={[
          { value: "all", label: "All source types" },
          { value: "GOVERNMENT_FACT_SHEET", label: "Government fact sheet" },
          { value: "PEER_REVIEWED_REVIEW", label: "Peer-reviewed review" },
          { value: "SYSTEMATIC_REVIEW", label: "Systematic review" },
          { value: "META_ANALYSIS", label: "Meta-analysis" },
          { value: "CLINICAL_TRIAL", label: "Clinical trial" },
          { value: "JOURNAL_ARTICLE", label: "Journal article" },
          { value: "UNIVERSITY_ARTICLE", label: "University article" },
          { value: "ETHNOBOTANICAL_REFERENCE", label: "Ethnobotanical reference" },
          { value: "BOOK", label: "Book" },
          { value: "INSTITUTIONAL_PDF", label: "Institutional PDF" },
          { value: "ORGANIZATION_PAGE", label: "Organization page" },
          { value: "OTHER", label: "Other" },
        ]}
      />

      <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 px-6 py-5">
          <h3 className="text-lg font-semibold tracking-tight text-stone-900">
            Source library
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            {sources.length} {sources.length === 1 ? "record" : "records"} found
          </p>
        </div>

        {sources.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <h4 className="text-lg font-semibold text-stone-900">
              No sources matched your filters
            </h4>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Try adjusting your search or filters, or create a new source.
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