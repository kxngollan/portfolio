import Hero from "@/components/Hero";
import Techstacks from "@/components/Techstacks";
import Experience from "@/components/Experience";
import Projects2 from "@/components/Projects2";
import Contact from "@/components/ContactForm";

const Page = () => {
  return (
    <main>
      <section className="min-h-screen w-full flex items-center justify-center px-4 py-12">
        <Hero />
      </section>
      <section
        className="min-h-[50vh]  w-full flex items-center justify-center px-4 py-12"
        id="experience"
      >
        <Experience />
      </section>
      <section
        id="technical-stack"
        className="min-h-[50vh] w-full flex items-center justify-center px-4 py-12"
      >
        <Techstacks />
      </section>
      <section
        className="min-h-screen w-full flex items-center justify-center px-4 py-12"
        id="projects"
      >
        <Projects2 />
      </section>
      <section
        className="min-h-[50vh] w-full flex items-center justify-center px-4 py-12"
        id="contact"
      >
        <Contact />
      </section>
    </main>
  );
};

export default Page;
