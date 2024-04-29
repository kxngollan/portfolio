import { useEffect, useState } from "react";
import ProjectPhotos from "./ProjectPhotos";
import { motion } from "framer-motion";
import { server } from "../../../Server";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    await fetch(`${server}/get/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const parentVariants = {
    initial: {},
    animate: {
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.4,
      },
    },
  };

  const childVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div initial="initial" animate="animate" variants={parentVariants}>
      <main>
        <div id="project-cards">
          {projects.map((project, index) => (
            <motion.div
              initial="initial"
              animate="animate"
              variants={childVariants}
              key={index}
            >
              <ProjectPhotos project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

export default Projects;
