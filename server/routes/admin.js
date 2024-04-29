require("dotenv").config();
const express = require("express");
const route = express.Router();
const Project = require("../database/projectSchema");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_API_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SCERET,
  secure: true,
});

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

route.post(
  "/upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "giphy", maxCount: 1 },
  ]),
  async (req, res) => {
    const images = req.files["image"];
    const giphys = req.files["giphy"];

    let imageUrl, giphyUrl;

    if (images && images.length > 0 && giphys && giphys.length > 0) {
      const image = images[0];
      const giphy = giphys[0];

      try {
        const uploadImage = await cloudinary.uploader.upload(image.path);
        imageUrl = uploadImage.url;

        const uploadGiphy = await cloudinary.uploader.upload(giphy.path);
        giphyUrl = uploadGiphy.url;

        res.json({
          success: true,
          message: "Files uploaded successfully",
          image_url: imageUrl,
          giphy_url: giphyUrl,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("Failed to upload images.");
      }
    } else {
      res.status(400).send("You must upload both an image and a giphy.");
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
