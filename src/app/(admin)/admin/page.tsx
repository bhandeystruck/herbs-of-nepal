/**
 * Admin landing page placeholder.
 * This confirms the admin route group is working.
 */
export default function AdminPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Admin Area
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
          Admin architecture is ready.
        </h1>
        <p className="mt-4 text-stone-600">
          We will build authentication and CRUD functionality in the admin phase.
        </p>
      </div>
    </main>
  );
}