import Link from "next/link";
import { BlogForm } from "@/components/admin/blog-form";
import { createBlogPostAction } from "@/features/admin/blog/actions";

/**
 * New blog admin page.
 */
export default function NewBlogPage() {
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
            Create new post
          </h2>

          <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
            Add a new educational article for the public blog.
          </p>
        </div>
      </section>

      <BlogForm mode="create" action={createBlogPostAction} />
    </div>
  );
}