import { STORAGE_BUCKETS } from "@/lib/constants/storage";

/**
 * Builds a public Supabase Storage URL for a file in a public bucket.
 * Returns null when no path exists.
 */
export function getSupabasePublicFileUrl(
  path?: string | null,
  bucket: string = STORAGE_BUCKETS.herbMedia
) {
  if (!path) {
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return null;
  }

  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

/**
 * Convenience helper for herb images.
 */
export function getHerbImageUrl(path?: string | null) {
  return getSupabasePublicFileUrl(path, STORAGE_BUCKETS.herbMedia);
}

/**
 * Convenience helper for blog images.
 */
export function getBlogImageUrl(path?: string | null) {
  return getSupabasePublicFileUrl(path, STORAGE_BUCKETS.herbMedia);
}