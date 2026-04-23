import { db } from "@/lib/prisma/client";

export type AdminBlogFilters = {
  query?: string;
  status?: "all" | "published" | "draft";
};

/**
 * Fetches blog posts for the admin blog library.
 */
export async function getAdminBlogPosts(filters: AdminBlogFilters = {}) {
  const query = filters.query?.trim();

  return db.blogPost.findMany({
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
                slug: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                excerpt: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                content: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
      ...(filters.status === "published"
        ? { isPublished: true }
        : filters.status === "draft"
          ? { isPublished: false }
          : {}),
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });
}

/**
 * Fetches one blog post by ID for editing.
 */
export async function getAdminBlogPostById(id: string) {
  return db.blogPost.findUnique({
    where: { id },
  });
}