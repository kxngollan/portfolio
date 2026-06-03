import type { StaticProject } from "@/types/project";
import chess from "@/public/projects/chess.jpeg";
import fake from "@/public/projects/fake-socials.jpeg";
import house from "@/public/projects/house.jpeg";
import store from "@/public/projects/fake-store.jpeg";
import ProjectCard from "@/components/ProjectsCard";

const ProjectsPage = async () => {
  const projects: StaticProject[] = [
    {
      name: "Fake Store",
      image: store,
      desc: "A fake e-commerce store app that fetches live product data from a postgres database. Users can browse, view product details, and simulate purchases via stripe, built to demonstrate my fullstack capabilities for working with API, databases and dynamic rendering.",
      github: "https://github.com/kxngollan/fake-store",
      live: "https://fake-store-alpha-ten.vercel.app/",
      stack:
        "HTML CSS Tailwind Typescript Docker React Next Next-Auth Vercel APIs Postgres Stripe",
    },
    {
      name: "Chess Experiments",
      image: chess,
      desc: "An interactive chess platform that lets users test different strategies and analyze moves using the Stockfish engine. Includes real time feedback and a Chrome extension for in-browser play and analysis.",
      live: "https://www.chessexperiments.com",
      stack:
        "HTML CSS React Typescript NodeJs Stockfish Docker Chrome-Extension ChromeAPI",
      ext: "https://chromewebstore.google.com/detail/chess-experiments/dhmflbggejcdphfndmomdnmikdngakce",
    },
    {
      name: "Real Estate Listing Platform",
      image: house,
      desc: "A fullstack real estate marketplace that allows users to browse, search, and filter housing listings with an intuitive, modern UI. Built with Vue, TypeScript, Inertia, and Tailwind on a Laravel + MySQL backend, the platform includes authenticated listing management, image uploads, and real-time search filtering.",
      stack:
        "HTML CSS Vue Tailwind Node Inertia PHP Laravel MySQL Docker Composer",
      github: "https://github.com/kxngollan/housing-listing",
    },
    {
      name: "Fake Socials",
      image: fake,
      desc: "A mock social media platform where users can post, like, and interact in a simulated environment. Designed to mimic real-world social networks for UI/UX experimentation and backend testing.",
      github: "https://github.com/kxngollan/fake-socials-front",
      live: "www.fakesocials.com",
      stack:
        "HTML CSS React Next Typescript Express O-Auth AWS Socket-IO PostgresSQL Docker",
    },
  ];

  return (
    <main className="min-h-screen mt-16 px-4 py-16 dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-xs font-medium text-[#ffa351] tracking-wider">
              All
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/8" />
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/35">
              Portfolio
            </span>
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold dark:text-white tracking-tight">
            Projects
          </h1>
        </div>

        {projects.length === 0 ? (
          <div className="border border-zinc-200 dark:border-white/8 rounded-2xl p-12 text-center bg-zinc-50 dark:bg-white/1">
            <h2 className="text-xl font-bold dark:text-white mb-2">
              No projects yet.
            </h2>
            <p className="text-sm text-zinc-500">
              Published projects will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProjectsPage;
