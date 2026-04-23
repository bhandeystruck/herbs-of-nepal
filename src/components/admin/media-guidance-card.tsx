import type { ReactNode } from "react";

type MediaGuidanceCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

/**
 * Reusable content card for the admin media guidance page.
 */
export function MediaGuidanceCard({
  eyebrow,
  title,
  description,
  children,
}: MediaGuidanceCardProps) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-stone-600">{description}</p>

      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  );
}