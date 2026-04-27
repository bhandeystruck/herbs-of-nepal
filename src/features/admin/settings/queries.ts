import { db } from "@/lib/prisma/client";

/**
 * Fetches the singleton site settings record.
 * Creates one automatically if it does not exist yet.
 */
export async function getSiteSettings() {
  let settings = await db.siteSettings.findFirst();

  if (!settings) {
    settings = await db.siteSettings.create({
      data: {
        siteName: "Herbs of Nepal",
        siteTagline: "Educational platform for Nepalese herbal knowledge",
      },
    });
  }

  return settings;
}