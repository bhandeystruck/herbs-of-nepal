import Link from "next/link";
import { Container } from "@/components/layout/container";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "About",
  description:
    "Learn about Herbs of Nepal, its purpose, and its mission to present Nepalese herbal knowledge in a clear, respectful, and modern way.",
  path: "/about",
});

/**
 * Premium About page.
 * Introduces the purpose and direction of the platform with a more editorial layout.
 */
export default function AboutPage() {
  return (
    <main className="pb-16 sm:pb-24">
      <section className="border-b border-stone-200 bg-gradient-to-b from-emerald-50 to-stone-50">
        <Container className="py-16 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              About the Project
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Preserving herbal knowledge through a modern digital platform
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
              Herbs of Nepal is a modern educational platform dedicated to
              presenting Nepalese herbs, their traditional uses, cultural value,
              and important safety considerations in a format that is clear,
              respectful, and accessible.
            </p>
          </div>
        </Container>
      </section>

      <Container className="pt-16 sm:pt-20">
        <section className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Our Mission
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900">
                A respectful, structured way to explore Nepalese herbs
              </h2>

              <div className="mt-6 space-y-5 text-base leading-8 text-stone-700">
                <p>
                  Our mission is to make Nepalese herbal knowledge easier to
                  explore through a digital experience that feels modern while
                  still honoring the depth and context of traditional practice.
                </p>

                <p>
                  Rather than presenting herbs as casual trends or simplified
                  internet facts, this platform aims to organize information in a
                  way that supports thoughtful learning, cultural respect, and
                  responsible interpretation.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-emerald-900 p-8 text-white shadow-sm sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
                Why It Matters
              </p>

              <div className="mt-5 space-y-4 text-sm leading-7 text-emerald-50/90 sm:text-base">
                <p>
                  Nepal’s geography, biodiversity, and cultural traditions have
                  shaped a rich herbal heritage.
                </p>
                <p>
                  Making that knowledge easier to access helps preserve context,
                  encourage appreciation, and support more meaningful learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-stone-900">
              Cultural context
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Herbs are not presented as isolated ingredients, but as part of a
              broader tradition shaped by household practice, region, and
              generational knowledge.
            </p>
          </article>

          <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-stone-900">
              Clear educational structure
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              The platform organizes herbs by category, safety, and usage context
              so visitors can learn in a way that is clean, searchable, and easy
              to understand.
            </p>
          </article>

          <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-stone-900">
              Responsible interpretation
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              We aim to encourage curiosity without encouraging unsafe
              self-treatment, keeping safety and medical responsibility visible
              throughout the experience.
            </p>
          </article>
        </section>

        <section className="mt-16 rounded-3xl border border-stone-200 bg-stone-50 p-8 sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Looking Ahead
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-900">
              Built to grow thoughtfully
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-stone-700">
              <p>
                Herbs of Nepal is being designed as a scalable educational
                platform with room for richer herb profiles, editorial content,
                improved search, better navigation, and future administrative
                tools.
              </p>

              <p>
                The long-term goal is not just to list herbs, but to build a
                trustworthy resource that helps present Nepalese herbal knowledge
                with clarity, care, and long-term value.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/herbs"
                className="inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Explore herbs
              </Link>

              <Link
                href="/safety"
                className="inline-flex rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                Read safety guidance
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}