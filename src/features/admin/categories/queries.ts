import { db } from "@/lib/prisma/client";

export type AdminCategoryFilters = {
  query?: string;
};

/**
 * Fetches all categories for the admin category library.
 */
export async function getAdminCategories(filters: AdminCategoryFilters = {}) {
  const query = filters.query?.trim();

  return db.category.findMany({
    where: {
      ...(query
        ? {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                slug: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },
    include: {
      _count: {
        select: {
          herbs: true,
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });
}

/**
 * Fetches one category by ID for editing.
 */
export async function getAdminCategoryById(id: string) {
  return db.category.findUnique({
    where: { id },
    include: {
      herbs: {
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
        take: 10,
      },
      _count: {
        select: {
          herbs: true,
        },
      },
    },
  });
}