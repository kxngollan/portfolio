import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import {
  apiError,
  requireAdmin,
  serializeDocument,
  stringList,
  stringValue,
} from "@/lib/admin-api";
import BlogModel from "@/models/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getBlogPayload(body: Record<string, unknown>) {
  const title = stringValue(body.title);
  const slug = stringValue(body.slug).toLowerCase();
  const content = stringValue(body.content);
  const publishedAtValue = stringValue(body.publishedAt);
  const publishedAt = publishedAtValue ? new Date(publishedAtValue) : undefined;

  if (!title || !slug || !content) {
    return { error: "Title, slug, and content are required." };
  }

  if (publishedAt && Number.isNaN(publishedAt.getTime())) {
    return { error: "Published date is invalid." };
  }

  return {
    data: {
      title,
      slug,
      content,
      excerpt: stringValue(body.excerpt),
      coverImage: stringValue(body.coverImage),
      tags: stringList(body.tags),
      author: stringValue(body.author),
      published: Boolean(body.published),
      publishedAt: publishedAt ?? null,
    },
  };
}

export async function GET() {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    await connectToDatabase();

    const posts = await BlogModel.find()
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    return NextResponse.json(serializeDocument(posts));
  } catch (error) {
    return apiError(error, "Unable to load blog posts.");
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = getBlogPayload(body);

    if (payload.error || !payload.data) {
      return NextResponse.json({ message: payload.error }, { status: 400 });
    }

    await connectToDatabase();

    const post = await BlogModel.create(payload.data);

    return NextResponse.json(serializeDocument(post), { status: 201 });
  } catch (error) {
    return apiError(error, "Unable to save blog post.");
  }
}
