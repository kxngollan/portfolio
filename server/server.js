const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);

const databaseConnect = require("./database/databaseConnect");
databaseConnect();
const Project = require("./database/projectSchema");

const admin = require("./routes/admin");
app.use("/admin", admin);

app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
