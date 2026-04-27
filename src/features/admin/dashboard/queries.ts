import { db } from "@/lib/prisma/client";

/**
 * Fetches summary metrics and recent records for the admin dashboard.
 */
export async function getAdminDashboardData() {
  const [
    totalHerbs,
    publishedHerbs,
    draftHerbs,
    totalBlogPosts,
    publishedBlogPosts,
    draftBlogPosts,
    totalSources,
    inactiveSources,
    totalCategories,
    herbsWithoutSources,
    herbsWithoutImages,
    herbsWithoutReviewDate,
    blogWithoutFeaturedImage,
    recentHerbs,
    recentBlogPosts,
    recentSources,
  ] = await Promise.all([
    db.herb.count(),
    db.herb.count({
      where: { isPublished: true },
    }),
    db.herb.count({
      where: { isPublished: false },
    }),
    db.blogPost.count(),
    db.blogPost.count({
      where: { isPublished: true },
    }),
    db.blogPost.count({
      where: { isPublished: false },
    }),
    db.source.count(),
    db.source.count({
      where: { isActive: false },
    }),
    db.category.count(),
    db.herb.count({
      where: {
        sources: {
          none: {},
        },
      },
    }),
    db.herb.count({
      where: {
        OR: [{ imagePath: null }, { imagePath: "" }],
      },
    }),
    db.herb.count({
      where: {
        lastReviewedAt: null,
      },
    }),
    db.blogPost.count({
      where: {
        OR: [{ featuredImagePath: null }, { featuredImagePath: "" }],
      },
    }),
    db.herb.findMany({
      orderBy: [{ updatedAt: "desc" }],
      take: 5,
      include: {
        category: true,
        _count: {
          select: {
            sources: true,
          },
        },
      },
    }),
    db.blogPost.findMany({
      orderBy: [{ updatedAt: "desc" }],
      take: 5,
    }),
    db.source.findMany({
      orderBy: [{ updatedAt: "desc" }],
      take: 5,
      include: {
        _count: {
          select: {
            herbs: true,
          },
        },
      },
    }),
  ]);

  return {
    stats: {
      totalHerbs,
      publishedHerbs,
      draftHerbs,
      totalBlogPosts,
      publishedBlogPosts,
      draftBlogPosts,
      totalSources,
      inactiveSources,
      totalCategories,
      herbsWithoutSources,
      herbsWithoutImages,
      herbsWithoutReviewDate,
      blogWithoutFeaturedImage,
    },
    recentHerbs,
    recentBlogPosts,
    recentSources,
  };
}