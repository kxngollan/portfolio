import Link from "next/link";
import RichText from "@/components/RichText";
import { getProjects } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const page = async () => {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-28 dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c56b16]">
            Work
          </p>
          <h1 className="mt-2 text-4xl font-bold text-zinc-950 dark:text-white">
            Projects
          </h1>
        </header>

        {projects.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-300">No projects yet.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project._id}
                className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
              >
                {project.image && (
                  <div
                    className="aspect-[16/9] bg-zinc-200 bg-cover bg-center dark:bg-zinc-900"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                )}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#c56b16]">
                    {project.kind || "Personal Project"}
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-2 block text-2xl font-bold text-zinc-950 hover:text-[#c56b16] dark:text-white dark:hover:text-[#ffa351]"
                  >
                    {project.name}
                  </Link>
                  <RichText
                    text={project.desc}
                    className="mt-3 text-zinc-700 dark:text-zinc-200"
                    paragraphClassName="mb-3 last:mb-0"
                  />
                  {project.stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
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
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
