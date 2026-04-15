import Image from "next/image";
import Link from "next/link";
import { getHerbImageUrl } from "@/lib/utils/media";

type HerbImagePanelProps = {
  herbName: string;
  imagePath: string | null;
  imageAlt: string | null;
  imageSourceName: string | null;
  imageSourceUrl: string | null;
  imageLicense: string | null;
  imagePhotographer: string | null;
  imageVerifiedAt: Date | null;
};

/**
 * Trust-aware herb image panel.
 * Shows the real herb image with attribution and verification context.
 */
export function HerbImagePanel({
  herbName,
  imagePath,
  imageAlt,
  imageSourceName,
  imageSourceUrl,
  imageLicense,
  imagePhotographer,
  imageVerifiedAt,
}: HerbImagePanelProps) {
  const imageUrl = getHerbImageUrl(imagePath);

  if (!imageUrl) {
    return null;
  }

  const formattedVerifiedDate = imageVerifiedAt
    ? new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(imageVerifiedAt)
    : null;

  return (
    <section className="mt-10 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
        <Image
          src={imageUrl}
          alt={imageAlt ?? `${herbName} herb image`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="border-t border-stone-200 bg-gradient-to-b from-stone-50 to-white px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Real Plant Image
          </span>

          {formattedVerifiedDate ? (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700">
              Verified: {formattedVerifiedDate}
            </span>
          ) : null}
        </div>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Source
            </p>

            {imageSourceUrl ? (
              <Link
                href={imageSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
              >
                {imageSourceName ?? "View source"} →
              </Link>
            ) : (
              <p className="mt-2 text-sm text-stone-700">
                {imageSourceName ?? "Source metadata not yet listed"}
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Attribution
            </p>

            <div className="mt-2 space-y-1 text-sm text-stone-700">
              {imagePhotographer ? <p>Photographer: {imagePhotographer}</p> : null}
              {imageLicense ? <p>License: {imageLicense}</p> : null}
              {!imagePhotographer && !imageLicense ? (
                <p>Attribution metadata not yet listed</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}