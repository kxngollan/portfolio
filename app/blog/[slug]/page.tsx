import Link from "next/link";
import { notFound } from "next/navigation";
import RichText from "@/components/RichText";
import { getPublishedBlogPost } from "@/lib/public-content";
import type { BlogPostPageProps } from "@/types/blog";

export const dynamic = "force-dynamic";

const fallbackCover = "/no-image.png";

function formatDate(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(date);
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

const page = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = formatDate(post.publishedAt);
  return (
    <main className="min-h-screen bg-[#f7f4ef] px-4 py-24 dark:bg-[#0a0a0a]">
      <article className="mx-auto max-w-5xl">
        <header className="border-y border-zinc-950 py-5 dark:border-zinc-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Link
                href="/blog"
                className="text-sm font-bold text-[#a84824] hover:text-[#d96b3c] dark:text-[#ffa351]"
              >
                Back to Blog
              </Link>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-zinc-400 px-2 py-1 text-xs font-semibold uppercase text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-zinc-950 dark:text-white md:text-5xl">
                {post.title}
              </h1>
            </div>
            <div className="max-w-xs border-t border-zinc-300 pt-4 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:text-zinc-300 lg:border-t-0 lg:pt-0">
              <p>
                {[publishedDate, getReadingTime(post.content)]
                  .filter(Boolean)
                  .join(" / ")}
              </p>
              {post.author && (
                <p className="mt-1 font-semibold">By {post.author}</p>
              )}
            </div>
          </div>
        </header>

        <div
          role="img"
          aria-label={post.title}
          className="mx-auto mt-6 aspect-[16/7] max-h-[360px] min-h-[180px] max-w-4xl bg-zinc-200 bg-cover bg-center dark:bg-zinc-900"
          style={{
            backgroundImage: `url(${post.coverImage || fallbackCover})`,
          }}
        />

        {post.excerpt && (
          <RichText
            text={post.excerpt}
            className="mx-auto mt-6 max-w-3xl border-b border-zinc-300 pb-6 text-xl font-semibold leading-8 text-zinc-800 dark:border-zinc-800 dark:text-zinc-100"
          />
        )}

        <div className="mx-auto mt-8 grid max-w-4xl gap-8 lg:grid-cols-[150px_minmax(0,680px)]">
          <aside className="hidden border-r border-zinc-300 pr-6 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300 lg:block">
            <p className="font-bold uppercase text-zinc-950 dark:text-white">
              Details
            </p>
            <div className="mt-4 space-y-3">
              {publishedDate && <p>{publishedDate}</p>}
              <p>{getReadingTime(post.content)}</p>
              {post.author && <p>{post.author}</p>}
            </div>
          </aside>

          <RichText
            text={post.content}
            className="space-y-5 text-base leading-8 text-zinc-800 dark:text-zinc-100 md:text-lg"
            firstParagraphClassName="first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-black first-letter:leading-[0.85]"
          />
        </div>
      </article>
    </main>
  );
};

export default page;
