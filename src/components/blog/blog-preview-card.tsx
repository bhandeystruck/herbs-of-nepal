import Link from "next/link";

type BlogPreviewCardProps = {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    createdAt: Date;
  };
};

/**
 * Compact blog preview card for the homepage.
 */
export function BlogPreviewCard({ post }: BlogPreviewCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(post.createdAt);

  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        Article
      </p>

      <h3 className="mt-3 text-xl font-semibold leading-8 text-stone-900">
        {post.title}
      </h3>

      <p className="mt-3 text-sm text-stone-500">{formattedDate}</p>

      <p className="mt-4 text-sm leading-7 text-stone-600">{post.excerpt}</p>

      <div className="mt-6">
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
        >
          Read article →
        </Link>
      </div>
    </article>
  );
}