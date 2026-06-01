"use client";
import Link from "next/link";
import ProjectCard from "./ProjectsCard";
import chess from "@/public/projects/chess.jpeg";
import fake from "@/public/projects/fake-socials.jpeg";
import store from "@/public/projects/fake-store.jpeg";
import netflix from "@/public/projects/watch-netflix.jpeg";
import portfolio from "@/public/projects/portfolio.jpeg";
import house from "@/public/projects/house.jpeg";
import type { StaticProject } from "@/types/project";

const Projects = () => {
  const projects: StaticProject[] = [
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
      name: "Watch Netflix Together",
      image: netflix,
      desc: "A synchronized streaming app that allows multiple users to watch Netflix shows together in real time with over 70,000 downloads. Built with WebSockets for live chat and playback sync, ensuring a seamless shared viewing experience.",
      stack: "HTML CSS React Express AWS ChromeAPI",
      kind: "Company",
      live: "https://watchnetflixtogether.com/",
      ext: "https://chromewebstore.google.com/detail/watch-netflix-together/fdjglnlhapkoahdmanogpccpmmpnakje",
    },
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
      name: "Real Estate Listing Platform",
      image: house,
      desc: "A fullstack real estate marketplace that allows users to browse, search, and filter housing listings with an intuitive, modern UI. Built with Vue, TypeScript, Inertia, and Tailwind on a Laravel + MySQL backend, the platform includes authenticated listing management, image uploads, and real-time search filtering.",
      stack:
        "HTML CSS Vue Tailwind Node Inertia PHP Laravel MySQL Docker Composer",
      github: "https://github.com/kxngollan/housing-listing",
    },
    {
      name: "Portfolio",
      image: portfolio,
      desc: "My personal developer portfolio showcasing projects, skills, and experience. Built for performance and design clarity using React and Tailwind, and fully containerized with Docker for easy deployment.",
      github: "https://github.com/kxngollan/portfolio",
      live: "https://ollanmuza.com/",
      stack: "HTML Tailwind ReactJS Typescript Docker",
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
    <div className="w-full max-w-5xl px-4 py-3">
      {/* Section header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xs font-medium text-[#ffa351] tracking-wider">03</span>
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/35">Portfolio</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl xl:text-4xl font-bold dark:text-white tracking-tight">
            Selected Works
          </h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-zinc-500 dark:text-zinc-500 hover:text-[#ffa351] transition-colors duration-200 whitespace-nowrap mb-1"
          >
            See all projects →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
