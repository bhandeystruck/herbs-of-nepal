import Image from "next/image";
import Link from "next/link";

type MediaAssetCardProps = {
  title: string;
  subtitle?: string | null;
  imageUrl: string | null;
  imageAlt?: string | null;
  pathLabel: string;
  sourceName?: string | null;
  sourceUrl?: string | null;
  license?: string | null;
  photographer?: string | null;
  verifiedAt?: Date | null;
  openHref: string;
  openLabel: string;
};

/**
 * Visual card for media records inside the admin media browser.
 */
export function MediaAssetCard({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  pathLabel,
  sourceName,
  sourceUrl,
  license,
  photographer,
  verifiedAt,
  openHref,
  openLabel,
}: MediaAssetCardProps) {
  const verifiedDate = verifiedAt
    ? new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(verifiedAt)
    : null;

  return (
    <article className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt ?? `${title} media asset`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <div>
              <p className="text-sm font-medium text-stone-700">No preview</p>
              <p className="mt-2 text-xs leading-6 text-stone-500">
                This record has no usable image preview.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-stone-900">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1 text-sm text-stone-600">{subtitle}</p>
          ) : null}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Storage path
          </p>
          <code className="mt-2 block overflow-x-auto rounded-2xl bg-stone-100 px-3 py-2 text-xs text-stone-700">
            {pathLabel}
          </code>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Source
            </p>
            {sourceUrl ? (
              <Link
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
              >
                {sourceName ?? "View source"} →
              </Link>
            ) : (
              <p className="mt-2 text-sm text-stone-700">
                {sourceName ?? "No source metadata"}
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Attribution
            </p>
            <div className="mt-2 space-y-1 text-sm text-stone-700">
              {photographer ? <p>Photographer: {photographer}</p> : null}
              {license ? <p>License: {license}</p> : null}
              {verifiedDate ? <p>Verified: {verifiedDate}</p> : null}
              {!photographer && !license && !verifiedDate ? (
                <p>No attribution metadata</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="pt-1">
          <Link
            href={openHref}
            className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
          >
            {openLabel} →
          </Link>
        </div>
      </div>
    </article>
  );
}