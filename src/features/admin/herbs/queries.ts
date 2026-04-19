import { db } from "@/lib/prisma/client";

/**
 * Fetches herbs for the admin list page.
 * Includes category and source count to support quick operational review.
 */
export async function getAdminHerbs() {
  return db.herb.findMany({
    include: {
      category: true,
      _count: {
        select: {
          sources: true,
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });
}

/**
 * Fetches one herb by ID for the admin edit page.
 */
export async function getAdminHerbById(id: string) {
  return db.herb.findUnique({
    where: { id },
    include: {
      category: true,
      sources: {
        include: {
          source: true,
        },
        orderBy: [{ section: "asc" }, { displayOrder: "asc" }],
      },
    },
  });
}

/**
 * Fetches categories for admin form selects.
 */
export async function getAdminHerbCategories() {
  return db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}