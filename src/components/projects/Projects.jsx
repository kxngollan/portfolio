import ProjectPhotos from "./ProjectPhotos";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      photo:
        "https://assets.codepen.io/1468070/game+cover+-+fall+guys.png?format=auto&quality=80",
      title: "Fall Guys",
      id: 12,
    },
    {
      photo:
        "https://assets.codepen.io/1468070/game+cover+-+fall+guys.png?format=auto&quality=80",
      title: "Fall Guys",
      id: 12,
    },
    {
      photo:
        "https://assets.codepen.io/1468070/game+cover+-+fall+guys.png?format=auto&quality=80",
      title: "Fall Guys",
      id: 12,
    },
    {
      photo:
        "https://assets.codepen.io/1468070/game+cover+-+fall+guys.png?format=auto&quality=80",
      title: "Fall Guys",
      id: 12,
    },
    {
      photo:
        "https://assets.codepen.io/1468070/game+cover+-+fall+guys.png?format=auto&quality=80",
      title: "Fall Guys",
      id: 12,
    },
    {
      photo:
        "https://assets.codepen.io/1468070/game+cover+-+fall+guys.png?format=auto&quality=80",
      title: "Fall Guys",
      id: 12,
    },
    {
      photo:
        "https://assets.codepen.io/1468070/game+cover+-+fall+guys.png?format=auto&quality=80",
      title: "Fall Guys",
      id: 12,
    },
    {
      photo:
        "https://assets.codepen.io/1468070/game+cover+-+fall+guys.png?format=auto&quality=80",
      title: "Fall Guys",
      id: 12,
    },
  ];

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
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
        >
          <div id="project-cards">
            {projects.map((project, index) => (
              <ProjectPhotos key={index} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Projects;
