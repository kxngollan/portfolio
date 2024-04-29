import { useState } from "react";
import "./AddProject.css";
import { IoMdCloudUpload } from "react-icons/io";
import { server } from "../Server";

const AddProject = () => {
  const [loading, setLoading] = useState(false);
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

  const serveradmin = `${server}/admin/`;

  const addProject = async () => {
    setLoading(true);
    let dataObj;
    let project = projectDetails;

    let formData = new FormData();
    formData.append("image", image);
    formData.append("giphy", giphy);

    console.log(`${serveradmin}upload`);
    console.log(formData);

    await fetch(`${serveradmin}upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("Failed to upload");
      });

    if (dataObj.success) {
      project.image = dataObj.image_url;
      project.giphy = dataObj.giphy_url;

      await fetch(`${serveradmin}addproject`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          alert("Failed to project to database");
        });
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
    setLoading(false);
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
      {loading ? (
        <div className="addproject-btn">Sending</div>
      ) : (
        <button className="addproject-btn" onClick={() => addProject()}>
          ADD
        </button>
      )}
    </div>
  );
};

export default AddProject;
