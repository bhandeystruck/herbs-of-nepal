import { db } from "@/lib/prisma/client";

/**
 * Fetches all published blog posts for the public blog listing page.
 */
export async function getPublishedBlogPosts() {
  return db.blogPost.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [{ createdAt: "desc" }],
  });
}

/**
 * Fetches the latest published blog posts for homepage previews.
 */
export async function getLatestPublishedBlogPosts(limit = 3) {
  return db.blogPost.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [{ createdAt: "desc" }],
    take: limit,
  });
}

/**
 * Fetches a single published blog post by slug.
 */
export async function getPublishedBlogPostBySlug(slug: string) {
  return db.blogPost.findFirst({
    where: {
      slug,
      isPublished: true,
    },
  });
}