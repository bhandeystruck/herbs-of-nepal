import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { updateBlogPostAction } from "@/features/admin/blog/actions";
import { getAdminBlogPostById } from "@/features/admin/blog/queries";

type EditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * Edit blog admin page.
 */
export default async function EditBlogPage({
  params,
}: EditBlogPageProps) {
  const { id } = await params;
  const post = await getAdminBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-3xl">
          <Link
            href="/admin/blog"
            className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
          >
            ← Back to blog
          </Link>

          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Blog
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
            Edit blog post
          </h2>

          <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
            Update article content, publication state, media metadata, and SEO.
          </p>
        </div>
      </section>

      <BlogForm
        mode="edit"
        blogId={post.id}
        action={updateBlogPostAction}
        initialValues={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featuredImagePath: post.featuredImagePath ?? "",
          featuredImageAlt: post.featuredImageAlt ?? "",
          imageSourceName: post.imageSourceName ?? "",
          imageSourceUrl: post.imageSourceUrl ?? "",
          imageLicense: post.imageLicense ?? "",
          imagePhotographer: post.imagePhotographer ?? "",
          isPublished: post.isPublished,
          seoTitle: post.seoTitle ?? "",
          seoDescription: post.seoDescription ?? "",
        }}
      />
    </div>
  );
}