"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma/client";
import type { CategoryFormState } from "@/features/admin/categories/form-config";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value ? value : null;
}

async function validateCategoryForm(
  formData: FormData,
  mode: "create" | "edit",
  categoryId?: string
) {
  const fieldErrors: Record<string, string> = {};

  const name = getString(formData, "name");
  const slug = getString(formData, "slug");
  const description = getOptionalString(formData, "description");

  if (!name) {
    fieldErrors.name = "Category name is required.";
  }

  if (!slug) {
    fieldErrors.slug = "Slug is required.";
  }

  if (mode === "edit" && !categoryId) {
    fieldErrors.id = "Missing category ID for update.";
  }

  if (name) {
    const existingName = await db.category.findFirst({
      where: categoryId
        ? {
            name,
            id: { not: categoryId },
          }
        : { name },
      select: { id: true },
    });

    if (existingName) {
      fieldErrors.name = "This category name is already in use.";
    }
  }

  if (slug) {
    const existingSlug = await db.category.findFirst({
      where: categoryId
        ? {
            slug,
            id: { not: categoryId },
          }
        : { slug },
      select: { id: true },
    });

    if (existingSlug) {
      fieldErrors.slug = "This slug is already in use.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false as const,
      state: {
        message: "Please fix the highlighted fields and try again.",
        fieldErrors,
      } satisfies CategoryFormState,
    };
  }

  return {
    ok: true as const,
    data: {
      name,
      slug,
      description,
    },
  };
}

function revalidateCategoryPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/categories");
  if (slug) {
    revalidatePath(`/categories/${slug}`);
    revalidatePath(`/herbs?category=${slug}`);
  }
  revalidatePath("/admin");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/herbs/new");
}

export async function createCategoryAction(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const result = await validateCategoryForm(formData, "create");

  if (!result.ok) {
    return result.state;
  }

  try {
    const category = await db.category.create({
      data: result.data,
    });

    revalidateCategoryPaths(category.slug);
  } catch {
    return {
      message: "Something went wrong while creating the category.",
      fieldErrors: {},
    };
  }

  redirect("/admin/categories/new?saved=1&created=1");
}

export async function updateCategoryAction(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  const categoryId = getString(formData, "id");
  const result = await validateCategoryForm(formData, "edit", categoryId);

  if (!result.ok) {
    return result.state;
  }

  try {
    const category = await db.category.update({
      where: { id: categoryId },
      data: result.data,
    });

    revalidateCategoryPaths(category.slug);
  } catch {
    return {
      message: "Something went wrong while updating the category.",
      fieldErrors: {},
    };
  }

  redirect(`/admin/categories/${categoryId}?saved=1`);
}

export async function deleteCategoryAction(formData: FormData) {
  const categoryId = getString(formData, "id");

  if (!categoryId) {
    redirect("/admin/categories?error=missing-id");
  }

  const category = await db.category.findUnique({
    where: { id: categoryId },
    include: {
      _count: {
        select: {
          herbs: true,
        },
      },
    },
  });

  if (!category) {
    redirect("/admin/categories?error=not-found");
  }

  if (category._count.herbs > 0) {
    redirect(`/admin/categories/${category.id}?error=has-herbs`);
  }

  await db.category.delete({
    where: { id: category.id },
  });

  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath(`/categories/${category.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/herbs/new");

  redirect("/admin/categories?deleted=1");
}