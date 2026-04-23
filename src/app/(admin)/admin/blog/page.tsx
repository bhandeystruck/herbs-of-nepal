import Link from "next/link";
import { AdminListFilters } from "@/components/admin/admin-list-filters";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { getAdminBlogPosts } from "@/features/admin/blog/queries";

type AdminBlogPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: "all" | "published" | "draft";
  }>;
};

/**
 * Admin blog list page with search and status filters.
 */
export default async function AdminBlogPage({
  searchParams,
}: AdminBlogPageProps) {
  const params = await searchParams;

  const posts = await getAdminBlogPosts({
    query: params.q,
    status: params.status ?? "all",
  });

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Blog"
        title="Manage blog posts"
        description="Create, update, and publish educational articles for the public blog."
        actionLabel="New post"
        actionHref="/admin/blog/new"
      />

      <AdminListFilters
        searchPlaceholder="Search by title, slug, excerpt, or content"
        statusOptions={[
          { value: "all", label: "All statuses" },
          { value: "published", label: "Published" },
          { value: "draft", label: "Draft" },
        ]}
      />

      <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 px-6 py-5">
          <h3 className="text-lg font-semibold tracking-tight text-stone-900">
            Blog library
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            {posts.length} {posts.length === 1 ? "record" : "records"} found
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <h4 className="text-lg font-semibold text-stone-900">
              No blog posts matched your filters
            </h4>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Try adjusting your search or filters, or create a new post.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/blog/new"
                className="inline-flex rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Create post
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-stone-50">
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Post
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Slug
                  </th>
                  <th className="border-b border-stone-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Status
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
                {posts.map((post) => {
                  const updatedDate = new Intl.DateTimeFormat("en", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(post.updatedAt);

                  return (
                    <tr key={post.id} className="align-top">
                      <td className="border-b border-stone-100 px-6 py-5">
                        <div className="space-y-1">
                          <p className="font-semibold text-stone-900">
                            {post.title}
                          </p>
                          <p className="max-w-xl text-sm leading-7 text-stone-600">
                            {post.excerpt}
                          </p>
                        </div>
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                        {post.slug}
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5">
                        <StatusBadge
                          label={post.isPublished ? "Published" : "Draft"}
                          tone={post.isPublished ? "success" : "warning"}
                        />
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-sm text-stone-700">
                        {updatedDate}
                      </td>

                      <td className="border-b border-stone-100 px-6 py-5 text-right">
                        <Link
                          href={`/admin/blog/${post.id}`}
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