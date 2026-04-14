import { BlogCard } from "@/components/blog/blog-card";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getPublishedBlogPosts } from "@/features/blog/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Read educational articles about Nepalese herbs, traditional uses, and responsible herbal knowledge.",
  path: "/blog",
});

/**
 * Premium blog listing page.
 */
export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main className="pb-16 sm:pb-24">
      <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-emerald-50 via-stone-50 to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8rem] top-[-5rem] h-52 w-52 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute right-[-6rem] top-8 h-60 w-60 rounded-full bg-lime-100/30 blur-3xl" />
        </div>

        <Container className="relative py-16 sm:py-24">
          <PageIntro
            eyebrow="Blog"
            title="Herbal knowledge and educational articles"
            description="Explore longer-form articles about Nepalese herbs, cultural context, traditional practices, and responsible interpretation."
          />
        </Container>
      </section>

      <Container className="pt-12 sm:pt-16">
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Article Library
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Read and explore deeper herbal context
          </h2>
        </section>

        <section>
          {posts.length === 0 ? (
            <EmptyState
              title="No blog posts available yet"
              description="Published articles will appear here once they are added to the database."
              actionLabel="Go to homepage"
              actionHref="/"
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={{
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    createdAt: post.createdAt,
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}