import Link from "next/link";
import { Container } from "@/components/layout/container";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Safety Guidance",
  description:
    "Read important safety guidance about herbal use, educational limitations, and responsible interpretation of herbal information.",
  path: "/safety",
});

/**
 * Premium Safety page.
 * Sets a strong trust-first tone with more elevated layout and hierarchy.
 */
export default function SafetyPage() {
  return (
    <main className="pb-16 sm:pb-24">
      <section className="border-b border-stone-200 bg-gradient-to-b from-amber-50 to-stone-50">
        <Container className="py-16 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Safety Guidance
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Herbal knowledge should be explored responsibly
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
              Herbs of Nepal is an educational platform. The content shared here
              is intended to support learning and cultural understanding, not to
              replace professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </Container>
      </section>

      <Container className="pt-16 sm:pt-20">
        <section className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            <article className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-semibold text-stone-900">
                Educational use only
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                This platform is designed to present information about Nepalese
                herbs, traditional uses, and cultural practices in a responsible
                educational format. It is not a substitute for clinical care,
                diagnosis, or emergency medical support.
              </p>
            </article>

            <article className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-semibold text-stone-900">
                Individual responses can vary
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Herbs may affect individuals differently depending on age,
                allergies, pregnancy, medications, medical history, and overall
                health. Traditional use in one context does not mean a herb is
                automatically suitable for every person.
              </p>
            </article>

            <article className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-semibold text-stone-900">
                Consult qualified professionals
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Before using herbs medicinally, consult a qualified healthcare
                professional or appropriately trained practitioner, especially if
                you are pregnant, breastfeeding, managing a health condition, or
                taking prescription medication.
              </p>
            </article>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-3xl border border-amber-200 bg-amber-50 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Important Reminder
              </p>

              <div className="mt-5 space-y-4 text-sm leading-7 text-amber-950/90">
                <p>
                  Traditional knowledge and modern medical evidence are not
                  always the same thing.
                </p>
                <p>
                  Preparation, concentration, and dosage can change how a herb
                  behaves.
                </p>
                <p>
                  Never rely on online herbal content for urgent symptoms or
                  emergencies.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <h3 className="text-xl font-semibold text-stone-900">
              Traditional use does not equal guaranteed proof
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Some herbs are presented with cultural or historical uses. Those
              uses may be valuable in context, but they should not automatically
              be treated as clinically proven medical claims.
            </p>
          </article>

          <article className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <h3 className="text-xl font-semibold text-stone-900">
              Dosage and preparation need caution
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              The way a herb is prepared and the amount used can change its
              effects significantly. Dosage should never be assumed casually from
              general website information alone.
            </p>
          </article>
        </section>

        <section className="mt-16 rounded-3xl bg-stone-900 px-8 py-10 text-white sm:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Emergency Guidance
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Seek immediate care for urgent medical symptoms
            </h2>

            <p className="mt-5 text-base leading-8 text-stone-200">
              If you are experiencing severe symptoms, breathing difficulty,
              chest pain, a strong allergic reaction, or any urgent health
              concern, seek immediate medical attention rather than relying on
              herbal information online.
            </p>

            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
              >
                Learn more about this platform
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}