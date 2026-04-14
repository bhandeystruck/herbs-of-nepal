import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { getPublishedBlogPostBySlug } from "@/features/blog/queries";
import { SITE_CONFIG } from "@/lib/constants/site";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Generates SEO metadata for a blog detail page.
 */
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.seoTitle ?? `${post.title} | ${SITE_CONFIG.name}`,
    description: post.seoDescription ?? post.excerpt,
  };
}

/**
 * Dynamic blog article page.
 */
export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(post.createdAt);

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <article className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
            >
              ← Back to blog
            </Link>
          </div>

          <header className="border-b border-stone-200 pb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Article
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-sm text-stone-500">{formattedDate}</p>

            <p className="mt-5 text-lg leading-8 text-stone-600">
              {post.excerpt}
            </p>
          </header>

          <section className="prose prose-stone mt-10 max-w-none prose-headings:tracking-tight prose-a:text-emerald-700">
            <p>{post.content}</p>
          </section>

          <section className="mt-10 rounded-2xl bg-stone-100 p-6">
            <h2 className="text-xl font-semibold text-stone-900">
              Continue exploring
            </h2>

            <p className="mt-3 text-sm leading-7 text-stone-600">
              Discover more herbs and educational articles to continue learning
              about Nepalese herbal knowledge and responsible interpretation.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                More articles
              </Link>

              <Link
                href="/herbs"
                className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
              >
                Browse herbs
              </Link>
            </div>
          </section>
        </article>
      </Container>
    </main>
  );
}