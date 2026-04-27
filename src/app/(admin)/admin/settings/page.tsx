import { SettingsForm } from "@/components/admin/settings-form";
import { updateSiteSettingsAction } from "@/features/admin/settings/actions";
import { getSiteSettings } from "@/features/admin/settings/queries";

type AdminSettingsPageProps = {
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function AdminSettingsPage({
  searchParams,
}: AdminSettingsPageProps) {
  const { saved } = await searchParams;
  const settings = await getSiteSettings();

  return (
    <div className="space-y-8">
      {saved === "1" ? (
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          Settings have been saved successfully.
        </section>
      ) : null}

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Settings
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
          Site configuration
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base">
          Manage global site identity, branding paths, editorial defaults,
          publishing requirements, and system-level CMS settings.
        </p>
      </section>

      <SettingsForm
        action={updateSiteSettingsAction}
        initialValues={{
          siteName: settings.siteName,
          siteTagline: settings.siteTagline ?? "",
          siteUrl: settings.siteUrl ?? "",
          defaultSeoTitle: settings.defaultSeoTitle ?? "",
          defaultSeoDescription: settings.defaultSeoDescription ?? "",

          logoPath: settings.logoPath ?? "",
          faviconPath: settings.faviconPath ?? "",

          defaultReviewerName: settings.defaultReviewerName ?? "",
          defaultReviewerRole: settings.defaultReviewerRole ?? "",
          editorialDisclaimer: settings.editorialDisclaimer ?? "",
          safetyDisclaimer: settings.safetyDisclaimer ?? "",

          requireHerbSourceBeforePublish:
            settings.requireHerbSourceBeforePublish,
          requireHerbImageBeforePublish:
            settings.requireHerbImageBeforePublish,
          requireHerbReviewBeforePublish:
            settings.requireHerbReviewBeforePublish,
          requireBlogImageBeforePublish:
            settings.requireBlogImageBeforePublish,
        }}
      />
    </div>
  );
}