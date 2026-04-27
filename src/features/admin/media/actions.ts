"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { MediaUploadFormState } from "@/features/admin/media/form-config";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeSegment(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_./]/g, "");
}

function getExtension(filename: string) {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

export async function uploadMediaAction(
  _prevState: MediaUploadFormState,
  formData: FormData
): Promise<MediaUploadFormState> {
  const assetType = getString(formData, "assetType");
  const folderSlug = sanitizeSegment(getString(formData, "folderSlug"));
  const fileLabelRaw = getString(formData, "fileLabel");
  const fileLabel = sanitizeSegment(fileLabelRaw || "asset");
  const file = formData.get("file");

  if (!assetType) {
    return {
      message: "",
      error: "Please select an asset type.",
    };
  }

  if (!folderSlug) {
    return {
      message: "",
      error: "Please enter a folder or slug.",
    };
  }

  if (!(file instanceof File) || file.size === 0) {
    return {
      message: "",
      error: "Please choose a file to upload.",
    };
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
  if (!allowedTypes.includes(file.type)) {
    return {
      message: "",
      error: "Only JPG, PNG, WEBP, and SVG files are supported right now.",
    };
  }

  const ext = getExtension(file.name);
  if (!ext) {
    return {
      message: "",
      error: "Uploaded file must have a valid extension.",
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "herb-media";

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return {
      message: "",
      error: "Supabase environment variables are missing.",
    };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  let folderPrefix = assetType;
  if (assetType === "herb") {
    folderPrefix = "herbs";
  } else if (assetType === "blog") {
    folderPrefix = "blog";
  } else if (assetType === "branding") {
    folderPrefix = "branding";
  } else if (assetType === "category") {
    folderPrefix = "categories";
  }

  const storagePath = `${folderPrefix}/${folderSlug}/${fileLabel}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, fileBuffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return {
      message: "",
      error: `Upload failed: ${error.message}`,
    };
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);

  revalidatePath("/admin/media");

  return {
    message: "File uploaded successfully.",
    error: "",
    uploadedPath: storagePath,
    publicUrl: data.publicUrl,
  };
}