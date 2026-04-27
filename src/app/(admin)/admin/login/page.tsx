import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getCurrentAdminSession } from "@/lib/auth/server-sessions";

export default async function AdminLoginPage() {
  const session = await getCurrentAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-stone-50 to-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Admin Access
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
            Sign in to Herbs of Nepal
          </h1>

          <p className="mt-4 text-sm leading-7 text-stone-600">
            Use your admin credentials to access the internal content management workspace.
          </p>

          <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-medium text-stone-900">
              Protected admin environment
            </p>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              This area controls herbs, blog posts, categories, sources, and media uploads.
              Only authenticated admins should have access.
            </p>
          </div>

          <div className="mt-8">
            <AdminLoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}