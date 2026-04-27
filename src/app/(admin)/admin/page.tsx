import Link from "next/link";
import { DashboardSectionCard } from "@/components/admin/dashboard-section-card";
import { DashboardStatCard } from "@/components/admin/dashboard-stat-card";
import { getAdminDashboardData } from "@/features/admin/dashboard/queries";

export default async function AdminDashboardPage() {
  const { stats, recentHerbs, recentBlogPosts, recentSources } =
    await getAdminDashboardData();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
          Admin overview
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base">
          Monitor content volume, editorial status, trust coverage, and recent activity
          across herbs, blog posts, sources, categories, and media operations.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardStatCard
          label="Total herbs"
          value={stats.totalHerbs}
          hint={`${stats.publishedHerbs} published • ${stats.draftHerbs} drafts`}
        />
        <DashboardStatCard
          label="Blog posts"
          value={stats.totalBlogPosts}
          hint={`${stats.publishedBlogPosts} published • ${stats.draftBlogPosts} drafts`}
        />
        <DashboardStatCard
          label="Sources"
          value={stats.totalSources}
          hint={`${stats.inactiveSources} inactive source records`}
        />
        <DashboardStatCard
          label="Categories"
          value={stats.totalCategories}
          hint="Editorial grouping structure for herbs"
        />
        <DashboardStatCard
          label="Herbs without sources"
          value={stats.herbsWithoutSources}
          hint="These need source coverage for trust completeness"
        />
        <DashboardStatCard
          label="Herbs without images"
          value={stats.herbsWithoutImages}
          hint="These may need media before publication polish"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardSectionCard
          eyebrow="Health"
          title="Trust and content health"
          description="These indicators help identify what still needs editorial attention."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-medium text-stone-900">
                Herbs without review date
              </p>
              <p className="mt-2 text-2xl font-bold text-stone-900">
                {stats.herbsWithoutReviewDate}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-medium text-stone-900">
                Blog posts without featured image
              </p>
              <p className="mt-2 text-2xl font-bold text-stone-900">
                {stats.blogWithoutFeaturedImage}
              </p>
            </div>
          </div>
        </DashboardSectionCard>

        <DashboardSectionCard
          eyebrow="Quick Actions"
          title="Jump into common admin tasks"
          description="Use these shortcuts to move directly into high-frequency workflows."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/admin/herbs/new"
              className="rounded-2xl bg-emerald-700 px-5 py-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              New herb
            </Link>

            <Link
              href="/admin/blog/new"
              className="rounded-2xl bg-emerald-700 px-5 py-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              New blog post
            </Link>

            <Link
              href="/admin/sources/new"
              className="rounded-2xl border border-stone-300 bg-white px-5 py-4 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              New source
            </Link>

            <Link
              href="/admin/categories/new"
              className="rounded-2xl border border-stone-300 bg-white px-5 py-4 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              New category
            </Link>

            <Link
              href="/admin/media"
              className="rounded-2xl border border-stone-300 bg-white px-5 py-4 text-sm font-medium text-stone-700 transition hover:bg-stone-50 sm:col-span-2"
            >
              Open media workspace
            </Link>
          </div>
        </DashboardSectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <DashboardSectionCard
          eyebrow="Recent Herbs"
          title="Recently updated herbs"
        >
          <div className="space-y-3">
            {recentHerbs.map((herb) => (
              <div
                key={herb.id}
                className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-stone-900">{herb.name}</p>
                  <p className="text-sm text-stone-500">
                    {herb.category.name} • {herb._count.sources} sources
                  </p>
                </div>

                <Link
                  href={`/admin/herbs/${herb.id}`}
                  className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                >
                  Open →
                </Link>
              </div>
            ))}
          </div>
        </DashboardSectionCard>

        <DashboardSectionCard
          eyebrow="Recent Blog"
          title="Recently updated posts"
        >
          <div className="space-y-3">
            {recentBlogPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-stone-900">{post.title}</p>
                  <p className="text-sm text-stone-500">
                    {post.isPublished ? "Published" : "Draft"}
                  </p>
                </div>

                <Link
                  href={`/admin/blog/${post.id}`}
                  className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                >
                  Open →
                </Link>
              </div>
            ))}
          </div>
        </DashboardSectionCard>

        <DashboardSectionCard
          eyebrow="Recent Sources"
          title="Recently updated sources"
        >
          <div className="space-y-3">
            {recentSources.map((source) => (
              <div
                key={source.id}
                className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-stone-900">{source.title}</p>
                  <p className="text-sm text-stone-500">
                    {source._count.herbs} linked herbs
                  </p>
                </div>

                <Link
                  href={`/admin/sources/${source.id}`}
                  className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                >
                  Open →
                </Link>
              </div>
            ))}
          </div>
        </DashboardSectionCard>
      </div>
    </div>
  );
}