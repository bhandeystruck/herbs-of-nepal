import Link from "next/link";

/**
 * Simple top bar for admin pages.
 * We will expand this later with auth/user info and actions.
 */
export function AdminTopbar() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="flex min-h-16 items-center justify-between px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Admin Workspace
          </p>
          <h1 className="mt-1 text-lg font-semibold tracking-tight text-stone-900">
            Content management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            View site
          </Link>
        </div>
      </div>
    </header>
  );
}