import { PropTypes } from "prop-types";
import "./ProjectPhotos.css";
import { Link } from "react-router-dom";

const ProjectPhotos = ({ project, index }) => {
  return (
    <Link to={`/projects/${project.id}`}>
      <div
        className="project-card"
        data-color={
          index % 3 === 0 ? "brown" : index % 3 === 1 ? "green" : "blue"
        }
      >
        <img
          className="project-card-front-image project-card-image"
          alt={project.title}
          src={project.photo}
        />
        <div className="project-card-faders">
          <img
            className="project-card-fader project-card-image"
            alt={project.title}
            src={project.photo}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.title}
            src={project.photo}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.title}
            src={project.photo}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.title}
            src={project.photo}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.title}
            src={project.photo}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.title}
            src={project.photo}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.title}
            src={project.photo}
          />
          <img
            className="project-card-fader project-card-image"
            alt={project.title}
            src={project.photo}
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
