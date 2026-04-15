import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { HerbSourcesList } from "@/components/herbs/herb-source-list";
import { HerbTrustPanel } from "@/components/herbs/herb-trust-panel";
import { getPublishedHerbBySlug } from "@/features/herbs/queries";
import { SITE_CONFIG } from "@/lib/constants/site";
import { jsonToStringArray } from "@/lib/utils/json";
import Image from "next/image";
import { getHerbImageUrl } from "@/lib/utils/media";

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
 * Dynamic herb detail page with trust signals and sources.
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
  const herbImageUrl = getHerbImageUrl(herb.imagePath);

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

          <HerbTrustPanel
            evidenceLevel={herb.evidenceLevel}
            lastReviewedAt={herb.lastReviewedAt}
            reviewedByName={herb.reviewedByName}
            reviewedByRole={herb.reviewedByRole}
            editorialSummary={herb.editorialSummary}
            sourceCount={herb.sources.length}
          />

          {herbImageUrl ? (
            <section className="mt-10 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={herbImageUrl}
                  alt={herb.imageAlt ?? `${herb.name} herb image`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>

              <div className="border-t border-stone-200 bg-stone-50 px-5 py-4">
                <p className="text-sm font-medium text-stone-800">
                  Real plant image
                </p>

                <p className="mt-1 text-xs leading-6 text-stone-600">
                  {herb.imageSourceName ?? "Source metadata not yet listed"}
                  {herb.imageLicense ? ` • ${herb.imageLicense}` : ""}
                </p>
              </div>
            </section>
          ) : null}

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
  <section className="relative mt-10 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-6 shadow-sm sm:p-8">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-rose-200/20 blur-3xl" />
    </div>

    <div className="relative">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
          Safety Guidance
        </span>

        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow-sm">
          Read with care
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-stone-900">
        Safety Notes
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700 sm:text-base">
        This section highlights caution-related information to help readers
        interpret the herb profile more responsibly. It should not replace
        advice from a qualified healthcare professional.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {herb.sideEffects ? (
          <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
            <h3 className="text-base font-semibold text-stone-900">
              Side Effects
            </h3>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              {herb.sideEffects}
            </p>
          </div>
        ) : null}

        {herb.dosageNotes ? (
          <div className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
            <h3 className="text-base font-semibold text-stone-900">
              Dosage Notes
            </h3>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              {herb.dosageNotes}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  </section>
) : null}

          <HerbSourcesList items={herb.sources} />

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