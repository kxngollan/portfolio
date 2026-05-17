import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import {
  apiError,
  requireAdmin,
  serializeDocument,
  stringList,
  stringValue,
} from "@/lib/admin-api";
import BlogModel from "@/models/blog";
import type { IdRouteContext } from "@/types/api";

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

export async function PATCH(request: Request, context: IdRouteContext) {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: "Invalid blog post id." }, { status: 400 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = getBlogPayload(body);

    if (payload.error || !payload.data) {
      return NextResponse.json({ message: payload.error }, { status: 400 });
    }

    await connectToDatabase();

    const post = await BlogModel.findByIdAndUpdate(id, payload.data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!post) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(serializeDocument(post));
  } catch (error) {
    return apiError(error, "Unable to update blog post.");
  }
}

export async function DELETE(_request: Request, context: IdRouteContext) {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: "Invalid blog post id." }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const post = await BlogModel.findByIdAndDelete(id).lean();

    if (!post) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Blog post deleted." });
  } catch (error) {
    return apiError(error, "Unable to delete blog post.");
  }
}
