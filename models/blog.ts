import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    tags: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    author: {
      type: String,
      trim: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    collection: "blog",
    timestamps: true,
  },
);

blogSchema.index({ published: 1, publishedAt: -1 });

export type Blog = InferSchemaType<typeof blogSchema>;

const BlogModel =
  (models.Blog as Model<Blog> | undefined) ?? model<Blog>("Blog", blogSchema);

export default BlogModel;
