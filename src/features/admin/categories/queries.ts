import { db } from "@/lib/prisma/client";

/**
 * Fetches all categories for the admin category library.
 */
export async function getAdminCategories() {
  return db.category.findMany({
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