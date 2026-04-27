import Link from "next/link";
import { BlogPreviewCard } from "@/components/blog/blog-preview-card";
import { CategoryCard } from "@/components/herbs/category-card";
import { FeaturedHerbSpotlight } from "@/components/herbs/featured-herb-spotlight";
import { HerbCard } from "@/components/herbs/herb-card";
import { Container } from "@/components/layout/container";
import { getLatestPublishedBlogPosts } from "@/features/blog/queries";
import { getCategories } from "@/features/categories/queries";
import { getFeaturedHerbs } from "@/features/herbs/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Discover Nepalese herbs, their traditional uses, wellness value, preparation methods, and safety guidance.",
  path: "/",
});

/**
 * Public homepage using real database content.
 */
export default async function HomePage() {
  const [featuredHerbs, categories, latestPosts] = await Promise.all([
    getFeaturedHerbs(3),
    getCategories(),
    getLatestPublishedBlogPosts(3),
  ]);

  const spotlightHerb = featuredHerbs[0] ?? null;
  const remainingFeaturedHerbs = featuredHerbs.slice(1);
  const homepageCategories = categories.slice(0, 3);

  return (
    <main className="pb-16 sm:pb-24">
      <section className="border-b border-stone-200 bg-gradient-to-b from-emerald-50 to-stone-50">
        <Container className="py-16 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Nepalese Herbal Knowledge
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Discover the healing heritage of Nepalese herbs.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
              Explore herbs from Nepal through a modern educational platform that
              highlights traditional uses, cultural importance, and responsible
              safety guidance.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/herbs"
                className="inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Explore herbs
              </Link>

              <Link
                href="/blog"
                className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
              >
                Read articles
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pt-16 sm:pt-20">
        {spotlightHerb ? (
          <section>
            <FeaturedHerbSpotlight
              herb={{
                id: spotlightHerb.id,
                slug: spotlightHerb.slug,
                name: spotlightHerb.name,
                nepaliName: spotlightHerb.nepaliName,
                scientificName: spotlightHerb.scientificName,
                shortDescription: spotlightHerb.shortDescription,
                description: spotlightHerb.description,
                region: spotlightHerb.region,
                category: {
                  name: spotlightHerb.category.name,
                  slug: spotlightHerb.category.slug,
                },
              }}
            />
          </section>
        ) : null}

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Featured Herbs
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
                Continue exploring the library
              </h2>
            </div>

            <Link
              href="/herbs"
              className="hidden text-sm font-medium text-emerald-700 transition hover:text-emerald-800 sm:inline-flex"
            >
              View all herbs →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {remainingFeaturedHerbs.map((herb, index) => (
              <HerbCard
                key={herb.id}
                priority={index === 0}
                herb={{
                  id: herb.id,
                  slug: herb.slug,
                  name: herb.name,
                  nepaliName: herb.nepaliName,
                  scientificName: herb.scientificName,
                  shortDescription: herb.shortDescription,
                  region: herb.region,
                  imagePath: herb.imagePath,
                  imageAlt: herb.imageAlt,
                  featured: herb.featured,
                  category: {
                    name: herb.category.name,
                    slug: herb.category.slug,
                  },
                  
                }}
              />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Categories
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
                Browse by wellness focus
              </h2>
            </div>

            <Link
              href="/categories"
              className="hidden text-sm font-medium text-emerald-700 transition hover:text-emerald-800 sm:inline-flex"
            >
              View all categories →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {homepageCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={{
                  id: category.id,
                  name: category.name,
                  slug: category.slug,
                  description: category.description,
                  herbCount: category.herbCount,
                }}
              />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Latest Articles
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
                Learn through longer-form content
              </h2>
            </div>

            <Link
              href="/blog"
              className="hidden text-sm font-medium text-emerald-700 transition hover:text-emerald-800 sm:inline-flex"
            >
              View all articles →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogPreviewCard
                key={post.id}
                post={{
                  id: post.id,
                  title: post.title,
                  slug: post.slug,
                  excerpt: post.excerpt,
                  createdAt: post.createdAt,
                  featuredImagePath: post.featuredImagePath,
                  featuredImageAlt: post.featuredImageAlt,
                }}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-emerald-900 px-6 py-10 text-white sm:px-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Learn with curiosity, use with caution
            </h2>

            <p className="mt-4 text-sm leading-7 text-emerald-50/90 sm:text-base">
              This platform is designed to help users explore Nepalese herbal
              knowledge responsibly while respecting cultural context and safety.
            </p>

            <div className="mt-6">
              <Link
                href="/safety"
                className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
              >
                Read safety guidance
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}