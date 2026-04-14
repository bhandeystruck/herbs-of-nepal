export default function BlogDetailLoading() {
  return (
    <main className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="h-4 w-28 animate-pulse rounded bg-stone-200" />

        <div className="mt-8 border-b border-stone-200 pb-8">
          <div className="h-4 w-20 animate-pulse rounded bg-stone-200" />
          <div className="mt-4 h-12 w-3/4 animate-pulse rounded bg-stone-200" />
          <div className="mt-4 h-4 w-32 animate-pulse rounded bg-stone-200" />

          <div className="mt-6 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-stone-200" />
            <div className="h-4 w-[92%] animate-pulse rounded bg-stone-200" />
            <div className="h-4 w-[76%] animate-pulse rounded bg-stone-200" />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-4 animate-pulse rounded bg-stone-200"
              style={{ width: index % 3 === 0 ? "88%" : "100%" }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}