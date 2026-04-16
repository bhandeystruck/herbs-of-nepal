import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { getAdminHerbs } from "@/features/admin/herbs/queries";
import { getEvidenceLevelLabel } from "@/lib/utils/trust";

/**
 * Admin herbs list page.
 */
export default async function AdminHerbsPage() {
  const herbs = await getAdminHerbs();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Herbs"
        title="Manage herb records"
        description="Browse and review herb profiles, publication status, source coverage, and trust metadata before building the create/edit workflows."
        actionLabel="New herb"
        actionHref="/admin/herbs/new"
      />

      <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 px-6 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-stone-900">
                Herb library
              </h3>
              <p className="mt-1 text-sm text-stone-600">
                {herbs.length} {herbs.length === 1 ? "record" : "records"} in admin
              </p>
            </div>
          </div>
        </div>

        {herbs.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <h4 className="text-lg font-semibold text-stone-900">
              No herbs found
            </h4>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Create your first herb record to start building the knowledge base.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/herbs/new"
                className="inline-flex rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Create herb
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-stone-50">
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Herb
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Category
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Status
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Evidence
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Sources
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Reviewed
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Updated
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {herbs.map((herb) => {
                  const reviewedDate = herb.lastReviewedAt
                    ? new Intl.DateTimeFormat("en", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(herb.lastReviewedAt)
                    : "Not reviewed";

                  const updatedDate = new Intl.DateTimeFormat("en", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(herb.updatedAt);

                  return (
                    <tr key={herb.id} className="align-top">
                      <td className="border-b border-stone-100 px-6 py-5">
                        <div className="space-y-1">
                          <p className="font-semibold text-stone-900">
                            {herb.name}
                          </p>
                          {herb.nepaliName ? (
                            <p className="text-sm text-stone-600">
                              {herb.nepaliName}
                            </p>
                          ) : null}
                          <p className="text-xs text-stone-500">
                            /herbs/{herb.slug}
                          </p>
                        </div>
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                        {herb.category.name}
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          <StatusBadge
                            label={herb.isPublished ? "Published" : "Draft"}
                            tone={herb.isPublished ? "success" : "warning"}
                          />
                          {herb.featured ? (
                            <StatusBadge label="Featured" tone="default" />
                          ) : null}
                        </div>
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                        {getEvidenceLevelLabel(herb.evidenceLevel)}
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                        {herb._count.sources}
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                        {reviewedDate}
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                        {updatedDate}
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-right">
                        <Link
                          href={`/admin/herbs/${herb.id}`}
                          className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                        >
                          Edit →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}