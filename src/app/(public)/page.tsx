import Link from "next/link";
import { Container } from "@/components/layout/container";
import { getFeaturedHerbs } from "@/features/herbs/queries";
import { getCategories } from "@/features/categories/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Discover Nepalese herbs, their traditional uses, wellness value, preparation methods, and safety guidance.",
  path: "/",
});

/**
 * Public homepage using real database data.
 */
export default async function HomePage() {
  const [featuredHerbs, categories] = await Promise.all([
    getFeaturedHerbs(3),
    getCategories(),
  ]);

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <section className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Nepalese Herbal Knowledge
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Discover the wisdom of Nepalese herbs.
          </h1>

          <p className="text-lg leading-8 text-stone-600">
            Explore traditional herbal knowledge, benefits, cultural relevance,
            preparation methods, and safety guidance through a clean, modern
            educational platform.
          </p>
        </section>

        <section className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
              Featured Herbs
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              A few important herbs from our growing Nepalese herb library.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredHerbs.map((herb) => (
              <article
                key={herb.id}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 space-y-2">
                  {herb.nepaliName ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      {herb.nepaliName}
                    </p>
                  ) : null}

                  <h3 className="text-xl font-semibold text-stone-900">
                    {herb.name}
                  </h3>

                  {herb.scientificName ? (
                    <p className="text-sm italic text-stone-500">
                      {herb.scientificName}
                    </p>
                  ) : null}

                  <p className="text-xs font-medium text-stone-500">
                    {herb.category.name}
                  </p>
                </div>

                <p className="text-sm leading-7 text-stone-600">
                  {herb.shortDescription}
                </p>

                <div className="mt-6">
                  <Link
                    href={`/herbs/${herb.slug}`}
                    className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
              Browse by Category
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              Explore herbs by traditional use and wellness focus.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {category.description ?? "Category description coming soon."}
                    </p>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-700 text-center">
                    {category.herbCount} herbs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-emerald-900 px-6 py-10 text-white sm:px-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Building a trusted herbal knowledge platform
            </h2>

            <p className="mt-4 text-sm leading-7 text-emerald-50/90 sm:text-base">
              Our goal is to present Nepalese herbal knowledge in a clear,
              educational, culturally respectful, and responsibly structured
              format.
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