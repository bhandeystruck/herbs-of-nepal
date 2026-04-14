import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { getPublishedHerbBySlug } from "@/features/herbs/queries";
import { SITE_CONFIG } from "@/lib/constants/site";
import { jsonToStringArray } from "@/lib/utils/json";

type HerbDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Dynamic metadata for each herb detail page.
 */
export async function generateMetadata({
  params,
}: HerbDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const herb = await getPublishedHerbBySlug(slug);

  if (!herb) {
    return {
      title: "Herb Not Found",
    };
  }

  return {
    title: herb.seoTitle ?? `${herb.name} | ${SITE_CONFIG.name}`,
    description: herb.seoDescription ?? herb.shortDescription,
  };
}

/**
 * Dynamic herb detail page.
 */
export default async function HerbDetailPage({
  params,
}: HerbDetailPageProps) {
  const { slug } = await params;
  const herb = await getPublishedHerbBySlug(slug);

  if (!herb) {
    notFound();
  }

  const benefits = jsonToStringArray(herb.benefits);
  const uses = jsonToStringArray(herb.uses);
  const precautions = jsonToStringArray(herb.precautions);

  return (
    <main className="py-16 sm:py-24">
      <Container>
        <div className="max-w-4xl">
          <div className="mb-8">
            <Link
              href="/herbs"
              className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
            >
              ← Back to herbs
            </Link>
          </div>

          <header className="space-y-4 border-b border-stone-200 pb-8">
            {herb.nepaliName ? (
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {herb.nepaliName}
              </p>
            ) : null}

            <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              {herb.name}
            </h1>

            {herb.scientificName ? (
              <p className="text-lg italic text-stone-500">
                {herb.scientificName}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
             <Link
                href={`/herbs?category=${herb.category.slug}`}
                className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700 transition hover:bg-stone-200"
                >
                {herb.category.name}
            </Link>

              {herb.region ? (
                <span className="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700">
                  {herb.region}
                </span>
              ) : null}

              {herb.featured ? (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                  Featured herb
                </span>
              ) : null}
            </div>

            <p className="pt-2 text-lg leading-8 text-stone-600">
              {herb.shortDescription}
            </p>
          </header>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-stone-900">
              Description
            </h2>
            <p className="mt-4 text-base leading-8 text-stone-700">
              {herb.description}
            </p>
          </section>

          <section className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-stone-900">
                Benefits
              </h2>

              {benefits.length > 0 ? (
                <ul className="mt-4 list-disc space-y-3 pl-6 text-stone-700">
                  {benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-stone-600">No benefits listed yet.</p>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-stone-900">Uses</h2>

              {uses.length > 0 ? (
                <ul className="mt-4 list-disc space-y-3 pl-6 text-stone-700">
                  {uses.map((use) => (
                    <li key={use}>{use}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-stone-600">No uses listed yet.</p>
              )}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-stone-900">
              Precautions
            </h2>

            {precautions.length > 0 ? (
              <ul className="mt-4 list-disc space-y-3 pl-6 text-stone-700">
                {precautions.map((precaution) => (
                  <li key={precaution}>{precaution}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-stone-600">
                No precautions listed yet.
              </p>
            )}
          </section>

          {(herb.sideEffects || herb.dosageNotes) ? (
            <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6">
              <h2 className="text-2xl font-semibold text-stone-900">
                Safety Notes
              </h2>

              {herb.sideEffects ? (
                <div className="mt-4">
                  <h3 className="text-base font-semibold text-stone-900">
                    Side Effects
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-stone-700">
                    {herb.sideEffects}
                  </p>
                </div>
              ) : null}

              {herb.dosageNotes ? (
                <div className="mt-4">
                  <h3 className="text-base font-semibold text-stone-900">
                    Dosage Notes
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-stone-700">
                    {herb.dosageNotes}
                  </p>
                </div>
              ) : null}
            </section>
          ) : null}

          <section className="mt-10 rounded-2xl bg-emerald-900 p-6 text-white">
            <h2 className="text-xl font-semibold">Important disclaimer</h2>
            <p className="mt-3 text-sm leading-7 text-emerald-50/90">
              This content is for educational purposes only and should not be
              used as a substitute for medical advice, diagnosis, or treatment.
              Always consult a qualified healthcare professional before using
              herbs medicinally.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}