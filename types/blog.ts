export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags: string[];
  author?: string;
  published: boolean;
  publishedAt?: string | null;
};

export type AdminBlogPost = BlogPost;

export type PublicBlogPost = BlogPost;

export type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};
