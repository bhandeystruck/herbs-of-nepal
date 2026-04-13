import { Container } from "@/components/layout/container";

/**
 * Public homepage placeholder.
 * We will replace this with a full homepage UI later.
 */
export default function HomePage() {
  return (
    <main className="py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Nepalese Herbal Knowledge
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Discover the wisdom of Nepalese herbs.
          </h1>

          <p className="text-lg leading-8 text-stone-600">
            Explore traditional herbal knowledge, benefits, preparation methods,
            and safety guidance through a clean, modern educational platform.
          </p>
        </div>
      </Container>
    </main>
  );
}