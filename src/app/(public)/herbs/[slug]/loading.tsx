export default function HerbDetailLoading() {
  return (
    <main className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="h-4 w-32 animate-pulse rounded bg-stone-200" />

        <div className="mt-8 space-y-4 border-b border-stone-200 pb-8">
          <div className="h-4 w-24 animate-pulse rounded bg-stone-200" />
          <div className="h-12 w-2/3 animate-pulse rounded bg-stone-200" />
          <div className="h-5 w-1/2 animate-pulse rounded bg-stone-200" />
          <div className="flex gap-3 pt-2">
            <div className="h-8 w-24 animate-pulse rounded-full bg-stone-200" />
            <div className="h-8 w-28 animate-pulse rounded-full bg-stone-200" />
          </div>
          <div className="space-y-3 pt-2">
            <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
            <div className="h-4 w-[92%] animate-pulse rounded bg-stone-200" />
            <div className="h-4 w-[70%] animate-pulse rounded bg-stone-200" />
          </div>
        </div>

        <div className="mt-10 space-y-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <section key={index} className="space-y-4">
              <div className="h-8 w-40 animate-pulse rounded bg-stone-200" />
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
                <div className="h-4 w-[94%] animate-pulse rounded bg-stone-200" />
                <div className="h-4 w-[78%] animate-pulse rounded bg-stone-200" />
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}