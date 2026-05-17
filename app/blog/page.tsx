import Link from "next/link";
import { stripRichText } from "@/components/RichText";
import { getPublishedBlogPosts } from "@/lib/public-content";

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

function getSummary(
  content: string,
  excerpt: string | undefined,
  length = 190,
) {
  const text = stripRichText(excerpt || content);

  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

const page = async () => {
  const posts = await getPublishedBlogPosts();
  const [leadPost, ...restPosts] = posts;
  const secondaryPosts = restPosts.slice(0, 2);
  const latestPosts = restPosts.slice(2);

  return (
    <main className="min-h-screen mt-5 bg-[#f7f4ef] px-4 py-24 dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 border-y border-zinc-950 py-4 dark:border-zinc-200">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h1 className="text-4xl font-black text-zinc-950 dark:text-white md:text-6xl">
              Blog
            </h1>
            <p className="max-w-lg text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              Field notes, engineering decisions, and the occasional opinion
              piece from the desk.
            </p>
          </div>
        </header>

        {posts.length === 0 ? (
          <section className="border border-dashed border-zinc-400 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-950">
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              No stories published yet.
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              Published posts will appear here as magazine features.
            </p>
          </section>
        ) : (
          <>
            {leadPost && (
              <section className="grid gap-5 border-b border-zinc-300 pb-6 dark:border-zinc-800 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
                <article className="group overflow-hidden border border-zinc-950 bg-white dark:border-zinc-700 dark:bg-zinc-950">
                  <Link href={`/blog/${leadPost.slug}`} className="block">
                    <div
                      role="img"
                      aria-label={leadPost.title}
                      className="aspect-[16/7] max-h-[340px] bg-zinc-200 bg-cover bg-center transition duration-500 group-hover:scale-[1.02] dark:bg-zinc-900"
                      style={{
                        backgroundImage: `url(${leadPost.coverImage || fallbackCover})`,
                      }}
                    />
                  </Link>
                  <div className="p-4 md:p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-[#a84824] dark:text-[#ffa351]">
                      <span>Lead Story</span>
                      {formatDate(leadPost.publishedAt) && (
                        <span>{formatDate(leadPost.publishedAt)}</span>
                      )}
                      <span>{getReadingTime(leadPost.content)}</span>
                    </div>
                    <Link
                      href={`/blog/${leadPost.slug}`}
                      className="mt-2 block text-3xl font-black leading-tight text-zinc-950 hover:text-[#a84824] dark:text-white dark:hover:text-[#ffa351] md:text-4xl"
                    >
                      {leadPost.title}
                    </Link>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-700 dark:text-zinc-200">
                      {getSummary(leadPost.content, leadPost.excerpt, 190)}
                    </p>
                    {(leadPost.author || leadPost.tags.length > 0) && (
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                        {leadPost.author && <span>By {leadPost.author}</span>}
                        {leadPost.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>

                <aside className="grid gap-4">
                  {secondaryPosts.map((post) => (
                    <article
                      key={post._id}
                      className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 border-b border-zinc-300 pb-4 last:border-b-0 dark:border-zinc-800"
                    >
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div
                          role="img"
                          aria-label={post.title}
                          className="aspect-square bg-zinc-200 bg-cover bg-center dark:bg-zinc-900"
                          style={{
                            backgroundImage: `url(${post.coverImage || fallbackCover})`,
                          }}
                        />
                      </Link>
                      <div>
                        <p className="text-xs font-semibold uppercase text-[#a84824] dark:text-[#ffa351]">
                          {post.tags[0] || "Feature"}
                        </p>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-1 block text-lg font-black leading-snug text-zinc-950 hover:text-[#a84824] dark:text-white dark:hover:text-[#ffa351]"
                        >
                          {post.title}
                        </Link>
                        <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
                          {getSummary(post.content, post.excerpt, 85)}
                        </p>
                      </div>
                    </article>
                  ))}
                </aside>
              </section>
            )}

            {latestPosts.length > 0 && (
              <section className="mt-6">
                <div className="mb-4 flex items-center justify-between border-b border-zinc-950 pb-2 dark:border-zinc-200">
                  <h2 className="text-xl font-black text-zinc-950 dark:text-white">
                    Latest
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {latestPosts.length} stories
                  </p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {latestPosts.map((post) => (
                    <article
                      key={post._id}
                      className="group border border-zinc-300 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                    >
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div
                          role="img"
                          aria-label={post.title}
                          className="aspect-[16/9] bg-zinc-200 bg-cover bg-center dark:bg-zinc-900"
                          style={{
                            backgroundImage: `url(${post.coverImage || fallbackCover})`,
                          }}
                        />
                      </Link>
                      <div className="p-4">
                        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                          {formatDate(post.publishedAt) && (
                            <span>{formatDate(post.publishedAt)}</span>
                          )}
                          <span>{getReadingTime(post.content)}</span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-2 block text-xl font-black leading-tight text-zinc-950 group-hover:text-[#a84824] dark:text-white dark:group-hover:text-[#ffa351]"
                        >
                          {post.title}
                        </Link>
                        <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                          {getSummary(post.content, post.excerpt, 110)}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {restPosts.length === 0 && (
              <section className="mt-8 border-t border-zinc-300 pt-5 dark:border-zinc-800">
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  More stories will land here soon.
                </p>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default page;
