import { PropTypes } from "prop-types";
import "./ProjectPhotos.css";
import { Link } from "next/link";
import Image from "next/image";

const ProjectPhotos = ({ project, index }) => {
  return (
    <Link href={`/project/${project.id}`}>
      <div
        className="project-card"
        data-color={
          index % 3 === 0 ? "brown" : index % 3 === 1 ? "green" : "blue"
        }
      >
        <Image
          className="project-card-front-image project-card-image"
          alt={project.name}
          src={project.image}
          loading="lazy"
        />
        <div className="project-card-faders">
          <Image
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
            loading="lazy"
          />
          <Image
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
            loading="lazy"
          />
          <Image
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
            loading="lazy"
          />
          <Image
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
            loading="lazy"
          />
          <Image
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
            loading="lazy"
          />
          <Image
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
            loading="lazy"
          />
          <Image
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
            loading="lazy"
          />
          <Image
            className="project-card-fader project-card-image"
            alt={project.name}
            src={project.image}
            loading="lazy"
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
