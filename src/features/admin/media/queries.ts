import { db } from "@/lib/prisma/client";

/**
 * Fetches herb records that currently have an image path.
 */
export async function getAdminHerbMediaRecords() {
  return db.herb.findMany({
    where: {
      imagePath: {
        not: null,
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      imagePath: true,
      imageAlt: true,
      imageSourceName: true,
      imageSourceUrl: true,
      imageLicense: true,
      imagePhotographer: true,
      imageVerifiedAt: true,
      updatedAt: true,
    },
    orderBy: [{ updatedAt: "desc" }],
  });
}

/**
 * Fetches blog records that currently have a featured image path.
 */
export async function getAdminBlogMediaRecords() {
  return db.blogPost.findMany({
    where: {
      featuredImagePath: {
        not: null,
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      featuredImagePath: true,
      featuredImageAlt: true,
      imageSourceName: true,
      imageSourceUrl: true,
      imageLicense: true,
      imagePhotographer: true,
      updatedAt: true,
    },
    orderBy: [{ updatedAt: "desc" }],
  });
}