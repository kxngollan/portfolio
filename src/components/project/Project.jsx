import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaGithub, FaFigma } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
import "./Project.css";

const ProjectPage = () => {
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
      setProject(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, []);

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

  return (
    <main className="project">
      <div className="giphy-container">
        <img
          src={project.giphy}
          alt={`Giphy Image ${project.name}`}
          loading="lazy"
        />
      </div>
      <div className="information">
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
      </div>
    </main>
  );
};

export default ProjectPage;
