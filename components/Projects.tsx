"use client";
import type { StaticImageData } from "next/image";
import ProjectCard from "./ProjectsCard";
import chess from "@/public/assets/projects/chess.jpeg";
import catchImg from "@/public/assets/projects/catch.jpeg";
import fake from "@/public/assets/projects/fake-socials.jpeg";
import store from "@/public/assets/projects/fake-store.jpeg";
import netflix from "@/public/assets/projects/watch-netflix.jpeg";
import portfolio from "@/public/assets/projects/portfolio.jpeg";
import sketch from "@/public/assets/projects/sketch.jpeg";

const Projects = () => {
  type Project = {
    name: string;
    kind?: string;
    image?: StaticImageData;
    desc: string;
    github?: string;
    live?: string;
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
    },
    {
      name: "Watch Netflix Together",
      image: netflix,
      desc: "A synchronized streaming app that allows multiple users to watch Netflix shows together in real time with over 70,000 downloads. Built with WebSockets for live chat and playback sync, ensuring a seamless shared viewing experience.",
      stack: "HTML CSS React Express AWS ChromeAPI",
      kind: "Company",
      live: "https://watchnetflixtogether.com/",
    },
    {
      name: "Fake Socials",
      image: fake,
      desc: "A mock social media platform where users can post, like, and interact in a simulated environment. Designed to mimic real-world social networks for UI/UX experimentation and backend testing.",
      github: "https://github.com/kxngollan/fake-socials-front",
      live: "www.fakesocials.com",
      stack:
        "HTML CSS React Next Typescript Express AWS Socket-IO PostgresSQL Docker",
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
      name: "Catch Em All",
      image: catchImg,
      desc: "A Pokémon themed web game where players can discover and catch different Pokémon. This was fueled by my love of Pokémon Features an engaging interface, responsive design, and dynamic data rendering from the PokéAPI.",
      github: "https://github.com/kxngollan/Catch-em-all",
      live: "https://chic-gecko-a211b1.netlify.app/",
      stack: "Netlify HTML CSS React",
    },
    {
      name: "Fake Store",
      image: store,
      desc: "An e-commerce simulation app that fetches live product data from APIs. Users can browse, view product details, and simulate purchases, built as a front-end practice for working with APIs and dynamic rendering.",
      github: "https://github.com/kxngollan/fake-store",
      live: "https://fake-store-red.vercel.app/",
      stack: "HTML CSS React Vercel APIs",
    },
    {
      name: "Etch A Sketch",
      image: sketch,
      desc: "A browser-based drawing app inspired by the classic Etch A Sketch toy. Users can draw using grid-based mechanics, clear the board, and customize drawing sizes with pure HTML, CSS, and Vanilla JS.",
      github: "https://github.com/kxngollan/etch-a-sketch-page",
      live: "https://kxngollan.github.io/etch-a-sketch-page/",
      stack: "HTML CSS VanillaJs",
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
