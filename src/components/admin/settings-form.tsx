"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  INITIAL_SETTINGS_FORM_STATE,
  type SettingsFormState,
} from "@/features/admin/settings/form-config";

type SettingsFormValues = {
  siteName?: string;
  siteTagline?: string;
  siteUrl?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;

  logoPath?: string;
  faviconPath?: string;

  defaultReviewerName?: string;
  defaultReviewerRole?: string;
  editorialDisclaimer?: string;
  safetyDisclaimer?: string;

  requireHerbSourceBeforePublish?: boolean;
  requireHerbImageBeforePublish?: boolean;
  requireHerbReviewBeforePublish?: boolean;
  requireBlogImageBeforePublish?: boolean;
};

type SettingsFormProps = {
  initialValues: SettingsFormValues;
  action: (
    prevState: SettingsFormState,
    formData: FormData
  ) => Promise<SettingsFormState>;
};

function SettingsFormButtons() {
  const { pending } = useFormStatus();

  return (
    <div className="sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
      <div>
        <p className="text-sm font-semibold text-stone-900">Update site settings</p>
        <p className="text-xs leading-6 text-stone-500">
          {pending ? "Saving changes..." : "These values shape the whole CMS and public site."}
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save settings"}
      </button>
    </div>
  );
}

export function SettingsForm({ initialValues, action }: SettingsFormProps) {
  const [state, formAction] = useActionState(action, INITIAL_SETTINGS_FORM_STATE);

  const fieldError = (name: string) => state.fieldErrors[name];

  return (
    <form action={formAction} className="space-y-8">
      {state.message ? (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {state.message}
        </section>
      ) : null}

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          General
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-900">Site identity</h3>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="siteName" className="mb-2 block text-sm font-medium text-stone-700">
              Site name
            </label>
            <input
              id="siteName"
              name="siteName"
              defaultValue={initialValues.siteName ?? ""}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
            {fieldError("siteName") ? (
              <p className="mt-2 text-xs text-rose-600">{fieldError("siteName")}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="siteTagline" className="mb-2 block text-sm font-medium text-stone-700">
              Site tagline
            </label>
            <input
              id="siteTagline"
              name="siteTagline"
              defaultValue={initialValues.siteTagline ?? ""}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="siteUrl" className="mb-2 block text-sm font-medium text-stone-700">
              Site URL
            </label>
            <input
              id="siteUrl"
              name="siteUrl"
              defaultValue={initialValues.siteUrl ?? ""}
              placeholder="https://herbsofnepal.com"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="defaultSeoTitle" className="mb-2 block text-sm font-medium text-stone-700">
              Default SEO title
            </label>
            <input
              id="defaultSeoTitle"
              name="defaultSeoTitle"
              defaultValue={initialValues.defaultSeoTitle ?? ""}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="defaultSeoDescription" className="mb-2 block text-sm font-medium text-stone-700">
              Default SEO description
            </label>
            <textarea
              id="defaultSeoDescription"
              name="defaultSeoDescription"
              defaultValue={initialValues.defaultSeoDescription ?? ""}
              rows={4}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Branding
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-900">Brand assets</h3>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="logoPath" className="mb-2 block text-sm font-medium text-stone-700">
              Logo path
            </label>
            <input
              id="logoPath"
              name="logoPath"
              defaultValue={initialValues.logoPath ?? ""}
              placeholder="branding/logo.svg"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="faviconPath" className="mb-2 block text-sm font-medium text-stone-700">
              Favicon path
            </label>
            <input
              id="faviconPath"
              name="faviconPath"
              defaultValue={initialValues.faviconPath ?? ""}
              placeholder="branding/favicon.png"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Editorial
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-900">Editorial defaults</h3>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="defaultReviewerName" className="mb-2 block text-sm font-medium text-stone-700">
              Default reviewer name
            </label>
            <input
              id="defaultReviewerName"
              name="defaultReviewerName"
              defaultValue={initialValues.defaultReviewerName ?? ""}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="defaultReviewerRole" className="mb-2 block text-sm font-medium text-stone-700">
              Default reviewer role
            </label>
            <input
              id="defaultReviewerRole"
              name="defaultReviewerRole"
              defaultValue={initialValues.defaultReviewerRole ?? ""}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="editorialDisclaimer" className="mb-2 block text-sm font-medium text-stone-700">
              Editorial disclaimer
            </label>
            <textarea
              id="editorialDisclaimer"
              name="editorialDisclaimer"
              defaultValue={initialValues.editorialDisclaimer ?? ""}
              rows={4}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="safetyDisclaimer" className="mb-2 block text-sm font-medium text-stone-700">
              Safety disclaimer
            </label>
            <textarea
              id="safetyDisclaimer"
              name="safetyDisclaimer"
              defaultValue={initialValues.safetyDisclaimer ?? ""}
              rows={4}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Publishing Rules
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-900">Content requirements</h3>

        <div className="mt-6 space-y-4">
          <label className="inline-flex items-center gap-3 text-sm font-medium text-stone-700">
            <input
              type="checkbox"
              name="requireHerbSourceBeforePublish"
              defaultChecked={initialValues.requireHerbSourceBeforePublish ?? false}
              className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-500"
            />
            Require herb source before publish
          </label>

          <label className="inline-flex items-center gap-3 text-sm font-medium text-stone-700">
            <input
              type="checkbox"
              name="requireHerbImageBeforePublish"
              defaultChecked={initialValues.requireHerbImageBeforePublish ?? false}
              className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-500"
            />
            Require herb image before publish
          </label>

          <label className="inline-flex items-center gap-3 text-sm font-medium text-stone-700">
            <input
              type="checkbox"
              name="requireHerbReviewBeforePublish"
              defaultChecked={initialValues.requireHerbReviewBeforePublish ?? false}
              className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-500"
            />
            Require herb review date before publish
          </label>

          <label className="inline-flex items-center gap-3 text-sm font-medium text-stone-700">
            <input
              type="checkbox"
              name="requireBlogImageBeforePublish"
              defaultChecked={initialValues.requireBlogImageBeforePublish ?? false}
              className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-500"
            />
            Require blog featured image before publish
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          System
        </p>
        <h3 className="mt-2 text-xl font-semibold text-stone-900">Environment notes</h3>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-medium text-stone-900">Auth mode</p>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              Environment-based admin authentication
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-medium text-stone-900">Media bucket</p>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              {process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "herb-media"}
            </p>
          </div>
        </div>
      </section>

      <SettingsFormButtons />
    </form>
  );
}