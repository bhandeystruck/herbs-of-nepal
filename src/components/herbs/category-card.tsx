import Link from "next/link";

type CategoryCardProps = {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    herbCount: number;
  };
};

/**
 * Reusable category card for category listing pages.
 * Includes direct navigation to both the category page and the filtered herb directory.
 */
export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            {category.name}
          </h2>

          <p className="mt-3 text-sm leading-7 text-stone-600">
            {category.description ?? "Category description coming soon."}
          </p>
        </div>

        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
          {category.herbCount}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/categories/${category.slug}`}
          className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
        >
          View category →
        </Link>

        <Link
          href={`/herbs?category=${category.slug}`}
          className="text-sm font-medium text-stone-700 transition hover:text-emerald-700"
        >
          Browse herbs →
        </Link>
      </div>
    </article>
  );
}