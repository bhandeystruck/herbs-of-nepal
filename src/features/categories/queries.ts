import { db } from "@/lib/prisma/client";

/**
 * Fetches all categories with published herb counts.
 */
export async function getCategories() {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      herbs: {
        where: {
          isPublished: true,
        },
        select: {
          id: true,
        },
      },
    },
  });

  return categories.map((category) => ({
    ...category,
    herbCount: category.herbs.length,
  }));
}

/**
 * Fetches a category by slug with its published herbs.
 */
export async function getCategoryBySlug(slug: string) {
  const category = await db.category.findUnique({
    where: {
      slug,
    },
    include: {
      herbs: {
        where: {
          isPublished: true,
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!category) {
    return null;
  }

  return {
    ...category,
    herbCount: category.herbs.length,
  };
}