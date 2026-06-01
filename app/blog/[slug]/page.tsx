import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import RichText from "@/components/RichText";
import {
  getPublishedBlogPost,
  getPublishedBlogPosts,
} from "@/lib/public-content";
import type { BlogPostPageProps } from "@/types/blog";
import ShareRail from "./ShareRail";
import NewsletterForm from "./NewsletterForm";

export const dynamic = "force-dynamic";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const fallbackCover = "/no-image.png";
const siteUrl = "https://www.ollanmuza.com";

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

const page = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPublishedBlogPost(slug),
    getPublishedBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const publishedDate = formatDate(post.publishedAt);
  const readingTime = getReadingTime(post.content);
  const category = post.tags[0] ?? null;
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const articleUrl = `${siteUrl}/blog/${slug}`;

  return (
    <main
      className={`${playfair.variable} min-h-screen bg-[#fbfaf7] dark:bg-[#0a0a0a]`}
    >
      {/* ── Article Hero ── */}
      <section className="mx-auto max-w-4xl px-6 pb-10 pt-20 text-center">
        {category && (
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#b88a5a] dark:text-[#ffa351]">
            {category}
          </p>
        )}

        <h1 className="font-playfair mx-auto max-w-3xl text-[clamp(36px,6vw,64px)] font-bold leading-[1.15] text-[#1f1d1a] dark:text-[#ededed]">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6f6a64] dark:text-zinc-400">
            {post.excerpt}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-[#6f6a64] dark:text-zinc-400">
          {post.author && <span>By {post.author}</span>}
          {post.author && (publishedDate || readingTime) && (
            <span className="text-[#e8e2da] dark:text-zinc-700">·</span>
          )}
          {publishedDate && <span>{publishedDate}</span>}
          {(publishedDate || post.author) && (
            <span className="text-[#e8e2da] dark:text-zinc-700">·</span>
          )}
          <span>{readingTime}</span>
        </div>

        <div className="relative mx-auto mt-8 aspect-16/7 max-h-105 min-h-50 w-full overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-900">
          <Image
            src={post.coverImage || fallbackCover}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      </section>

      {/* ── 3-Column Layout ── */}
      <section className="mx-auto max-w-300 px-6 pb-24">
        <div className="flex gap-10">
          {/* Share Rail */}
          <aside className="hidden w-20 shrink-0 pt-1 lg:block">
            <div className="sticky top-28">
              <ShareRail title={post.title} url={articleUrl} />
            </div>
          </aside>

          {/* Article Body */}
          <article className="min-w-0 flex-1">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/blog"
                className="text-sm font-bold text-[#a84824] hover:text-[#d96b3c] dark:text-[#ffa351] dark:hover:text-[#ffb870]"
              >
                ← Back to Blog
              </Link>

              {/* Mobile share row */}
              <div className="flex items-center gap-2 lg:hidden">
                <span className="text-xs text-[#6f6a64] dark:text-zinc-500">
                  Share:
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="text-[#6f6a64] hover:text-[#ffa351] dark:text-zinc-400"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.266 5.643L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="text-[#6f6a64] hover:text-[#ffa351] dark:text-zinc-400"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#e8e2da] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#6f6a64] dark:border-zinc-700 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <RichText
              text={post.content}
              className="max-w-170 space-y-6 text-[17px] leading-[1.75] text-[#2b2926] dark:text-zinc-100"
              firstParagraphClassName="first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-[#b88a5a] dark:first-letter:text-[#ffa351]"
            />

            {/* Mobile sidebar cards */}
            <div className="mt-12 space-y-5 lg:hidden">
              {post.author && (
                <SidebarCard>
                  <AuthorCardContent author={post.author} />
                </SidebarCard>
              )}
              <SidebarCard>
                <NewsletterCardContent />
              </SidebarCard>
              <SidebarCard>
                <MetadataCardContent
                  publishedDate={publishedDate}
                  readingTime={readingTime}
                  category={category}
                  tags={post.tags}
                />
              </SidebarCard>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden w-70 shrink-0 lg:block">
            <div className="sticky top-28 space-y-5">
              {post.author && (
                <SidebarCard>
                  <AuthorCardContent author={post.author} />
                </SidebarCard>
              )}
              <SidebarCard>
                <NewsletterCardContent />
              </SidebarCard>
              <SidebarCard>
                <MetadataCardContent
                  publishedDate={publishedDate}
                  readingTime={readingTime}
                  category={category}
                  tags={post.tags}
                />
              </SidebarCard>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Related Articles ── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-[#e8e2da] bg-white px-6 py-16 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-playfair text-2xl font-bold text-[#1f1d1a] dark:text-white">
                More articles you might enjoy
              </h2>
              <Link
                href="/blog"
                className="hidden text-sm font-semibold text-[#a84824] hover:text-[#d96b3c] dark:text-[#ffa351] sm:inline"
              >
                View all articles →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <article
                  key={related._id}
                  className="group overflow-hidden rounded-[14px] border border-[#e8e2da] bg-[#fbfaf7] shadow-[0_6px_18px_rgba(31,29,26,0.04)] transition-shadow hover:shadow-[0_12px_30px_rgba(31,29,26,0.08)] dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <Link
                    href={`/blog/${related.slug}`}
                    className="block overflow-hidden"
                  >
                    <div className="relative aspect-video w-full">
                      <Image
                        src={related.coverImage || fallbackCover}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                  <div className="p-5">
                    {related.tags[0] && (
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#b88a5a] dark:text-[#ffa351]">
                        {related.tags[0]}
                      </p>
                    )}
                    <Link
                      href={`/blog/${related.slug}`}
                      className="font-playfair block text-base font-semibold leading-snug text-[#1f1d1a] group-hover:text-[#a84824] dark:text-white dark:group-hover:text-[#ffa351]"
                    >
                      {related.title}
                    </Link>
                    <p className="mt-2 text-xs text-[#6f6a64] dark:text-zinc-400">
                      {[
                        formatDate(related.publishedAt),
                        getReadingTime(related.content),
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <Link
                href="/blog"
                className="text-sm font-semibold text-[#a84824] hover:text-[#d96b3c] dark:text-[#ffa351]"
              >
                View all articles →
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default page;

// ── Sidebar helpers ──────────────────────────────────────────────────────────

function SidebarCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] border border-[#e8e2da] bg-white p-5 shadow-[0_6px_18px_rgba(31,29,26,0.04)] dark:border-zinc-800 dark:bg-zinc-900">
      {children}
    </div>
  );
}

function AuthorCardContent({ author }: { author: string }) {
  return (
    <>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#6f6a64] dark:text-zinc-500">
        About the Author
      </p>
      <p className="font-playfair text-base font-semibold text-[#1f1d1a] dark:text-white">
        {author}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#6f6a64] dark:text-zinc-400">
        I write about technology, creativity, life, and ideas. Building things
        and sharing what I learn along the way.
      </p>
      <Link
        href="/about"
        className="mt-3 inline-block text-sm font-semibold text-[#a84824] hover:text-[#d96b3c] dark:text-[#ffa351]"
      >
        Learn more →
      </Link>
    </>
  );
}

function NewsletterCardContent() {
  return (
    <>
      <p className="font-playfair mb-1 text-base font-semibold text-[#1f1d1a] dark:text-white">
        Thoughtful reads, once a week.
      </p>
      <p className="mb-4 text-xs leading-5 text-[#6f6a64] dark:text-zinc-400">
        Ideas on tech, creativity, and life — straight to your inbox.
      </p>
      <NewsletterForm />
      <p className="mt-2 text-[11px] text-[#6f6a64] dark:text-zinc-500">
        No spam. Unsubscribe anytime.
      </p>
    </>
  );
}

function MetadataCardContent({
  publishedDate,
  readingTime,
  category,
  tags,
}: {
  publishedDate: string | null;
  readingTime: string;
  category: string | null;
  tags: string[];
}) {
  return (
    <div className="space-y-4">
      {publishedDate && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6f6a64] dark:text-zinc-500">
            Published
          </p>
          <p className="mt-0.5 text-sm text-[#1f1d1a] dark:text-zinc-200">
            {publishedDate}
          </p>
        </div>
      )}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6f6a64] dark:text-zinc-500">
          Reading time
        </p>
        <p className="mt-0.5 text-sm text-[#1f1d1a] dark:text-zinc-200">
          {readingTime}
        </p>
      </div>
      {category && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6f6a64] dark:text-zinc-500">
            Category
          </p>
          <p className="mt-0.5 text-sm text-[#b88a5a] dark:text-[#ffa351]">
            {category}
          </p>
        </div>
      )}
      {tags.length > 1 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#6f6a64] dark:text-zinc-500">
            Tags
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#eee4d8] px-2.5 py-0.5 text-[11px] font-medium text-[#6f6a64] dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
