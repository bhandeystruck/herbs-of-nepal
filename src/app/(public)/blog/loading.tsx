import { PageLoadingSkeleton } from "@/components/ui/page-loading-skeleton";

/**
 * Loading state for the blog listing.
 */
export default function BlogLoading() {
  return <PageLoadingSkeleton title="Loading articles" cards={3} />;
}