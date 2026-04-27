"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  INITIAL_MEDIA_UPLOAD_FORM_STATE,
  type MediaUploadFormState,
} from "@/features/admin/media/form-config";
import { ChevronDown } from "lucide-react";

type MediaUploadFormProps = {
  action: (
    prevState: MediaUploadFormState,
    formData: FormData
  ) => Promise<MediaUploadFormState>;
};

type CopyStatus = {
  field: "path" | "url" | null;
  message: string;
};

/**
 * Admin media upload form for Supabase Storage.
 */
export function MediaUploadForm({ action }: MediaUploadFormProps) {
  const [state, formAction] = useActionState(
    action,
    INITIAL_MEDIA_UPLOAD_FORM_STATE
  );
  const [copyStatus, setCopyStatus] = useState<CopyStatus>({
    field: null,
    message: "",
  });

  const handleCopy = async (
    value: string | undefined,
    field: "path" | "url",
    successMessage: string
  ) => {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus({
        field,
        message: successMessage,
      });

      window.setTimeout(() => {
        setCopyStatus({
          field: null,
          message: "",
        });
      }, 1800);
    } catch {
      setCopyStatus({
        field,
        message: "Copy failed. Please copy manually.",
      });
    }
  };

  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        Upload
      </p>

      <h3 className="mt-2 text-xl font-semibold tracking-tight text-stone-900">
        Upload a new media asset
      </h3>

      <p className="mt-3 text-sm leading-7 text-stone-600">
        Upload images directly into Supabase Storage and get a ready-to-use
        storage path for herbs, blog, branding, or categories.
      </p>

      <form action={formAction} className="mt-6 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
                <label
                    htmlFor="assetType"
                    className="mb-2 block text-sm font-medium text-stone-700"
                >
                    Asset type
                </label>

                <div className="relative">
                    <select
                    id="assetType"
                    name="assetType"
                    defaultValue="herb"
                    className="w-full appearance-none rounded-2xl border border-stone-300 bg-white px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
                    >
                    <option value="herb">Herb</option>
                    <option value="blog">Blog</option>
                    <option value="branding">Branding</option>
                    <option value="category">Category</option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                </div>
            </div>

          <div>
            <label
              htmlFor="folderSlug"
              className="mb-2 block text-sm font-medium text-stone-700"
            >
              Folder / slug
            </label>
            <input
              id="folderSlug"
              name="folderSlug"
              placeholder="tulsi"
              className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="fileLabel"
            className="mb-2 block text-sm font-medium text-stone-700"
          >
            File label
          </label>
          <input
            id="fileLabel"
            name="fileLabel"
            defaultValue="primary"
            placeholder="primary"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500"
          />
          <p className="mt-2 text-xs text-stone-500">
            Example output: <code>herbs/tulsi/primary.jpg</code>
          </p>
        </div>

        <div>
          <label
            htmlFor="file"
            className="mb-2 block text-sm font-medium text-stone-700"
          >
            Image file
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.svg"
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-800"
          />
        </div>

        {state.error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {state.error}
          </div>
        ) : null}

        {state.message ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {state.message}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Upload file
          </button>
        </div>
      </form>

      {state.uploadedPath ? (
        <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-5">
          <p className="text-sm font-semibold text-stone-900">
            Generated storage path
          </p>
          <code className="mt-3 block overflow-x-auto rounded bg-white px-3 py-2 text-xs text-stone-700">
            {state.uploadedPath}
          </code>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                handleCopy(
                  state.uploadedPath,
                  "path",
                  "Storage path copied to clipboard."
                )
              }
              className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Copy path
            </button>

            {state.publicUrl ? (
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    state.publicUrl,
                    "url",
                    "Public URL copied to clipboard."
                  )
                }
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                Copy public URL
              </button>
            ) : null}
          </div>

          {copyStatus.message ? (
            <p className="mt-3 text-sm text-emerald-700">{copyStatus.message}</p>
          ) : null}

          {state.publicUrl ? (
            <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <Image
                  src={state.publicUrl}
                  alt="Uploaded media preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="border-t border-stone-200 px-4 py-3">
                <p className="text-xs leading-6 text-stone-500">
                  Copy the generated path into the relevant herb or blog image
                  field, or jump directly to the appropriate admin section below.
                </p>
              </div>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin/herbs/new"
              className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              New herb
            </Link>

            <Link
              href="/admin/blog/new"
              className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              New blog post
            </Link>

            <Link
              href="/admin/herbs"
              className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Go to herbs
            </Link>

            <Link
              href="/admin/blog"
              className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Go to blog
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}