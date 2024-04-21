import { PropTypes } from "prop-types";
import "./ProjectPhotos.css";
import { Link } from "react-router-dom";

const ProjectPhotos = ({ project, index }) => {
  return (
    <Link to={`/project/${project.id}`}>
      <div
        className="project-card"
        data-color={
          index % 3 === 0 ? "brown" : index % 3 === 1 ? "green" : "blue"
        }
      >
        <img
          className="project-card-front-image project-card-image"
          alt={project.name}
          src={project.image}
        />
        <div className="project-card-faders">
          <img
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
          />
        </div>
      </div>
    </Link>
  );
};

ProjectPhotos.propTypes = {
  project: PropTypes.object,
  index: PropTypes.number,
};

export default ProjectPhotos;
