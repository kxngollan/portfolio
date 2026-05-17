import connectToDatabase from "@/lib/mongodb";
import BlogModel from "@/models/blog";
import ProjectModel from "@/models/projects";
import type { PublicBlogPost } from "@/types/blog";
import type { PublicProject } from "@/types/project";

function serialize<T>(value: unknown) {
  return JSON.parse(JSON.stringify(value)) as T;
}

export async function getProjects() {
  try {
    await connectToDatabase();

    const projects = await ProjectModel.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return serialize<PublicProject[]>(projects);
  } catch {
    return [];
  }
}

export async function getProject(slug: string) {
  try {
    await connectToDatabase();

    const project = await ProjectModel.findOne({ slug }).lean();

    return project ? serialize<PublicProject>(project) : null;
  } catch {
    return null;
  }
}

export async function getPublishedBlogPosts() {
  try {
    await connectToDatabase();

    const posts = await BlogModel.find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    return serialize<PublicBlogPost[]>(posts);
  } catch {
    return [];
  }
}

export async function getPublishedBlogPost(slug: string) {
  try {
    await connectToDatabase();

    const post = await BlogModel.findOne({ slug, published: true }).lean();

    return post ? serialize<PublicBlogPost>(post) : null;
  } catch {
    return null;
  }
}
