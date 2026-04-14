import { PageLoadingSkeleton } from "@/components/ui/page-loading-skeleton";

/**
 * Loading state for category pages.
 */
export default function CategoriesLoading() {
  return <PageLoadingSkeleton title="Loading categories" cards={6} />;
}