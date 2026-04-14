import { PageLoadingSkeleton } from "@/components/ui/page-loading-skeleton";

/**
 * Loading state for category detail pages.
 */
export default function CategoryDetailLoading() {
  return <PageLoadingSkeleton title="Loading category" cards={6} />;
}