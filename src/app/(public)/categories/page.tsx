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
 * Category listing page.
 */
export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <PageIntro
          eyebrow="Categories"
          title="Explore herbs by category"
          description="Browse herbs based on traditional use and wellness focus to explore Nepalese herbal knowledge more easily."
        />

        <section className="mt-12">
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