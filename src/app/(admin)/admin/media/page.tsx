import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MediaAssetCard } from "@/components/admin/media-asset-card";
import { MediaGuidanceCard } from "@/components/admin/media-guidance-card";
import { MediaPathReference } from "@/components/admin/media-path-reference";
import { MediaUploadForm } from "@/components/admin/media-upload-form";
import { uploadMediaAction } from "@/features/admin/media/actions";
import {
  getAdminBlogMediaRecords,
  getAdminHerbMediaRecords,
} from "@/features/admin/media/queries";
import { getBlogImageUrl, getHerbImageUrl } from "@/lib/utils/media";

/**
 * Admin media page with real record-based previews.
 */
export default async function AdminMediaPage() {
  const [herbMediaRecords, blogMediaRecords] = await Promise.all([
    getAdminHerbMediaRecords(),
    getAdminBlogMediaRecords(),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Media"
        title="Manage media conventions"
        description="Review current herb and blog assets, inspect storage paths, and keep editorial media conventions organized before upload tooling is added."
      />
      <MediaUploadForm action={uploadMediaAction} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MediaGuidanceCard
            eyebrow="Storage Paths"
            title="Recommended Supabase storage structure"
            description="Use consistent folder conventions so editors can predict where files belong and reuse the same naming patterns across the project."
          >
            <MediaPathReference />
          </MediaGuidanceCard>
        </div>

        <div className="space-y-6">
          <MediaGuidanceCard
            eyebrow="Bucket"
            title="Current media bucket"
            description="All public-facing site media currently lives in the same public Supabase bucket."
          >
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-medium text-stone-900">Bucket name</p>
              <code className="mt-2 inline-block rounded bg-white px-2 py-1 text-xs text-stone-700">
                herb-media
              </code>
            </div>
          </MediaGuidanceCard>

          <MediaGuidanceCard
            eyebrow="Current Inventory"
            title="Asset summary"
            description="Quick visibility into the image-bearing records currently stored in your content system."
          >
            <div className="space-y-3">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-medium text-stone-900">Herb media records</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-stone-900">
                  {herbMediaRecords.length}
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-medium text-stone-900">Blog media records</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-stone-900">
                  {blogMediaRecords.length}
                </p>
              </div>
            </div>
          </MediaGuidanceCard>
        </div>
      </div>

      <MediaGuidanceCard
        eyebrow="Herb Media Browser"
        title="Current herb images"
        description="Review herb image paths, previews, and attribution metadata currently attached to herb records."
      >
        {herbMediaRecords.length === 0 ? (
          <p className="text-sm leading-7 text-stone-600">
            No herb media records are available yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {herbMediaRecords.map((record) => (
              <MediaAssetCard
                key={record.id}
                title={record.name}
                subtitle={record.slug}
                imageUrl={getHerbImageUrl(record.imagePath)}
                imageAlt={record.imageAlt}
                pathLabel={record.imagePath ?? ""}
                sourceName={record.imageSourceName}
                sourceUrl={record.imageSourceUrl}
                license={record.imageLicense}
                photographer={record.imagePhotographer}
                verifiedAt={record.imageVerifiedAt}
                openHref={`/admin/herbs/${record.id}`}
                openLabel="Open herb record"
              />
            ))}
          </div>
        )}
      </MediaGuidanceCard>

      <MediaGuidanceCard
        eyebrow="Blog Media Browser"
        title="Current blog featured images"
        description="Review blog featured image paths, previews, and attribution metadata currently attached to blog records."
      >
        {blogMediaRecords.length === 0 ? (
          <p className="text-sm leading-7 text-stone-600">
            No blog media records are available yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogMediaRecords.map((record) => (
              <MediaAssetCard
                key={record.id}
                title={record.title}
                subtitle={record.slug}
                imageUrl={getBlogImageUrl(record.featuredImagePath)}
                imageAlt={record.featuredImageAlt}
                pathLabel={record.featuredImagePath ?? ""}
                sourceName={record.imageSourceName}
                sourceUrl={record.imageSourceUrl}
                license={record.imageLicense}
                photographer={record.imagePhotographer}
                openHref={`/admin/blog/${record.id}`}
                openLabel="Open blog post"
              />
            ))}
          </div>
        )}
      </MediaGuidanceCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <MediaGuidanceCard
          eyebrow="Naming"
          title="Naming conventions"
          description="Consistent naming makes storage cleaner and easier to maintain."
        >
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-stone-600">
            <li>Use lowercase file names.</li>
            <li>Use kebab-case folder names where needed.</li>
            <li>Avoid spaces in file paths.</li>
            <li>Avoid vague names like final.jpg or image2.png.</li>
          </ul>
        </MediaGuidanceCard>

        <MediaGuidanceCard
          eyebrow="Next Step"
          title="What comes after this"
          description="The media page is now useful for inspection. The next upgrade is giving editors tools to add files directly."
        >
          <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-4 text-sm leading-7 text-stone-600">
            Next we can add upload tooling for Supabase Storage, preview uploaded assets immediately, and copy generated storage paths into herb and blog forms.
          </div>
        </MediaGuidanceCard>
      </div>
    </div>
  );
}