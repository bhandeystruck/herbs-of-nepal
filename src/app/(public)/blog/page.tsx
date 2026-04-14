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
 * Blog listing page.
 */
export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <PageIntro
          eyebrow="Blog"
          title="Herbal knowledge and educational articles"
          description="Explore longer-form articles about Nepalese herbs, cultural context, traditional practices, and responsible interpretation."
        />

        <section className="mt-12">
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