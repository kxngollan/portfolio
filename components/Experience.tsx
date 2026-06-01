"use client";

import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import pier from "@/public/job-logos/pier-logo.png";
import pepsi from "@/public/job-logos/pepsi.png";
import toru from "@/public/job-logos/toru.png";
import asideofcode from "@/public/job-logos/asideofcode.png";
import { useState, useMemo } from "react";
import type { ExperienceItem } from "@/types/experience";

const jobExp: ExperienceItem[] = [
  {
    image: pier,
    employer: "Pier Management",
    link: "https://www.linkedin.com/company/pier-management/",
    title: "Full stack Engineer",
    duration: "April 2026 - Present",
    location: "Southend on Sea, UK",
    responsibilities: [],
  },
  {
    image: pepsi,
    employer: "PepsiCo",
    link: "https://www.linkedin.com/company/pepsico/",
    title: "Full stack Engineer",
    duration: "Jan 2025 - Present",
    location: "Leicester, UK",
    responsibilities: [
      "Troubleshooting control systems and machine logic, debugging ladder logic and translating technical requirements into functional solutions.",
      "Implemented Agile methodologies, reducing project delivery time by 20%.",
      "Developed and maintained project plans, ensuring timely completion of milestones.",
    ],
  },
  {
    image: toru,
    employer: "Toru Digital",
    link: "https://www.linkedin.com/company/toru-digital",
    title: "Fullstack Software Developer",
    duration: "August 2024 – December 2024",
    location: "Northampton, UK",
    responsibilities: [
      "Managed end-to-end project lifecycle for software development projects, achieving a 98% delivery rate.",
      "Facilitated daily stand-ups, sprint planning, and retrospective meetings to promote Agile practices.",
      "Collaborated with cross-functional teams, enhancing communication and collaboration.",
    ],
  },
  {
    image: asideofcode,
    employer: "AsideOfCode",
    link: "https://asideofcode.com/",
    title: "Fullstack Software developer",
    location: "London Remote, UK",
    duration: "May 2023 – Jul 2024",
    responsibilities: [
      "Assisted in managing project schedules and contributing to the successful completion of +7 projects",
      "Monitoring project progress and updating documentation to ensure accuracy and compliance.",
      "Coordinated with vendors and third party contractors, fostering strong professional relationship",
    ],
  },
];

const Experience = () => {
  const [active, setActive] = useState<number>(0);
  const [hovered, setHovered] = useState<boolean | null>(null);
  const displayedJob = useMemo(() => jobExp[active], [active]);

  return (
    <div className="w-full max-w-5xl">
      {/* Section header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xs font-medium text-[#ffa351] tracking-wider">01</span>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-white/8" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/35">Career</span>
        </div>
        <h2 className="text-3xl xl:text-4xl font-bold dark:text-white tracking-tight">
          Experience
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Sidebar */}
        <aside className="h-fit md:col-span-1 space-y-2">
          {jobExp.map((company: ExperienceItem, i: number) => (
            <button
              type="button"
              key={i}
              onClick={() => setActive(i)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                active === i
                  ? "bg-[#ffa351]/10 border border-[#ffa351]/30"
                  : "border border-transparent hover:border-zinc-200 dark:hover:border-white/8 hover:bg-zinc-100 dark:hover:bg-white/3"
              }`}
            >
              <div className="w-9 h-9 flex justify-center items-center rounded-lg overflow-hidden shrink-0 bg-white/5 border border-white/10">
                {company.employer === "Pier Management" ? (
                  <div className="bg-teal-300 h-full w-full flex items-center justify-center">
                    <Image
                      draggable={false}
                      src={company.image}
                      className="w-4/5"
                      alt={`${company.employer} logo`}
                    />
                  </div>
                ) : (
                  <Image
                    draggable={false}
                    src={company.image}
                    className={company.employer === "PepsiCo" ? "w-full" : "w-4/5"}
                    alt={`${company.employer} logo`}
                  />
                )}
              </div>
              <div className="min-w-0">
                <span
                  className={`text-sm font-semibold truncate block ${
                    active === i ? "text-[#ffa351]" : "dark:text-white text-zinc-800"
                  }`}
                >
                  {company.employer}
                </span>
                <span className="text-[11px] text-zinc-500 truncate block">{company.title}</span>
              </div>
            </button>
          ))}
        </aside>

        {/* Details */}
        <section className="md:col-span-2 border border-zinc-200 dark:border-white/8 rounded-2xl p-6 bg-zinc-50 dark:bg-white/1">
          <Link href={displayedJob.link} target="_blank">
            <div
              className="mb-5 flex items-start justify-between gap-4"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div>
                <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-1">
                  {displayedJob.location}
                </p>
                <h3
                  className={`text-xl md:text-2xl font-bold dark:text-white tracking-tight ${hovered ? "underline" : ""}`}
                >
                  {displayedJob.title}{" "}
                  <span className="text-[#ffa351]">@ {displayedJob.employer}</span>
                </h3>
              </div>
              <div className="w-10 h-10 flex justify-center items-center rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/10">
                <Image
                  draggable={false}
                  src={displayedJob.image}
                  className={displayedJob.employer === "PepsiCo" ? "w-full" : "w-4/5"}
                  alt={`${displayedJob.employer} logo`}
                />
              </div>
            </div>
          </Link>

          <div className="flex flex-wrap gap-4 text-xs text-zinc-500 dark:text-zinc-500 mb-5">
            <div className="flex items-center gap-1.5">
              <FaRegCalendar className="text-[#ffa351]" />
              <span>{displayedJob.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaLocationDot className="text-[#ffa351]" />
              <span>{displayedJob.location}</span>
            </div>
          </div>

          {displayedJob.responsibilities && displayedJob.responsibilities.length > 0 && (
            <ul className="space-y-3 text-sm leading-relaxed dark:text-zinc-400 text-zinc-600">
              {displayedJob.responsibilities.map((r: string, i: number) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[#ffa351] mt-1 shrink-0">▸</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Experience;
