import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import {
  apiError,
  requireAdmin,
  serializeDocument,
  stringList,
  stringValue,
} from "@/lib/admin-api";
import ProjectModel from "@/models/projects";

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

export async function GET() {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    await connectToDatabase();

    const projects = await ProjectModel.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(serializeDocument(projects));
  } catch (error) {
    return apiError(error, "Unable to load projects.");
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = getProjectPayload(body);

    if (payload.error || !payload.data) {
      return NextResponse.json({ message: payload.error }, { status: 400 });
    }

    await connectToDatabase();

    const project = await ProjectModel.create(payload.data);

    return NextResponse.json(serializeDocument(project), { status: 201 });
  } catch (error) {
    return apiError(error, "Unable to save project.");
  }
}
