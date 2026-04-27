import Link from "next/link";
import { logoutAdminAction } from "@/features/admin/auth/actions";
import { getCurrentAdminSession } from "@/lib/auth/server-sessions";

/**
 * Session-aware top bar for admin pages.
 */
export async function AdminTopbar() {
  const session = await getCurrentAdminSession();

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
          {session ? (
            <div className="hidden rounded-full border border-stone-200 bg-stone-50 px-4 py-2 sm:block">
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                Signed in
              </p>
              <p className="text-sm font-medium text-stone-800">
                {session.email}
              </p>
            </div>
          ) : null}

          <Link
            href="/"
            className="inline-flex rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            View site
          </Link>

          {session ? (
            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="inline-flex rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
              >
                Logout
              </button>
            </form>
          ) : (
            <Link
              href="/admin/login"
              className="inline-flex rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}