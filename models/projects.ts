import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
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
    kind: {
      type: String,
      default: "Personal Project",
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    live: {
      type: String,
      trim: true,
    },
    ext: {
      type: String,
      trim: true,
    },
    stack: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "projects",
    timestamps: true,
  },
);

projectSchema.index({ featured: 1, order: 1 });

export type Project = InferSchemaType<typeof projectSchema>;

const ProjectModel =
  (models.Project as Model<Project> | undefined) ??
  model<Project>("Project", projectSchema);

export default ProjectModel;
