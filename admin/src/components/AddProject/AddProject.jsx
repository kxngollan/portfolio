import { useState } from "react";
import "./AddProject.css";
import { IoMdCloudUpload } from "react-icons/io";

const AddProject = () => {
  const [image, setImage] = useState(null);
  const [giphy, setGiphy] = useState(null);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    difficulties: "",
    image: "",
    giphy: "",
    github: "",
    link: "",
    figma: "",
  });

  const server = "http://localhost:4000/admin/";

  const addProject = async () => {
    let formData = new FormData();
    if (image) formData.append("image", image);
    if (giphy) formData.append("giphy", giphy);

    try {
      const uploadResponse = await fetch(`${server}upload`, {
        method: "POST",
        body: formData,
      });

      const dataObj = await uploadResponse.json();
      if (dataObj.success) {
        const project = {
          ...projectDetails,
          image: dataObj.image_url,
          giphy: dataObj.giphy_url,
        };

        const projectResponse = await fetch(`${server}addproject`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        });

        if (!projectResponse.ok) {
          throw new Error(
            "Failed to add project. Server responded with: " +
              projectResponse.status
          );
        }

        const projectData = await projectResponse.json();
        alert(projectData.success ? "Project Added" : "Failed");
      } else {
        alert("Failed at upload project stage: " + dataObj.message);
      }
      setImage(null);
      setGiphy(null);
      setProjectDetails({
        name: "",
        description: "",
        difficulties: "",
        image: "",
        giphy: "",
        github: "",
        link: "",
        figma: "",
      });
    } catch (error) {
      console.error("Failed to upload project:", error);
      alert("Failed to upload project: " + error.message);
    }
  };

  const changeHandler = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="addproject">
      <div className="addproject-itemfield">
        <p>Project title</p>
        <input
          type="text"
          name="name"
          value={projectDetails.name}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter project name"
          autoFocus
        />
      </div>
      <div className="addproject-itemfield">
        <p>Github Repo</p>
        <input
          type="text"
          name="github"
          value={projectDetails.github}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter github link"
        />
      </div>
      <div className="addproject-itemfield">
        <p>Live site</p>
        <input
          type="text"
          name="link"
          value={projectDetails.link}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter github link"
        />
      </div>
      <div className="addproject-itemfield">
        <p>Figma</p>
        <input
          type="text"
          name="figma"
          value={projectDetails.figma}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter figma link"
        />
      </div>
      <div className="addproject-itemfield">
        <p>Initial Description</p>
        <textarea
          name="description"
          value={projectDetails.description}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Give a description as to what made you want to build this website and why."
        />
      </div>
      <div className="addproject-itemfield">
        <p>Techinical Difficulties</p>
        <textarea
          name="difficulties"
          value={projectDetails.difficulties}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Enter any difficulties you may of had."
        />
      </div>
      <div className="addproject-itemfield">
        <p>Project Image</p>
        <label htmlFor="file-input">
          {!image ? (
            <IoMdCloudUpload className="addproject-thumbnail-img" />
          ) : (
            <img
              className="addproject-thumbnail-img"
              src={URL.createObjectURL(image)}
              alt=""
            />
          )}
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>{" "}
      <div className="addproject-itemfield">
        <p>Giphy Image</p>
        <label htmlFor="giphy-input">
          {!giphy ? (
            <IoMdCloudUpload className="addproject-thumbnail-img" />
          ) : (
            <img
              className="addproject-thumbnail-img"
              src={URL.createObjectURL(giphy)}
              alt=""
            />
          )}
        </label>
        <input
          onChange={(e) => setGiphy(e.target.files[0])}
          type="file"
          name=""
          id="giphy-input"
          hidden
        />
      </div>
      <button className="addproject-btn" onClick={() => addProject()}>
        ADD
      </button>
    </div>
  );
};

export default AddProject;
