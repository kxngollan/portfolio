import { useEffect, useState } from "react";
import "./ListProjects.css";
import { ImCross } from "react-icons/im";
import { IoLogoFigma } from "react-icons/io5";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { server } from "../Server";

const ListProject = () => {
  const [allProjects, setAllProjects] = useState([]);

  const fetchInfo = () => {
    fetch(`${server}/get/projects`)
      .then((res) => res.json())
      .then((data) => setAllProjects(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProject = async (id) => {
    console.log(id);
    await fetch(`${server}/admin/removeproject`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    fetchInfo();
  };

  return (
    <div className="listproject">
      <table>
        <thead>
          <tr className="listproject-format-main">
            <th>Image</th>
            <th>Giphy</th>
            <th>Title</th>
            <th>Description</th>
            <th>Links</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {allProjects.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.image}
                  alt={item.title}
                  className="listproject-project-icon"
                />
              </td>
              <td>
                <img
                  src={item.giphy}
                  alt={`Giphy for ${item.title}`}
                  className="listproject-project-icon"
                />
              </td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                {item.github ? (
                  <a
                    className="list-projects-link"
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                ) : null}
                {item.figma ? (
                  <a
                    className="list-projects-link"
                    href={item.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoFigma />
                  </a>
                ) : null}
                {item.link ? (
                  <a
                    className="list-projects-link"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt />
                  </a>
                ) : null}
              </td>
              <td>Edit</td>
              <td>
                <button
                  onClick={() => removeProject(item.id)}
                  className="listproject-remove-icon"
                >
                  <ImCross />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProject;
