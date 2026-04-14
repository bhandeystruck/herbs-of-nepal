type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

/**
 * Reusable page intro block for public pages.
 * Keeps heading structure and spacing consistent across the site.
 */
export function PageIntro({
  eyebrow,
  title,
  description,
}: PageIntroProps) {
  return (
    <section className="max-w-3xl space-y-5">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
        {eyebrow}
      </p>

      <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
        {title}
      </h1>

      <p className="text-lg leading-8 text-stone-600">
        {description}
      </p>
    </section>
  );
}