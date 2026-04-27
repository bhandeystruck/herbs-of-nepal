"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { getBlogImageUrl } from "@/lib/utils/media";
import {
  INITIAL_BLOG_FORM_STATE,
  type BlogFormState,
} from "@/features/admin/blog/form-config";

type BlogFormValues = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImagePath?: string;
  featuredImageAlt?: string;
  imageSourceName?: string;
  imageSourceUrl?: string;
  imageLicense?: string;
  imagePhotographer?: string;
  isPublished?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

type BlogFormProps = {
  mode: "create" | "edit";
  blogId?: string;
  initialValues?: BlogFormValues;
  action: (
    prevState: BlogFormState,
    formData: FormData
  ) => Promise<BlogFormState>;
};

function BlogFormButtons({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();

  return (
    <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
      <div>
        <p className="text-sm font-semibold text-stone-900">
          {mode === "create" ? "Create blog draft" : "Update blog post"}
        </p>
        <p className="text-xs leading-6 text-stone-500">
          {pending
            ? "Saving changes..."
            : "Use Save draft to keep the post unpublished."}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          name="intent"
          value="draft"
          disabled={pending}
          className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save draft"}
        </button>

        <button
          type="submit"
          name="intent"
          value="save"
          disabled={pending}
          className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending
            ? "Saving..."
            : mode === "create"
              ? "Create post"
              : "Save changes"}
        </button>
      </div>
    </div>
  );
}

/**
 * Shared blog form UI with markdown write/preview support and featured image preview.
 */
export function BlogForm({
  mode,
  blogId,
  initialValues = {},
  action,
}: BlogFormProps) {
  const [state, formAction] = useActionState(action, INITIAL_BLOG_FORM_STATE);
  const [contentMode, setContentMode] = useState<"write" | "preview">("write");
  const [contentDraft, setContentDraft] = useState(initialValues.content ?? "");
  const [featuredImagePathDraft, setFeaturedImagePathDraft] = useState(
    initialValues.featuredImagePath ?? ""
  );
  const [featuredImageAltDraft, setFeaturedImageAltDraft] = useState(
    initialValues.featuredImageAlt ?? ""
  );

  const fieldError = (name: string) => state.fieldErrors[name];

  const previewContent = useMemo(() => {
    return contentDraft.trim() || "## Preview\n\nStart writing markdown to preview your article here.";
  }, [contentDraft]);

  const featuredImageUrl = useMemo(() => {
    return getBlogImageUrl(featuredImagePathDraft);
  }, [featuredImagePathDraft]);

  return (
    <form action={formAction} className="space-y-8">
      {blogId ? <input type="hidden" name="id" value={blogId} /> : null}

      {state.message ? (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {state.message}
        </section>
      ) : null}

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Blog
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            Core article information
          </h3>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            Define the blog post identity and public summary.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-stone-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              defaultValue={initialValues.title ?? ""}
              placeholder="Understanding Tulsi in Nepalese Households"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
            {fieldError("title") ? (
              <p className="mt-2 text-xs text-rose-600">{fieldError("title")}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="slug" className="mb-2 block text-sm font-medium text-stone-700">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              defaultValue={initialValues.slug ?? ""}
              placeholder="understanding-tulsi-in-nepalese-households"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
            {fieldError("slug") ? (
              <p className="mt-2 text-xs text-rose-600">{fieldError("slug")}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="excerpt" className="mb-2 block text-sm font-medium text-stone-700">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              defaultValue={initialValues.excerpt ?? ""}
              rows={4}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
            {fieldError("excerpt") ? (
              <p className="mt-2 text-xs text-rose-600">{fieldError("excerpt")}</p>
            ) : null}
          </div>

          <label className="inline-flex items-center gap-3 text-sm font-medium text-stone-700">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={initialValues.isPublished ?? false}
              className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-500"
            />
            Published
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Content
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            Article body
          </h3>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            Write this field in Markdown. Switch to Preview to see how the public article will look.
          </p>
        </div>

        <div className="mb-5 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
          <p className="font-semibold text-stone-900">Markdown examples</p>
          <div className="mt-3 space-y-2 font-mono text-xs leading-6 text-stone-600">
            <p>## Section Heading</p>
            <p>- Bullet point</p>
            <p>1. Numbered item</p>
            <p>**Bold text**</p>
            <p>[Link text](https://example.com)</p>
          </div>
        </div>

        <div className="mb-5 inline-flex rounded-full border border-stone-200 bg-stone-100 p-1">
          <button
            type="button"
            onClick={() => setContentMode("write")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              contentMode === "write"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Write
          </button>

          <button
            type="button"
            onClick={() => setContentMode("preview")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              contentMode === "preview"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Preview
          </button>
        </div>

        {contentMode === "write" ? (
          <div>
            <label htmlFor="content" className="mb-2 block text-sm font-medium text-stone-700">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={contentDraft}
              onChange={(event) => setContentDraft(event.target.value)}
              rows={20}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 font-mono text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
            {fieldError("content") ? (
              <p className="mt-2 text-xs text-rose-600">{fieldError("content")}</p>
            ) : null}
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Live Preview
            </p>
            <MarkdownContent content={previewContent} />
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Media
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            Featured image and attribution
          </h3>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            Use a Supabase storage path for the featured image. Example:
            <span className="ml-1 rounded bg-stone-100 px-2 py-1 font-mono text-xs text-stone-700">
              blog/understanding-lapsi-in-nepalese-food-and-herbal-tradition/featured.jpg
            </span>
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <div>
              <label htmlFor="featuredImagePath" className="mb-2 block text-sm font-medium text-stone-700">
                Featured image path
              </label>
              <input
                id="featuredImagePath"
                name="featuredImagePath"
                value={featuredImagePathDraft}
                onChange={(event) => setFeaturedImagePathDraft(event.target.value)}
                placeholder="blog/understanding-tulsi-in-nepalese-households/featured.jpg"
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="featuredImageAlt" className="mb-2 block text-sm font-medium text-stone-700">
                Featured image alt text
              </label>
              <input
                id="featuredImageAlt"
                name="featuredImageAlt"
                value={featuredImageAltDraft}
                onChange={(event) => setFeaturedImageAltDraft(event.target.value)}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="imageSourceName" className="mb-2 block text-sm font-medium text-stone-700">
                Image source name
              </label>
              <input
                id="imageSourceName"
                name="imageSourceName"
                defaultValue={initialValues.imageSourceName ?? ""}
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="imageSourceUrl" className="mb-2 block text-sm font-medium text-stone-700">
                Image source URL
              </label>
              <input
                id="imageSourceUrl"
                name="imageSourceUrl"
                defaultValue={initialValues.imageSourceUrl ?? ""}
                placeholder="https://..."
                className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="imageLicense" className="mb-2 block text-sm font-medium text-stone-700">
                  Image license
                </label>
                <input
                  id="imageLicense"
                  name="imageLicense"
                  defaultValue={initialValues.imageLicense ?? ""}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="imagePhotographer" className="mb-2 block text-sm font-medium text-stone-700">
                  Photographer / creator
                </label>
                <input
                  id="imagePhotographer"
                  name="imagePhotographer"
                  defaultValue={initialValues.imagePhotographer ?? ""}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 block text-sm font-medium text-stone-700">
              Featured image preview
            </p>

            <div className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-50">
              {featuredImageUrl ? (
                <>
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={featuredImageUrl}
                      alt={featuredImageAltDraft || "Featured blog image preview"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className="border-t border-stone-200 bg-white px-5 py-4">
                    <p className="text-sm font-medium text-stone-800">
                      Live image preview
                    </p>
                    <p className="mt-1 text-xs leading-6 text-stone-500">
                      This preview uses the current Supabase image path entered above.
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center px-6 text-center">
                  <div>
                    <p className="text-sm font-medium text-stone-700">
                      No image preview yet
                    </p>
                    <p className="mt-2 text-xs leading-6 text-stone-500">
                      Add a valid featured image path to preview the blog image here.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm leading-7 text-stone-600">
              <p className="font-semibold text-stone-900">Recommended guidance</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Use a wide editorial image for best results.</li>
                <li>Always add meaningful alt text.</li>
                <li>Fill source and license fields when using external images.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            SEO
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900">
            Search metadata
          </h3>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="seoTitle" className="mb-2 block text-sm font-medium text-stone-700">
              SEO title
            </label>
            <input
              id="seoTitle"
              name="seoTitle"
              defaultValue={initialValues.seoTitle ?? ""}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="seoDescription" className="mb-2 block text-sm font-medium text-stone-700">
              SEO description
            </label>
            <textarea
              id="seoDescription"
              name="seoDescription"
              defaultValue={initialValues.seoDescription ?? ""}
              rows={4}
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-7 text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      <BlogFormButtons mode={mode} />
    </form>
  );
}