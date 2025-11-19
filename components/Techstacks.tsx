"use client";

import React from "react";
import StackIcon from "tech-stack-icons";

const Techstacks = () => {
  type TechStacks = {
    name: string;
    duration: number;
    title?: string;
  };

  const techstack: TechStacks[] = [
    { name: "html5", title: "html", duration: 2.5 },
    { name: "css3", title: "css", duration: 2.5 },
    { name: "nodejs", title: "node", duration: 2.5 },
    { name: "typescript", title: "typescript", duration: 2 },
    { name: "bootstrap5", title: "bootstrap", duration: 2.5 },
    { name: "tailwindcss", title: "tailwind", duration: 1.5 },
    { name: "mysql", title: "mysql", duration: 2 },
    { name: "postgresql", title: "postgres", duration: 2 },
    { name: "wordpress", title: "wordpress", duration: 1 },
    { name: "postman", title: "postman", duration: 2 },
    { name: "docker", duration: 1.5 },
    { name: "mongodb", duration: 2 },
    { name: "python", duration: 3 },
    { name: "laravel", duration: 1 },
    { name: "php", duration: 1.5 },
    { name: "wordpress", duration: 1.5 },
    { name: "react", duration: 2 },
    { name: "nextjs", duration: 2 },
    { name: "vuejs", duration: 1.5 },
    { name: "aws", duration: 1 },
    { name: "linux", duration: 2.5 },
  ];

  return (
    <section
      id="technical-stack"
      className="w-full max-w-5xl px-8 py-8 text-center max-[600px]:px-0"
    >
      <h4 className="text-[#64FFDB] mb-8 flex items-center relative my-2.5 w-full whitespace-nowrap text-[clamp(1.5rem,5vw,2.5rem)] font-semibold">
        <span className="mr-2 text-[#f6f7f8] font-mono text-[clamp(16px,3vw,20px)] font-normal"></span>
      </h4>

      <div className="flex flex-wrap justify-center gap-8">
        {techstack.map((item: TechStacks, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center w-[120px] h-[120px] dark:bg-[rgb(30,28,25)] bg-[rgb(227,214,195)] p-6 rounded-lg transition-transform duration-300 ease-in-out shadow-none hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] max-[600px]:w-[100px] max-[600px]:h-[100px] max-[600px]:p-2"
          >
            <div className="w-10 h-10 flex items-center justify-center max-[600px]:w-[30px] max-[600px]:h-[30px]">
              <StackIcon
                name={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className=" text-base mt-2 font-bold uppercase ">
              {item.title ?? item.name}
            </div>
            <div>
              {item.duration} {item.duration <= 1 ? "year" : "years"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Techstacks;
