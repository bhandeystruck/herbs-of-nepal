"use client";

import { useActionState } from "react";
import { loginAdminAction } from "@/features/admin/auth/actions";
import { INITIAL_ADMIN_LOGIN_STATE } from "@/features/admin/auth/form-config";

export function AdminLoginForm() {
  const [state, formAction] = useActionState(
    loginAdminAction,
    INITIAL_ADMIN_LOGIN_STATE
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.message ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {state.message}
        </div>
      ) : null}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Admin email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="admin@herbsofnepal.com"
          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
        />
        {state.fieldErrors.email ? (
          <p className="mt-2 text-xs text-rose-600">{state.fieldErrors.email}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter admin password"
          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
        />
        {state.fieldErrors.password ? (
          <p className="mt-2 text-xs text-rose-600">{state.fieldErrors.password}</p>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
      >
        Sign in
      </button>
    </form>
  );
}