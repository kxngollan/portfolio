"use client";
import Link from "next/link";
import ProjectCard from "./ProjectsCard";
import shona from "@/public/projects/shona-dictionary.png";
import netflix from "@/public/projects/watch-netflix.jpeg";
import portfolio from "@/public/projects/portfolio.jpeg";
import type { StaticProject } from "@/types/project";

const Projects = () => {
  const projects: StaticProject[] = [
    {
      name: "Shona Dictionary",
      image: shona,
      desc: "Developed a full-stack language learning platform that enables users to search Shona word meanings, discover English to Shona translations, and participate in daily vocabulary challenges. With over 10 thousands monthly users. The application was designed to support language preservation through a scalable, community-focused dictionary system, providing an accessible digital resource for Shona speakers and learners worldwide.",
      stack:
        "HTML CSS TailwindCSS Javascript TypeScript React NextJS NodeJs Docker MongoDB Vercel Github ",
      kind: "Open Source",
      github: "https://github.com/asideofcode/duramazwi",
      live: "https://shonadictionary.com/",
    },
    {
      name: "Watch Netflix Together",
      image: netflix,
      desc: "A synchronized streaming app that allows multiple users to watch Netflix shows together in real time with over 70,000 downloads. Built with WebSockets for live chat and playback sync, ensuring a seamless shared viewing experience.",
      stack:
        "HTML CSS TailwindCSS JavaScript TypeScript React Express NodeJs Docker Github AWS ChromeAPI",
      kind: "Company",
      live: "https://watchnetflixtogether.com/",
      ext: "https://chromewebstore.google.com/detail/watch-netflix-together/fdjglnlhapkoahdmanogpccpmmpnakje",
    },

    {
      name: "Portfolio",
      image: portfolio,
      desc: "A high-performance personal portfolio built to highlight projects, skills, and experience. Developed with Next.js and TypeScript, featuring responsive UI, server-side rendering, SEO optimization.",
      github: "https://github.com/kxngollan/portfolio",
      live: "https://ollanmuza.com/",
      stack: "HTML CSS TypeScript React Next.js TailwindCSS Docker Vercel",
    },
  ];

  return (
    <div className="w-full max-w-5xl px-4 py-3">
      {/* Section header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xs font-medium text-[#ffa351] tracking-wider">
            03
          </span>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-white/8" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/35">
            Portfolio
          </span>
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
      <div className="w-full flex justify-center items-center pt-5">
        <Link
          href="/projects"
          className="group flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold uppercase tracking-[0.12em] border border-black/15 dark:border-white/10 bg-white/5 dark:bg-white/3 text-zinc-700 dark:text-white hover:border-[#ffa351]/60 hover:text-[#ffa351] hover:bg-[#ffa351]/5 transition-all duration-300 whitespace-nowrap"
        >
          See all projects →
        </Link>
      </div>
    </div>
  );
};

export default Projects;
