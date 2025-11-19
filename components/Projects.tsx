import React from "react";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaGlobeAfrica } from "react-icons/fa";
import failedImage from "@/public/no-image.png";

const Projects: React.FC = () => {
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
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum ab, et in temporibus ullam animi voluptas laudantium magnam eius blanditiis praesentium, hic adipisci placeat expedita eveniet dolor quaerat deleniti non.",
      live: "www.chessexperiments.com",
      stack:
        "HTML CSS React Typescript NodeJs Stockfish Docker Chrome-Extension ChromeAPI",
    },
    {
      name: "Fake Socials",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum ab, et in temporibus ullam animi voluptas laudantium magnam eius blanditiis praesentium, hic adipisci placeat expedita eveniet dolor quaerat deleniti non.",
      github: "https://github.com/kxngollan/fake-socials-front",
      live: "www.fakesocials.com",
      stack:
        "HTML CSS React Next Typescript Express AWS Socket-IO PostgresSQL Docker",
    },
    {
      name: "Watch Netflix Together",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex libero, quos esse tempora est eligendi, dolor architecto eum nostrum, iste velit suscipit? Repudiandae incidunt ea fugiat aperiam perferendis asperiores repellendus?",
      stack: "HTML CSS React Express AWS SocketIO",
      kind: "Company",
      live: "https://watchnetflixtogether.com/",
    },
    {
      name: "Portfolio",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum ab, et in temporibus ullam animi voluptas laudantium magnam eius blanditiis praesentium, hic adipisci placeat expedita eveniet dolor quaerat deleniti non.",
      github: "https://github.com/kxngollan/portfolio",
      live: "https://ollanmuza.com/",
      stack: "HTML Tailwind ReactJS Typescript Docker",
    },
    {
      name: "Catch Em All",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius maxime id eligendi explicabo quidem temporibus commodi eum quasi delectus, tenetur expedita corrupti reprehenderit, nulla accusamus, aliquam veniam impedit ad placeat.",
      github: "https://github.com/kxngollan/Catch-em-all",
      live: "https://chic-gecko-a211b1.netlify.app/",
      stack: "Netlify HTML CSS React",
    },
    {
      name: "Fake Store",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eligendi quaerat libero incidunt similique quos ducimus, exercitationem id, ratione adipisci enim itaque, nam repellendus. Repellendus ex veritatis magni ipsam sunt",
      github: "https://github.com/kxngollan/fake-store",
      live: "https://fake-store-red.vercel.app/",
      stack: "HTML CSS React Vercel APIs ",
    },
    {
      name: "Etch A Sketch",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, nulla rerum excepturi ipsum sed, architecto enim qui dolore voluptate sit nemo doloremque cumque aperiam nesciunt earum dolor velit iure commodi.",
      github: "https://github.com/kxngollan/etch-a-sketch-page",
      live: "https://kxngollan.github.io/etch-a-sketch-page/",
      stack: "HTML CSS VanillaJs",
    },
  ];
  return (
    <section className="w-full max-w-5xl">
      {projects.map((p, i) => (
        <article
          key={i}
          className={`mx-auto max-w-6xl  md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-14 mb-20 last:mb-0 ${
            i % 2 == 1 ? "lg:flex lg:flex-row-reverse " : ""
          }`}
        >
          <div
            className={`relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl ${
              !p?.image ? "dark:bg-white" : ""
            }`}
          >
            <div className="aspect-4/3">
              <Image
                draggable={false}
                src={p?.image ?? failedImage}
                alt={p?.name}
                className="h-full w-full object-cover"
                fill
              />
            </div>
          </div>
          <div className="mt-10 rounded-2xl  px-8 py-10 shadow-2xl md:mt-0 dark:bg-[rgb(30,28,25)] bg-[rgb(227,214,195)]">
            <div className="mb-6 flex justify-between text-xs tracking-[0.25em] uppercase dark:text-slate-400">
              <span></span>
              <span>{p.kind ?? "Personal Project"}</span>
            </div>

            <Link
              href={p.github ?? p.live ?? ""}
              className="text-3xl font-semibold md:text-4xl"
            >
              {p.name.trim()}
            </Link>
            <p className="mt-6 text-base leading-relaxed dark:text-slate-200">
              {p.desc}
            </p>
            {p.stack && p.stack.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                {p.stack
                  .trim()
                  .split(" ")
                  .map((t: string, i: number) => (
                    <span
                      key={i}
                      className="rounded-full border border-slate-600/70 px-4 py-1 dark:text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
              </div>
            )}
            <div className="mt-8 flex items-center justify-end gap-5 text-2xl">
              {p.github && (
                <Link
                  href={p.github}
                  className="hover:text-[#ffa351]"
                  target="_blank"
                >
                  <FaGithub className="cursor-pointer transition-transform hover:scale-110" />
                </Link>
              )}
              {p.live && (
                <Link
                  href={p.live}
                  className="hover:text-[#ffa351]"
                  target="_blank"
                >
                  <FaGlobeAfrica className="cursor-pointer transition-transform hover:scale-110" />
                </Link>
              )}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Projects;
