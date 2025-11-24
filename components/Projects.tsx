"use client";
import type { StaticImageData } from "next/image";
import ProjectCard from "./ProjectsCard";
import chess from "@/public/projects/chess.jpeg";
import fake from "@/public/projects/fake-socials.jpeg";
import store from "@/public/projects/fake-store.jpeg";
import netflix from "@/public/projects/watch-netflix.jpeg";
import portfolio from "@/public/projects/portfolio.jpeg";
import house from "@/public/projects/house.jpeg";


const Projects = () => {
  type Project = {
    name: string;
    kind?: string;
    image?: StaticImageData;
    desc: string;
    github?: string;
    live?: string;
    ext?:string;
    stack: string;
  };

  const projects: Project[] = [
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
      live: "https://fake-store-red.vercel.app/",
      stack:
        "HTML CSS Tailwind Typescript Docker React Next Next-Auth Vercel APIs Postgres Stripe",
    },
    {
      name: "Real Estate Listing Platform",
      image: house,
      desc: "A fullstack real estate marketplace that allows users to browse, search, and filter housing listings with an intuitive, modern UI. Built with Vue, TypeScript, Inertia, and Tailwind on a Laravel + MySQL backend, the platform includes authenticated listing management, image uploads, and real-time search filtering. With a fully containerised Docker MySQL database for seamless local development and deployment.",
      stack:
        "HTML CSS Vue Tailwind Node Inertia PHP LaravelMySQL Docker Composer",
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
    <div className="w-full max-w-5xl px-4 py-3 text-center sm:px-8">
      <div className="grid grid-cols-1 gap-8">
        <hr />
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
