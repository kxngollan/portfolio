import Image from "next/image";
import Link from "next/link";
import { stripRichText } from "@/components/RichText";
import { getPublishedBlogPosts } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const fallbackCover = "/no-image.png";

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(date);
}

function getSummary(
  content: string,
  excerpt: string | undefined,
  length = 110,
) {
  const text = stripRichText(excerpt || content);
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

const BlogPage = async () => {
  const posts = await getPublishedBlogPosts();

  return (
    <main className="min-h-screen mt-16 px-4 py-16 dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-xs font-medium text-[#ffa351] tracking-wider">
              All
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/8" />
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/35">
              Writing
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <h1 className="text-3xl xl:text-4xl font-bold dark:text-white tracking-tight">
              Blog
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 max-w-sm">
              Field notes, engineering decisions, and the occasional opinion
              piece.
            </p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="border border-zinc-200 dark:border-white/8 rounded-2xl p-12 text-center bg-zinc-50 dark:bg-white/1">
            <h2 className="text-xl font-bold dark:text-white mb-2">
              No posts yet.
            </h2>
            <p className="text-sm text-zinc-500">
              Published posts will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group border border-zinc-200 dark:border-white/8 bg-zinc-50 dark:bg-white/1 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#ffa351]/25 hover:bg-[#ffa351]/2 flex flex-col"
              >
                {/* Cover image */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="block overflow-hidden shrink-0"
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={post.coverImage || fallbackCover}
                      alt={post.title}
                      fill
                      className="object-cover brightness-75 transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Category tag */}
                  {post.tags[0] && (
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#ffa351] mb-2">
                      {post.tags[0]}
                    </p>
                  )}

                  {/* Title */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block text-base font-bold dark:text-white text-zinc-900 tracking-tight leading-snug hover:text-[#ffa351] transition-colors duration-200 mb-3"
                  >
                    {post.title}
                  </Link>

                  {/* Excerpt */}
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-500 flex-1 mb-4">
                    {getSummary(post.content, post.excerpt)}
                  </p>

                  {/* Metadata row */}
                  <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-600 pt-3 border-t border-zinc-100 dark:border-white/6">
                    {post.author && (
                      <>
                        <span>{post.author}</span>
                        <span className="text-white/20">·</span>
                      </>
                    )}
                    {formatDate(post.publishedAt) && (
                      <>
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="text-white/20">·</span>
                      </>
                    )}
                    <span>{getReadingTime(post.content)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogPage;
