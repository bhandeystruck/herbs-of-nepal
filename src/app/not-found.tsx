import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG } from "@/lib/constants/site";

/**
 * Global not-found page.
 * Used whenever a route or dynamic resource cannot be found.
 */
export default function NotFoundPage() {
  return (
    <main className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Link href="/" className="flex shrink-0 items-center text-start gap-3">
          <span className="flex h-10 w-10 items-start justify-center rounded-full">
            <Image
            src="/branding/herbs-of-nepal-logo.svg"
            alt="Herbs of Nepal logo"
            height={200}
            width={200}
            />
          </span>

          <div className="flex flex-col">
            <span className="text-md font-semibold tracking-normal text-stone-900 sm:text-base">
              {SITE_CONFIG.name}
            </span>
            <span className="text-sm text-stone-500 sm:block">
              Nepalese herbal knowledge base.
            </span>
          </div>
        </Link>

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