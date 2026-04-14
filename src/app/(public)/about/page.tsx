import { Container } from "@/components/layout/container";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "About",
  description:
    "Learn about Herbs of Nepal, its purpose, and its mission to present Nepalese herbal knowledge in a clear, respectful, and modern way.",
  path: "/about",
});

/**
 * About page.
 * Introduces the purpose and direction of the platform.
 */
export default function AboutPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container>
        <div className="max-w-4xl">
          <header className="border-b border-stone-200 pb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              About the Project
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              About Herbs of Nepal
            </h1>

            <p className="mt-4 text-lg leading-8 text-stone-600">
              Herbs of Nepal is a modern educational platform dedicated to sharing
              knowledge about herbs found in Nepal, their traditional uses,
              cultural significance, and important safety considerations.
            </p>
          </header>

          <div className="mt-10 space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-stone-900">
                Our mission
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Our mission is to present Nepalese herbal knowledge in a clean,
                accessible, and well-structured digital format so that more people
                can explore it with curiosity, respect, and responsibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-900">
                Why this platform matters
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Nepal has a rich heritage of plant knowledge shaped by geography,
                tradition, and local practice. This platform aims to make that
                knowledge easier to discover while preserving the importance of
                context, safety, and cultural respect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-900">
                What you can explore
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                Visitors can browse herbs by name and category, read about
                traditional uses, explore cultural relevance, and review safety
                notes designed to encourage responsible interpretation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-900">
                Our approach
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700">
                We aim to balance traditional knowledge with modern presentation.
                The platform is being designed to be educational, structured, and
                scalable, with room for future additions such as richer herb
                profiles, editorial content, search, and administration tools.
              </p>
            </section>

            <section className="rounded-2xl bg-stone-100 p-6">
              <h2 className="text-xl font-semibold text-stone-900">
                A respectful note
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-700">
                This project values herbal knowledge as part of a broader cultural
                and educational tradition. It encourages thoughtful learning, not
                casual medical self-treatment.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}