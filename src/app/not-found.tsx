import Link from "next/link";
import { Leaf } from "lucide-react";
import { Container } from "@/components/layout/container";

/**
 * Global not-found page.
 * Used whenever a route or dynamic resource cannot be found.
 */
export default function NotFoundPage() {
  return (
    <main className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Leaf className="h-7 w-7 text-emerald-700" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Page Not Found
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            We couldn’t find that page.
          </h1>

          <p className="mt-5 text-base leading-8 text-stone-600 sm:text-lg">
            The page you are looking for may have been moved, removed, or may not
            exist yet. You can continue exploring the herbal knowledge library
            from the links below.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Go to homepage
            </Link>

            <Link
              href="/herbs"
              className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              Browse herbs
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}