import { PageLoadingSkeleton } from "@/components/ui/page-loading-skeleton";

/**
 * Loading state for the herb directory.
 */
export default function HerbsLoading() {
  return <PageLoadingSkeleton title="Loading herbs" cards={6} />;
}