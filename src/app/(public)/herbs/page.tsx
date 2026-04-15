import { ActiveFilters } from "@/components/herbs/active-filters";
import { HerbCard } from "@/components/herbs/herb-card";
import { HerbFilters } from "@/components/herbs/herb-filters";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/ui/page-intro";
import { getCategories } from "@/features/categories/queries";
import { getPublishedHerbs } from "@/features/herbs/queries";
import type { HerbSort } from "@/features/herbs/types";
import { createMetadata } from "@/lib/seo/metadata";

type HerbsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    featured?: string;
    sort?: string;
  }>;
};

function normalizeSort(value?: string): HerbSort {
  if (
    value === "newest" ||
    value === "name-asc" ||
    value === "name-desc" ||
    value === "featured"
  ) {
    return value;
  }

  return "featured";
}

export const metadata = createMetadata({
  title: "Herbs Directory",
  description:
    "Browse Nepalese herbs, explore their traditional uses, benefits, regional importance, and safety guidance.",
  path: "/herbs",
});

/**
 * Herbs directory page with premium visual styling and search-ready filter architecture.
 */
export default async function HerbsPage({ searchParams }: HerbsPageProps) {
  const params = await searchParams;

  const query = params.q?.trim() ?? "";
  const category = params.category?.trim() ?? "";
  const featured = params.featured === "true";
  const sort = normalizeSort(params.sort);

  const [herbs, categories] = await Promise.all([
    getPublishedHerbs({
      query: query || undefined,
      category: category || undefined,
      featured: featured || undefined,
      sort,
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
    <main className="pb-16 sm:pb-24">
      <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-emerald-50 via-stone-50 to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8rem] top-[-6rem] h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute right-[-6rem] top-10 h-64 w-64 rounded-full bg-lime-100/40 blur-3xl" />
          <div className="absolute bottom-[-4rem] left-1/3 h-40 w-40 rounded-full bg-amber-100/30 blur-3xl" />
        </div>

        <Container className="relative py-16 sm:py-24">
          <PageIntro
            eyebrow="Herb Directory"
            title="Explore Nepalese herbs"
            description="Browse herbs used in Nepalese traditions and learn about their names, uses, regions, and cultural importance."
          />

          <section className="mt-10">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-lg shadow-stone-200/40 backdrop-blur sm:p-5">
              <HerbFilters categories={categoryOptions} />
            </div>
          </section>

          <section className="mt-6">
            <ActiveFilters
              query={query || undefined}
              categoryName={activeCategory?.name}
              featured={featured}
              sort={sort}
              total={herbs.length}
            />
          </section>
        </Container>
      </section>

      <Container className="pt-12 sm:pt-16">
        <section className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Results
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              Herbal knowledge library
            </h2>
          </div>
        </section>

        <section>
          {herbs.length === 0 ? (
            <EmptyState
              title="No herbs matched your filters"
              description="Try changing the search term or clearing one of the filters to see more herbs."
              actionLabel="View all herbs"
              actionHref="/herbs"
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {herbs.map((herb,index) => (
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
          )}
        </section>
      </Container>
    </main>
  );
}