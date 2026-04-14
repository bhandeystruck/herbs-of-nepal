import Link from "next/link";

type FeaturedHerbSpotlightProps = {
  herb: {
    id: string;
    slug: string;
    name: string;
    nepaliName: string | null;
    scientificName: string | null;
    shortDescription: string;
    description: string;
    region: string | null;
    category: {
      name: string;
      slug: string;
    };
  };
};

/**
 * Larger spotlight card for a featured herb on the homepage.
 */
export function FeaturedHerbSpotlight({
  herb,
}: FeaturedHerbSpotlightProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Featured Herb
          </p>

          <div className="mt-5 space-y-3">
            {herb.nepaliName ? (
              <p className="text-sm font-medium text-stone-500">
                {herb.nepaliName}
              </p>
            ) : null}

            <h3 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              {herb.name}
            </h3>

            {herb.scientificName ? (
              <p className="text-base italic text-stone-500">
                {herb.scientificName}
              </p>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
              {herb.category.name}
            </span>

            {herb.region ? (
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                {herb.region}
              </span>
            ) : null}
          </div>

          <p className="mt-6 text-base leading-8 text-stone-600">
            {herb.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/herbs/${herb.slug}`}
              className="inline-flex rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Read full herb profile
            </Link>

            <Link
              href={`/herbs?category=${herb.category.slug}`}
              className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              More in this category
            </Link>
          </div>
        </div>

        <div className="flex items-center bg-gradient-to-br from-emerald-900 to-emerald-700 p-8 sm:p-10">
          <div className="space-y-4 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
              Quick Overview
            </p>

            <p className="text-lg leading-8 text-emerald-50/90">
              {herb.shortDescription}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}