import { Container } from "@/components/layout/container";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Safety Guidance",
  description:
    "Read important safety guidance about herbal use, educational limitations, and responsible interpretation of herbal information.",
  path: "/safety",
});

/**
 * Safety guidance page.
 * This page sets the responsible educational tone of the platform.
 */
export default function SafetyPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container>
        <div className="max-w-4xl">
          <header className="border-b border-stone-200 pb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Safety Guidance
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              Responsible use of herbal information
            </h1>

            <p className="mt-4 text-lg leading-8 text-stone-600">
              Herbs of Nepal is an educational platform. The information provided
              here is intended to support learning and cultural understanding, not
              to replace professional medical advice, diagnosis, or treatment.
            </p>
          </header>

          <div className="mt-10 space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-stone-900">
                Educational purpose only
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                This platform is designed to share knowledge about Nepalese herbs,
                traditional uses, and cultural practices in a clear and respectful
                way. It should not be used as a substitute for clinical guidance
                or emergency care.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-900">
                Individual responses may vary
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Herbs may affect different people in different ways depending on
                age, medical history, allergies, pregnancy status, medications,
                and overall health. A herb that is traditionally used in one
                context may not be appropriate for every individual.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-900">
                Consult qualified professionals
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Before using herbs medicinally, consult a qualified healthcare
                professional or an appropriately trained practitioner, especially
                if you are pregnant, breastfeeding, managing a health condition,
                or taking prescription medication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-900">
                Not all traditional uses are medically proven
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Some herbs on this platform are presented with traditional or
                historical uses. Traditional use does not automatically mean that
                a claim has been validated by modern clinical research. Users
                should interpret such information carefully and responsibly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-900">
                Use caution with dosage and preparation
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Preparation method, concentration, and amount can affect how a
                herb behaves. Dosage decisions should not be made casually or
                based only on general online information. Always seek qualified
                guidance when using herbs beyond culinary or customary everyday
                contexts.
              </p>
            </section>

            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-xl font-semibold text-amber-900">
                Important reminder
              </h2>
              <p className="mt-3 text-sm leading-7 text-amber-900/90">
                If you are experiencing severe symptoms, an allergic reaction,
                difficulty breathing, chest pain, or any urgent medical concern,
                seek immediate medical attention rather than relying on herbal
                content online.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}