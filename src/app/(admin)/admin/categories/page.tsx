import Link from "next/link";
import { AdminListFilters } from "@/components/admin/admin-list-filters";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getAdminCategories } from "@/features/admin/categories/queries";

type AdminCategoriesPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

/**
 * Admin categories list page with search support.
 */
export default async function AdminCategoriesPage({
  searchParams,
}: AdminCategoriesPageProps) {
  const params = await searchParams;

  const categories = await getAdminCategories({
    query: params.q,
  });

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Categories"
        title="Manage category records"
        description="Create and maintain herb categories used across public browsing and editorial organization."
        actionLabel="New category"
        actionHref="/admin/categories/new"
      />

      <AdminListFilters searchPlaceholder="Search by category name, slug, or description" />

      <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 px-6 py-5">
          <h3 className="text-lg font-semibold tracking-tight text-stone-900">
            Category library
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            {categories.length} {categories.length === 1 ? "record" : "records"} found
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <h4 className="text-lg font-semibold text-stone-900">
              No categories matched your search
            </h4>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Try another search term, or create a new category.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/categories/new"
                className="inline-flex rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Create category
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-stone-50">
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Category
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Slug
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Herbs
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
                {categories.map((category) => {
                  const updatedDate = new Intl.DateTimeFormat("en", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(category.updatedAt);

                  return (
                    <tr key={category.id} className="align-top">
                      <td className="border-b border-stone-100 px-6 py-5">
                        <div className="space-y-1">
                          <p className="font-semibold text-stone-900">
                            {category.name}
                          </p>
                          {category.description ? (
                            <p className="max-w-xl text-sm leading-7 text-stone-600">
                              {category.description}
                            </p>
                          ) : null}
                        </div>
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                        {category.slug}
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                        {category._count.herbs}
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                        {updatedDate}
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-right">
                        <Link
                          href={`/admin/categories/${category.id}`}
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