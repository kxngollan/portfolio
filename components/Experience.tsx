"use client";

import type { StaticImageData } from "next/image";

import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import pepsi from "@/public/job-logos/pepsi.png";
import toru from "@/public/job-logos/toru.png";
import asideofcode from "@/public/job-logos/asideofcode.png";
import { useState, useMemo } from "react";

type exp = {
  image: StaticImageData;
  employer: string;
  title: string;
  duration: string;
  link: string;
  location: string;
  responsibilities?: string[];
};

const jobExp: exp[] = [
  {
    image: pepsi,
    employer: "PepsiCo",
    link: "https://www.linkedin.com/company/pepsico/",
    title: "Manufacturing/Maintenance Engineer",
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
    location: "Remote, UK",
    duration: "May 2023 – Jul 2024",
  },
];

const Experience: React.FC = () => {
  const [active, setActive] = useState<number>(0);
  const displayedJob = useMemo(() => {
    return jobExp[active];
  }, [active]);

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
      <aside className="h-fit md:col-span-1 border-l pl-6 space-y-8">
        {jobExp.map((company: exp, i: number) => {
          return (
            <div
              className={`flex items-center px-2 py-4  ${
                active === i ? "bg-[#ffa351] rounded-2xl" : ""
              }`}
              key={i}
              onClick={() => setActive(i)}
            >
              <div className="w-10 h-10 flex justify-center items-center rounded-full overflow-hidden">
                <Image
                  draggable={false}
                  src={company.image}
                  className={company.employer === "PepsiCo" ? "w-30" : ""}
                  alt={`${company.employer} logo`}
                />
              </div>
              <span
                className={`text-lg font-semibold tracking-[0.18em] pl-2 ${
                  active === i ? " text-[[#ffa351]" : ""
                }`}
              >
                {company.employer}
              </span>
            </div>
          );
        })}
      </aside>
      <section className="md:col-span-2">
        <Link href={displayedJob.link} target="_blank">
          <header className="mb-6 flex items-center justify-between gap-4 hover:underline ">
            <h1 className="text-2xl md:text-3xl font-semibold hover:underline">
              {displayedJob.title}{" "}
              <span className="text-[#ffa351] underline">
                @ {displayedJob.employer}
              </span>
            </h1>
            <div className="w-10 h-10 flex justify-center items-center rounded-full overflow-hidden">
              <Image
                draggable={false}
                src={displayedJob.image}
                className={displayedJob.employer === "PepsiCo" ? "w-30" : ""}
                alt={`${displayedJob.employer} logo`}
              />
            </div>
          </header>
        </Link>
        <div className="space-y-2 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <FaRegCalendar />
            <span>{displayedJob.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLocationDot />
            <span>{displayedJob.location}</span>
          </div>
        </div>
        {displayedJob.responsibilities ? (
          <ul className="mt-6 space-y-3 text-sm md:text-base leading-relaxed list-disc list-outside ml-5">
            {displayedJob.responsibilities.map((r: string, i: number) => {
              return <li key={i}>{r}</li>;
            })}
          </ul>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default Experience;
