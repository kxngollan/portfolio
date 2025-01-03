"use client";

import { useEffect, useState } from "react";
import ProjectPhotos from "./ProjectPhotos";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("fetching projects");
      const res = await fetch(`${server}/get/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");

      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.log(err);
      setError("Failed to get projects");
    }
    setLoading(false);
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

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (error) {
    return <main>{error}</main>;
  }

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
