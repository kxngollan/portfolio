import { useState } from "react";
import "./AddProject.css";
import { IoMdCloudUpload } from "react-icons/io";

const AddProject = () => {
  const [image, setImage] = useState(false);
  const [giphy, setGiphy] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    descriptin: "",
    difficulties: "",
    image: "",
    giphy: "",
  });

  const server = "http://localhost:4000/";

  const AddProject = async () => {
    let dataObj;
    let project = projectDetails;

    let formData = new FormData();
    formData.append("project", image);

    await fetch(`${server}/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      project.image = dataObj.image_url;
      project.giphy = dataObj.giphy_url;
      console.log(project);
      await fetch(`${server}addproject`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Project Added") : alert("Failed");
        });
    }
  };

  const changeHandler = (e) => {
    console.log(e);
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
        <p>Initial Description</p>
        <textarea
          name="description"
          value={projectDetails.descriptin}
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
      <button className="addproject-btn" onClick={() => AddProject()}>
        ADD
      </button>
    </div>
  );
};

export default AddProject;
