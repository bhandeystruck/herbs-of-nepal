import { cn } from "@/lib/utils/cn";

type StatusBadgeProps = {
  label: string;
  tone?: "default" | "success" | "warning" | "neutral";
};

/**
 * Small reusable badge for admin status indicators.
 */
export function StatusBadge({
  label,
  tone = "default",
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        tone === "success" && "bg-emerald-50 text-emerald-700",
        tone === "warning" && "bg-amber-50 text-amber-700",
        tone === "neutral" && "bg-stone-100 text-stone-700",
        tone === "default" && "bg-blue-50 text-blue-700"
      )}
    >
      {label}
    </span>
  );
}