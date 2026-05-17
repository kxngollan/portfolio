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
import ProjectModel from "@/models/projects";
import type { IdRouteContext } from "@/types/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getProjectPayload(body: Record<string, unknown>) {
  const name = stringValue(body.name);
  const slug = stringValue(body.slug).toLowerCase();
  const desc = stringValue(body.desc);

  if (!name || !slug || !desc) {
    return { error: "Name, slug, and description are required." };
  }

  return {
    data: {
      name,
      slug,
      desc,
      kind: stringValue(body.kind) || "Personal Project",
      image: stringValue(body.image),
      github: stringValue(body.github),
      live: stringValue(body.live),
      ext: stringValue(body.ext),
      stack: stringList(body.stack),
      featured: Boolean(body.featured),
      order: Number(body.order) || 0,
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
    return NextResponse.json({ message: "Invalid project id." }, { status: 400 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = getProjectPayload(body);

    if (payload.error || !payload.data) {
      return NextResponse.json({ message: payload.error }, { status: 400 });
    }

    await connectToDatabase();

    const project = await ProjectModel.findByIdAndUpdate(id, payload.data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!project) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json(serializeDocument(project));
  } catch (error) {
    return apiError(error, "Unable to update project.");
  }
}

export async function DELETE(_request: Request, context: IdRouteContext) {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: "Invalid project id." }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const project = await ProjectModel.findByIdAndDelete(id).lean();

    if (!project) {
      return NextResponse.json({ message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted." });
  } catch (error) {
    return apiError(error, "Unable to delete project.");
  }
}
