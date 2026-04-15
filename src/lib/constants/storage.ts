/**
 * Central storage constants.
 * Keeps Supabase bucket names and path builders in one place.
 */
export const STORAGE_BUCKETS = {
  herbMedia: "herb-media",
} as const;

/**
 * Standard path builders for real herb and content media.
 */
export const STORAGE_PATHS = {
  herbPrimary: (slug: string, extension: string) =>
    `herbs/${slug}/primary.${extension}`,
  herbSupplementary: (slug: string, fileName: string) =>
    `herbs/${slug}/${fileName}`,
  blogFeatured: (slug: string, extension: string) =>
    `blog/${slug}/featured.${extension}`,
  branding: (fileName: string) => `branding/${fileName}`,
  category: (slug: string, extension: string) =>
    `categories/${slug}.${extension}`,
} as const;