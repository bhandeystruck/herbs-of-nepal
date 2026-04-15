import Link from "next/link";
import { Container } from "@/components/layout/container";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Editorial Standards",
  description:
    "Learn how Herbs of Nepal researches, reviews, cites, and presents herbal information responsibly.",
  path: "/editorial-standards",
});

/**
 * Editorial standards page.
 * Explains how the platform approaches sourcing, review, and trust.
 */
export default function EditorialStandardsPage() {
  return (
    <main className="pb-16 sm:pb-24">
      <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-emerald-50 via-stone-50 to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-7rem] top-[-4rem] h-48 w-48 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute right-[-6rem] top-8 h-56 w-56 rounded-full bg-lime-100/30 blur-3xl" />
        </div>

        <Container className="relative py-16 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Editorial Standards
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              How we make this herbal information more trustworthy
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
              Herbs of Nepal is designed as an educational platform, not a source
              of casual unsupported claims. We aim to present herbal information
              with clear sourcing, visible review context, and responsible
              distinctions between traditional use and modern research.
            </p>
          </div>
        </Container>
      </section>

      <Container className="pt-16 sm:pt-20">
        <section className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            <article className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-semibold text-stone-900">
                1. We distinguish traditional use from scientific evidence
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Many herbs have long-standing cultural and household use in Nepal
                and across South Asia. Traditional use can be meaningful and
                historically important, but it is not automatically the same as
                modern clinical evidence. We aim to keep that distinction visible
                throughout the site.
              </p>
            </article>

            <article className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-semibold text-stone-900">
                2. We use source-backed content structure
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Herb pages are being built to include source references, review
                metadata, evidence labels, and section-level citations. This
                means visitors can see not only what is written, but also what
                kind of source supports the information.
              </p>
            </article>

            <article className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-semibold text-stone-900">
                3. We prioritize higher-trust reference types
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Where possible, we prioritize stronger source categories such as
                government health resources, peer-reviewed reviews, institutional
                publications, and reputable reference materials. Traditional and
                ethnobotanical sources may also be included where cultural
                context is important.
              </p>
            </article>

            <article className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-semibold text-stone-900">
                4. We avoid overclaiming
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                This platform should not make herbs sound more proven, more safe,
                or more medically certain than the available support allows. When
                evidence is limited, mixed, or primarily traditional, that should
                be stated clearly rather than hidden behind confident language.
              </p>
            </article>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-3xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Trust Principles
              </p>

              <div className="mt-5 space-y-4 text-sm leading-7 text-stone-700">
                <p>Clear sourcing</p>
                <p>Visible review information</p>
                <p>Honest evidence language</p>
                <p>Cultural respect</p>
                <p>Strong safety framing</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <h3 className="text-xl font-semibold text-stone-900">
              What this site is
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              An educational platform that organizes Nepalese herbal knowledge in
              a modern, structured, and accountable way.
            </p>
          </article>

          <article className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <h3 className="text-xl font-semibold text-stone-900">
              What this site is not
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              It is not a substitute for medical care, diagnosis, emergency
              advice, or individualized treatment recommendations.
            </p>
          </article>
        </section>

        <section className="mt-16 rounded-3xl bg-stone-900 px-8 py-10 text-white sm:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Responsible Interpretation
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Read with curiosity, not blind certainty
            </h2>

            <p className="mt-5 text-base leading-8 text-stone-200">
              We want the platform to support learning, not overconfidence.
              Herbal information should be read with context, caution, and an
              understanding that traditional use, educational summaries, and
              clinical evidence are not always the same thing.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/safety"
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
              >
                Read safety guidance
              </Link>

              <Link
                href="/herbs"
                className="inline-flex rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore herb pages
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}