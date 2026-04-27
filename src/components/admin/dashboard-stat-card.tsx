type DashboardStatCardProps = {
  label: string;
  value: number;
  hint?: string;
};

export function DashboardStatCard({
  label,
  value,
  hint,
}: DashboardStatCardProps) {
  return (
    <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
        {value}
      </p>
      {hint ? (
        <p className="mt-3 text-sm leading-7 text-stone-600">{hint}</p>
      ) : null}
    </article>
  );
}