import Image from "next/image";
import Link from "next/link";
import RichText from "@/components/RichText";
import { getProjects } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const fallbackCover = "/no-image.png";

function validImageSrc(src: string | null | undefined): string {
  if (!src) return fallbackCover;
  try {
    new URL(src);
    return src;
  } catch {
    return src.startsWith("/") ? src : fallbackCover;
  }
}

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <main className="min-h-screen mt-16 px-4 py-16 dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-xs font-medium text-[#ffa351] tracking-wider">All</span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/8" />
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/35">Portfolio</span>
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold dark:text-white tracking-tight">
            Projects
          </h1>
        </div>

        {projects.length === 0 ? (
          <div className="border border-zinc-200 dark:border-white/8 rounded-2xl p-12 text-center bg-zinc-50 dark:bg-white/1">
            <h2 className="text-xl font-bold dark:text-white mb-2">No projects yet.</h2>
            <p className="text-sm text-zinc-500">Published projects will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.map((project) => (
              <article
                key={project._id}
                className="group border border-zinc-200 dark:border-white/8 bg-zinc-50 dark:bg-white/1 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#ffa351]/25 hover:bg-[#ffa351]/2 flex flex-col"
              >
                {/* Cover image */}
                {project.image && (
                  <Link href={`/projects/${project.slug}`} className="block overflow-hidden shrink-0">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={validImageSrc(project.image)}
                        alt={project.name}
                        fill
                        className="object-cover brightness-75 transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                )}

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Kind tag */}
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#ffa351] mb-2">
                    {project.kind || "Personal Project"}
                  </p>

                  {/* Title */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block text-base font-bold dark:text-white text-zinc-900 tracking-tight leading-snug hover:text-[#ffa351] transition-colors duration-200 mb-3"
                  >
                    {project.name}
                  </Link>

                  {/* Description */}
                  <div className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-500 flex-1 mb-4">
                    <RichText
                      text={project.desc}
                      className="text-sm leading-relaxed"
                      paragraphClassName="mb-2 last:mb-0 line-clamp-3"
                    />
                  </div>

                  {/* Tech stack tags */}
                  {project.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-white/6">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 dark:border-white/10 px-3 py-0.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-500 hover:border-[#ffa351]/40 hover:text-[#ffa351] transition-colors duration-200"
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

export default ProjectsPage;
