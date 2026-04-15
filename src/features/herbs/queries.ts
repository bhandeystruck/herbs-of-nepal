import { db } from "@/lib/prisma/client";
import type { HerbFilters, HerbSort } from "@/features/herbs/types";

function getOrderBy(sort: HerbSort | undefined) {
  switch (sort) {
    case "newest":
      return [{ createdAt: "desc" as const }];

    case "name-asc":
      return [{ name: "asc" as const }];

    case "name-desc":
      return [{ name: "desc" as const }];

    case "featured":
    default:
      return [
        { featured: "desc" as const },
        { createdAt: "desc" as const },
      ];
  }
}

/**
 * Fetches all published herbs for public pages.
 */
export async function getPublishedHerbs(filters: HerbFilters = {}) {
  const normalizedQuery = filters.query?.trim();
  const normalizedCategory = filters.category?.trim();
  const sort = filters.sort ?? "featured";

  return db.herb.findMany({
    where: {
      isPublished: true,
      ...(filters.featured ? { featured: true } : {}),
      ...(normalizedCategory
        ? {
            category: {
              slug: normalizedCategory,
            },
          }
        : {}),
      ...(normalizedQuery
        ? {
            OR: [
              {
                name: {
                  contains: normalizedQuery,
                  mode: "insensitive",
                },
              },
              {
                nepaliName: {
                  contains: normalizedQuery,
                  mode: "insensitive",
                },
              },
              {
                scientificName: {
                  contains: normalizedQuery,
                  mode: "insensitive",
                },
              },
              {
                shortDescription: {
                  contains: normalizedQuery,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: normalizedQuery,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },
    include: {
      category: true,
    },
    orderBy: getOrderBy(sort),
  });
}

/**
 * Fetches a single published herb by slug with trust/source metadata.
 */
export async function getPublishedHerbBySlug(slug: string) {
  return db.herb.findFirst({
    where: {
      slug,
      isPublished: true,
    },
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
 * Fetches featured herbs for the homepage.
 */
export async function getFeaturedHerbs(limit = 3) {
  return db.herb.findMany({
    where: {
      isPublished: true,
      featured: true,
    },
    include: {
      category: true,
    },
    orderBy: [{ createdAt: "desc" }],
    take: limit,
  });
}