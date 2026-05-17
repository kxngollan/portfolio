import { NextResponse } from "next/server";
import { apiError, requireAdmin } from "@/lib/admin-api";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Please choose an image file." },
        { status: 400 },
      );
    }

    const image = await uploadImageToCloudinary(file);

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return apiError(error, "Unable to upload image.");
  }
}
