"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma/client";
import type { BlogFormState } from "@/features/admin/blog/form-config";

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

async function validateBlogForm(
  formData: FormData,
  mode: "create" | "edit",
  blogId?: string
) {
  const fieldErrors: Record<string, string> = {};

  const title = getString(formData, "title");
  const slug = getString(formData, "slug");
  const excerpt = getString(formData, "excerpt");
  const content = getString(formData, "content");

  if (!title) {
    fieldErrors.title = "Blog title is required.";
  }

  if (!slug) {
    fieldErrors.slug = "Slug is required.";
  }

  if (!excerpt) {
    fieldErrors.excerpt = "Excerpt is required.";
  }

  if (!content) {
    fieldErrors.content = "Content is required.";
  }

  if (mode === "edit" && !blogId) {
    fieldErrors.id = "Missing blog ID for update.";
  }

  if (slug) {
    const existingSlug = await db.blogPost.findFirst({
      where: blogId
        ? {
            slug,
            id: { not: blogId },
          }
        : { slug },
      select: { id: true },
    });

    if (existingSlug) {
      fieldErrors.slug = "This slug is already in use.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false as const,
      state: {
        message: "Please fix the highlighted fields and try again.",
        fieldErrors,
      } satisfies BlogFormState,
    };
  }

  const intent = getString(formData, "intent");
  const forceDraft = intent === "draft";

  return {
    ok: true as const,
    data: {
      title,
      slug,
      excerpt,
      content,
      featuredImagePath: getOptionalString(formData, "featuredImagePath"),
      featuredImageAlt: getOptionalString(formData, "featuredImageAlt"),
      imageSourceName: getOptionalString(formData, "imageSourceName"),
      imageSourceUrl: getOptionalString(formData, "imageSourceUrl"),
      imageLicense: getOptionalString(formData, "imageLicense"),
      imagePhotographer: getOptionalString(formData, "imagePhotographer"),
      isPublished: forceDraft ? false : getCheckbox(formData, "isPublished"),
      seoTitle: getOptionalString(formData, "seoTitle"),
      seoDescription: getOptionalString(formData, "seoDescription"),
    },
  };
}

function revalidateBlogPaths(slug: string) {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
}

export async function createBlogPostAction(
  _prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const result = await validateBlogForm(formData, "create");

  if (!result.ok) {
    return result.state;
  }

  try {
    const post = await db.blogPost.create({
      data: result.data,
    });

    revalidateBlogPaths(post.slug);
  } catch {
    return {
      message: "Something went wrong while creating the blog post.",
      fieldErrors: {},
    };
  }

  redirect("/admin/blog?saved=1&created=1");
}

export async function updateBlogPostAction(
  _prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const blogId = getString(formData, "id");
  const result = await validateBlogForm(formData, "edit", blogId);

  if (!result.ok) {
    return result.state;
  }

  try {
    const post = await db.blogPost.update({
      where: { id: blogId },
      data: result.data,
    });

    revalidateBlogPaths(post.slug);
  } catch {
    return {
      message: "Something went wrong while updating the blog post.",
      fieldErrors: {},
    };
  }

  redirect(`/admin/blog/${blogId}?saved=1`);
}

export async function deleteBlogPostAction(formData: FormData) {
  const blogId = getString(formData, "id");

  if (!blogId) {
    redirect("/admin/blog?error=missing-id");
  }

  const post = await db.blogPost.findUnique({
    where: { id: blogId },
  });

  if (!post) {
    redirect("/admin/blog?error=not-found");
  }

  await db.blogPost.delete({
    where: { id: post.id },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${post.id}`);

  redirect("/admin/blog?deleted=1");
}