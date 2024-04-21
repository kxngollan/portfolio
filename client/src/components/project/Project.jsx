import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { server } from "../../../Server";
import { FaGithub, FaFigma } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
import "./Project.css";

const Project = () => {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const fetchProject = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${server}/get/project/${id}`, {
        method: "GET",
      });

      if (res.status === 404) {
        setError("Project not found");
      }

      if (!res.ok) {
        setError("Internal server error");
      }

      const data = await res.json();
      setProject(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return (
      <main>
        <h2>Loading..</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h2>{error}</h2>
      </main>
    );
  }

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
    <main>
      <motion.div initial="initial" animate="animate" variants={parentVariants}>
        <h1 id="project-name">{project.name}</h1>
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          id="giphy-container"
        >
          <img src={project.giphy} alt="Giphy Image" />
        </motion.div>
        {project.description ? (
          <motion.div
            initial="initial"
            animate="animate"
            variants={childVariants}
            className="description"
          >
            <p>{project.description}</p>
          </motion.div>
        ) : null}
        {project.difficulties ? (
          <motion.div
            initial="initial"
            animate="animate"
            variants={childVariants}
            className="description"
          >
            <p>{project.difficulties}</p>
          </motion.div>
        ) : null}
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          className="project-buttons"
        >
          {project.github ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={project.github}
              className="project-links"
            >
              <button>
                <FaGithub className="project-icon" />
                Github
              </button>
            </a>
          ) : null}
          {project.link ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={project.link}
              className="project-links"
            >
              <button>
                <AiOutlineExport className="project-icon" /> Live Link
              </button>
            </a>
          ) : null}
          {project.figma ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={project.figma}
              className="project-links"
            >
              <button>
                <FaFigma className="project-icon" /> Figma
              </button>
            </a>
          ) : null}
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Project;
