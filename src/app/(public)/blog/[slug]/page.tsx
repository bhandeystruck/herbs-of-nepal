import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { Container } from "@/components/layout/container";
import { getPublishedBlogPostBySlug } from "@/features/blog/queries";
import { SITE_CONFIG } from "@/lib/constants/site";
import { getBlogImageUrl } from "@/lib/utils/media";

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
 * Premium dynamic blog article page with markdown and featured image support.
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

  const blogImageUrl = getBlogImageUrl(post.featuredImagePath);

  return (
    <main className="pb-16 sm:pb-24">
      <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-emerald-50 via-stone-50 to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-6rem] top-[-4rem] h-44 w-44 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute right-[-5rem] top-6 h-48 w-48 rounded-full bg-lime-100/30 blur-3xl" />
        </div>

        <Container className="relative py-16 sm:py-24">
          <article className="mx-auto max-w-4xl">
            <div className="mb-8">
              <Link
                href="/blog"
                className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
              >
                ← Back to blog
              </Link>
            </div>

            <header>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Article
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                {post.title}
              </h1>

              <p className="mt-4 text-sm text-stone-500">{formattedDate}</p>

              <p className="mt-6 text-lg leading-8 text-stone-600">
                {post.excerpt}
              </p>
            </header>
          </article>
        </Container>
      </section>

      <Container className="pt-12 sm:pt-16">
        <article className="mx-auto max-w-4xl space-y-10">
          {blogImageUrl ? (
            <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                <Image
                  src={blogImageUrl}
                  alt={post.featuredImageAlt ?? `${post.title} featured image`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>

              <div className="border-t border-stone-200 bg-gradient-to-b from-stone-50 to-white px-5 py-5 sm:px-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    Featured Image
                  </span>
                </div>

                {(post.imageSourceName ||
                  post.imageLicense ||
                  post.imagePhotographer) ? (
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                        Source
                      </p>

                      {post.imageSourceUrl ? (
                        <Link
                          href={post.imageSourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                        >
                          {post.imageSourceName ?? "View source"} →
                        </Link>
                      ) : (
                        <p className="mt-2 text-sm text-stone-700">
                          {post.imageSourceName ?? "Source metadata not yet listed"}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                        Attribution
                      </p>

                      <div className="mt-2 space-y-1 text-sm text-stone-700">
                        {post.imagePhotographer ? (
                          <p>Photographer: {post.imagePhotographer}</p>
                        ) : null}
                        {post.imageLicense ? <p>License: {post.imageLicense}</p> : null}
                        {!post.imagePhotographer && !post.imageLicense ? (
                          <p>Attribution metadata not yet listed</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          <section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
            <MarkdownContent content={post.content} />
          </section>

          <section className="rounded-3xl bg-stone-100 p-8 sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
              Continue exploring
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Discover more herbs and educational articles to continue learning
              about Nepalese herbal knowledge and responsible interpretation.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                More articles
              </Link>

              <Link
                href="/herbs"
                className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
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