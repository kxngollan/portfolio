import AdminDashboard from "@/components/admin/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import connectToDatabase from "@/lib/mongodb";
import BlogModel from "@/models/blog";
import ProjectModel from "@/models/projects";
import type { AdminBlogPost } from "@/types/blog";
import type { AdminProject } from "@/types/project";

export const dynamic = "force-dynamic";

function serialize<T>(value: unknown) {
  return JSON.parse(JSON.stringify(value)) as T;
}

const page = async () => {
  const authenticated = await isAdminAuthenticated();
  let projects: AdminProject[] = [];
  let blogPosts: AdminBlogPost[] = [];
  let error: string | undefined;

  if (authenticated) {
    try {
      await connectToDatabase();

      const [projectDocs, blogDocs] = await Promise.all([
        ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean(),
        BlogModel.find().sort({ publishedAt: -1, createdAt: -1 }).lean(),
      ]);

      projects = serialize<AdminProject[]>(projectDocs);
      blogPosts = serialize<AdminBlogPost[]>(blogDocs);
    } catch (caughtError) {
      error =
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to load admin content.";
    }
  }

  return (
    <AdminDashboard
      initialAuthenticated={authenticated}
      initialProjects={projects}
      initialBlogPosts={blogPosts}
      initialError={error}
    />
  );
};

export default page;
