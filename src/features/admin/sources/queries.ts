import { db } from "@/lib/prisma/client";

/**
 * Fetches all sources for the admin source library.
 */
export async function getAdminSources() {
  return db.source.findMany({
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