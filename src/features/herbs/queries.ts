import { db } from "@/lib/prisma/client";
import type { HerbFilters } from "@/features/herbs/types";

/**
 * Fetches all published herbs for public pages.
 */
export async function getPublishedHerbs(filters: HerbFilters = {}) {
  const normalizedQuery = filters.query?.trim();
  const normalizedCategory = filters.category?.trim();

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
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

/**
 * Fetches a single published herb by slug.
 */
export async function getPublishedHerbBySlug(slug: string) {
  return db.herb.findFirst({
    where: {
      slug,
      isPublished: true,
    },
    include: {
      category: true,
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