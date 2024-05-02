import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { server } from "../../../Server";
import { FaGithub, FaFigma } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
import "./Project.css";

const Project = () => {
  const [project, setProject] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${server}/get/project/${id}`);
      if (!res.ok) {
        setError("Failed to fetch project");
        setLoading(false);
        return;
      }
      const data = await res.json();
      console.log(data);
      setProject(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>{error}</h1>
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
    <motion.div initial="initial" animate="animate" variants={parentVariants}>
      <main className="project">
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          className="giphy-container"
        >
          <img src={project.giphy} alt={`Giphy Image ${project.name}`} />
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          className="information"
        >
          <h1 className="title">{project.name}</h1>
          {project.description ? (
            <p className="description">{project.description}</p>
          ) : null}
          {project.difficulties ? (
            <p className="difficulties">{project.difficulties}</p>
          ) : null}

          <div className="list-buttons">
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
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Project;
