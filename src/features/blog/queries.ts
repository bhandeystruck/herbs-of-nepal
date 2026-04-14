import { db } from "@/lib/prisma/client";

/**
 * Fetches all published blog posts for the public site.
 */
export async function getPublishedBlogPosts() {
  return db.blogPost.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Fetches a single published blog post by slug.
 * Used later for the blog detail page.
 */
export async function getPublishedBlogPostBySlug(slug: string) {
  return db.blogPost.findFirst({
    where: {
      slug,
      isPublished: true,
    },
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
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}