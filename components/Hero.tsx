/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socials = [
  {
    icon: <FaGithub />,
    url: "https://github.com/kxngollan",
  },
  {
    icon: <FaLinkedin />,
    url: "https://www.linkedin.com/in/ollan-m/",
  },
];

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-0 xl:pb-16">
          {/* Text */}
          <div className="text-center xl:text-left order-2 xl:order-0">
            <span className="text-xl">Software Developer</span>
            <h1 className="h1 mt-1 mb-3">
              Hello I'm <br /> <span className="text-accent">Ollan Muza</span>
            </h1>
            <p className="max-w-[500px] mb-5">
              I build modern web apps with thoughtful design, clean code, and a
              love for solving real world problems crafting digital experiences
              that are fast, intuitive, and built to scale. From concept to
              deployment, I focus on creating solutions that balance strong
              engineering with user centred design, delivering products that
              feel seamless, reliable, and genuinely useful.
            </p>
            {/* buttons and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-4">
              <a href="/cv/resume.pdf" download>
                <button
                  className="border border-accent bg-transparent text-accent h-[46px] px-6 text-sm uppercase tracking-[2px] flex items-center gap-2 justify-center rounded-full whitespace-nowrap text-[14px] font-semibold ring-offset-white transition-colors hover:text-[#ffa351] hover:bg-[rgb(227,214,195)]
        hover:dark:bg-[rgb(30,28,25)] hover:border-[#ffa351] cursor-pointer"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </button>
              </a>
              <div className="mb-8 xl:mb-0">
                <div className="flex gap-4">
                  {socials.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        target="_blank"
                        href={item.url}
                        className="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500 hover:text-[#ffa351] hover:bg-[rgb(227,214,195)]
        hover:dark:bg-[rgb(30,28,25)] hover:border-[#ffa351]"
                      >
                        {item.icon}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-0 mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
