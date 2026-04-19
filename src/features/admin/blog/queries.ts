import { db } from "@/lib/prisma/client";

/**
 * Fetches blog posts for the admin blog library.
 */
export async function getAdminBlogPosts() {
  return db.blogPost.findMany({
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