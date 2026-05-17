import Link from "next/link";
import { notFound } from "next/navigation";
import RichText from "@/components/RichText";
import { getProject } from "@/lib/public-content";
import type { ProjectPageProps } from "@/types/project";

export const dynamic = "force-dynamic";

const page = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-28 dark:bg-[#0a0a0a]">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/projects"
          className="text-sm font-semibold text-[#c56b16] hover:text-[#ffa351]"
        >
          Back to Projects
        </Link>

        {project.image && (
          <div
            className="mt-8 aspect-[16/9] rounded-lg bg-zinc-200 bg-cover bg-center dark:bg-zinc-900"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        )}

        <header className="mt-8 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c56b16]">
            {project.kind || "Personal Project"}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-zinc-950 dark:text-white">
            {project.name}
          </h1>
        </header>

        <RichText
          text={project.desc}
          className="mt-8 space-y-5 text-base leading-8 text-zinc-700 dark:text-zinc-200"
        />

        {project.stack.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 hover:border-[#ffa351] hover:text-[#c56b16] dark:border-zinc-700 dark:text-zinc-100"
            >
              GitHub
            </Link>
          )}
          {project.live && (
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#ffa351] px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-[#ffb66f]"
            >
              Live
            </Link>
          )}
          {project.ext && (
            <Link
              href={project.ext}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 hover:border-[#ffa351] hover:text-[#c56b16] dark:border-zinc-700 dark:text-zinc-100"
            >
              Extension
            </Link>
          )}
        </div>
      </article>
    </main>
  );
};

export default page;
