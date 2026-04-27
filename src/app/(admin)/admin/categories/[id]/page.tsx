import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/category-form";
import { updateCategoryAction } from "@/features/admin/categories/actions";
import { getAdminCategoryById } from "@/features/admin/categories/queries";
import { DeleteCategoryButton } from "@/components/admin/delete-category-button";

type EditCategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    saved?: string;
    error?:string;
  }>;
};

/**
 * Edit category admin page.
 */
export default async function EditCategoryPage({
  params,
  searchParams,
}: EditCategoryPageProps) {
  const { id } = await params;
  const { saved, error } = await searchParams;

  const category = await getAdminCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {saved === "1" ? (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          Category updates have been saved successfully.
        </section>
      ) : null}

      {error === "has-herbs" ? (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          This category cannot be deleted because one or more herbs are still assigned to it.
        </section>
      ) : null}
      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <Link
              href="/admin/categories"
              className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
            >
              ← Back to categories
            </Link>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Categories
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
              Edit category
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Update the category and its public browsing information.
            </p>
          </div>

          <div className="flex shrink-0">
            <DeleteCategoryButton
              categoryId={category.id}
              categoryName={category.name}
            />
          </div>
        </div>
      </section>

      <CategoryForm
        mode="edit"
        categoryId={category.id}
        action={updateCategoryAction}
        initialValues={{
          name: category.name,
          slug: category.slug,
          description: category.description ?? "",
        }}
      />

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Usage
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-900">
          Herbs in this category
        </h3>
        <p className="mt-2 text-sm leading-7 text-stone-600">
          {category._count.herbs} {category._count.herbs === 1 ? "herb is" : "herbs are"} currently assigned to this category.
        </p>

        {category.herbs.length > 0 ? (
          <div className="mt-5 space-y-3">
            {category.herbs.map((herb) => (
              <div
                key={herb.id}
                className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-stone-900">{herb.name}</p>
                  <p className="text-sm text-stone-500">{herb.slug}</p>
                </div>

                <Link
                  href={`/admin/herbs/${herb.id}`}
                  className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                >
                  Open herb →
                </Link>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}