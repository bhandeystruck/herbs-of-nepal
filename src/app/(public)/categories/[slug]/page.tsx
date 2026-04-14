import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HerbCard } from "@/components/herbs/herb-card";
import { Container } from "@/components/layout/container";
import { getCategoryBySlug } from "@/features/categories/queries";
import { SITE_CONFIG } from "@/lib/constants/site";

type CategoryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Dynamic metadata for each category detail page.
 */
export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} | ${SITE_CONFIG.name}`,
    description:
      category.description ??
      `Browse herbs in the ${category.name} category on ${SITE_CONFIG.name}.`,
  };
}

/**
 * Category detail page.
 */
export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <div className="max-w-5xl">
          <div className="mb-8">
            <Link
              href="/categories"
              className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
            >
              ← Back to categories
            </Link>
          </div>

          <header className="border-b border-stone-200 pb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Category
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              {category.name}
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">
              {category.description ?? "Category description coming soon."}
            </p>

            <div className="mt-5">
              <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700">
                {category.herbCount} herbs
              </span>
            </div>
          </header>

          <section className="mt-12">
            {category.herbs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
                <h2 className="text-lg font-semibold text-stone-900">
                  No published herbs in this category yet
                </h2>
                <p className="mt-2 text-sm text-stone-600">
                  Herbs will appear here once they are published.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {category.herbs.map((herb) => (
                  <HerbCard
                    key={herb.id}
                    herb={{
                      id: herb.id,
                      slug: herb.slug,
                      name: herb.name,
                      nepaliName: herb.nepaliName,
                      scientificName: herb.scientificName,
                      shortDescription: herb.shortDescription,
                      region: herb.region,
                      image: herb.image,
                      featured: herb.featured,
                      category: {
                        name: category.name,
                        slug: category.slug,
                      },
                    }}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}