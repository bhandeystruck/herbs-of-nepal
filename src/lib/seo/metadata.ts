import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants/site";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

/**
 * Helper for generating consistent page metadata.
 */
export function createMetadata({
  title,
  description,
  path = "",
}: MetadataInput): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}