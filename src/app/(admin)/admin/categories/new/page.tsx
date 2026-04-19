import Link from "next/link";
import { CategoryForm } from "@/components/admin/category-form";
import { createCategoryAction } from "@/features/admin/categories/actions";

/**
 * New category admin page.
 */
export default function NewCategoryPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
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
            Create new category
          </h2>

          <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
            Add a new herb category for public browsing and admin content organization.
          </p>
        </div>
      </section>

      <CategoryForm mode="create" action={createCategoryAction} />
    </div>
  );
}