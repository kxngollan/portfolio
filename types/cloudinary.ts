export type CloudinaryUploadResponse = {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
};

export type UploadedImage = {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
};
