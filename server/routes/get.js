const express = require("express");
const route = express.Router();

const Project = require("../database/projectSchema");

route.get("/projects", async (req, res) => {
  console.log("hello");
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (error) {
    console.log(error);
  }
});

route.get("/project/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({ id: id });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.send(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = route;
