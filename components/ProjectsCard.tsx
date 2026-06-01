import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaGithub as GitHubIcon,
  FaGlobeAfrica as LaunchIcon,
} from "react-icons/fa";
import { IoExtensionPuzzle as ExtensionIcon } from "react-icons/io5";
import RichText from "@/components/RichText";
import failedImage from "@/public/no-image.png";
import type { ProjectCardProps } from "@/types/project";

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <div className="group border border-white/8 dark:border-white/8 rounded-2xl overflow-hidden bg-white/1 dark:bg-white/1 transition-all duration-300 hover:border-[#ffa351]/25 hover:bg-[#ffa351]/2">
      <div
        className={`flex flex-col lg:flex-row ${!isEven ? "lg:flex-row-reverse" : ""} min-h-80`}
      >
        {/* Image */}
        <div className="relative w-full lg:w-[45%] overflow-hidden">
          <Image
            src={project.image ?? failedImage}
            alt={project.name}
            onClick={() => window.open(project.live ?? project.github, "_blank")}
            className="w-full h-full object-cover brightness-75 transition-all duration-500 group-hover:brightness-90 group-hover:scale-105 cursor-pointer min-h-55 lg:min-h-0"
          />
          {/* Kind badge */}
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/70 border border-white/10">
              {project.kind ?? "Personal"}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between p-6 lg:p-8 lg:w-[55%]">
          <div>
            <h3 className="text-xl font-bold dark:text-white text-zinc-900 mb-3 tracking-tight">
              <Link
                href={project.github ?? project.live ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ffa351] transition-colors duration-200"
              >
                {project.name}
              </Link>
            </h3>
            <div className="text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
              <RichText
                text={project.desc}
                className="text-sm leading-relaxed"
                paragraphClassName="mb-2 last:mb-0"
              />
            </div>
          </div>

          <div className="mt-6">
            {/* Tech stack tags */}
            <ul className="flex flex-wrap gap-1.5 mb-5">
              {project.stack
                .trim()
                .split(" ")
                .map((tech: string, i: number) => (
                  <li
                    key={i}
                    className="rounded-full border border-white/10 dark:border-white/10 px-3 py-0.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-500 hover:border-[#ffa351]/40 hover:text-[#ffa351] transition-colors duration-200"
                  >
                    {tech}
                  </li>
                ))}
            </ul>

            {/* Links */}
            <div className="flex items-center gap-4">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-500 hover:text-[#ffa351] transition-colors duration-200"
                >
                  <GitHubIcon className="text-base" />
                  <span>Source</span>
                </Link>
              )}
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-500 hover:text-[#ffa351] transition-colors duration-200"
                >
                  <LaunchIcon className="text-base" />
                  <span>Live</span>
                </Link>
              )}
              {project.ext && (
                <Link
                  href={project.ext}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-500 hover:text-[#ffa351] transition-colors duration-200"
                >
                  <ExtensionIcon className="text-base" />
                  <span>Extension</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
