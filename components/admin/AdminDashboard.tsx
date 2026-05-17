"use client";

import { FormEvent, useRef, useState } from "react";
import {
  FaBold,
  FaItalic,
  FaLink,
  FaPen,
  FaPlus,
  FaRegSave,
  FaSignOutAlt,
  FaTrash,
  FaUnderline,
} from "react-icons/fa";
import { stripRichText } from "@/components/RichText";
import type {
  AdminDashboardProps,
  BlogForm,
  BusyState,
  ImageUploadFieldProps,
  ProjectForm,
  RichTextareaProps,
  Status,
} from "@/types/admin";
import type { AdminBlogPost } from "@/types/blog";
import type { AdminProject } from "@/types/project";
import type { UploadedImage } from "@/types/cloudinary";

const emptyProjectForm: ProjectForm = {
  _id: "",
  name: "",
  slug: "",
  kind: "Personal Project",
  image: "",
  desc: "",
  github: "",
  live: "",
  ext: "",
  stack: "",
  featured: false,
  order: 0,
};

const emptyBlogForm: BlogForm = {
  _id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  tags: "",
  author: "",
  published: false,
  publishedAt: "",
};

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 outline-none ring-0 transition focus:border-[#ffa351] focus:outline-none focus:ring-0 focus-visible:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-[#ffa351]";
const labelClass =
  "block space-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200";
const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";
const toolbarButtonClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 text-zinc-700 transition hover:border-[#ffa351] hover:text-[#c56b16] dark:border-zinc-700 dark:text-zinc-100";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function listToText(value: string[] | undefined) {
  return value?.join(", ") ?? "";
}

function toDateTimeLocal(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  return localDate.toISOString().slice(0, 16);
}

async function requestJson<T>(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const data = (await response.json().catch(() => ({}))) as {
    message?: string;
  };

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data as T;
}

async function uploadImage(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const data = (await response.json().catch(() => ({}))) as {
    message?: string;
  };

  if (!response.ok) {
    throw new Error(data.message || "Unable to upload image.");
  }

  return data as UploadedImage;
}

function ImageUploadField({
  label,
  value,
  busy,
  onUpload,
  onClear,
}: ImageUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];

    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className={`${labelClass} space-y-2`}>
      <span>{label}</span>
      <label
        className={`flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed px-3 py-4 text-center text-sm transition ${
          isDragging
            ? "border-[#ffa351] bg-[#fff0dc] text-[#a84824] dark:border-[#ffa351] dark:bg-[#2b2117] dark:text-[#ffa351]"
            : "border-zinc-300 bg-zinc-50 text-zinc-600 hover:border-[#ffa351] hover:text-[#c56b16] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        } ${busy ? "cursor-not-allowed opacity-70" : ""}`}
        onDragEnter={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (!busy) {
            setIsDragging(true);
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (event.currentTarget.contains(event.relatedTarget as Node)) {
            return;
          }

          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDragging(false);

          if (!busy) {
            handleFiles(event.dataTransfer.files);
          }
        }}
      >
        <span className="font-semibold">
          {busy
            ? "Uploading..."
            : isDragging
              ? "Drop image to upload"
              : "Drop image here"}
        </span>
        {!busy && (
          <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            or click to choose from your computer
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={busy}
          onChange={(event) => {
            handleFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </label>
      {value && (
        <div className="space-y-2">
          <div
            className="aspect-[16/9] rounded-md border border-zinc-200 bg-zinc-100 bg-cover bg-center dark:border-zinc-800 dark:bg-zinc-900"
            style={{ backgroundImage: `url(${value})` }}
          />
          <button
            type="button"
            className="text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-300"
            onClick={onClear}
          >
            Remove image
          </button>
        </div>
      )}
    </div>
  );
}

function RichTextarea({
  label,
  value,
  onChange,
  minHeightClass,
}: RichTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkup = (
    prefix: string,
    suffix: string,
    fallbackText: string,
    nextCursorOffset = prefix.length,
  ) => {
    const textarea = textareaRef.current;

    if (!textarea) {
      onChange(`${value}${prefix}${fallbackText}${suffix}`);
      return;
    }

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = value.slice(selectionStart, selectionEnd) || fallbackText;
    const nextValue = `${value.slice(0, selectionStart)}${prefix}${selectedText}${suffix}${value.slice(selectionEnd)}`;

    onChange(nextValue);

    window.requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        selectionStart + nextCursorOffset,
        selectionStart + nextCursorOffset + selectedText.length,
      );
    });
  };

  const insertLink = () => {
    const textarea = textareaRef.current;
    const selectedText = textarea
      ? value.slice(textarea.selectionStart, textarea.selectionEnd)
      : "";
    const linkText = selectedText || window.prompt("Link text", "Read more");

    if (!linkText) {
      return;
    }

    const href = window.prompt("URL", "https://");

    if (!href) {
      return;
    }

    insertMarkup("[", `](${href})`, linkText);
  };

  return (
    <label className={`${labelClass} md:col-span-2`}>
      {label}
      <div className="flex flex-wrap gap-2 rounded-t-md border border-b-0 border-zinc-300 bg-zinc-50 p-2 dark:border-zinc-700 dark:bg-zinc-900">
        <button
          type="button"
          className={toolbarButtonClass}
          title="Bold"
          aria-label={`Make ${label.toLowerCase()} text bold`}
          onClick={() => insertMarkup("**", "**", "bold text", 2)}
        >
          <FaBold aria-hidden />
        </button>
        <button
          type="button"
          className={toolbarButtonClass}
          title="Italic"
          aria-label={`Make ${label.toLowerCase()} text italic`}
          onClick={() => insertMarkup("*", "*", "italic text")}
        >
          <FaItalic aria-hidden />
        </button>
        <button
          type="button"
          className={toolbarButtonClass}
          title="Underline"
          aria-label={`Underline ${label.toLowerCase()} text`}
          onClick={() => insertMarkup("<u>", "</u>", "underlined text", 3)}
        >
          <FaUnderline aria-hidden />
        </button>
        <button
          type="button"
          className={toolbarButtonClass}
          title="External link"
          aria-label={`Add a link to ${label.toLowerCase()} text`}
          onClick={insertLink}
        >
          <FaLink aria-hidden />
        </button>
      </div>
      <textarea
        ref={textareaRef}
        className={`${inputClass} ${minHeightClass} resize-y rounded-t-none`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default function AdminDashboard({
  initialAuthenticated,
  initialProjects,
  initialBlogPosts,
  initialError,
}: AdminDashboardProps) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [activeTab, setActiveTab] = useState<"projects" | "blog">("projects");
  const [projects, setProjects] = useState(initialProjects);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [projectForm, setProjectForm] = useState<ProjectForm>(emptyProjectForm);
  const [blogForm, setBlogForm] = useState<BlogForm>(emptyBlogForm);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState<Status>(
    initialError ? { type: "error", text: initialError } : null,
  );
  const [busy, setBusy] = useState<BusyState>(null);

  const showStatus = (nextStatus: Status) => {
    setStatus(nextStatus);
  };

  const refreshContent = async () => {
    const [nextProjects, nextBlogPosts] = await Promise.all([
      requestJson<AdminProject[]>("/api/admin/projects"),
      requestJson<AdminBlogPost[]>("/api/admin/blog"),
    ]);

    setProjects(nextProjects);
    setBlogPosts(nextBlogPosts);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy("login");
    showStatus(null);

    try {
      await requestJson("/api/admin/login", {
        method: "POST",
        body: JSON.stringify(loginForm),
      });
      setAuthenticated(true);
      setLoginForm({ username: "", password: "" });
      await refreshContent();
      showStatus({ type: "success", text: "Logged in." });
    } catch (error) {
      showStatus({
        type: "error",
        text: error instanceof Error ? error.message : "Unable to log in.",
      });
    } finally {
      setBusy(null);
    }
  };

  const handleLogout = async () => {
    setBusy("logout");

    try {
      await requestJson("/api/admin/logout", { method: "POST" });
      setAuthenticated(false);
      setProjects([]);
      setBlogPosts([]);
      setProjectForm(emptyProjectForm);
      setBlogForm(emptyBlogForm);
      showStatus(null);
    } catch (error) {
      showStatus({
        type: "error",
        text: error instanceof Error ? error.message : "Unable to log out.",
      });
    } finally {
      setBusy(null);
    }
  };

  const handleProjectSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy("project");
    showStatus(null);

    try {
      await requestJson(
        projectForm._id
          ? `/api/admin/projects/${projectForm._id}`
          : "/api/admin/projects",
        {
          method: projectForm._id ? "PATCH" : "POST",
          body: JSON.stringify(projectForm),
        },
      );
      setProjectForm(emptyProjectForm);
      await refreshContent();
      showStatus({ type: "success", text: "Project saved." });
    } catch (error) {
      showStatus({
        type: "error",
        text: error instanceof Error ? error.message : "Unable to save project.",
      });
    } finally {
      setBusy(null);
    }
  };

  const handleBlogSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy("blog");
    showStatus(null);

    try {
      await requestJson(
        blogForm._id ? `/api/admin/blog/${blogForm._id}` : "/api/admin/blog",
        {
          method: blogForm._id ? "PATCH" : "POST",
          body: JSON.stringify(blogForm),
        },
      );
      setBlogForm(emptyBlogForm);
      await refreshContent();
      showStatus({ type: "success", text: "Blog post saved." });
    } catch (error) {
      showStatus({
        type: "error",
        text:
          error instanceof Error ? error.message : "Unable to save blog post.",
      });
    } finally {
      setBusy(null);
    }
  };

  const handleProjectImageUpload = async (file: File) => {
    setBusy("project-image");
    showStatus(null);

    try {
      const image = await uploadImage(file);

      setProjectForm((current) => ({
        ...current,
        image: image.url,
      }));
      showStatus({ type: "success", text: "Project image uploaded." });
    } catch (error) {
      showStatus({
        type: "error",
        text:
          error instanceof Error ? error.message : "Unable to upload image.",
      });
    } finally {
      setBusy(null);
    }
  };

  const handleBlogImageUpload = async (file: File) => {
    setBusy("blog-image");
    showStatus(null);

    try {
      const image = await uploadImage(file);

      setBlogForm((current) => ({
        ...current,
        coverImage: image.url,
      }));
      showStatus({ type: "success", text: "Blog cover image uploaded." });
    } catch (error) {
      showStatus({
        type: "error",
        text:
          error instanceof Error ? error.message : "Unable to upload image.",
      });
    } finally {
      setBusy(null);
    }
  };

  const deleteProject = async (project: AdminProject) => {
    if (!window.confirm(`Delete ${project.name}?`)) {
      return;
    }

    try {
      await requestJson(`/api/admin/projects/${project._id}`, {
        method: "DELETE",
      });
      await refreshContent();
      showStatus({ type: "success", text: "Project deleted." });
    } catch (error) {
      showStatus({
        type: "error",
        text:
          error instanceof Error ? error.message : "Unable to delete project.",
      });
    }
  };

  const deleteBlogPost = async (post: AdminBlogPost) => {
    if (!window.confirm(`Delete ${post.title}?`)) {
      return;
    }

    try {
      await requestJson(`/api/admin/blog/${post._id}`, {
        method: "DELETE",
      });
      await refreshContent();
      showStatus({ type: "success", text: "Blog post deleted." });
    } catch (error) {
      showStatus({
        type: "error",
        text:
          error instanceof Error ? error.message : "Unable to delete blog post.",
      });
    }
  };

  if (!authenticated) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#c56b16]">
              Portfolio CMS
            </p>
            <h1 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-white">
              Admin Login
            </h1>
          </div>

          <div className="space-y-4">
            <label className={labelClass}>
              Username
              <input
                className={inputClass}
                value={loginForm.username}
                onChange={(event) =>
                  setLoginForm((current) => ({
                    ...current,
                    username: event.target.value,
                  }))
                }
                autoComplete="username"
              />
            </label>

            <label className={labelClass}>
              Password
              <input
                className={inputClass}
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                autoComplete="current-password"
              />
            </label>

            {status && (
              <p
                className={`rounded-md border px-3 py-2 text-sm ${
                  status.type === "error"
                    ? "border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
                    : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                }`}
              >
                {status.text}
              </p>
            )}

            <button
              className={`${buttonClass} w-full bg-[#ffa351] text-zinc-950 hover:bg-[#ffb66f]`}
              disabled={busy === "login"}
            >
              {busy === "login" ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#c56b16]">
            Portfolio CMS
          </p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-950 dark:text-white">
            Admin
          </h1>
        </div>

        <button
          type="button"
          className={`${buttonClass} border border-zinc-300 text-zinc-800 hover:border-[#ffa351] hover:text-[#c56b16] dark:border-zinc-700 dark:text-zinc-100`}
          onClick={handleLogout}
          disabled={busy === "logout"}
        >
          <FaSignOutAlt aria-hidden />
          {busy === "logout" ? "Logging out..." : "Logout"}
        </button>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          className={`${buttonClass} ${
            activeTab === "projects"
              ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
              : "border border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          }`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          type="button"
          className={`${buttonClass} ${
            activeTab === "blog"
              ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
              : "border border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          }`}
          onClick={() => setActiveTab("blog")}
        >
          Blog
        </button>
      </div>

      {status && (
        <p
          className={`mb-6 rounded-md border px-4 py-3 text-sm ${
            status.type === "error"
              ? "border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
              : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
          }`}
        >
          {status.text}
        </p>
      )}

      {activeTab === "projects" ? (
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <form
            onSubmit={handleProjectSubmit}
            className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white">
                {projectForm._id ? "Edit Project" : "New Project"}
              </h2>
              <button
                type="button"
                className={`${buttonClass} border border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-100`}
                onClick={() => setProjectForm(emptyProjectForm)}
              >
                <FaPlus aria-hidden />
                New
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className={labelClass}>
                Name
                <input
                  className={inputClass}
                  value={projectForm.name}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  onBlur={() =>
                    setProjectForm((current) => ({
                      ...current,
                      slug: current.slug || slugify(current.name),
                    }))
                  }
                />
              </label>

              <label className={labelClass}>
                Slug
                <input
                  className={inputClass}
                  value={projectForm.slug}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      slug: slugify(event.target.value),
                    }))
                  }
                />
              </label>

              <label className={labelClass}>
                Kind
                <input
                  className={inputClass}
                  value={projectForm.kind}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      kind: event.target.value,
                    }))
                  }
                />
              </label>

              <ImageUploadField
                label="Project Image"
                value={projectForm.image}
                busy={busy === "project-image"}
                onUpload={handleProjectImageUpload}
                onClear={() =>
                  setProjectForm((current) => ({
                    ...current,
                    image: "",
                  }))
                }
              />

              <RichTextarea
                label="Description"
                value={projectForm.desc}
                minHeightClass="min-h-32"
                onChange={(value) =>
                  setProjectForm((current) => ({
                    ...current,
                    desc: value,
                  }))
                }
              />

              <label className={`${labelClass} md:col-span-2`}>
                Stack
                <input
                  className={inputClass}
                  value={projectForm.stack}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      stack: event.target.value,
                    }))
                  }
                />
              </label>

              <label className={labelClass}>
                GitHub URL
                <input
                  className={inputClass}
                  value={projectForm.github}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      github: event.target.value,
                    }))
                  }
                />
              </label>

              <label className={labelClass}>
                Live URL
                <input
                  className={inputClass}
                  value={projectForm.live}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      live: event.target.value,
                    }))
                  }
                />
              </label>

              <label className={labelClass}>
                Extension URL
                <input
                  className={inputClass}
                  value={projectForm.ext}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      ext: event.target.value,
                    }))
                  }
                />
              </label>

              <label className={labelClass}>
                Order
                <input
                  className={inputClass}
                  type="number"
                  value={projectForm.order}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      order: Number(event.target.value),
                    }))
                  }
                />
              </label>

              <label className="flex items-center gap-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <input
                  type="checkbox"
                  checked={projectForm.featured}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      featured: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#ffa351]"
                />
                Featured
              </label>
            </div>

            <div className="mt-6">
              <button
                className={`${buttonClass} bg-[#ffa351] text-zinc-950 hover:bg-[#ffb66f]`}
                disabled={busy === "project"}
              >
                <FaRegSave aria-hidden />
                {busy === "project" ? "Saving..." : "Save Project"}
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {projects.map((project) => (
              <article
                key={project._id}
                className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#c56b16]">
                      {project.kind || "Personal Project"}
                    </p>
                    <h3 className="mt-1 font-semibold text-zinc-950 dark:text-white">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      /{project.slug}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      title="Edit project"
                      aria-label={`Edit ${project.name}`}
                      className="rounded-md border border-zinc-300 p-2 text-zinc-700 hover:border-[#ffa351] hover:text-[#c56b16] dark:border-zinc-700 dark:text-zinc-100"
                      onClick={() =>
                        setProjectForm({
                          ...project,
                          stack: listToText(project.stack),
                        })
                      }
                    >
                      <FaPen aria-hidden />
                    </button>
                    <button
                      type="button"
                      title="Delete project"
                      aria-label={`Delete ${project.name}`}
                      className="rounded-md border border-zinc-300 p-2 text-zinc-700 hover:border-red-400 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-100"
                      onClick={() => deleteProject(project)}
                    >
                      <FaTrash aria-hidden />
                    </button>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">
                  {stripRichText(project.desc)}
                </p>
                {project.stack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-zinc-300 px-2 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <form
            onSubmit={handleBlogSubmit}
            className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white">
                {blogForm._id ? "Edit Blog Post" : "New Blog Post"}
              </h2>
              <button
                type="button"
                className={`${buttonClass} border border-zinc-300 text-zinc-800 dark:border-zinc-700 dark:text-zinc-100`}
                onClick={() => setBlogForm(emptyBlogForm)}
              >
                <FaPlus aria-hidden />
                New
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className={labelClass}>
                Title
                <input
                  className={inputClass}
                  value={blogForm.title}
                  onChange={(event) =>
                    setBlogForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  onBlur={() =>
                    setBlogForm((current) => ({
                      ...current,
                      slug: current.slug || slugify(current.title),
                    }))
                  }
                />
              </label>

              <label className={labelClass}>
                Slug
                <input
                  className={inputClass}
                  value={blogForm.slug}
                  onChange={(event) =>
                    setBlogForm((current) => ({
                      ...current,
                      slug: slugify(event.target.value),
                    }))
                  }
                />
              </label>

              <label className={labelClass}>
                Author
                <input
                  className={inputClass}
                  value={blogForm.author}
                  onChange={(event) =>
                    setBlogForm((current) => ({
                      ...current,
                      author: event.target.value,
                    }))
                  }
                />
              </label>

              <ImageUploadField
                label="Cover Image"
                value={blogForm.coverImage}
                busy={busy === "blog-image"}
                onUpload={handleBlogImageUpload}
                onClear={() =>
                  setBlogForm((current) => ({
                    ...current,
                    coverImage: "",
                  }))
                }
              />

              <RichTextarea
                label="Excerpt"
                value={blogForm.excerpt ?? ""}
                minHeightClass="min-h-20"
                onChange={(value) =>
                  setBlogForm((current) => ({
                    ...current,
                    excerpt: value,
                  }))
                }
              />

              <RichTextarea
                label="Content"
                value={blogForm.content}
                minHeightClass="min-h-56"
                onChange={(value) =>
                  setBlogForm((current) => ({
                    ...current,
                    content: value,
                  }))
                }
              />

              <label className={labelClass}>
                Tags
                <input
                  className={inputClass}
                  value={blogForm.tags}
                  onChange={(event) =>
                    setBlogForm((current) => ({
                      ...current,
                      tags: event.target.value,
                    }))
                  }
                />
              </label>

              <label className={labelClass}>
                Published At
                <input
                  className={inputClass}
                  type="datetime-local"
                  value={blogForm.publishedAt ?? ""}
                  onChange={(event) =>
                    setBlogForm((current) => ({
                      ...current,
                      publishedAt: event.target.value,
                    }))
                  }
                />
              </label>

              <label className="flex items-center gap-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <input
                  type="checkbox"
                  checked={blogForm.published}
                  onChange={(event) =>
                    setBlogForm((current) => ({
                      ...current,
                      published: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#ffa351]"
                />
                Published
              </label>
            </div>

            <div className="mt-6">
              <button
                className={`${buttonClass} bg-[#ffa351] text-zinc-950 hover:bg-[#ffb66f]`}
                disabled={busy === "blog"}
              >
                <FaRegSave aria-hidden />
                {busy === "blog" ? "Saving..." : "Save Blog Post"}
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {blogPosts.map((post) => (
              <article
                key={post._id}
                className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#c56b16]">
                      {post.published ? "Published" : "Draft"}
                    </p>
                    <h3 className="mt-1 font-semibold text-zinc-950 dark:text-white">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      /{post.slug}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      title="Edit blog post"
                      aria-label={`Edit ${post.title}`}
                      className="rounded-md border border-zinc-300 p-2 text-zinc-700 hover:border-[#ffa351] hover:text-[#c56b16] dark:border-zinc-700 dark:text-zinc-100"
                      onClick={() =>
                        setBlogForm({
                          ...post,
                          tags: listToText(post.tags),
                          publishedAt: toDateTimeLocal(post.publishedAt),
                        })
                      }
                    >
                      <FaPen aria-hidden />
                    </button>
                    <button
                      type="button"
                      title="Delete blog post"
                      aria-label={`Delete ${post.title}`}
                      className="rounded-md border border-zinc-300 p-2 text-zinc-700 hover:border-red-400 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-100"
                      onClick={() => deleteBlogPost(post)}
                    >
                      <FaTrash aria-hidden />
                    </button>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">
                  {stripRichText(post.excerpt || post.content)}
                </p>
                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-zinc-300 px-2 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
