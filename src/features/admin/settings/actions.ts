"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma/client";
import { getSiteSettings } from "@/features/admin/settings/queries";
import type { SettingsFormState } from "@/features/admin/settings/form-config";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value ? value : null;
}

function getCheckbox(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export async function updateSiteSettingsAction(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const settings = await getSiteSettings();

  const siteName = getString(formData, "siteName");

  const fieldErrors: Record<string, string> = {};

  if (!siteName) {
    fieldErrors.siteName = "Site name is required.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  try {
    await db.siteSettings.update({
      where: { id: settings.id },
      data: {
        siteName,
        siteTagline: getOptionalString(formData, "siteTagline"),
        siteUrl: getOptionalString(formData, "siteUrl"),
        defaultSeoTitle: getOptionalString(formData, "defaultSeoTitle"),
        defaultSeoDescription: getOptionalString(formData, "defaultSeoDescription"),

        logoPath: getOptionalString(formData, "logoPath"),
        faviconPath: getOptionalString(formData, "faviconPath"),

        defaultReviewerName: getOptionalString(formData, "defaultReviewerName"),
        defaultReviewerRole: getOptionalString(formData, "defaultReviewerRole"),
        editorialDisclaimer: getOptionalString(formData, "editorialDisclaimer"),
        safetyDisclaimer: getOptionalString(formData, "safetyDisclaimer"),

        requireHerbSourceBeforePublish: getCheckbox(
          formData,
          "requireHerbSourceBeforePublish"
        ),
        requireHerbImageBeforePublish: getCheckbox(
          formData,
          "requireHerbImageBeforePublish"
        ),
        requireHerbReviewBeforePublish: getCheckbox(
          formData,
          "requireHerbReviewBeforePublish"
        ),
        requireBlogImageBeforePublish: getCheckbox(
          formData,
          "requireBlogImageBeforePublish"
        ),
      },
    });
  } catch {
    return {
      message: "Something went wrong while saving settings.",
      fieldErrors: {},
    };
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/safety");
  revalidatePath("/admin");
  revalidatePath("/admin/settings");

  redirect("/admin/settings?saved=1");
}