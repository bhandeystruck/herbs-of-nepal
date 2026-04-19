import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { getAdminBlogPosts } from "@/features/admin/blog/queries";

/**
 * Admin blog list page.
 */
export default async function AdminBlogPage() {
  const posts = await getAdminBlogPosts();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Blog"
        title="Manage blog posts"
        description="Create, update, and publish educational articles for the public blog."
        actionLabel="New post"
        actionHref="/admin/blog/new"
      />

      <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 px-6 py-5">
          <h3 className="text-lg font-semibold tracking-tight text-stone-900">
            Blog library
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            {posts.length} {posts.length === 1 ? "record" : "records"} in admin
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <h4 className="text-lg font-semibold text-stone-900">
              No blog posts found
            </h4>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Create your first post to expand the public knowledge base.
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