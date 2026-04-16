"use server";

import { EvidenceLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma/client";
import type { HerbFormState } from "@/features/admin/herbs/form-config";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value ? value : null;
}

function getCheckbox(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function getLineArray(formData: FormData, key: string) {
  return getString(formData, key)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getOptionalDate(formData: FormData, key: string) {
  const value = getString(formData, key);
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isEvidenceLevel(value: string): value is EvidenceLevel {
  return (
    value === "TRADITIONAL_USE" ||
    value === "LIMITED_EVIDENCE" ||
    value === "EMERGING_EVIDENCE" ||
    value === "MODERATE_EVIDENCE" ||
    value === "STRONG_EVIDENCE" ||
    value === "SAFETY_DATA_LIMITED"
  );
}

async function validateHerbForm(
  formData: FormData,
  mode: "create" | "edit",
  herbId?: string
) {
  const fieldErrors: Record<string, string> = {};

  const name = getString(formData, "name");
  const slug = getString(formData, "slug");
  const categoryId = getString(formData, "categoryId");
  const shortDescription = getString(formData, "shortDescription");
  const description = getString(formData, "description");
  const evidenceLevelValue = getString(formData, "evidenceLevel");

  if (!name) {
    fieldErrors.name = "Herb name is required.";
  }

  if (!slug) {
    fieldErrors.slug = "Slug is required.";
  }

  if (!categoryId) {
    fieldErrors.categoryId = "Category is required.";
  }

  if (!shortDescription) {
    fieldErrors.shortDescription = "Short description is required.";
  }

  if (!description) {
    fieldErrors.description = "Full description is required.";
  }

  if (evidenceLevelValue && !isEvidenceLevel(evidenceLevelValue)) {
    fieldErrors.evidenceLevel = "Please select a valid evidence level.";
  }

  if (mode === "edit" && !herbId) {
    fieldErrors.id = "Missing herb ID for update.";
  }

  if (slug) {
    const existingSlug = await db.herb.findFirst({
      where: herbId
        ? {
            slug,
            id: { not: herbId },
          }
        : {
            slug,
          },
      select: {
        id: true,
      },
    });

    if (existingSlug) {
      fieldErrors.slug = "This slug is already in use.";
    }
  }

  if (categoryId) {
    const category = await db.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });

    if (!category) {
      fieldErrors.categoryId = "Selected category was not found.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false as const,
      state: {
        message: "Please fix the highlighted fields and try again.",
        fieldErrors,
      } satisfies HerbFormState,
    };
  }

  const intent = getString(formData, "intent");
  const forceDraft = intent === "draft";

  const data = {
    name,
    nepaliName: getOptionalString(formData, "nepaliName"),
    scientificName: getOptionalString(formData, "scientificName"),
    slug,
    categoryId,
    featured: getCheckbox(formData, "featured"),
    isPublished: forceDraft ? false : getCheckbox(formData, "isPublished"),

    shortDescription,
    description,
    benefits: getLineArray(formData, "benefits"),
    uses: getLineArray(formData, "uses"),
    precautions: getLineArray(formData, "precautions"),
    sideEffects: getOptionalString(formData, "sideEffects"),
    dosageNotes: getOptionalString(formData, "dosageNotes"),
    region: getOptionalString(formData, "region"),

    evidenceLevel: evidenceLevelValue
      ? (evidenceLevelValue as EvidenceLevel)
      : null,
    editorialSummary: getOptionalString(formData, "editorialSummary"),
    reviewedByName: getOptionalString(formData, "reviewedByName"),
    reviewedByRole: getOptionalString(formData, "reviewedByRole"),
    lastReviewedAt: getOptionalDate(formData, "lastReviewedAt"),

    imagePath: getOptionalString(formData, "imagePath"),
    imageAlt: getOptionalString(formData, "imageAlt"),
    imageSourceName: getOptionalString(formData, "imageSourceName"),
    imageSourceUrl: getOptionalString(formData, "imageSourceUrl"),
    imageLicense: getOptionalString(formData, "imageLicense"),
    imagePhotographer: getOptionalString(formData, "imagePhotographer"),
    imageVerifiedAt: getOptionalDate(formData, "imageVerifiedAt"),

    seoTitle: getOptionalString(formData, "seoTitle"),
    seoDescription: getOptionalString(formData, "seoDescription"),
  };

  return {
    ok: true as const,
    data,
  };
}

function revalidateHerbPaths(slug: string, categorySlug: string) {
  revalidatePath("/");
  revalidatePath("/herbs");
  revalidatePath(`/herbs/${slug}`);
  revalidatePath("/categories");
  revalidatePath(`/categories/${categorySlug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/herbs");
}

export async function createHerbAction(
  _prevState: HerbFormState,
  formData: FormData
): Promise<HerbFormState> {
  const result = await validateHerbForm(formData, "create");

  if (!result.ok) {
    return result.state;
  }

  try {
    const herb = await db.herb.create({
      data: result.data,
      include: {
        category: true,
      },
    });

    revalidateHerbPaths(herb.slug, herb.category.slug);
  } catch {
    return {
      message: "Something went wrong while creating the herb.",
      fieldErrors: {},
    };
  }

  redirect("/admin/herbs");
}

export async function updateHerbAction(
  _prevState: HerbFormState,
  formData: FormData
): Promise<HerbFormState> {
  const herbId = getString(formData, "id");
  const result = await validateHerbForm(formData, "edit", herbId);

  if (!result.ok) {
    return result.state;
  }

  try {
    const herb = await db.herb.update({
      where: { id: herbId },
      data: result.data,
      include: {
        category: true,
      },
    });

    revalidateHerbPaths(herb.slug, herb.category.slug);
  } catch {
    return {
      message: "Something went wrong while updating the herb.",
      fieldErrors: {},
    };
  }

  redirect(`/admin/herbs/${herbId}`);
}