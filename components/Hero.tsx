import Link from "next/link";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const socials = [
  {
    icon: <FaGithub />,
    label: "GitHub",
    url: "https://github.com/kxngollan",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/ollan-m/",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    url: "https://www.instagram.com/ollandagreat/",
  },
];

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-0 xl:pb-16 gap-8 xl:gap-12">
          {/* Text */}
          <div className="text-center xl:text-left order-2 xl:order-0 max-w-xl">
            {/* Availability badge */}
            <div className="flex items-center justify-center xl:justify-start gap-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffa351] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffa351]"></span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-black/50 dark:text-white/50 font-medium">
                From United Kingdom
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl xl:text-[64px] font-black mb-4 dark:text-white tracking-tight leading-none">
              Ollan Muza
            </h1>

            {/* Role divider */}
            <div className="flex items-center justify-center xl:justify-start gap-3 mb-6">
              <div className="h-px w-10 bg-[#ffa351]" />
              <span className="text-[#ffa351] text-[11px] uppercase tracking-[0.2em] font-semibold">
                Software Engineer
              </span>
              <div className="h-px w-10 bg-[#ffa351] xl:hidden" />
            </div>

            {/* Description */}
            <p className="max-w-120 mb-8 text-sm leading-[1.8] text-zinc-600 dark:text-zinc-400 mx-auto xl:mx-0">
              I build modern web apps with thoughtful design, clean code, and a
              love for solving real world problems — crafting digital
              experiences that are fast, intuitive, and built to scale.
            </p>

            {/* Buttons and socials */}
            <div className="flex flex-col xl:flex-row items-center xl:items-start gap-5">
              <a href="/cv/resume.pdf" download>
                <button
                  type="button"
                  className="group flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold uppercase tracking-[0.12em] border border-black/15 dark:border-white/10 bg-white/5 dark:bg-white/3 text-zinc-700 dark:text-white hover:border-[#ffa351]/60 hover:text-[#ffa351] hover:bg-[#ffa351]/5 transition-all duration-300 whitespace-nowrap"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-base transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </a>

              <div className="flex items-center gap-3">
                {socials.map((item, index) => (
                  <Link
                    key={index}
                    target="_blank"
                    href={item.url}
                    aria-label={item.label}
                    className="w-10 h-10 border border-black/20 dark:border-white/10 rounded-full flex justify-center items-center text-zinc-500 dark:text-zinc-400 text-base transition-all duration-300 hover:text-[#ffa351] hover:border-[#ffa351]/40 hover:bg-[#ffa351]/5"
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="order-1 xl:order-0 mb-4 xl:mb-0 shrink-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
