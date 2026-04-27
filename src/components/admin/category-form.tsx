"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  INITIAL_CATEGORY_FORM_STATE,
  type CategoryFormState,
} from "@/features/admin/categories/form-config";

type CategoryFormValues = {
  name?: string;
  slug?: string;
  description?: string;
};

type CategoryFormProps = {
  mode: "create" | "edit";
  categoryId?: string;
  initialValues?: CategoryFormValues;
  action: (
    prevState: CategoryFormState,
    formData: FormData
  ) => Promise<CategoryFormState>;
};

function CategoryFormButtons({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();

  return (
    <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
      <div>
        <p className="text-sm font-semibold text-stone-900">
          {mode === "create" ? "Create category" : "Update category"}
        </p>
        <p className="text-xs leading-6 text-stone-500">
          {pending ? "Saving changes..." : "Categories organize herbs across public browsing and admin workflows."}
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending
          ? "Saving..."
          : mode === "create"
            ? "Create category"
            : "Save changes"}
      </button>
    </div>
  );
}

/**
 * Shared category form UI.
 */
export function CategoryForm({
  mode,
  categoryId,
  initialValues = {},
  action,
}: CategoryFormProps) {
  const [state, formAction] = useActionState(action, INITIAL_CATEGORY_FORM_STATE);

  const fieldError = (name: string) => state.fieldErrors[name];

  return (
    <form action={formAction} className="space-y-8">
      {categoryId ? <input type="hidden" name="id" value={categoryId} /> : null}

      {state.message ? (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {state.message}
        </section>
      ) : null}

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Category
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            Category identity
          </h3>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            Define the public-facing category name, slug, and description.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-stone-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              defaultValue={initialValues.name ?? ""}
              placeholder="Digestive Health"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
            {fieldError("name") ? (
              <p className="mt-2 text-xs text-rose-600">{fieldError("name")}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="slug" className="mb-2 block text-sm font-medium text-stone-700">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              defaultValue={initialValues.slug ?? ""}
              placeholder="digestive-health"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
            {fieldError("slug") ? (
              <p className="mt-2 text-xs text-rose-600">{fieldError("slug")}</p>
            ) : null}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-stone-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={initialValues.description ?? ""}
              rows={5}
              placeholder="Herbs commonly used in traditional digestion and gut comfort practices."
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      <CategoryFormButtons mode={mode} />
    </form>
  );
}