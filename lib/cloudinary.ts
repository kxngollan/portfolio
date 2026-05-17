import { createHash } from "crypto";
import type {
  CloudinaryUploadResponse,
  UploadedImage,
} from "@/types/cloudinary";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_API_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Please define CLOUDINARY_API_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    );
  }

  return { cloudName, apiKey, apiSecret };
}

function createSignature(params: Record<string, string>, apiSecret: string) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return createHash("sha1")
    .update(`${payload}${apiSecret}`)
    .digest("hex");
}

export async function uploadImageToCloudinary(file: File): Promise<UploadedImage> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please upload an image file.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image files must be 8MB or smaller.");
  }

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.round(Date.now() / 1000).toString();
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "portfolio";
  const paramsToSign = { folder, timestamp };
  const signature = createSignature(paramsToSign, apiSecret);
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("folder", folder);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = (await response.json().catch(() => ({}))) as
    | CloudinaryUploadResponse
    | { error?: { message?: string } };

  if (!response.ok || !("secure_url" in data)) {
    const message = "error" in data ? data.error?.message : null;

    throw new Error(message || "Unable to upload image.");
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    format: data.format,
  };
}
