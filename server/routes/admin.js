const express = require("express");
const route = express.Router();
const Project = require("../database/projectSchema");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    console.log(file);
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
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
      const imageUrl = `${urlBase}/images/${req.files["image"][0].filename}`;
      const giphyUrl = `${urlBase}/images/${req.files["giphy"][0].filename}`;

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

route.delete("/removeproject", async (req, res) => {
  await Project.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({ success: true, name: req.body.name });
});

module.exports = route;
