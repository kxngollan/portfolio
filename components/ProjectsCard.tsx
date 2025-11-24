import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  FaGithub as GitHubIcon,
  FaGlobeAfrica as LaunchIcon,
} from "react-icons/fa";
import failedImage from "@/public/no-image.png";

type Project = {
  name: string;
  kind?: string;
  image?: StaticImageData;
  desc: string;
  github?: string;
  live?: string;
  stack: string;
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  const alignSide = isEven
    ? "lg:items-end lg:self-end lg:text-right"
    : "lg:items-start lg:self-start lg:text-left";
  const alignSelf = isEven ? "lg:self-end" : "lg:self-start";
  const linksMargin = isEven ? "lg:ml-auto" : "lg:mr-auto";

  return (
    <>
      <div
        className={`group relative flex min-h-[400px] flex-col lg:flex-row ${
          !isEven ? "lg:flex-row-reverse" : ""
        } bg-transparent  mb-5 rounded-lg transition-all duration-300`}
      >
        <Image
          src={project.image ?? failedImage}
          alt={project.name}
          onClick={() => {
            window.open(project.live ?? project.github, "_blank");
          }}
          className="w-full lg:w-1/2 h-full object-cover overflow-hidden brightness-75 transition duration-300 group-hover:brightness-100 cursor-pointer"
        />
        <div
          className={`
          project-details
          inset-0 flex flex-col justify-between p-5 rounded-lg
          translate-y-4
          transition-all duration-300
          group-hover:opacity-100 group-hover:translate-y-0
          lg:static lg:inset-auto lg:w-1/2  lg:opacity-100 lg:translate-y-0
        `}
        >
          <div
            className={`flex flex-col h-[50px] items-center mb-5 lg:mb-0 ${alignSide}`}
          >
            <p className="m-0 text-[0.75rem] uppercase tracking-wide ">
              {project.kind ?? "Personal Project"}
            </p>
            <h3 className="m-0 mt-1 mb-2 text-xl lg:text-[1.35rem] font-semibold">
              <Link
                href={project.github ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline  hover:underline"
              >
                {project.name}
              </Link>
            </h3>
          </div>
          <div
            className="
            flex rounded-md p-5
            lg:dark:bg-[rgb(30,28,25)] lg:bg-[rgb(227,214,195)]
          md:p-5 sm:p-3"
          >
            <p className="m-0 text-[0.9rem] md:text-base lg:text-[1.1rem]">
              {project.desc}
            </p>
          </div>

          <div className={`flex flex-col mt-4 self-center ${alignSelf}`}>
            <ul
              className="
              list-none p-0 flex flex-wrap mt-2
              justify-center lg:justify-end
              gap-x-4 gap-y-1 text-white
              lg:ml-auto
            "
            >
              {project.stack
                .trim()
                .split(" ")
                .map((tech:string, i:number) => (
                  <li
                    key={i}
                    className="
                rounded-full border border-slate-600/70 px-4 py-1
                  text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem]
                  text-[#8892b0]
                "
                  >
                    {tech}
                  </li>
                ))}
            </ul>
            <div
              className={`
              flex items-center mt-3
              justify-center ${linksMargin}
            `}
            >
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" mr-3 flex hover:text-[#ffa351] items-center transition-colors"
                >
                  <GitHubIcon className="text-[1.25rem] sm:text-[1.5rem]" />
                </Link>
              )}
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-[#ffa351] transition-colors"
                >
                  <LaunchIcon className="text-[1.25rem] sm:text-[1.5rem]" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ProjectCard;
