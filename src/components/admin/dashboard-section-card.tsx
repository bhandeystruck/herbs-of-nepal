import type { ReactNode } from "react";

type DashboardSectionCardProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function DashboardSectionCard({
  eyebrow,
  title,
  description,
  children,
}: DashboardSectionCardProps) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-stone-900">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-7 text-stone-600">{description}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}