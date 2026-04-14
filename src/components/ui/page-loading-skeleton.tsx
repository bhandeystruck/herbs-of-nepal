type PageLoadingSkeletonProps = {
  title?: string;
  lines?: number;
  cards?: number;
};

/**
 * Reusable page-level skeleton loader.
 * Keeps route loading states visually consistent.
 */
export function PageLoadingSkeleton({
  title = "Loading content",
  lines = 3,
  cards = 3,
}: PageLoadingSkeletonProps) {
  return (
    <main className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="max-w-3xl space-y-5">
          <div className="h-4 w-40 animate-pulse rounded bg-stone-200" />
          <div className="h-12 w-3/4 animate-pulse rounded bg-stone-200" />

          <div className="space-y-3">
            {Array.from({ length: lines }).map((_, index) => (
              <div
                key={index}
                className="h-4 animate-pulse rounded bg-stone-200"
                style={{
                  width: index === lines - 1 ? "75%" : "100%",
                }}
              />
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: cards }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-4">
                <div className="h-4 w-20 animate-pulse rounded bg-stone-200" />
                <div className="h-7 w-2/3 animate-pulse rounded bg-stone-200" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-stone-200" />

                <div className="space-y-3 pt-2">
                  <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
                  <div className="h-4 w-[90%] animate-pulse rounded bg-stone-200" />
                  <div className="h-4 w-[70%] animate-pulse rounded bg-stone-200" />
                </div>

                <div className="pt-4">
                  <div className="h-4 w-28 animate-pulse rounded bg-stone-200" />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}