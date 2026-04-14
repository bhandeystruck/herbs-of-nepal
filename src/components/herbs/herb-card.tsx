import Link from "next/link";

type HerbCardProps = {
  herb: {
    id: string;
    slug: string;
    name: string;
    nepaliName: string | null;
    scientificName: string | null;
    shortDescription: string;
    region: string | null;
    image: string | null;
    featured: boolean;
    category: {
      name: string;
      slug: string;
    };
  };
};

/**
 * Reusable herb card for listing pages.
 */
export function HerbCard({ herb }: HerbCardProps) {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            {herb.nepaliName ? (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {herb.nepaliName}
              </p>
            ) : null}

            <h2 className="mt-1 text-xl font-semibold text-stone-900">
              {herb.name}
            </h2>
          </div>

          {herb.featured ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Featured
            </span>
          ) : null}
        </div>

        {herb.scientificName ? (
          <p className="text-sm italic text-stone-500">{herb.scientificName}</p>
        ) : null}

        <div className="flex flex-wrap gap-2 pt-1">
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
            {herb.category.name}
          </span>

          {herb.region ? (
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
              {herb.region}
            </span>
          ) : null}
        </div>
      </div>

      <p className="text-sm leading-7 text-stone-600">{herb.shortDescription}</p>

      <div className="mt-6">
        <Link
          href={`/herbs/${herb.slug}`}
          className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
        >
          View herb details →
        </Link>
      </div>
    </article>
  );
}