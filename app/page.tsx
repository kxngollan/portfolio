import Hero from "@/components/Hero";
import Techstacks from "@/components/Techstacks";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/ContactForm";

const Page = () => {
  return (
    <main className="dark:bg-[#0a0a0a] md:mt-16">
      <section
        id="hero"
        className="min-h-screen w-full flex items-center justify-center px-4 py-12 dark:bg-[#0a0a0a]"
      >
        <Hero />
      </section>
      <section
        className="min-h-[50vh]  w-full flex items-center justify-center px-4 py-12 dark:bg-[#0a0a0a]"
        id="experience"
      >
        <Experience />
      </section>
      <section
        id="technical-stack"
        className="min-h-[50vh] w-full flex items-center justify-center px-4 py-12 dark:bg-[#0a0a0a]"
      >
        <Techstacks />
      </section>
      <section
        className="min-h-screen w-full flex items-center justify-center px-4 py-12 dark:bg-[#0a0a0a]"
        id="projects"
      >
        <Projects />
      </section>
      <section
        className="min-h-[50vh] w-full flex items-center justify-center px-4 py-12 dark:bg-[#0a0a0a]"
        id="contact"
      >
        <Contact />
      </section>
    </main>
  );
};

export default Page;
