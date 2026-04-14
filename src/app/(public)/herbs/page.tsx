import { ActiveFilters } from "@/components/herbs/active-filters";
import { HerbCard } from "@/components/herbs/herb-card";
import { HerbFilters } from "@/components/herbs/herb-filters";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getCategories } from "@/features/categories/queries";
import { getPublishedHerbs } from "@/features/herbs/queries";
import { createMetadata } from "@/lib/seo/metadata";

type HerbsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    featured?: string;
  }>;
};

export const metadata = createMetadata({
  title: "Herbs Directory",
  description:
    "Browse Nepalese herbs, explore their traditional uses, benefits, regional importance, and safety guidance.",
  path: "/herbs",
});

/**
 * Herbs directory page with search-ready filter architecture.
 */
export default async function HerbsPage({ searchParams }: HerbsPageProps) {
  const params = await searchParams;

  const query = params.q?.trim() ?? "";
  const category = params.category?.trim() ?? "";
  const featured = params.featured === "true";

  const [herbs, categories] = await Promise.all([
    getPublishedHerbs({
      query: query || undefined,
      category: category || undefined,
      featured: featured || undefined,
    }),
    getCategories(),
  ]);

  const categoryOptions = categories.map((categoryItem) => ({
    id: categoryItem.id,
    name: categoryItem.name,
    slug: categoryItem.slug,
  }));

  const activeCategory = categories.find(
    (categoryItem) => categoryItem.slug === category
  );

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <PageIntro
          eyebrow="Herb Directory"
          title="Explore Nepalese herbs"
          description="Browse herbs used in Nepalese traditions and learn about their names, uses, regions, and cultural importance."
        />

        <section className="mt-10">
          <HerbFilters categories={categoryOptions} />
        </section>

        <section className="mt-6">
          <ActiveFilters
            query={query || undefined}
            categoryName={activeCategory?.name}
            featured={featured}
            total={herbs.length}
          />
        </section>

        <section className="mt-10">
          {herbs.length === 0 ? (
            <EmptyState
              title="No herbs matched your filters"
              description="Try changing the search term or clearing one of the filters to see more herbs."
              actionLabel="View all herbs"
              actionHref="/herbs"
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {herbs.map((herb) => (
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
                      name: herb.category.name,
                      slug: herb.category.slug,
                    },
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