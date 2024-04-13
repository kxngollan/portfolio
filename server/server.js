const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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

app.post("/upload", upload.single("image"), (req, res) => {
  res.send("File uploaded successfully");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
