"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils/cn";

type HeaderSearchProps = {
  initialValue?: string;
  mobile?: boolean;
  onSubmitComplete?: () => void;
};

/**
 * Global header search.
 * Sends the user to the herb directory using the existing URL-based query filter.
 */
export function HeaderSearch({
  initialValue = "",
  mobile = false,
  onSubmitComplete,
}: HeaderSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/herbs");
      onSubmitComplete?.();
      return;
    }

    router.push(`/herbs?q=${encodeURIComponent(trimmedQuery)}`);
    onSubmitComplete?.();
  }

  return (
    <form onSubmit={handleSubmit} className={cn(!mobile && "hidden lg:block")}>
      <div
        className={cn(
          "flex items-center border border-stone-300 bg-white shadow-sm transition focus-within:border-emerald-500",
          mobile
            ? "h-12 w-full rounded-2xl pl-4 pr-2"
            : "h-11 w-[320px] rounded-full pl-4 pr-2"
        )}
      >
        <Search className="h-4 w-4 text-stone-400" />

        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search herbs..."
          className="w-full bg-transparent px-3 text-sm text-stone-900 outline-none placeholder:text-stone-400"
          aria-label="Search herbs"
        />

        <button
          type="submit"
          className={cn(
            "inline-flex bg-emerald-700 text-xs font-semibold text-white transition hover:bg-emerald-800",
            mobile ? "rounded-xl px-4 py-2.5" : "rounded-full px-4 py-2"
          )}
        >
          Search
        </button>
      </div>
    </form>
  );
}