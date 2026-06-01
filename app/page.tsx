import Hero from "@/components/Hero";
import Techstacks from "@/components/Techstacks";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/ContactForm";

const Page = () => {
  return (
    <main className="md:mt-16">
      <section
        id="hero"
        className="min-h-screen w-full flex items-center justify-center px-4 py-12"
      >
        <Hero />
      </section>
      <section
        id="experience"
        className="min-h-[50vh] w-full flex items-center justify-center px-4 py-16"
      >
        <Experience />
      </section>
      <section
        id="technical-stack"
        className="min-h-[50vh] w-full flex items-center justify-center px-4 py-16"
      >
        <Techstacks />
      </section>
      <section
        id="projects"
        className="min-h-screen w-full flex items-center justify-center px-4 py-16"
      >
        <Projects />
      </section>
      <section
        id="contact"
        className="min-h-[50vh] w-full flex items-center justify-center px-4 py-16"
      >
        <Contact />
      </section>
    </main>
  );
};

export default Page;
