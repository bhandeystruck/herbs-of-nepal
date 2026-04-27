import { SourceType } from "@prisma/client";
import { db } from "@/lib/prisma/client";

export type AdminSourceFilters = {
  query?: string;
  sourceType?: "all" | SourceType;
  status?: "all" | "active" | "inactive";
};

/**
 * Fetches all sources for the admin source library.
 */
export async function getAdminSources(filters: AdminSourceFilters = {}) {
  const query = filters.query?.trim();

  return db.source.findMany({
    where: {
      ...(query
        ? {
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                authors: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                organization: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                publisher: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                citation: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
      ...(filters.sourceType && filters.sourceType !== "all"
        ? {
            sourceType: filters.sourceType,
          }
        : {}),
      ...(filters.status === "active"
        ? { isActive: true }
        : filters.status === "inactive"
          ? { isActive: false }
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
 * Fetches one source by ID for editing.
 */
export async function getAdminSourceById(id: string) {
  return db.source.findUnique({
    where: { id },
    include: {
      herbs: {
        include: {
          herb: true,
        },
        orderBy: [{ section: "asc" }, { displayOrder: "asc" }],
      },
    },
  });
}