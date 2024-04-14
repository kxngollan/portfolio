import { useEffect, useState } from "react";
import "./ListProjects.css";
import { ImCross } from "react-icons/im";
import { IoLogoFigma } from "react-icons/io5";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ListProject = () => {
  const [allProjects, setAllProjects] = useState([]);

  const fetchInfo = () => {
    fetch("http://localhost:4000/projects")
      .then((res) => res.json())
      .then((data) => setAllProjects(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProject = async (id) => {
    await fetch("http://localhost:4000/admin/removeproject", {
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
    <table>
      <thead>
        <tr>
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
              <img src={item.image} alt={item.title} style={{ width: 50 }} />
            </td>
            <td>
              <img
                src={item.giphy}
                alt={`Giphy for ${item.title}`}
                style={{ width: 50 }}
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
                >
                  <FaGithub />
                </a>
              ) : null}{" "}
              {item.figma ? (
                <a className="list-projects-link" href={item} target="_blank">
                  <IoLogoFigma />
                </a>
              ) : null}{" "}
              {item.link ? (
                <a className="list-projects-link" href={item} target="_blank">
                  <FaExternalLinkAlt />
                </a>
              ) : null}{" "}
            </td>
            <td>Edit</td>
            <td>
              <button onClick={() => removeProject(item.id)}>
                <ImCross />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListProject;
