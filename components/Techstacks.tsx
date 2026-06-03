"use client";

import StackIcon from "tech-stack-icons";
import { useTheme } from "@/themes/ThemeProvider";
import type { TechStack } from "@/types/tech-stack";

const Techstacks = () => {
  const { theme } = useTheme();

  const techstack: TechStack[] = [
    { name: "html5", title: "html", duration: 2.5 },
    { name: "css3", title: "css", duration: 2.5 },
    { name: "python", duration: 3 },
    { name: "nodejs", title: "node", duration: 2.5 },
    { name: "typescript", duration: 2 },
    { name: "react", duration: 2 },
    { name: "nextjs", duration: 2 },
    { name: "vuejs", title: "vue", duration: 1.5 },
    { name: "nuxtjs", title: "nuxt", duration: 1.5 },
    { name: "bootstrap5", title: "bootstrap", duration: 2.5 },
    { name: "tailwindcss", title: "tailwind", duration: 1.5 },
    { name: "php", duration: 1.5 },
    { name: "laravel", duration: 1 },
    { name: "wordpress", duration: 1.5 },
    { name: "java", duration: 1 },
    { name: "spring", title: "Spring", duration: 1 },
    { name: "mysql", title: "mysql", duration: 2 },
    { name: "postgresql", title: "postgres", duration: 2 },
    { name: "mongodb", duration: 2 },
    { name: "postman", title: "postman", duration: 2 },
    { name: "docker", duration: 1.5 },
    { name: "aws", duration: 1.5 },
    { name: "linux", duration: 2.5 },
  ];

  return (
    <section id="technical-stack" className="w-full max-w-5xl px-4 py-3">
      {/* Section header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xs font-medium text-[#ffa351] tracking-wider">02</span>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-white/8" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/35">Stack</span>
        </div>
        <h2 className="text-3xl xl:text-4xl font-bold dark:text-white tracking-tight">
          Tools & Technologies
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {techstack.map((item: TechStack, index: number) => (
          <div
            key={index}
            className="group flex flex-col justify-center items-center w-27.5 h-27.5 border border-zinc-200 dark:border-white/8 bg-zinc-50 dark:bg-white/1 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ffa351]/30 hover:bg-[#ffa351]/5 max-[600px]:w-22.5 max-[600px]:h-22.5 max-[600px]:p-3"
          >
            <div className="w-9 h-9 flex items-center justify-center max-[600px]:w-7 max-[600px]:h-7">
              <StackIcon
                name={item.name.toLowerCase()}
                variant={theme}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-[11px] mt-2 font-semibold uppercase tracking-wide dark:text-white text-zinc-800">
              {item.title ?? item.name}
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-500">
              {item.duration}y
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Techstacks;
