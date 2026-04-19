"use server";

import { HerbSourceSection } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma/client";
import type { HerbSourceLinkState } from "@/features/admin/herb-sources/form-config";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value ? value : null;
}

function getOptionalInt(formData: FormData, key: string) {
  const value = getString(formData, key);
  if (!value) {
    return 0;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function isHerbSourceSection(value: string): value is HerbSourceSection {
  return (
    value === "GENERAL" ||
    value === "OVERVIEW" ||
    value === "TRADITIONAL_USE" ||
    value === "SCIENCE" ||
    value === "SAFETY" ||
    value === "PREPARATION" ||
    value === "INTERACTIONS"
  );
}

function revalidateHerbSourcePaths(herbId: string, herbSlug: string, categorySlug: string) {
  revalidatePath("/admin/herbs");
  revalidatePath(`/admin/herbs/${herbId}`);
  revalidatePath(`/herbs/${herbSlug}`);
  revalidatePath(`/categories/${categorySlug}`);
}

export async function linkSourceToHerbAction(
  _prevState: HerbSourceLinkState,
  formData: FormData
): Promise<HerbSourceLinkState> {
  const herbId = getString(formData, "herbId");
  const sourceId = getString(formData, "sourceId");
  const sectionValue = getString(formData, "section");
  const displayOrder = getOptionalInt(formData, "displayOrder");
  const note = getOptionalString(formData, "note");

  if (!herbId) {
    return { message: "", error: "Missing herb ID." };
  }

  if (!sourceId) {
    return { message: "", error: "Please select a source." };
  }

  if (!isHerbSourceSection(sectionValue)) {
    return { message: "", error: "Please select a valid herb source section." };
  }

  const herb = await db.herb.findUnique({
    where: { id: herbId },
    include: {
      category: true,
    },
  });

  if (!herb) {
    return { message: "", error: "Herb not found." };
  }

  const source = await db.source.findUnique({
    where: { id: sourceId },
    select: { id: true },
  });

  if (!source) {
    return { message: "", error: "Source not found." };
  }

  try {
    await db.herbSource.create({
      data: {
        herbId,
        sourceId,
        section: sectionValue,
        displayOrder,
        note,
      },
    });
  } catch {
    return {
      message: "",
      error:
        "Could not link this source. It may already be linked to this herb for the same section.",
    };
  }

  revalidateHerbSourcePaths(herb.id, herb.slug, herb.category.slug);

  return {
    message: "Source linked successfully.",
    error: "",
  };
}

export async function unlinkSourceFromHerbAction(formData: FormData) {
  const herbSourceId = getString(formData, "herbSourceId");

  if (!herbSourceId) {
    return;
  }

  const herbSource = await db.herbSource.findUnique({
    where: { id: herbSourceId },
    include: {
      herb: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!herbSource) {
    return;
  }

  await db.herbSource.delete({
    where: { id: herbSourceId },
  });

  revalidateHerbSourcePaths(
    herbSource.herb.id,
    herbSource.herb.slug,
    herbSource.herb.category.slug
  );
}