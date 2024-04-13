const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  giphy: String,
  link: String,
  github: String,
  figma: String,
  id: Number,
});

module.exports = mongoose.model("Project", projectSchema);
