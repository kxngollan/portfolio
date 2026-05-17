import type { AdminBlogPost } from "@/types/blog";
import type { AdminProject } from "@/types/project";

export type ProjectForm = Omit<AdminProject, "stack"> & {
  stack: string;
};

export type BlogForm = Omit<AdminBlogPost, "tags"> & {
  tags: string;
};

export type Status = {
  type: "success" | "error";
  text: string;
} | null;

export type AdminDashboardProps = {
  initialAuthenticated: boolean;
  initialProjects: AdminProject[];
  initialBlogPosts: AdminBlogPost[];
  initialError?: string;
};

export type RichTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minHeightClass: string;
};
