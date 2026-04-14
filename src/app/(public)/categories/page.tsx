import { CategoryCard } from "@/components/herbs/category-card";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getCategories } from "@/features/categories/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Categories",
  description:
    "Browse Nepalese herbs by category, traditional use, and wellness focus.",
  path: "/categories",
});

/**
 * Premium category listing page.
 */
export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="pb-16 sm:pb-24">
      <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-emerald-50 via-stone-50 to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8rem] top-[-5rem] h-52 w-52 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute right-[-6rem] top-8 h-60 w-60 rounded-full bg-lime-100/30 blur-3xl" />
        </div>

        <Container className="relative py-16 sm:py-24">
          <PageIntro
            eyebrow="Categories"
            title="Explore herbs by category"
            description="Browse herbs based on traditional use and wellness focus to explore Nepalese herbal knowledge more easily."
          />
        </Container>
      </section>

      <Container className="pt-12 sm:pt-16">
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Category Library
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Organized by wellness focus and traditional use
          </h2>
        </section>

        <section>
          {categories.length === 0 ? (
            <EmptyState
              title="No categories available yet"
              description="Categories will appear here once they are added to the database."
              actionLabel="Go to homepage"
              actionHref="/"
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => (
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
          )}
        </section>
      </Container>
    </main>
  );
}