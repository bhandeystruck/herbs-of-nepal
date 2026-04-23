import { EvidenceLevel } from "@prisma/client";
import { db } from "@/lib/prisma/client";

export type AdminHerbFilters = {
  query?: string;
  categoryId?: string;
  status?: "all" | "published" | "draft";
  featured?: "all" | "featured" | "not-featured";
  evidenceLevel?: "all" | EvidenceLevel;
};

/**
 * Fetches herbs for the admin list page.
 * Includes category and source count to support quick operational review.
 */
export async function getAdminHerbs(filters: AdminHerbFilters = {}) {
  const query = filters.query?.trim();

  return db.herb.findMany({
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
                nepaliName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                scientificName: {
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
            ],
          }
        : {}),
      ...(filters.categoryId
        ? {
            categoryId: filters.categoryId,
          }
        : {}),
      ...(filters.status === "published"
        ? { isPublished: true }
        : filters.status === "draft"
          ? { isPublished: false }
          : {}),
      ...(filters.featured === "featured"
        ? { featured: true }
        : filters.featured === "not-featured"
          ? { featured: false }
          : {}),
      ...(filters.evidenceLevel && filters.evidenceLevel !== "all"
        ? { evidenceLevel: filters.evidenceLevel }
        : {}),
    },
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