const express = require("express");
const route = express.Router();
const Project = require("../database/projectSchema");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imagePath = path.join(__dirname, "../Images");
    cb(null, imagePath);
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

route.post(
  "/upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "giphy", maxCount: 1 },
  ]),
  (req, res) => {
    if (req.files["image"] && req.files["giphy"]) {
      console.log("Photos uploaded");
      const urlBase = `${req.protocol}://${req.get("host")}`;
      const imageUrl = `${urlBase}/Images/${req.files["image"][0].filename}`;
      const giphyUrl = `${urlBase}/Images/${req.files["giphy"][0].filename}`;

      res.json({
        success: true,
        message: "Files uploaded successfully",
        image_url: imageUrl,
        giphy_url: giphyUrl,
      });
    } else {
      res.status(400).send("You must upload both images.");
    }
  }
);

route.post("/addproject", async (req, res) => {
  console.log("Adding to database");
  const { name, description, difficulties, image, giphy, github, link, figma } =
    req.body;

  try {
    const projectsCount = await Project.countDocuments();
    const newProject = new Project({
      name,
      description,
      difficulties,
      image,
      giphy,
      github,
      link,
      figma,
      id: projectsCount + 1,
    });
    await newProject.save();
    res.send({ message: "Project added successfully", success: true });
  } catch (error) {
    console.log(error);
    res.send({ message: "Project failed to add", success: false });
  }
});

module.exports = route;
