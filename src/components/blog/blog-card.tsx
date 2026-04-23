import Image from "next/image";
import Link from "next/link";
import { getBlogImageUrl } from "@/lib/utils/media";

type BlogCardProps = {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    createdAt: Date;
    featuredImagePath?: string | null;
    featuredImageAlt?: string | null;
  };
};

/**
 * Public blog listing card.
 */
export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(post.createdAt);

  const imageUrl = getBlogImageUrl(post.featuredImagePath);

  return (
    <article className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {imageUrl ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.featuredImageAlt ?? `${post.title} featured image`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      ) : null}

      <div className="p-6">
        <p className="text-sm text-stone-500">{formattedDate}</p>

        <h2 className="mt-3 text-xl font-semibold tracking-tight text-stone-900">
          {post.title}
        </h2>

        <p className="mt-4 text-sm leading-7 text-stone-600">{post.excerpt}</p>

        <div className="mt-6">
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
          >
            Read article →
          </Link>
        </div>
      </div>
    </article>
  );
}